import React from 'react';
import { BRICKS } from '../../BlocksConstants';

export const GeneralBricks: React.FC<any> = (props) => {
  return (
    <div id="bricks-general">
      {props.children}
    </div>
  );
};
