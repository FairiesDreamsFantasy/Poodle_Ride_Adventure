export interface ColdAnimationState {
  frostFactor: number;
}

/**
 * Calculates cold animation parameters.
 */
export function calculateColdAnimation(timestamp: number): ColdAnimationState {
  return {
    frostFactor: 0.8 + 0.2 * Math.cos(timestamp / 4000)
  };
}
