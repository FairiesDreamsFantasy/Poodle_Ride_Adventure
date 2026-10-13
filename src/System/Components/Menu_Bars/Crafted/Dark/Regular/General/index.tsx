import React from 'react';

/**
 * System/Components/Menu_Bars/Crafted/Dark/Regular/General/index.tsx
 * Regular dark theme menu bar implementation.
 */

export interface RegularDarkMenuBarProps {
  children?: React.ReactNode;
}

export const RegularDarkMenuBarGeneral: React.FC<RegularDarkMenuBarProps> = ({ children }) => {
  return (
    <div
      id="crafted-dark-regular-menu-bar"
      className="w-full flex items-center justify-between px-4 py-2 bg-stone-950 border border-stone-800 rounded-lg shadow-md"
    >
      <div id="crafted-dark-menu-items" className="flex items-center gap-4">
        {children}
      </div>
    </div>
  );
};
