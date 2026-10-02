import React from 'react';

export interface LayoutOption {
  id: string;
  name: string;
  description: string;
}

export const LAYOUT_OPTIONS: LayoutOption[] = [
  { id: 'Cedella', name: 'Cedella Profile', description: 'Numeric keypad joystick with smooth rotation' },
  { id: 'Standard', name: 'Standard Profile', description: 'Arrow keys or WASD with discrete turn snaps' },
  { id: 'Arden Denis', name: 'Arden Denis Profile', description: 'Arden-Denis keyboard configuration' }
];
