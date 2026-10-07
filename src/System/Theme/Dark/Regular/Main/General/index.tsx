import React from 'react';
import { RegularDarkMenuBar } from '../Menu_Bar';
import { RegularDarkHUD } from '../HUD';
import { RegularDarkGameView } from '../Game_View';

export interface RegularDarkMainProps {
  menuBarComponent?: React.ReactNode;
  gameViewComponent?: React.ReactNode;
  hudComponent?: React.ReactNode;
  diagnosticsComponent?: React.ReactNode;
}

export const RegularDarkMainGeneral: React.FC<RegularDarkMainProps> = ({
  menuBarComponent,
  gameViewComponent,
  hudComponent,
  diagnosticsComponent,
}) => {
  return (
    <main id="regular-dark-main-content" className="flex-1 flex flex-col gap-4 max-w-7xl mx-auto w-full">
      <RegularDarkMenuBar menuBarComponent={menuBarComponent} />
      <RegularDarkHUD hudComponent={hudComponent} />
      <RegularDarkGameView gameViewComponent={gameViewComponent} />
      {diagnosticsComponent}
    </main>
  );
};
