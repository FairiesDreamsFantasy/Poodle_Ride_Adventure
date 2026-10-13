import React from 'react';

export interface ComfortableMenuBarProps {
  menuBarComponent?: React.ReactNode;
}

export const ComfortableMenuBarGeneral: React.FC<ComfortableMenuBarProps> = ({ menuBarComponent }) => {
  if (!menuBarComponent) return null;
  return (
    <div id="comfortable-menu-active-swap" className="animate-in fade-in duration-150">
      {menuBarComponent}
    </div>
  );
};
