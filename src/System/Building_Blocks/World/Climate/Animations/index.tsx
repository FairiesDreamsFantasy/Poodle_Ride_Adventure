export interface ClimateAnimationState {
  heatHazeOffset: number;
  humidityDrift: number;
}

/**
 * Calculates atmospheric climate thermal variations and humidity drifts over time.
 */
export function calculateClimateAnimation(timestamp: number): ClimateAnimationState {
  const t = timestamp / 1000;
  return {
    heatHazeOffset: Math.sin(t * 3) * 2,
    humidityDrift: Math.cos(t * 0.5) * 5
  };
}
