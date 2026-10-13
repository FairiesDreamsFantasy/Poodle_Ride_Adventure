import React from 'react';
import { CozyMenuBar } from '../Menu_Bar';
import { CozyGameView } from '../Game_View';
import { CozyHUD } from '../HUD';

export interface CozyMainProps {
  menuBarComponent?: React.ReactNode;
  gameViewComponent?: React.ReactNode;
  hudComponent?: React.ReactNode;
  diagnosticsComponent?: React.ReactNode;
}

export const CozyMainGeneral: React.FC<CozyMainProps> = ({
  menuBarComponent,
  gameViewComponent,
  hudComponent,
  diagnosticsComponent,
}) => {
  return (
    <main
      id="cozy-theme-main"
      className="h-screen w-screen bg-stone-950 text-stone-100 flex flex-col relative overflow-hidden p-3 space-y-3 select-none"
    >
      <CozyMenuBar menuBarComponent={menuBarComponent} />
      <CozyGameView gameViewComponent={gameViewComponent} />
      <CozyHUD hudComponent={hudComponent} />
      {diagnosticsComponent}
    </main>
  );
};
