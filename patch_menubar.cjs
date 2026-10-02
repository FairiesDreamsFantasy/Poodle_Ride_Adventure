const fs = require('fs');
let content = fs.readFileSync('src/System/Registry/Play_Area/Menu_Bar/index.tsx', 'utf8');

// Replace NotificationsMenu with AccessibilityMenu
content = content.replace(
  "import { NotificationsMenu } from '../../../UI/Play_Area/Main/Menu_Bar/Notifications';",
  "import { AccessibilityMenu } from '../../../UI/Play_Area/Main/Menu_Bar/Accessibility';\nimport { Rabbit as DogIcon } from 'lucide-react';"
);

// Update Props interface
content = content.replace(
  "  showGrid: boolean;",
  "  showGrid: boolean;\n  setGameState?: (updater: (prev: GameState) => GameState) => void;\n  onGoToLanding?: () => void;\n  isHeaderVisible?: boolean;"
);

// Update Component destructuring
content = content.replace(
  "  onToggleSurroundSound,\n}) => {",
  "  onToggleSurroundSound,\n  setGameState,\n  onGoToLanding,\n  isHeaderVisible,\n}) => {"
);

// Add the back button if !isHeaderVisible, and replace NotificationsMenu
content = content.replace(
  "{/* Collapse Toggle */}",
  `{!isHeaderVisible && (
          <button
            onClick={onGoToLanding}
            className="w-8 h-8 mr-2 bg-pink-600 hover:bg-pink-500 rounded-full flex items-center justify-center border-2 border-white transition-transform active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
            title="Return to Landing Page"
            aria-label="Return to Landing Page"
          >
            <DogIcon className="text-white w-5 h-5" />
          </button>
        )}
        {/* Collapse Toggle */}`
);

content = content.replace(
  "{/* Notifications Menu */}\n        <NotificationsMenu \n           gameState={gameState}\n          onUpdateNotifications={onUpdateNotifications}\n          isOpen={openMenu === 'notifs'}\n          onToggleOpen={() => toggleMenu('notifs')}\n        />",
  "{/* Accessibility Menu */}\n        <AccessibilityMenu \n           gameState={gameState}\n          onUpdateNotifications={onUpdateNotifications}\n          onUpdateGameState={setGameState}\n          isOpen={openMenu === 'accessibility'}\n          onToggleOpen={() => toggleMenu('accessibility')}\n        />"
);

fs.writeFileSync('src/System/Registry/Play_Area/Menu_Bar/index.tsx', content);
