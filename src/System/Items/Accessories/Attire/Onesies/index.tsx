import React from 'react';
import { GeneralOnesies, ONESIE_COLORS, OnesieConfig } from './General';
import { OnesiesAnimations } from './Animations';

export const Onesies: React.FC<any> = (props) => {
  return (
    <GeneralOnesies {...props}>
      <OnesiesAnimations {...props} />
      {props.children}
    </GeneralOnesies>
  );
};

export { ONESIE_COLORS };
export type { OnesieConfig };
