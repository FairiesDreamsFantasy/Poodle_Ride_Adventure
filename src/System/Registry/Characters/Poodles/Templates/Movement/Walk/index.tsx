/**
 * System/Registry/Characters/Templates/Movement/Walk/index.tsx
 * Standard Nyhabinghi Walk Rhythm.
 */

export const StandardWalk = {
  name: 'Nyhabinghi Walk',
  rhythm: [0, 400],
  execute: (playStep: (pitch: number) => void) => {
    playStep(1.0);
    setTimeout(() => playStep(0.95), 400);
  }
};

export * from './Slow';
export * from './Very_Slow';
