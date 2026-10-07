import React from 'react';
import { CozyMain } from '../Main';

export interface CozyThemeProps {
  menuBarComponent?: React.ReactNode;
  gameViewComponent?: React.ReactNode;
  hudComponent?: React.ReactNode;
  diagnosticsComponent?: React.ReactNode;
}

export const CozyThemeGeneral: React.FC<CozyThemeProps> = (props) => {
  return <CozyMain {...props} />;
};
