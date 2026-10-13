import React from 'react';

export interface PolygonStyle {
  strokeColor?: string;
  fillColor?: string;
  lineWidth?: number;
  lineJoin?: 'round' | 'bevel' | 'miter';
}

export const DEFAULT_POLYGON_STYLE: PolygonStyle = {
  strokeColor: '#ffffff',
  fillColor: 'transparent',
  lineWidth: 1,
  lineJoin: 'round'
};
