export interface MildAnimationState {
  calmFactor: number;
}

/**
 * Calculates mild animation parameters.
 */
export function calculateMildAnimation(timestamp: number): MildAnimationState {
  return {
    calmFactor: 1.0
  };
}
