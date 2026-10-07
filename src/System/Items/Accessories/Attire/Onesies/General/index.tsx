import React from 'react';

export const ONESIE_COLORS = {
  BLUE: '#0000ff',
  GREEN: '#008000',
  PINK: '#ffc0cb',
  NAVY: '#000080',
  YELLOW: '#ffff00',
  WHITE: '#ffffff',
} as const;

export interface OnesieConfig {
  id: string;
  name: string;
  color: string;
  owner?: string;
  description?: string;
}

export const GeneralOnesies: React.FC<any> = (props) => {
  return (
    <div id="onesies-general">
      {props.children}
    </div>
  );
};
