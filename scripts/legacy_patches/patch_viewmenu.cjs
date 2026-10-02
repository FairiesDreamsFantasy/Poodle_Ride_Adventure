const fs = require('fs');
let content = fs.readFileSync('src/System/UI/Play_Area/Main/Menu_Bar/View/index.tsx', 'utf8');

content = content.replace(
  "  onToggleOpen: () => void;",
  "  onToggleOpen: () => void;\n  onUpdateGameState?: (updater: (prev: GameState) => GameState) => void;"
);

content = content.replace(
  "  onToggleOpen\n}) => {",
  "  onToggleOpen,\n  onUpdateGameState\n}) => {"
);

content = content.replace(
  "          <div id=\"menu-view-sep\" className=\"border-t border-zinc-800 my-1\" />",
  `          <div id="menu-view-sep" className="border-t border-zinc-800 my-1" />
          <button
            id="menu-view-opt-header"
            onClick={() => {
              if (onUpdateGameState) {
                onUpdateGameState(prev => ({ ...prev, isHeaderVisible: !prev.isHeaderVisible }));
              }
              onToggleOpen();
            }}
            className={\`w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide \${
              gameState.isHeaderVisible ? 'text-white font-bold' : 'text-zinc-500'
            }\`}
          >
            <span>Header</span>
            {gameState.isHeaderVisible && <div id="menu-view-header-indicator" className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
          </button>`
);

fs.writeFileSync('src/System/UI/Play_Area/Main/Menu_Bar/View/index.tsx', content);

let menubar = fs.readFileSync('src/System/Registry/Play_Area/Menu_Bar/index.tsx', 'utf8');
menubar = menubar.replace(
  "          onOpenKeyboardModal={onOpenKeyboardModal}",
  "          onOpenKeyboardModal={onOpenKeyboardModal}\n          onUpdateGameState={setGameState}"
);
fs.writeFileSync('src/System/Registry/Play_Area/Menu_Bar/index.tsx', menubar);

