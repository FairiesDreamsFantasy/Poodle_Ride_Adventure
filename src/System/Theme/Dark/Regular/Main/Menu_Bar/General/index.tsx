import React from 'react';

export interface RegularDarkMenuBarProps {
  menuBarComponent?: React.ReactNode;
}

export const RegularDarkMenuBarGeneral: React.FC<RegularDarkMenuBarProps> = ({ menuBarComponent }) => {
  if (!menuBarComponent) return null;
  return (
    <div id="regular-dark-menu-bar-container" className="w-full">
      {menuBarComponent}
    </div>
  );
};
