import React from 'react';
import { GeneralAttire } from './General';
import { AttireAnimations } from './Animations';
import { Onesies, ONESIE_COLORS } from './Onesies';

export const Attire: React.FC<any> = (props) => {
  return (
    <GeneralAttire {...props}>
      <Onesies {...props} />
      <AttireAnimations {...props} />
      {props.children}
    </GeneralAttire>
  );
};

export { Onesies, ONESIE_COLORS };
