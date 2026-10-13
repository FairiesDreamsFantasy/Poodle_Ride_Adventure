import React from 'react';
import { useThemeEngine } from '../../../../../Engine';

export interface CozyMenuBarProps {
  menuBarComponent?: React.ReactNode;
}

export const CozyMenuBarGeneral: React.FC<CozyMenuBarProps> = ({ menuBarComponent }) => {
  const { themeConfig } = useThemeEngine();
  const isMenuOpen = themeConfig.isMenuOpen;

  if (!isMenuOpen || !menuBarComponent) return null;

  return (
    <div id="cozy-floating-menu-wrapper" className="absolute top-3 left-3 right-3 z-50 animate-in slide-in-from-top-4 duration-200">
      {menuBarComponent}
    </div>
  );
};
