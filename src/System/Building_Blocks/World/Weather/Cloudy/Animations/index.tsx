export interface CloudyAnimationState {
  cloudDensity: number;
}

/**
 * Calculates cloudy animation parameters.
 */
export function calculateCloudyAnimation(timestamp: number): CloudyAnimationState {
  return {
    cloudDensity: 0.7 + 0.1 * Math.sin(timestamp / 5000)
  };
}
