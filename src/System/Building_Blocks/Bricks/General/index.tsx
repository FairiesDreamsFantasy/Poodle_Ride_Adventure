import React from 'react';
import { BRICKS } from '@/src/System/Building_Blocks/BlocksConstants';

export const GeneralBricks: React.FC<any> = (props) => {
  return (
    <div id="bricks-general">
      {props.children}
    </div>
  );
};
