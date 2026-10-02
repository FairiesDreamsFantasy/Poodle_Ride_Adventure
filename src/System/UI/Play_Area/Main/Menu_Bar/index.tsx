import React from 'react';
import { MenuBarGeneral } from './General';

interface MenuBarProps {
  children?: React.ReactNode;
}

export const PlayAreaMenuBarContainer: React.FC<MenuBarProps> = ({ children }) => {
  return (
    <div 
      id="play-area-menu-bar-wrapper" 
      className="w-full mb-4"
      onKeyDown={(e) => {
        // Prevent game keys from triggering when interacting with the menu
        if (e.key === ' ' || e.key.startsWith('Arrow')) {
          e.stopPropagation();
        }
      }}
    >
      <MenuBarGeneral>
        {children}
      </MenuBarGeneral>
    </div>
  );
};
