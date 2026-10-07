import * as fs from 'fs';
import * as path from 'path';

const baseDirs = [
  'src/Level_0/Rasta-Manor/Cellar/B1',
  'src/Arena/Manorsville/Rasta-Manor/Cellar/B1'
];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function setup() {
  baseDirs.forEach(baseDir => {
    if (!fs.existsSync(baseDir)) {
      console.warn(`Directory not found: ${baseDir}`);
      return;
    }

    const logicRoot = path.join(baseDir, 'Logic_and_Algorithms');
    const logicSub = path.join(logicRoot, 'Logic');
    const algoSub = path.join(logicRoot, 'Algorithms');

    [logicRoot, logicSub, algoSub].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

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
  });
}

setup();
