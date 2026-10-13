import React from 'react';
import { DEFAULT_WILDCARD_CHAR_DATA } from '../Data';

/**
 * System/AI/External/Gemini/Components/Characters/_Wildcard_/General/index.tsx
 * Wildcard character General component renderer.
 */

export const WildcardCharacterGeneral: React.FC = () => {
  return (
    <div id="wildcard-char-container" className="text-xs font-mono text-purple-300">
      Wildcard Character Generator: {DEFAULT_WILDCARD_CHAR_DATA.wildcardTag}
    </div>
  );
};
