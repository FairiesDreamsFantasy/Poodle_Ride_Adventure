export interface WaterAnimationState {
  ripplePhase: number;
}

/**
 * Calculates water ripple animations.
 */
export function calculateWaterAnimation(timestamp: number): WaterAnimationState {
  return {
    ripplePhase: (timestamp / 500) % (Math.PI * 2)
  };
}
