import React from 'react';

interface MenuBarGeneralProps {
  children?: React.ReactNode;
}

export const MenuBarGeneral: React.FC<MenuBarGeneralProps> = ({ children }) => {
  return (
    <div id="menu-bar-general-inner" className="w-full flex items-center justify-end px-4 py-2 bg-stone-950 border border-stone-800 rounded-lg">
      <div id="menu-bar-right-sec" className="flex items-center gap-4">
        {children}
      </div>
    </div>
  );
};
