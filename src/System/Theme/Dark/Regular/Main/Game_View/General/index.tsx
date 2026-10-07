import React from 'react';

export interface RegularDarkGameViewProps {
  gameViewComponent?: React.ReactNode;
}

export const RegularDarkGameViewGeneral: React.FC<RegularDarkGameViewProps> = ({ gameViewComponent }) => {
  if (!gameViewComponent) return null;
  return (
    <div id="regular-dark-game-view-container" className="w-full flex-1 flex items-center justify-center">
      {gameViewComponent}
    </div>
  );
};
