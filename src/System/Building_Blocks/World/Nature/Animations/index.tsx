export interface NatureAnimationState {
  windFlutter: number;
  waterRipplePhase: number;
}

/**
 * Calculates organic wind flutter and water ripple motion.
 */
export function calculateNatureAnimation(timestamp: number): NatureAnimationState {
  const t = timestamp / 1000;
  return {
    windFlutter: Math.sin(t * 2.2) * 3 + Math.cos(t * 1.1) * 1.5,
    waterRipplePhase: (t * 2) % (Math.PI * 2)
  };
}
