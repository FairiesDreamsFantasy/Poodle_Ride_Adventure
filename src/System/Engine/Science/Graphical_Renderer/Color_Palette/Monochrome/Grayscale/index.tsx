import React from 'react';
import { DEFAULT_GRAYSCALE_CONFIG, GrayscaleConfig } from './General';

export function applyGrayscaleFilter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  config: GrayscaleConfig = DEFAULT_GRAYSCALE_CONFIG
) {
  try {
    const imgData = ctx.getImageData(x, y, width, height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray = config.useLuma 
        ? (0.299 * r + 0.587 * g + 0.114 * b)
        : ((r + g + b) / 3);

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    ctx.putImageData(imgData, x, y);
  } catch (err) {
    console.warn("Grayscale filter bypassed due to canvas bounds.");
  }
}

export const GrayscalePalette: React.FC = () => {
  return null;
};
