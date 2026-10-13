import React from 'react';

export interface CozyGameViewProps {
  gameViewComponent?: React.ReactNode;
}

export const CozyGameViewGeneral: React.FC<CozyGameViewProps> = ({ gameViewComponent }) => {
  return (
    <div id="cozy-game-view-area" className="flex-1 w-full relative flex items-center justify-center overflow-hidden rounded-xl border border-amber-900/40 bg-black shadow-inner">
      {gameViewComponent}
    </div>
  );
};
