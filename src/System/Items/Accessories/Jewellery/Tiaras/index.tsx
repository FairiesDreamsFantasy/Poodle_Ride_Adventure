import React from 'react';
import { GeneralTiaras, TiaraConfig } from './General';
import { TiarasAnimations } from './Animations';

export const Tiaras: React.FC<any> = (props) => {
  return (
    <GeneralTiaras {...props}>
      <TiarasAnimations {...props} />
      {props.children}
    </GeneralTiaras>
  );
};

export type { TiaraConfig };
