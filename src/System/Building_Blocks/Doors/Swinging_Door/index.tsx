import React from 'react';

export interface SwingingDoorConfig {
  id: string;
  width: number;
  height: number;
  swingAngle: number;
  hingeSide: 'left' | 'right';
  material: 'Wood' | 'Steel' | 'Glass';
  isOpen: boolean;
}

export const defaultSwingingDoor: SwingingDoorConfig = {
  id: 'standard_swinging_door',
  width: 3.5,
  height: 7.0,
  swingAngle: 0,
  hingeSide: 'left',
  material: 'Wood',
  isOpen: false,
};

export default defaultSwingingDoor;
