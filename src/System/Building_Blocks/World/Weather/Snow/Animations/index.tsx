export interface SnowAnimationState {
  driftX: number;
  fallY: number;
}

/**
 * Calculates snow animation parameters.
 */
export function calculateSnowAnimation(timestamp: number): SnowAnimationState {
  return {
    driftX: Math.sin(timestamp / 1000) * 10,
    fallY: (timestamp / 5) % 800
  };
}
