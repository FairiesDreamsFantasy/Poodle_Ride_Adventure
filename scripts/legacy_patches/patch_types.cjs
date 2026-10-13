const fs = require('fs');
let content = fs.readFileSync('src/System/Engine/Core/Types/GameState.ts', 'utf8');
content = content.replace(
  "visualDescription: boolean;",
  "visualDescription: boolean;\n    pettingDescription: boolean;\n    collarGraspDescription: boolean;\n    leanDescription: boolean;\n    describeLoveLogic: boolean;"
);
content = content.replace(
  "showDiagnostics: boolean;",
  "showDiagnostics: boolean;\n  isHeaderVisible: boolean;"
);
fs.writeFileSync('src/System/Engine/Core/Types/GameState.ts', content);

let state = fs.readFileSync('src/System/Engine/Core/Constants/State.ts', 'utf8');
state = state.replace(
  "visualDescription: false,",
  "visualDescription: false,\n    pettingDescription: true,\n    collarGraspDescription: true,\n    leanDescription: true,\n    describeLoveLogic: true,"
);
state = state.replace(
  "showDiagnostics: false,",
  "showDiagnostics: false,\n  isHeaderVisible: true,"
);
fs.writeFileSync('src/System/Engine/Core/Constants/State.ts', state);
