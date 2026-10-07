import React from 'react';

/**
 * System/Levels/World/1/Levels/Level_1/General/index.tsx
 * World 1 Level 1 (Pixel Garden Gallop) Arena-based Level.
 */

export const LEVEL_1_CONFIG = {
  levelId: 'Level_1',
  levelName: 'Pixel Garden Gallop Arena',
  worldNumber: 1,
  requiredHearts: 3,
  requiredStars: 1,
};

export const Level1General: React.FC = () => {
  return (
    <div id="world-1-level-1-config" className="text-xs font-mono text-amber-400">
      World 1 Level 1 Active (Pixel Garden Gallop)
    </div>
  );
};
