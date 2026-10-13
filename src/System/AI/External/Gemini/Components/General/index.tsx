import React from 'react';
import { GeminiArenas } from '../Arenas';
import { GeminiCharacters } from '../Characters';
import { GeminiInput } from '../Input';

/**
 * System/AI/External/Gemini/Components/General/index.tsx
 * Gemini Components master container.
 */

export const GeminiComponentsGeneral: React.FC = () => {
  return (
    <div id="gemini-components-master-container" className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
      <GeminiInput />
      <div className="grid grid-cols-2 gap-2">
        <GeminiArenas />
        <GeminiCharacters />
      </div>
    </div>
  );
};
