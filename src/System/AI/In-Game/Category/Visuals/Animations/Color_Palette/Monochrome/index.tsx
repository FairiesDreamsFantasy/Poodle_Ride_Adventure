/**
 * System/AI/In-Game/Category/Visuals/Animations/Color_Palette/Monochrome/index.tsx
 */

export * from './Grayscale/index.tsx';

export const formulateBinarization = (threshold: number) => {
  return { threshold, mode: '1-Bit' };
};
