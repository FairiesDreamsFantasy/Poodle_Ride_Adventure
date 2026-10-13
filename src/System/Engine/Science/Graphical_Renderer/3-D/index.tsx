import React from 'react';
import { DEFAULT_3D_CONFIG, PerspectiveConfig } from './General';

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export function project3DTo2D(point: Point3D, width: number, height: number, config: PerspectiveConfig = DEFAULT_3D_CONFIG): Point2D {
  const { fov, scale3d } = config;
  const factor = fov / (point.z || 1);
  return {
    x: (width / 2) + point.x * factor * scale3d,
    y: (height / 2) + point.y * factor * scale3d
  };
}

export const Renderer3D: React.FC = () => {
  return null;
};
