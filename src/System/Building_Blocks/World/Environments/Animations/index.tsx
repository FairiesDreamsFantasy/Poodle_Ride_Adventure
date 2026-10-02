export interface EnvironmentAnimationState {
  leafSwayOffset: number;
  ambientLightPulse: number;
}

/**
 * Calculates environmental foliage sway and light intensity pulses.
 */
export function calculateEnvironmentAnimation(timestamp: number): EnvironmentAnimationState {
  const t = timestamp / 1000;
  return {
    leafSwayOffset: Math.sin(t * 1.5) * 4,
    ambientLightPulse: 0.98 + 0.02 * Math.cos(t * 0.8)
  };
}
