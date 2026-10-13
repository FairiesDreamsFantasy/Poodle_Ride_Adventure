export * from '../Dot_Matrix/index.tsx';

export interface PixelBlockConfig {
  blockSize: number;
  antiAliased: boolean;
  aspectRatio: number;
}

export const DEFAULT_PIXEL_BLOCK: Readonly<PixelBlockConfig> = Object.freeze({
  blockSize: 4,
  antiAliased: false,
  aspectRatio: 1.0,
});
