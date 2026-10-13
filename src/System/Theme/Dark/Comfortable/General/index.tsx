import React from 'react';
import { ComfortableMain } from '../Main';

export interface ComfortableThemeProps {
  menuBarComponent?: React.ReactNode;
  gameViewComponent?: React.ReactNode;
  hudComponent?: React.ReactNode;
  diagnosticsComponent?: React.ReactNode;
}

export const ComfortableThemeGeneral: React.FC<ComfortableThemeProps> = (props) => {
  return <ComfortableMain {...props} />;
};
