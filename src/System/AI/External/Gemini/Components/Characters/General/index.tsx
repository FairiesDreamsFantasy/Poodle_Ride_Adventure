import React from 'react';
import { SAMPLE_GEMINI_CHARACTER_DATA } from '../Data';

/**
 * System/AI/External/Gemini/Components/Characters/General/index.tsx
 * AI-Generated Characters component renderer.
 */

export const GeminiCharactersGeneral: React.FC = () => {
  return (
    <div id="gemini-character-container" className="p-2 border border-purple-500/30 rounded text-xs font-mono">
      AI Character Component: {SAMPLE_GEMINI_CHARACTER_DATA.name}
    </div>
  );
};
