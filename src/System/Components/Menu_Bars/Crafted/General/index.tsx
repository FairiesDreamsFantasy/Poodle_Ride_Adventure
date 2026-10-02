import React from 'react';
import { useThemeEngine } from '../../../../Theme/Engine';
import { DarkMenuBar } from '../Dark';
import { CozyMenuBar } from '../Cozy';
import { ComfortableMenuBar } from '../Comfortable';

/**
 * System/Components/Menu_Bars/Crafted/General/index.tsx
 * Dispatches the appropriate crafted menu bar based on active theme setting.
 */

export interface CraftedMenuBarProps {
  children?: React.ReactNode;
  onOpenLandingPage?: () => void;
}

export const CraftedMenuBarGeneral: React.FC<CraftedMenuBarProps> = ({ children, onOpenLandingPage }) => {
  const { themeConfig } = useThemeEngine();

  if (themeConfig.theme === 'Cozy') {
    return <CozyMenuBar onOpenLandingPage={onOpenLandingPage}>{children}</CozyMenuBar>;
  }

  if (themeConfig.theme === 'Comfortable') {
    return <ComfortableMenuBar>{children}</ComfortableMenuBar>;
  }

  return <DarkMenuBar>{children}</DarkMenuBar>;
};
