import React from 'react';
import { WildcardLevel } from '../Levels/_Wildcard_';

/**
 * System/AI/External/Gemini/Arena/World/_Wildcard_/General/index.tsx
 * Wildcard World container holding wildcard levels.
 */

export interface WildcardWorldProps {
  worldTag?: string;
}

export const WildcardWorldGeneral: React.FC<WildcardWorldProps> = ({ worldTag = 'dynamic-world' }) => {
  return (
    <div id="wildcard-world-container" className="p-2 border border-blue-500/20 rounded">
      <div className="text-xs font-mono text-blue-400 font-bold mb-1">Wildcard World: {worldTag}</div>
      <WildcardLevel />
    </div>
  );
};
