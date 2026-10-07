import React from 'react';

export interface Renderer2DConfig {
  pixelRatio: number;
  enableSmoothing: boolean;
}

export const DEFAULT_2D_CONFIG: Renderer2DConfig = {
  pixelRatio: window.devicePixelRatio || 1,
  enableSmoothing: false
};
