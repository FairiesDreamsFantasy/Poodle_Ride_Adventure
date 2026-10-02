/**
 * System/Registry/Characters/Templates/Movement/Walk/Slow/index.tsx
 * Slow Nyhabinghi Walk Rhythm.
 */

export const SlowWalk = {
  name: 'Slow Nyhabinghi Walk',
  rhythm: [0, 300],
  execute: (playStep: (pitch: number) => void) => {
    playStep(0.9);
    setTimeout(() => playStep(0.85), 300);
  }
};
