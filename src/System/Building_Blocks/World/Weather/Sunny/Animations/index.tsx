export interface SunnyAnimationState {
  glareIntensity: number;
}

/**
 * Calculates sunny animation parameters.
 */
export function calculateSunnyAnimation(timestamp: number): SunnyAnimationState {
  return {
    glareIntensity: 0.8 + 0.2 * Math.sin(timestamp / 2000)
  };
}
