import React from 'react';

export interface TiaraConfig {
  id: string;
  name: string;
  material: string;
  gemColor?: string;
}

export const GeneralTiaras: React.FC<any> = (props) => {
  return (
    <div id="tiaras-general">
      {props.children}
    </div>
  );
};
