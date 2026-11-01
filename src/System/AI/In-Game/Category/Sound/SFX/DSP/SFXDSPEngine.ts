/**
 * System/AI/In-Game/Category/Sound/SFX/DSP/SFXDSPEngine.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Sound Effects (SFX) Digital Signal Processing (DSP) Engine.
 * 
 * Handles:
 * 1. Pitch-scale frequency modulation for authentic character barks.
 * 2. 2D/3D spatial audio panner positioning (Listener coordinates, source distance falloff).
 * 3. Echo reflection delay calculation matching native character acoustic delays:
 *    - Abigay, Dymond, Abigail: 150ms / 300ms
 *    - Anninne-Amelia: 120ms / 250ms
 * 4. Petting sound amplification (+4% for Abigay, Anninne-Amelia, Dymond; +5% for Abigail).
 */

export interface SpatialPannerCoords {
  sourceX: number;
  sourceY: number;
  listenerX: number;
  listenerY: number;
}

/**
 * Calculates 2D spatial pan (-1.0 left to +1.0 right) based on relative source and listener coordinates.
 */
export function calculateSpatialPan2D(coords: SpatialPannerCoords): number {
  const dx = coords.sourceX - coords.listenerX;
  const maxRange = 500; // max spatial audio field radius
  const pan = dx / maxRange;
  return Number(Math.max(-1.0, Math.min(1.0, pan)).toFixed(3));
}

/**
 * Calculates distance-based volume attenuation factor using inverse-distance model.
 */
export function calculateDistanceAttenuation(coords: SpatialPannerCoords, maxDistance: number = 600): number {
  const dx = coords.sourceX - coords.listenerX;
  const dy = coords.sourceY - coords.listenerY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist >= maxDistance) return 0.0;
  return Number((1.0 - dist / maxDistance).toFixed(3));
}

/**
 * Calculates character-specific petting gain multiplier enforcing craftsmanship invariants.
 */
export function getPettingGainMultiplier(ridingAnimal: string): number {
  if (ridingAnimal === 'Abigail Marigold Kenyatta') {
    return 1.05; // Amplified 5% louder for Abigail
  }
  return 1.04; // Amplified 4% louder for Abigay, Anninne-Amelia, and Dymond
}

/**
 * Calculates character-specific acoustic echo delay timings in milliseconds.
 */
export function getCharacterEchoDelays(ridingAnimal: string): { primaryDelayMs: number; secondaryDelayMs: number } {
  if (ridingAnimal === 'Anninne-Amelia Rose Julisus') {
    return { primaryDelayMs: 120, secondaryDelayMs: 250 };
  }
  return { primaryDelayMs: 150, secondaryDelayMs: 300 }; // Standard for Abigay, Dymond, Abigail
}
