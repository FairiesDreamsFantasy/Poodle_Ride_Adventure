export interface FoggyAnimationState {
  density: number;
}

/**
 * Calculates foggy animation parameters.
 */
export function calculateFoggyAnimation(timestamp: number): FoggyAnimationState {
  return {
    density: 0.4 + 0.1 * Math.sin(timestamp / 3000)
  };
}
