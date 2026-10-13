/**
 * System/Registry/Characters/Templates/Movement/Jump/index.tsx
 * Standard Jump Rhythm/Logic template.
 */

export const Jump = {
  name: 'Standard Jump',
  duration: 200,
  execute: (playJump: () => void) => {
    playJump();
  }
};
