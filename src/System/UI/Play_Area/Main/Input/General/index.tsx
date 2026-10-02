import React from 'react';
import { Keyboard } from '../Keyboard';

export const General: React.FC<any> = (props) => {
  return (
    <div id="keyboards-and-controllers-general">
      <Keyboard {...props} />
    </div>
  );
};
