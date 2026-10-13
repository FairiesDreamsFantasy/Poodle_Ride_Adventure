import React from 'react';

/**
 * System/Levels/World/1/Levels/Level_N/General/index.tsx
 * Generic template for unlimited arena-based levels in World 1.
 */

export interface LevelNProps {
  levelNumber?: number;
  levelName?: string;
  requiredHearts?: number;
  requiredStars?: number;
}

export const LevelNGeneral: React.FC<LevelNProps> = ({
  levelNumber = 2,
  levelName = 'Arena Level',
  requiredHearts = 5,
  requiredStars = 2,
}) => {
  return (
    <div id={`world-1-level-${levelNumber}-config`} className="text-xs font-mono text-cyan-400">
      World 1 Level {levelNumber}: {levelName} (Hearts: {requiredHearts}, Stars: {requiredStars})
    </div>
  );
};
