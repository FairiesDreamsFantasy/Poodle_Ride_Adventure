/**
 * System/AI/In-Game/Category/Visuals/Animations/Color_Palette/Monochrome/index.tsx
 */

export * from '@/src/System/AI/In-Game/Category/Visuals/Animations/Color_Palette/Monochrome/Grayscale/index.tsx';

export const formulateBinarization = (threshold: number) => {
  return { threshold, mode: '1-Bit' };
};
