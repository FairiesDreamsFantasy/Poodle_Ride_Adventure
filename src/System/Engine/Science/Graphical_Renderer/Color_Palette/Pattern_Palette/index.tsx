import React from 'react';
import { DEFAULT_PATTERN, PatternType } from './General';

export function createCanvasPattern(
  ctx: CanvasRenderingContext2D,
  type: PatternType = DEFAULT_PATTERN,
  color: string = '#27272a'
): CanvasPattern | null {
  const canvas = document.createElement('canvas');
  canvas.width = type.density;
  canvas.height = type.density;
  const pCtx = canvas.getContext('2d');
  if (!pCtx) return null;

  pCtx.strokeStyle = color;
  pCtx.fillStyle = color;

  if (type.id === 'stripes') {
    pCtx.beginPath();
    pCtx.moveTo(0, 0);
    pCtx.lineTo(type.density, type.density);
    pCtx.stroke();
  } else if (type.id === 'grid') {
    pCtx.strokeRect(0, 0, type.density, type.density);
  } else if (type.id === 'dots') {
    pCtx.beginPath();
    pCtx.arc(type.density / 2, type.density / 2, 1, 0, Math.PI * 2);
    pCtx.fill();
  }

  return ctx.createPattern(canvas, 'repeat');
}

export const PatternPalette: React.FC = () => {
  return null;
};
