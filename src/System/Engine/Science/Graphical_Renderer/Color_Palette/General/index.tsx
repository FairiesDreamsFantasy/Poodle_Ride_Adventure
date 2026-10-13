import React from 'react';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export const ESMERALD_THEME: ColorScheme = {
  primary: '#10b981', // emerald
  secondary: '#6366f1', // indigo
  accent: '#f59e0b', // amber
  background: '#09090b' // zinc-950
};
