import React from 'react';
import { Menu } from 'lucide-react';
import { useThemeEngine } from '../../../../../Engine';

export interface CozyHUDProps {
  hudComponent?: React.ReactNode;
}

export const CozyHUDGeneral: React.FC<CozyHUDProps> = ({ hudComponent }) => {
  const { themeConfig, toggleMenu } = useThemeEngine();
  const isMenuOpen = themeConfig.isMenuOpen;

  if (isMenuOpen) return null;

  return (
    <div id="cozy-hud-wrapper" className="w-full flex items-center gap-3">
      <button
        id="cozy-expand-menu-btn"
        onClick={toggleMenu}
        className="flex items-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase rounded-lg transition-all shadow-md shrink-0 cursor-pointer"
        title="Expand Menu (Alt+Shift+F)"
        aria-label="Expand Menu"
      >
        <Menu className="w-4 h-4 text-amber-400" />
        <span>Menu</span>
      </button>

      <div id="cozy-hud-container" className="flex-1 overflow-hidden">
        {hudComponent}
      </div>
    </div>
  );
};
