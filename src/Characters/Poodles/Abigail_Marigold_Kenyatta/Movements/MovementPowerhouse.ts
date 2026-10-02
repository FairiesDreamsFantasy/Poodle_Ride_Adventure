/**
 * Abigail Marigold Kenyatta: Movement Logic
 * Featuring the unique 1-2-3 (300ms) gallop rhythm.
 * [CRAFTSMANSHIP: Ally Character Preset]
 */

export const GALLOP_INTERVAL_MS = 300;

export interface GallopRhythm {
  beats: number[]; 
  cycleLength: number;
}

/**
 * Unique 300ms Gallop for Abigail Marigold Kenyatta
 */
export const ABIGAIL_GALLOP: GallopRhythm = {
  beats: [0, 0.45, 0.75], // Faster 1-2-3 pattern (300ms interval)
  cycleLength: 3.5
};

export function getAbigailGallopRhythm(): GallopRhythm {
  return ABIGAIL_GALLOP;
}
