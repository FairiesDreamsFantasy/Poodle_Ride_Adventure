import React from 'react';
import { DEFAULT_TEXTURE_CONFIG, TextureConfig } from './General';

export function drawNoiseTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: TextureConfig = DEFAULT_TEXTURE_CONFIG
) {
  const prevComposite = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = config.blendMode;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const val = Math.floor(Math.random() * 255);
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    data[i + 3] = Math.floor(config.opacity * 255);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const pCtx = canvas.getContext('2d');
  if (pCtx) {
    pCtx.putImageData(imgData, 0, 0);
    ctx.drawImage(canvas, 0, 0);
  }

  ctx.globalCompositeOperation = prevComposite;
}

export const TexturePalette: React.FC = () => {
  return null;
};
