import React from 'react';
import { WallPanel } from '../Panel';

export const GeneralWall: React.FC<any> = (props) => {
  return (
    <div id="wall-general">
      <WallPanel {...props} />
      {props.children}
    </div>
  );
};
