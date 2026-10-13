import React from 'react';

/**
 * Narrator Audio Systems.
 */

interface NarratorManagerProps {
  ttsEnabled: boolean;
}

export const NarratorManager: React.FC<NarratorManagerProps> = ({ ttsEnabled }) => {
  return (
    <div id="narrator-manager-info" className="text-zinc-500 text-[10px] font-mono">
      Narrator: <span id="narrator-status-text" className={ttsEnabled ? "text-emerald-500 font-bold" : "text-zinc-600"}>{ttsEnabled ? "ACTIVE" : "OFF"}</span>
    </div>
  );
};
