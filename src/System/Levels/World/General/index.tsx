import React from 'react';
import { World0 } from '../0';
import { World1 } from '../1';
import { WorldN } from '../N';

/**
 * System/Levels/World/General/index.tsx
 * World Dispatcher routing between World 0 (Official Start), World 1, and generic World N.
 */

export interface WorldDispatcherProps {
  worldNumber?: number;
  levelNumber?: number;
}

export const WorldDispatcherGeneral: React.FC<WorldDispatcherProps> = ({
  worldNumber = 0,
  levelNumber = 0,
}) => {
  if (worldNumber === 0) {
    return <World0 />;
  }

  if (worldNumber === 1) {
    return <World1 activeLevel={levelNumber} />;
  }

  return <WorldN worldNumber={worldNumber} activeLevel={levelNumber} />;
};
