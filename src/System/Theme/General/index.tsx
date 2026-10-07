import React from 'react';
import { useThemeEngine } from '../Engine';
import { DarkTheme, CozyTheme, ComfortableTheme } from '../Dark';

/**
 * System/Theme/General/index.tsx
 * Master Theme Layout Dispatcher. Selects and renders the appropriate
 * theme template based on the current theme engine context.
 */

export interface SystemThemeProps {
  headerComponent?: React.ReactNode;
  menuBarComponent?: React.ReactNode;
  gameViewComponent?: React.ReactNode;
  hudComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  diagnosticsComponent?: React.ReactNode;
}

export const SystemThemeGeneral: React.FC<SystemThemeProps> = ({
  headerComponent,
  menuBarComponent,
  gameViewComponent,
  hudComponent,
  footerComponent,
  diagnosticsComponent,
}) => {
  const { themeConfig } = useThemeEngine();

  if (themeConfig.theme === 'Cozy') {
    return (
      <CozyTheme
        menuBarComponent={menuBarComponent}
        gameViewComponent={gameViewComponent}
        hudComponent={hudComponent}
        diagnosticsComponent={diagnosticsComponent}
      />
    );
  }

  if (themeConfig.theme === 'Comfortable') {
    return (
      <ComfortableTheme
        menuBarComponent={menuBarComponent}
        gameViewComponent={gameViewComponent}
        hudComponent={hudComponent}
        diagnosticsComponent={diagnosticsComponent}
      />
    );
  }

  return (
    <DarkTheme
      headerComponent={headerComponent}
      menuBarComponent={menuBarComponent}
      gameViewComponent={gameViewComponent}
      hudComponent={hudComponent}
      footerComponent={footerComponent}
      diagnosticsComponent={diagnosticsComponent}
    />
  );
};
