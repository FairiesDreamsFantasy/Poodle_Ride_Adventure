import React from 'react';
import { General } from './General';
export * from './General';
export * from './Keyboard';

export const KeyboardsAndControllers: React.FC<any> = (props) => {
  return <General {...props} />;
};

