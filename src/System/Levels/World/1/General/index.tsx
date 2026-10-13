import React from 'react';
import { World1Level1, LEVEL_1_CONFIG } from '../Levels/Level_1';
import { World1LevelN } from '../Levels/Level_N';

/**
 * System/Levels/World/1/General/index.tsx
 * World 1 Definition - First Arena-based World (Level 1 through Level 20+).
 */

export const WORLD_1_CONFIG = {
  worldId: 'World_1',
  worldName: 'Arena World 1',
  worldNumber: 1,
  levels: [LEVEL_1_CONFIG],
};

export interface World1Props {
  activeLevel?: number;
}

export const World1General: React.FC<World1Props> = ({ activeLevel = 1 }) => {
  return (
    <div id="world-1-container" className="p-2 border border-amber-500/30 rounded-lg">
      {activeLevel === 1 ? <World1Level1 /> : <World1LevelN levelNumber={activeLevel} />}
    </div>
  );
};
