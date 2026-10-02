import React from 'react';

export interface RegularDarkHeaderProps {
  headerComponent?: React.ReactNode;
}

export const RegularDarkHeaderGeneral: React.FC<RegularDarkHeaderProps> = ({ headerComponent }) => {
  if (!headerComponent) return null;
  return (
    <header id="regular-dark-header" className="w-full">
      {headerComponent}
    </header>
  );
};
