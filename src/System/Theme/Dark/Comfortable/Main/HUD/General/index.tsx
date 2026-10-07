import React from 'react';

export interface ComfortableHUDProps {
  hudComponent?: React.ReactNode;
}

export const ComfortableHUDGeneral: React.FC<ComfortableHUDProps> = ({ hudComponent }) => {
  if (!hudComponent) return null;
  return (
    <div id="comfortable-transparent-hud-swap" className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-2xl transition-all">
      {hudComponent}
    </div>
  );
};
