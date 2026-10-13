export interface SkyAnimationState {
  sunMoonX: number;
  sunMoonY: number;
  starTwinkleIntensity: number;
}

/**
 * Calculates smooth orbital trajectories for celestial bodies (sun/moon) and star twinkling.
 */
export function calculateSkyAnimation(timestamp: number, width: number = 800): SkyAnimationState {
  const t = timestamp / 1000;
  const cycle = (t * 0.05) % (Math.PI * 2);
  return {
    sunMoonX: (width / 2) + Math.cos(cycle) * (width * 0.4),
    sunMoonY: 150 - Math.sin(cycle) * 100,
    starTwinkleIntensity: 0.7 + 0.3 * Math.sin(t * 5)
  };
}
