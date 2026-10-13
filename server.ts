import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Express Router for API routes supporting both root and /Poodle_Ride_Adventure/ prefix
  const apiRouter = express.Router();

  // API Route to download the SOURCE code
  apiRouter.get("/download-source", (req, res) => {
    console.log("Source ZIP request received");
    const folderName = "Poodle_Ride_Adventure";
    
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${folderName}_Source.zip"`,
      "Cache-Control": "no-cache"
    });

    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    archive.on('error', (err) => {
      console.error("Source Zip error:", err);
      if (!res.headersSent) {
        res.status(500).send(`Failed to generate source zip: ${err.message}`);
      }
    });

    archive.pipe(res);

    const rootDir = process.cwd();
    const items = fs.readdirSync(rootDir);
    
    items.forEach(item => {
      const fullPath = path.join(rootDir, item);
      const stats = fs.statSync(fullPath);
      
      // Exclude build artifacts, dependencies, and environment files
      if (['node_modules', 'dist', '.git', '.env', '.env.local', '.DS_Store', 'npm-debug.log'].includes(item)) {
        return;
      }
      
      if (stats.isDirectory()) {
        archive.directory(fullPath, `${folderName}/${item}`);
      } else {
        archive.file(fullPath, { name: `${folderName}/${item}` });
      }
    });

    archive.finalize();
  });

  // Track build state in memory
  const buildState = {
    isBuilding: false,
    progress: "idle", // "idle" | "compiling" | "packaging" | "ready" | "failed"
    error: null as string | null,
    lastBuilt: 0,
  };

  const zipPath = path.join(process.cwd(), "Poodle_Ride_Adventure_Production.zip");

  // API Route to fetch current build status
  apiRouter.get("/build-production-status", (req, res) => {
    res.json({
      isBuilding: buildState.isBuilding,
      progress: buildState.progress,
      error: buildState.error,
      lastBuilt: buildState.lastBuilt,
      zipExists: fs.existsSync(zipPath),
    });
  });

  // API Route to trigger background compilation
  apiRouter.get("/build-production-trigger", (req, res) => {
    if (buildState.isBuilding) {
      return res.json({ status: "already_building", progress: buildState.progress });
    }

    // Cache build if ZIP exists and was built in the last 2 minutes
    if (buildState.lastBuilt > Date.now() - 2 * 60 * 1000 && fs.existsSync(zipPath) && req.query.force !== "true") {
      return res.json({ status: "ready" });
    }

    buildState.isBuilding = true;
    buildState.progress = "compiling";
    buildState.error = null;

    // Send instant success response so client knows the build started without browser timing out
    res.json({ status: "started" });

    // Execute heavy Vite compilation in the background asynchronously
    (async () => {
      const folderName = "Poodle_Ride_Adventure";
      const buildFolderName = "Poodle_Ride_Adventure_Build";
      const buildPath = path.join(process.cwd(), buildFolderName);
      const tempBuildFolderName = "Poodle_Ride_Adventure_Temp_Build";
      const tempBuildPath = path.join(process.cwd(), tempBuildFolderName);

      try {
        console.log("Background build: cleaning stale temp folders...");
        if (fs.existsSync(tempBuildPath)) {
          fs.rmSync(tempBuildPath, { recursive: true, force: true });
        }

        console.log("Background build: compiling live assets using Vite...");
        buildState.progress = "compiling";
        await execPromise(`npx vite build --outDir ${tempBuildFolderName} --mode production`);
        console.log("Background build: compiled successfully");

        // Validate the temp build directory exists
        if (!fs.existsSync(tempBuildPath)) {
          throw new Error("Temporary build folder was not created by Vite process!");
        }

        // Generate platform desktop launchers
        fs.writeFileSync(path.join(tempBuildPath, 'start-windows.bat'), `@echo off\r\ntitle Poodle Ride Adventure - Windows Desktop Edition\r\ncls\r\necho ========================================================\r\necho   Poodle Ride Adventure - Windows Desktop Edition\r\necho ========================================================\r\necho Opening game in default browser...\r\nstart "" "index.html"\r\n`);
        fs.writeFileSync(path.join(tempBuildPath, 'start-mac.command'), `#!/bin/bash\ncd "$(dirname "$0")"\necho "========================================================"\necho "  Poodle Ride Adventure - macOS Desktop Edition"\necho "========================================================"\nopen "index.html"\n`);
        try { fs.chmodSync(path.join(tempBuildPath, 'start-mac.command'), 0o755); } catch (_) {}

        fs.writeFileSync(path.join(tempBuildPath, 'start-linux.sh'), `#!/bin/bash\nDIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"\ncd "$DIR"\necho "========================================================"\necho "  Poodle Ride Adventure - Linux Desktop Edition"\necho "========================================================"\nif command -v xdg-open > /dev/null; then\n  xdg-open "index.html"\nelif command -v firefox > /dev/null; then\n  firefox "index.html"\nelif command -v google-chrome > /dev/null; then\n  google-chrome "index.html"\nelse\n  echo "Please open index.html in your web browser."\nfi\n`);
        try { fs.chmodSync(path.join(tempBuildPath, 'start-linux.sh'), 0o755); } catch (_) {}

        fs.writeFileSync(path.join(tempBuildPath, 'START.BAT'), `@ECHO OFF\r\nCLS\r\nECHO ========================================================\r\nECHO   POODLE RIDE ADVENTURE - FREEDOS / DOS EDITION\r\nECHO ========================================================\r\nECHO Opening INDEX.HTML...\r\nINDEX.HTML\r\n`);
        fs.writeFileSync(path.join(tempBuildPath, 'READ_DOS.TXT'), `========================================================\r\n POODLE RIDE ADVENTURE - FREEDOS / DOS COMPATIBILITY GUIDE\r\n========================================================\r\n1. Open INDEX.HTML with any DOS GUI browser (Arachne, Dillo for DOS, Links/Lynx).\r\n2. For full audio & canvas graphics acceleration, play on any desktop browser.\r\n3. Keyboard controls (Arrow keys / Numpad 1-9) are fully active.\r\n`);

        buildState.progress = "packaging";
        console.log("Background build: generating Source code ZIP to place in production build...");

        const sourceZipPath = path.join(tempBuildPath, `${folderName}_Source.zip`);
        const sourceArchive = archiver('zip', { zlib: { level: 9 } });
        const sourceOutput = fs.createWriteStream(sourceZipPath);

        const sourceZipFinished = new Promise((resolve, reject) => {
          sourceOutput.on('close', () => resolve(undefined));
          sourceOutput.on('error', reject);
          sourceArchive.on('error', reject);
        });

        sourceArchive.pipe(sourceOutput);

        const rootDir = process.cwd();
        const items = fs.readdirSync(rootDir);
        items.forEach(item => {
          const fullPath = path.join(rootDir, item);
          const stats = fs.statSync(fullPath);

          if (['node_modules', 'dist', '.git', '.env', '.env.local', '.DS_Store', 'npm-debug.log', buildFolderName, tempBuildFolderName].includes(item)) {
            return;
          }

          if (stats.isDirectory()) {
            sourceArchive.directory(fullPath, item);
          } else {
            sourceArchive.file(fullPath, { name: item });
          }
        });

        await sourceArchive.finalize();
        await sourceZipFinished;
        console.log("Background build: Source code ZIP successfully created inside temp path");

        // Create temporary Production Zip file
        const tempZipPath = zipPath + ".tmp";
        if (fs.existsSync(tempZipPath)) {
          fs.unlinkSync(tempZipPath);
        }

        const archive = archiver('zip', { zlib: { level: 9 } });
        const outputStream = fs.createWriteStream(tempZipPath);

        const zipFinished = new Promise((resolve, reject) => {
          outputStream.on('close', () => resolve(undefined));
          outputStream.on('error', reject);
          archive.on('error', reject);
        });

        archive.pipe(outputStream);
        archive.directory(tempBuildPath, folderName);

        // Include README.md if present
        const readmePath = path.join(process.cwd(), 'README.md');
        if (fs.existsSync(readmePath)) {
          archive.file(readmePath, { name: `${folderName}/README.md` });
        }

        await archive.finalize();
        await zipFinished;
        console.log("Background build: production raw zip finalized successfully");

        // Overwrite old ZIP with the newly produced ZIP file safely
        if (fs.existsSync(zipPath)) {
          fs.unlinkSync(zipPath);
        }
        fs.renameSync(tempZipPath, zipPath);

        // Safely replace the running production folder with the new build
        if (fs.existsSync(buildPath)) {
          fs.rmSync(buildPath, { recursive: true, force: true });
        }
        fs.renameSync(tempBuildPath, buildPath);
        console.log("Background build: copied build to live hosting directory successfully");

        buildState.isBuilding = false;
        buildState.progress = "ready";
        buildState.lastBuilt = Date.now();
      } catch (err: any) {
        console.error("Background build failed:", err);
        buildState.isBuilding = false;
        buildState.progress = "failed";
        buildState.error = err.message || String(err);

        // Cleanup temporary directory in case of failure
        if (fs.existsSync(tempBuildPath)) {
          try {
            fs.rmSync(tempBuildPath, { recursive: true, force: true });
          } catch (_) {}
        }
      }
    })();
  });

  // API Route to STREAM the pre-compiled PRODUCTION build ZIP
  apiRouter.get("/download-production", (req, res) => {
    const folderName = "Poodle_Ride_Adventure";
    let filename = `${folderName}_Production.zip`;

    const platform = (req.query.platform as string || '').toLowerCase();
    if (platform === 'windows') {
      filename = `${folderName}_Windows_Desktop.zip`;
    } else if (platform === 'mac' || platform === 'macos') {
      filename = `${folderName}_macOS_Desktop.zip`;
    } else if (platform === 'linux') {
      filename = `${folderName}_Linux_Desktop.zip`;
    } else if (platform === 'freedos' || platform === 'dos') {
      filename = `${folderName}_FreeDOS_Edition.zip`;
    } else if (platform === 'web') {
      filename = `${folderName}_Web_Server.zip`;
    }

    if (fs.existsSync(zipPath)) {
      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache"
      });
      res.download(zipPath, filename, (err) => {
        if (err) {
          console.error("Error sending production zip file:", err);
        }
      });
    } else {
      res.status(404).send("Production ZIP has not been generated yet. Please trigger the build from the Downloads panel.");
    }
  });

  // Mount API router for both /api and /Poodle_Ride_Adventure/api
  app.use("/api", apiRouter);
  app.use("/Poodle_Ride_Adventure/api", apiRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const buildPath = path.join(process.cwd(), 'Poodle_Ride_Adventure_Build');
    app.use('/Poodle_Ride_Adventure', express.static(buildPath));
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
