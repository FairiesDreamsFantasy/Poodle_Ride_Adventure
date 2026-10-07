export interface CeilingAnimationState {
  pulseFactor: number;
  rotationOffset: number;
  lightIntensity: number;
}

/**
 * Calculates current animation parameters based on elapsed timestamp.
 * Standardizes time-keeping calculations using high-precision trigonometric formulas.
 */
export function calculateCeilingAnimation(
  timestamp: number,
  speedMultiplier: number = 1.0
): CeilingAnimationState {
  const timeSec = (timestamp / 1000) * speedMultiplier;

  // Pulsating cosmic factor oscillating between 0.6 and 1.0
  const pulseFactor = 0.8 + 0.2 * Math.sin(timeSec * 2.5);

  // Slow orbital rotation factor (0 to 360 degrees)
  const rotationOffset = (timeSec * 0.05 * 180 / Math.PI) % 360;

  // Light flicker intensity for lamps/chandeliers
  const lightIntensity = 0.95 + 0.05 * Math.sin(timeSec * 15) * Math.cos(timeSec * 7);

  return {
    pulseFactor,
    rotationOffset,
    lightIntensity
  };
}
