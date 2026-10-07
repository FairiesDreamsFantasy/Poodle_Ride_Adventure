import React from 'react';

export interface PixelationConfig {
  pixelSize: number; // Size of pixelation blocks
  enableColorClustering: boolean;
}

export const DEFAULT_PIXELATION_CONFIG: PixelationConfig = {
  pixelSize: 4,
  enableColorClustering: false
};
