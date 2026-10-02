import React from 'react';
import { World0Level0, LEVEL_0_CONFIG } from '../Levels/Level_0';

/**
 * System/Levels/World/0/General/index.tsx
 * World 0 Definition - Official Start World containing Level 0 (Rasta-Manor Porter-Manor).
 */

export const WORLD_0_CONFIG = {
  worldId: 'World_0',
  worldName: 'Rasta-Manor Porter-Manor Official Start',
  worldNumber: 0,
  startLevel: LEVEL_0_CONFIG,
};

export const World0General: React.FC = () => {
  return (
    <div id="world-0-container" className="p-2 border border-emerald-500/30 rounded-lg">
      <World0Level0 />
    </div>
  );
};
