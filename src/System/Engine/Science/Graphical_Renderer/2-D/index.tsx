import React from 'react';
import { DEFAULT_2D_CONFIG, Renderer2DConfig } from './General';

export interface Renderer2DProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  config?: Partial<Renderer2DConfig>;
}

export function draw2DRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

export const Renderer2D: React.FC<Renderer2DProps> = ({ ctx, width, height, config }) => {
  const mergedConfig = { ...DEFAULT_2D_CONFIG, ...config };

  React.useEffect(() => {
    if (!ctx) return;
    ctx.imageSmoothingEnabled = mergedConfig.enableSmoothing;
  }, [ctx, mergedConfig.enableSmoothing]);

  return null; // Used purely as a visual renderer subsystem helper
};
