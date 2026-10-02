const fs = require('fs');
let content = fs.readFileSync('src/System/UI/Play_Area/index.tsx', 'utf8');

content = content.replace(
  "<PlayAreaMenuBar\n                onGoToLanding={() => { setShowLanding(true); setGameState(INITIAL_STATE); }}\n                isHeaderVisible={gameState.isHeaderVisible}",
  "<PlayAreaMenuBar\n                onGoToLanding={() => { setShowLanding(true); setGameState(INITIAL_STATE); }}\n                isHeaderVisible={gameState.isHeaderVisible}\n                setGameState={setGameState}"
);

fs.writeFileSync('src/System/UI/Play_Area/index.tsx', content);
