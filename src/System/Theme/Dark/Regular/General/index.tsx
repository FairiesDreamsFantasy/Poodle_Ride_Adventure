import React from 'react';
import { RegularDarkHeader } from '../Header';
import { RegularDarkMain } from '../Main';
import { RegularDarkFooter } from '../Footer';

/**
 * System/Theme/Dark/Regular/General/index.tsx
 * Regular Dark Theme wrapper containing Header, Main (Menu Bar, Game View, HUD), and Footer.
 */

export interface RegularDarkThemeProps {
  headerComponent?: React.ReactNode;
  menuBarComponent?: React.ReactNode;
  gameViewComponent?: React.ReactNode;
  hudComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  diagnosticsComponent?: React.ReactNode;
}

export const RegularDarkThemeGeneral: React.FC<RegularDarkThemeProps> = ({
  headerComponent,
  menuBarComponent,
  gameViewComponent,
  hudComponent,
  footerComponent,
  diagnosticsComponent,
}) => {
  return (
    <div id="regular-dark-theme-container" className="min-h-screen bg-black text-stone-100 flex flex-col justify-between p-4 space-y-4">
      <RegularDarkHeader headerComponent={headerComponent} />
      <RegularDarkMain
        menuBarComponent={menuBarComponent}
        hudComponent={hudComponent}
        gameViewComponent={gameViewComponent}
        diagnosticsComponent={diagnosticsComponent}
      />
      <RegularDarkFooter footerComponent={footerComponent} />
    </div>
  );
};
