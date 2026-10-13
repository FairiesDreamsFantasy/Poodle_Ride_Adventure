export interface WindyAnimationState {
  velocity: number;
  gustFactor: number;
}

/**
 * Calculates windy animation parameters.
 */
export function calculateWindyAnimation(timestamp: number): WindyAnimationState {
  const t = timestamp / 1000;
  return {
    velocity: 15 + Math.sin(t) * 5,
    gustFactor: 1.0 + 0.5 * Math.max(0, Math.sin(t * 0.5))
  };
}
