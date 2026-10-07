/**
 * MovementPowerhouse.ts
 * Centralized movement constants and rhythm logic for Abigay Rose Kone.
 * [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
 */

export interface GallopRhythm {
  beats: number[]; // relative timing of beats in a cycle
  cycleLength: number; // total units for one full cycle
}

/**
 * Iconic 1-2-3 gallop rhythm pattern (400ms rhythm)
 */
export const GALLOP_INTERVAL_MS = 400;

/**
 * Scientific Gallop Rhythm (3-beat gait)
 * Beat 1: Lead leg
 * Beat 2: Opposite hind and lead front
 * Beat 3: Opposite front
 * Followed by a period of suspension.
 */
export const CLASSIC_GALLOP: GallopRhythm = {
  beats: [0, 0.6, 0.9], // 1... 2-3...
  cycleLength: 3.0 // Distance units for one full gallop cycle
};

export const MODERN_GALLOP: GallopRhythm = {
  beats: [0, 0.8, 1.2], // Slightly slower/longer gait for modern mode
  cycleLength: 4.0
};

export const getGallopRhythm = (isClassicMode: boolean): GallopRhythm => {
  return isClassicMode ? CLASSIC_GALLOP : MODERN_GALLOP;
};
