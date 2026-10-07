import React from 'react';
import { useThemeEngine } from '../../../../Engine';
import { ComfortableGameView } from '../Game_View';
import { ComfortableMenuBar } from '../Menu_Bar';
import { ComfortableHUD } from '../HUD';

export interface ComfortableMainProps {
  menuBarComponent?: React.ReactNode;
  gameViewComponent?: React.ReactNode;
  hudComponent?: React.ReactNode;
  diagnosticsComponent?: React.ReactNode;
}

export const ComfortableMainGeneral: React.FC<ComfortableMainProps> = ({
  menuBarComponent,
  gameViewComponent,
  hudComponent,
  diagnosticsComponent,
}) => {
  const { themeConfig } = useThemeEngine();
  const isMenuOpen = themeConfig.isMenuOpen;

  return (
    <main
      id="comfortable-theme-main"
      className="h-screen w-screen bg-black text-stone-100 relative overflow-hidden flex flex-col justify-between p-2 select-none"
    >
      <ComfortableGameView gameViewComponent={gameViewComponent} />

      <div id="comfortable-top-hud-bar" className="relative z-40 w-full max-w-7xl mx-auto pt-2 px-2 pointer-events-auto">
        {isMenuOpen ? (
          <ComfortableMenuBar menuBarComponent={menuBarComponent} />
        ) : (
          <ComfortableHUD hudComponent={hudComponent} />
        )}
      </div>

      {diagnosticsComponent && (
        <div id="comfortable-diagnostics-wrapper" className="relative z-40 w-full max-w-7xl mx-auto pb-2 px-2">
          {diagnosticsComponent}
        </div>
      )}
    </main>
  );
};
