import React from 'react';

export interface PerspectiveConfig {
  fov: number; // field of view
  near: number;
  far: number;
  scale3d: number;
}

export const DEFAULT_3D_CONFIG: PerspectiveConfig = {
  fov: 60,
  near: 1,
  far: 1000,
  scale3d: 1.5
};
