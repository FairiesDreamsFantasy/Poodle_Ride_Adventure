import React from 'react';
import { ESMERALD_THEME, ColorScheme } from './General';

export function getHexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const ColorPaletteManager: React.FC = () => {
  return null;
};
