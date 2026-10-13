import * as fs from 'fs';
import * as path from 'path';

const baseDir = 'src/Arena/Manorsville/Rasta-Manor/Cellar/B2/Boiler_Room';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function setup() {
  const folders = [
    baseDir,
    path.join(baseDir, 'Logic_and_Algorithms'),
    path.join(baseDir, 'Logic_and_Algorithms', 'Logic'),
    path.join(baseDir, 'Logic_and_Algorithms', 'Algorithms')
  ];

  folders.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const logicSub = path.join(baseDir, 'Logic_and_Algorithms', 'Logic');
  const algoSub = path.join(baseDir, 'Logic_and_Algorithms', 'Algorithms');

  alphabet.forEach(letter => {
    const lPath = path.join(logicSub, letter);
    const aPath = path.join(algoSub, letter);
    
    if (!fs.existsSync(lPath)) {
        fs.mkdirSync(lPath, { recursive: true });
        fs.writeFileSync(path.join(lPath, '.gitkeep'), '');
    }
    if (!fs.existsSync(aPath)) {
        fs.mkdirSync(aPath, { recursive: true });
        fs.writeFileSync(path.join(aPath, '.gitkeep'), '');
    }
  });
  
  console.log(`Successfully created Logic_and_Algorithms in: ${baseDir}`);
}

setup();
