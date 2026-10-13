import React from 'react';
import { TILES } from '../../BlocksConstants';

export const GeneralTiles: React.FC<any> = (props) => {
  return (
    <div id="tiles-general">
      {props.children}
    </div>
  );
};
