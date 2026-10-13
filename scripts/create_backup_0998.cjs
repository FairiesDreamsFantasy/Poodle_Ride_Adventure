const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const rootDir = process.cwd();
const backupZipPath = path.join(rootDir, 'Poodle_Ride_Adventure_Backup_0.9.9.8.zip');

const excludeList = [
  'node_modules',
  'dist',
  '.git',
  '.aistudio',
  '.env',
  '.env.local',
  '.DS_Store',
  'npm-debug.log',
  'Poodle_Ride_Adventure_Build',
  'Poodle_Ride_Adventure_Backup_0.9.9.8.zip',
  'Poodle_Ride_Adventure_Backup-V1.0.2.zip',
  'Anti-Bot',
  'PROTECTION_NOTICES.md'
];

async function createBackup() {
  console.log(`🛡️ [BACKUP SENTINEL] Creating Official Milestone Backup: ${backupZipPath}`);
  
  if (fs.existsSync(backupZipPath)) {
    console.log(`Overwriting existing ${backupZipPath}...`);
    try {
      fs.unlinkSync(backupZipPath);
    } catch (e) {
      // Ignore
    }
  }

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(backupZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    let fileCount = 0;

    output.on('close', () => {
      const sizeInMB = (archive.pointer() / (1024 * 1024)).toFixed(2);
      console.log(`✅ [BACKUP SENTINEL] Backup created successfully!`);
      console.log(`   - Archive: Poodle_Ride_Adventure_Backup_0.9.9.8.zip`);
      console.log(`   - Total Files: ${fileCount}`);
      console.log(`   - Size: ${sizeInMB} MB (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Archiver warning:', err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    output.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    function addDir(currentDir, relativePrefix = '') {
      const items = fs.readdirSync(currentDir);
      for (const item of items) {
        if (excludeList.includes(item)) continue;
        if (item.endsWith('.zip')) continue;

        const fullPath = path.join(currentDir, item);
        const relativePath = relativePrefix ? `${relativePrefix}/${item}` : item;
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          addDir(fullPath, relativePath);
        } else if (stats.isFile()) {
          archive.file(fullPath, { name: relativePath });
          fileCount++;
        }
      }
    }

    try {
      addDir(rootDir);
      archive.finalize();
    } catch (e) {
      reject(e);
    }
  });
}

createBackup().catch((err) => {
  console.error('❌ Failed creating backup:', err);
  process.exit(1);
});
