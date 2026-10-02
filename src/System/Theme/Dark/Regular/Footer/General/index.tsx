import React from 'react';

export interface RegularDarkFooterProps {
  footerComponent?: React.ReactNode;
}

export const RegularDarkFooterGeneral: React.FC<RegularDarkFooterProps> = ({ footerComponent }) => {
  if (!footerComponent) return null;
  return (
    <footer id="regular-dark-footer" className="w-full">
      {footerComponent}
    </footer>
  );
};
