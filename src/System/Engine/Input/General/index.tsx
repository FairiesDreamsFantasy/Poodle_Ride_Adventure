import React from 'react';
import { KeyboardsAndControllers } from '../../../UI/Play_Area/Main/Input';

export const General: React.FC<any> = (props) => {
  return (
    <div id="engine-input-general">
      <KeyboardsAndControllers {...props} />
    </div>
  );
};
