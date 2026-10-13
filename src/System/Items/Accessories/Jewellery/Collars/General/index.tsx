import React from 'react';

export interface CollarConfig {
  id: string;
  poodleName: string;
  color: string;
  charmType?: string;
  hasDiamonds?: boolean;
}

export const GeneralCollars: React.FC<any> = (props) => {
  return (
    <div id="collars-general">
      {props.children}
    </div>
  );
};
