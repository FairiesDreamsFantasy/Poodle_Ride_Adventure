import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const buildPath = path.join(rootDir, 'Poodle_Ride_Adventure_Build');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Helper to wait for stream end
function waitForStream(stream, archive) {
  return new Promise((resolve, reject) => {
    stream.on('close', resolve);
    archive.on('error', reject);
    stream.on('error', reject);
  });
}

async function run() {
  try {
    // 1. Trigger production web compile with Vite to get the absolute freshest files
    console.log("Compiling game files using Vite...");
    await execPromise("npx vite build");
    console.log("Vite build compiled successfully");

    const folderName = "Poodle_Ride_Adventure";

    // 2. Build Source ZIP (exclude node_modules, build directory, git, zip files, environment variables)
    const sourceZipPublicPath = path.join(publicDir, 'Poodle_Ride_Adventure_Source.zip');
    const sourceZipBuildPath = path.join(buildPath, 'Poodle_Ride_Adventure_Source.zip');

    // Clean old files
    if (fs.existsSync(sourceZipPublicPath)) fs.unlinkSync(sourceZipPublicPath);
    if (fs.existsSync(sourceZipBuildPath)) fs.unlinkSync(sourceZipBuildPath);

    console.log(`Packaging Source ZIP: [${sourceZipPublicPath}]...`);
    const sourceStream = fs.createWriteStream(sourceZipPublicPath);
    const sourceArchive = archiver('zip', { zlib: { level: 9 } });
    sourceArchive.pipe(sourceStream);

    const items = fs.readdirSync(rootDir);
    items.forEach(item => {
      // Exclude build artifacts, deep dependencies, git references, etc.
      if ([
        'node_modules', 
        'dist', 
        '.git', 
        '.env', 
        '.env.local', 
        '.DS_Store', 
        'npm-debug.log', 
        'Poodle_Ride_Adventure_Build', 
        'Poodle_Ride_Adventure_Production.zip',
        'Poodle_Ride_Adventure_Source.zip',
        'Poodle_Ride_Adventure_Backup_0.9.9.8.zip',
        'Poodle_Ride_Adventure_Backup-V1.0.2.zip'
      ].includes(item) || item.endsWith('.zip')) {
        return;
      }
      const fullPath = path.join(rootDir, item);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
         // Pack subdirectory under common Poodle_Ride_Adventure root folder for gamers
         sourceArchive.directory(fullPath, `${folderName}/${item}`);
      } else {
         sourceArchive.file(fullPath, { name: `${folderName}/${item}` });
      }
    });

    await sourceArchive.finalize();
    await waitForStream(sourceStream, sourceArchive);
    console.log("Source ZIP successfully created in public directory.");

    // Copy to build folder
    fs.copyFileSync(sourceZipPublicPath, sourceZipBuildPath);
    console.log("Source ZIP cloned to build folder.");

    // 3. Build Production ZIP from the build output directory (exclude zip files recursively)
    const prodZipPublicPath = path.join(publicDir, 'Poodle_Ride_Adventure_Production.zip');
    const prodZipBuildPath = path.join(buildPath, 'Poodle_Ride_Adventure_Production.zip');

    if (fs.existsSync(prodZipPublicPath)) fs.unlinkSync(prodZipPublicPath);
    if (fs.existsSync(prodZipBuildPath)) fs.unlinkSync(prodZipBuildPath);

    console.log(`Packaging Production ZIP: [${prodZipPublicPath}]...`);
    const prodStream = fs.createWriteStream(prodZipPublicPath);
    const prodArchive = archiver('zip', { zlib: { level: 9 } });
    prodArchive.pipe(prodStream);

    // Add build folder contents under the top-level Poodle_Ride_Adventure subdirectory in ZIP
    // We filter out any nested ZIP files that might have been copied
    prodArchive.directory(buildPath, folderName, (entry) => {
      if (entry.name.endsWith('.zip')) {
        return false; // Skip copying zip files recursively
      }
      return entry;
    });

    // Add README.md if present
    const readmePath = path.join(rootDir, 'README.md');
    if (fs.existsSync(readmePath)) {
      prodArchive.file(readmePath, { name: `${folderName}/README.md` });
    }

    await prodArchive.finalize();
    await waitForStream(prodStream, prodArchive);
    console.log("Production ZIP successfully created in public directory.");

    // Clone production zip to build path
    fs.copyFileSync(prodZipPublicPath, prodZipBuildPath);
    console.log("Production ZIP cloned to build folder.");

    console.log("All package operations completed successfully!");

  } catch (error) {
    console.error("Failed packaging zips:", error);
    process.exit(1);
  }
}

run();
