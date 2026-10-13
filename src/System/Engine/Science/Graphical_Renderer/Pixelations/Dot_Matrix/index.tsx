import React from 'react';
import { DEFAULT_DOT_MATRIX_CONFIG, DotMatrixConfig } from './General';

export function applyDotMatrix(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  config: DotMatrixConfig = DEFAULT_DOT_MATRIX_CONFIG
) {
  const { dotSize, spacing } = config;
  try {
    const imgData = ctx.getImageData(x, y, width, height);
    const data = imgData.data;

    // Clear background to a dark tone first, or overlay dots
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(x, y, width, height);

    for (let r = 0; r < height; r += spacing) {
      for (let c = 0; c < width; c += spacing) {
        const index = (r * width + c) * 4;
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const alpha = data[index + 3];

        if (alpha > 50) {
          ctx.beginPath();
          ctx.arc(x + c, y + r, dotSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
          ctx.fill();
        }
      }
    }
  } catch (err) {
    console.warn("Dot matrix effect bypassed due to canvas bounds.");
  }
}

export const RendererDotMatrix: React.FC = () => {
  return null;
};
