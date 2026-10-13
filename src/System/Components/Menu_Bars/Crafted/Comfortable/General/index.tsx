import React from 'react';

/**
 * System/Components/Menu_Bars/Crafted/Comfortable/General/index.tsx
 * Comfortable theme transparent button menu bar with high contrast focus highlights.
 */

export interface ComfortableMenuBarProps {
  children?: React.ReactNode;
}

export const ComfortableMenuBarGeneral: React.FC<ComfortableMenuBarProps> = ({ children }) => {
  return (
    <div
      id="crafted-comfortable-menu-bar"
      className="w-full flex items-center justify-between px-4 py-2 bg-stone-950/80 border border-emerald-500/40 rounded-xl backdrop-blur-md shadow-2xl"
      role="menubar"
      aria-label="Comfortable Transparent Menu Bar"
    >
      <div id="comfortable-menu-children" className="flex items-center gap-3 w-full justify-end">
        {children}
      </div>
    </div>
  );
};
