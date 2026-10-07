const fs = require('fs');
let content = fs.readFileSync('src/System/Registry/Play_Area/Menu_Bar/index.tsx', 'utf8');

content = content.replace(
  /{[\s\S]*?\/\* Notifications Menu \*\/[\s\S]*?<NotificationsMenu[\s\S]*?\/>/m,
  `        {/* Accessibility Menu */}
        <AccessibilityMenu 
          gameState={gameState}
          onUpdateNotifications={onUpdateNotifications}
          onUpdateGameState={setGameState}
          isOpen={openMenu === 'accessibility'}
          onToggleOpen={() => toggleMenu('accessibility')}
        />`
);

fs.writeFileSync('src/System/Registry/Play_Area/Menu_Bar/index.tsx', content);
