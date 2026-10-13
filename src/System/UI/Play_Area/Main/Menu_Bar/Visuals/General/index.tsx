import React from 'react';

export interface VisualOption {
  key: 'Auto' | '2D' | '3D' | 'Simulated3D' | 'Vintage3D' | 'Super3D';
  label: string;
}

export const VISUAL_OPTIONS: VisualOption[] = [
  { key: 'Auto', label: 'Auto Sense 2-D/3-D' },
  { key: '2D', label: '2D' },
  { key: '3D', label: '3D' },
  { key: 'Simulated3D', label: 'Simulated 3D' },
  { key: 'Vintage3D', label: 'Vintage 3-D' },
  { key: 'Super3D', label: 'Super 3-D' }
];
