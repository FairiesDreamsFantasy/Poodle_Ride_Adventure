export * from '../Dot_Matrix/index.tsx';
import { PixelBlockConfig, DEFAULT_PIXEL_BLOCK } from '../../../../../../../Registry/AI/Visuals/Animations/Pixelations/General/index.tsx';

/**
 * Quantizes continuous coordinate (x, y) into a discrete pixelation block coordinate
 */
export function quantizePixelBlock(
  x: number,
  y: number,
  config: PixelBlockConfig = DEFAULT_PIXEL_BLOCK
): { blockX: number; blockY: number; renderX: number; renderY: number; width: number; height: number } {
  const blockW = Math.max(1, Math.round(config.blockSize));
  const blockH = Math.max(1, Math.round(config.blockSize * config.aspectRatio));

  const blockX = Math.floor(x / blockW);
  const blockY = Math.floor(y / blockH);

  return {
    blockX,
    blockY,
    renderX: blockX * blockW,
    renderY: blockY * blockH,
    width: blockW,
    height: blockH,
  };
}

export { DEFAULT_PIXEL_BLOCK };
