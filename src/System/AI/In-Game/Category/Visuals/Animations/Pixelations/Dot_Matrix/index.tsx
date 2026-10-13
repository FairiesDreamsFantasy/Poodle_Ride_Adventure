/**
 * System/AI/In-Game/Category/Visuals/Animations/Pixelations/Dot_Matrix/index.tsx
 */

export const formulateDotMatrixPattern = (intensity: number) => {
  return {
    spacing: 1.5 * intensity,
    decay: 0.1 * intensity,
    phosphorColor: '#00ff00'
  };
};
