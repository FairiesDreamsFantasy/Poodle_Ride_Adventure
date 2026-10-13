import React from 'react';
import { DEFAULT_PIXELATION_CONFIG, PixelationConfig } from './General';

export function applyPixelation(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  pixelSize: number = DEFAULT_PIXELATION_CONFIG.pixelSize
) {
  if (pixelSize <= 1) return;

  try {
    const imgData = ctx.getImageData(x, y, width, height);
    const data = imgData.data;

    for (let r = 0; r < height; r += pixelSize) {
      for (let c = 0; c < width; c += pixelSize) {
        // Find average color in block
        let redTotal = 0, greenTotal = 0, blueTotal = 0, alphaTotal = 0;
        let count = 0;

        for (let pr = 0; pr < pixelSize && r + pr < height; pr++) {
          for (let pc = 0; pc < pixelSize && c + pc < width; pc++) {
            const index = ((r + pr) * width + (c + pc)) * 4;
            redTotal += data[index];
            greenTotal += data[index + 1];
            blueTotal += data[index + 2];
            alphaTotal += data[index + 3];
            count++;
          }
        }

        const avgR = redTotal / count;
        const avgG = greenTotal / count;
        const avgB = blueTotal / count;
        const avgA = alphaTotal / count;

        // Apply back to the block
        for (let pr = 0; pr < pixelSize && r + pr < height; pr++) {
          for (let pc = 0; pc < pixelSize && c + pc < width; pc++) {
            const index = ((r + pr) * width + (c + pc)) * 4;
            data[index] = avgR;
            data[index + 1] = avgG;
            data[index + 2] = avgB;
            data[index + 3] = avgA;
          }
        }
      }
    }
    ctx.putImageData(imgData, x, y);
  } catch (err) {
    console.warn("Pixelation effect bypassed due to canvas security/CORS bounds.");
  }
}

export const RendererPixelations: React.FC = () => {
  return null;
};
