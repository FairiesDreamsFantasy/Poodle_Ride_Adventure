import React from 'react';

export interface DirectionLabel {
  degree: number;
  label: string;
}

export const DIRECTIONS: DirectionLabel[] = [
  { degree: 0, label: 'N' },
  { degree: 45, label: 'NE' },
  { degree: 90, label: 'E' },
  { degree: 135, label: 'SE' },
  { degree: 180, label: 'S' },
  { degree: 225, label: 'SW' },
  { degree: 270, label: 'W' },
  { degree: 315, label: 'NW' }
];

export function getDirectionLabel(rotation: number): string {
  // Normalize rotation to 0-360
  const normalized = ((rotation % 360) + 360) % 360;
  // Find closest direction
  const closest = DIRECTIONS.reduce((prev, curr) => {
    const diffPrev = Math.abs(prev.degree - normalized);
    const diffCurr = Math.abs(curr.degree - normalized);
    return diffCurr < diffPrev ? curr : prev;
  });
  return closest.label;
}
