/**
 * System/AI/In-Game/Category/Visuals/Animations/Color_Palette/Monochrome/Grayscale/index.tsx
 */

export const formulateGrayscaleLuminance = (r: number, g: number, b: number) => {
  return 0.299 * r + 0.587 * g + 0.114 * b;
};
