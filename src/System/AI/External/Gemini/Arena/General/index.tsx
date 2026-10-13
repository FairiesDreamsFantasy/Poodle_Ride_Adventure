import React from 'react';
import { WildcardArena } from '../_Wildcard_';
import { GeminiWorld } from '../World';

/**
 * System/AI/External/Gemini/Arena/General/index.tsx
 * Gemini Arena master router.
 */

export const GeminiArenaGeneral: React.FC = () => {
  return (
    <div id="gemini-arena-master-container" className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-2">
      <WildcardArena />
      <GeminiWorld />
    </div>
  );
};
