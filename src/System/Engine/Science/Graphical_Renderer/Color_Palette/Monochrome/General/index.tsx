import React from 'react';

export interface MonochromeConfig {
  tintColor: string; // e.g. '#00ff00' for matrix look
  contrast: number;
}

export const GREEN_MONO_CONFIG: MonochromeConfig = {
  tintColor: '#10b981',
  contrast: 1.2
};
