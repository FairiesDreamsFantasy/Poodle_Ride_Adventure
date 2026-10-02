import React from 'react';
import { WALL_PANELS } from '../../../../BlocksConstants';

export const GeneralWallPanel: React.FC<any> = (props) => {
  return (
    <div id="wall-panel-general">
      {props.children}
    </div>
  );
};
