export interface PlantsAnimationState {
  swayAngle: number;
}

/**
 * Calculates plant swaying animations.
 */
export function calculatePlantsAnimation(timestamp: number): PlantsAnimationState {
  return {
    swayAngle: Math.sin(timestamp / 1000) * 5
  };
}
