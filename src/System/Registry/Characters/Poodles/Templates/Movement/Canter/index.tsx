/**
 * System/Registry/Characters/Templates/Movement/Canter/index.tsx
 * Standard 3-step Canter Rhythm.
 */

export const Canter = {
  name: 'Standard Canter',
  rhythm: [0, 200, 400],
  execute: (playStep: (pitch: number) => void) => {
    playStep(1.0);
    setTimeout(() => playStep(0.9), 200);
    setTimeout(() => playStep(1.1), 400);
  }
};
