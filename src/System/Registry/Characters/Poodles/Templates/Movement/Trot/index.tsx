/**
 * System/Registry/Characters/Templates/Movement/Trot/index.tsx
 * Standard 2-step Trot Rhythm.
 */

export const Trot = {
  name: 'Standard Trot',
  rhythm: [0, 300],
  execute: (playStep: (pitch: number) => void) => {
    playStep(1.0);
    setTimeout(() => playStep(1.05), 300);
  }
};
