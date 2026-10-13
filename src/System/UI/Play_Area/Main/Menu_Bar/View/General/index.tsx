import React from 'react';

export interface ViewOption {
  id: string;
  label: string;
  description: string;
}

export const VIEW_OPTIONS: ViewOption[] = [
  { id: 'keyboard', label: 'Keyboard Commands', description: 'Show keyboard controls manual' },
  { id: 'map', label: 'Map', description: 'Toggle overhead layout mapping' },
  { id: 'coordinates', label: 'X,Y Coordinates', description: 'Toggle current position coordinates' }
];
