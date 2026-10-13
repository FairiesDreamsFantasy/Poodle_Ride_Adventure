import React from 'react';

export interface ComfortableGameViewProps {
  gameViewComponent?: React.ReactNode;
}

export const ComfortableGameViewGeneral: React.FC<ComfortableGameViewProps> = ({ gameViewComponent }) => {
  return (
    <div id="comfortable-game-canvas-wrapper" className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-black overflow-hidden">
      {gameViewComponent}
    </div>
  );
};
