export interface RainAnimationState {
  intensity: number;
  dropOffset: number;
}

/**
 * Calculates rain animation parameters.
 */
export function calculateRainAnimation(timestamp: number): RainAnimationState {
  return {
    intensity: 1.0,
    dropOffset: (timestamp / 2) % 1000
  };
}
