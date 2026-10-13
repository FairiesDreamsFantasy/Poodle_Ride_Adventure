export interface HotAnimationState {
  heatHazeIntensity: number;
}

/**
 * Calculates hot animation parameters.
 */
export function calculateHotAnimation(timestamp: number): HotAnimationState {
  return {
    heatHazeIntensity: 0.8 + 0.4 * Math.sin(timestamp / 500)
  };
}
