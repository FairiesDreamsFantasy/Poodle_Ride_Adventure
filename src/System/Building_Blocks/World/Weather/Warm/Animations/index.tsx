export interface WarmAnimationState {
  glowFactor: number;
}

/**
 * Calculates warm animation parameters.
 */
export function calculateWarmAnimation(timestamp: number): WarmAnimationState {
  return {
    glowFactor: 0.9 + 0.1 * Math.sin(timestamp / 3000)
  };
}
