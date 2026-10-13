/**
 * System/Registry/Characters/Templates/Movement/Gallop/400ms/index.tsx
 * Standard 1-2-3 Gallop Rhythm (400ms total cycle).
 * Used by: Abigay Rose Kone, Anninne-Amelia Rose Julisus.
 */

export const Gallop400ms = {
  name: 'Standard Gallop (400ms)',
  rhythm: [0, 133, 266],
  timings: {
    total: 400,
    step1: 0,
    step2: 133,
    step3: 266
  },
  execute: (playStep: (pitch: number) => void) => {
    // Step 1
    playStep(1.0);
    
    // Step 2
    setTimeout(() => playStep(0.9), 133);
    
    // Step 3
    setTimeout(() => playStep(1.1), 266);
  }
};
