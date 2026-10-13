/**
 * System/Registry/Characters/Templates/Movement/Gallop/300ms/index.tsx
 * Standard 1-2-3 Gallop Rhythm (300ms total cycle).
 * Used by: Abigail Marigold Kenyatta.
 */

export const Gallop300ms = {
  name: 'Standard Gallop (300ms)',
  rhythm: [0, 100, 200],
  timings: {
    total: 300,
    step1: 0,
    step2: 100,
    step3: 200
  },
  execute: (playStep: (pitch: number) => void) => {
    // Step 1
    playStep(1.0);
    
    // Step 2
    setTimeout(() => playStep(0.9), 100);
    
    // Step 3
    setTimeout(() => playStep(1.1), 200);
  }
};
