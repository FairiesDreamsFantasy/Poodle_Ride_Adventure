import React from 'react';
import { SAMPLE_GEMINI_ARENA_DATA } from '../Data';

/**
 * System/AI/External/Gemini/Components/Arenas/General/index.tsx
 * AI-Generated Arenas component renderer.
 */

export const GeminiArenasGeneral: React.FC = () => {
  return (
    <div id="gemini-arena-container" className="p-2 border border-blue-500/30 rounded text-xs font-mono">
      AI Arena Component: {SAMPLE_GEMINI_ARENA_DATA.arenaName}
    </div>
  );
};
