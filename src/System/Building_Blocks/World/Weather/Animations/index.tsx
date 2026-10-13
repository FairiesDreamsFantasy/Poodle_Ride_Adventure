export interface WeatherAnimationState {
  precipitationYOffset: number;
  fogDensity: number;
}

/**
 * Calculates rain/snow fall offsets and fog density oscillation.
 */
export function calculateWeatherAnimation(timestamp: number): WeatherAnimationState {
  const t = timestamp / 1000;
  return {
    precipitationYOffset: (t * 300) % 600,
    fogDensity: 0.3 + 0.1 * Math.sin(t * 0.5)
  };
}
