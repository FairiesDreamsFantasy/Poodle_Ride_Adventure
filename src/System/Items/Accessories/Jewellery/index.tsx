import React from 'react';
import { GeneralJewellery } from './General';
import { JewelleryAnimations } from './Animations';
import { Tiaras } from './Tiaras';
import { Collars } from './Collars';

export const Jewellery: React.FC<any> = (props) => {
  return (
    <GeneralJewellery {...props}>
      <Tiaras {...props} />
      <Collars {...props} />
      <JewelleryAnimations {...props} />
      {props.children}
    </GeneralJewellery>
  );
};

export { Tiaras, Collars };
