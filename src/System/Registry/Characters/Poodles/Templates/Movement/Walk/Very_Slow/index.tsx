/**
 * System/Registry/Characters/Templates/Movement/Walk/Very_Slow/index.tsx
 * Very Slow Nyhabinghi Walk Rhythm.
 */

export const VerySlowWalk = {
  name: 'Very Slow Nyhabinghi Walk',
  rhythm: [0, 500],
  execute: (playStep: (pitch: number) => void) => {
    playStep(0.8);
    setTimeout(() => playStep(0.75), 500);
  }
};
