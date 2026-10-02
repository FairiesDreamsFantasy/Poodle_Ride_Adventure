import React from 'react';
import { DEFAULT_FONT_CONFIG, FontConfig } from './General';

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string = '#ffffff',
  config: FontConfig = DEFAULT_FONT_CONFIG
) {
  ctx.fillStyle = color;
  ctx.font = `${config.weight} ${config.fontSize} ${config.fontFamily}`;
  ctx.fillText(text, x, y);
}

export const RendererText: React.FC = () => {
  return null;
};
