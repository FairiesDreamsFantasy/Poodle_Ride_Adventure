import React from 'react';

export interface RegularDarkHUDProps {
  hudComponent?: React.ReactNode;
}

export const RegularDarkHUDGeneral: React.FC<RegularDarkHUDProps> = ({ hudComponent }) => {
  if (!hudComponent) return null;
  return (
    <div id="regular-dark-hud-container" className="w-full">
      {hudComponent}
    </div>
  );
};
