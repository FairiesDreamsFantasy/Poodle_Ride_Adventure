import React from 'react';
import { GREEN_MONO_CONFIG, MonochromeConfig } from './General';

export function applyMonochromeTint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  config: MonochromeConfig = GREEN_MONO_CONFIG
) {
  try {
    const imgData = ctx.getImageData(x, y, width, height);
    const data = imgData.data;

    // Convert config tint to RGB
    const tintR = parseInt(config.tintColor.slice(1, 3), 16);
    const tintG = parseInt(config.tintColor.slice(3, 5), 16);
    const tintB = parseInt(config.tintColor.slice(5, 7), 16);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Standard luminance
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;

      // Mix luminance with tint color based on contrast
      data[i] = Math.min(255, (luma * tintR / 255) * config.contrast);
      data[i + 1] = Math.min(255, (luma * tintG / 255) * config.contrast);
      data[i + 2] = Math.min(255, (luma * tintB / 255) * config.contrast);
    }

    ctx.putImageData(imgData, x, y);
  } catch (err) {
    console.warn("Monochrome filter bypassed due to canvas security/CORS bounds.");
  }
}

export const MonochromePalette: React.FC = () => {
  return null;
};
