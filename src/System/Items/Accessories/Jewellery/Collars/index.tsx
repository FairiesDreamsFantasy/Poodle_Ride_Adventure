import React from 'react';
import { GeneralCollars, CollarConfig } from './General';
import { CollarsAnimations } from './Animations';

export const Collars: React.FC<any> = (props) => {
  return (
    <GeneralCollars {...props}>
      <CollarsAnimations {...props} />
      {props.children}
    </GeneralCollars>
  );
};

export type { CollarConfig };
