export interface AnimalsAnimationState {
  hopFactor: number;
}

/**
 * Calculates animal movement animations.
 */
export function calculateAnimalsAnimation(timestamp: number): AnimalsAnimationState {
  return {
    hopFactor: Math.abs(Math.sin(timestamp / 500))
  };
}
