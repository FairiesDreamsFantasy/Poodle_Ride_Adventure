import React from 'react';

/**
 * System/Levels/World/N/General/index.tsx
 * Generic template for unlimited worlds in arena-based games.
 */

export interface WorldNProps {
  worldNumber?: number;
  worldName?: string;
  activeLevel?: number;
}

export const WorldNGeneral: React.FC<WorldNProps> = ({
  worldNumber = 2,
  worldName = 'Arena World',
  activeLevel = 1,
}) => {
  return (
    <div id={`world-${worldNumber}-container`} className="p-2 border border-cyan-500/30 rounded-lg text-xs font-mono">
      <span className="text-cyan-300 font-bold">World {worldNumber}: {worldName}</span> (Active Level: {activeLevel})
    </div>
  );
};
