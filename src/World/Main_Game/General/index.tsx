import React from 'react';
import { WorldSystem } from '../../../System/Levels/World';

/**
 * System/Levels/Main_Game/General/index.tsx
 * Main Game level manager containing World and Course dispatchers.
 */

export interface MainGameProps {
  currentWorld?: number;
  currentLevel?: number;
}

export const MainGameGeneral: React.FC<MainGameProps> = ({
  currentWorld = 0,
  currentLevel = 0,
}) => {
  return (
    <div id="main-game-level-container" className="w-full space-y-2">
      <WorldSystem worldNumber={currentWorld} levelNumber={currentLevel} />
    </div>
  );
};
