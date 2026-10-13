import React from 'react';
import { GeneralAccessories } from './General';
import { AccessoriesAnimations } from './Animations';
import { Attire, Onesies, ONESIE_COLORS } from './Attire';
import { Jewellery, Tiaras, Collars } from './Jewellery';

export const Accessories: React.FC<any> = (props) => {
  return (
    <GeneralAccessories {...props}>
      <Attire {...props} />
      <Jewellery {...props} />
      <AccessoriesAnimations {...props} />
      {props.children}
    </GeneralAccessories>
  );
};

export { Attire, Onesies, ONESIE_COLORS, Jewellery, Tiaras, Collars };
