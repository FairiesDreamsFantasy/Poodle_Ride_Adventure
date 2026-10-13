export interface CityPartAnimationState {
  lampGlowRadius: number;
  windmillRotationAngle: number;
}

/**
 * Calculates animations for dynamic city components like street lamps and windmills.
 */
export function calculateCityPartAnimation(timestamp: number): CityPartAnimationState {
  const t = timestamp / 1000;
  return {
    lampGlowRadius: 45 + 10 * Math.sin(t * 4),
    windmillRotationAngle: (t * 60) % 360
  };
}
