import React from 'react';

/**
 * System/Levels/World/0/Levels/Level_0/General/index.tsx
 * World 0 Level 0 (Rasta-Manor Porter-Manor) Official Start Level definition.
 */

export interface Level0Config {
  levelId: 'Level_0';
  levelName: 'Rasta-Manor Porter-Manor Start';
  worldNumber: 0;
  isOfficialStart: true;
}

export const LEVEL_0_CONFIG: Level0Config = {
  levelId: 'Level_0',
  levelName: 'Rasta-Manor Porter-Manor Start',
  worldNumber: 0,
  isOfficialStart: true,
};

export const Level0General: React.FC = () => {
  return (
    <div id="world-0-level-0-config" className="text-xs font-mono text-emerald-400">
      World 0 Level 0 Active (Official Start Level)
    </div>
  );
};
