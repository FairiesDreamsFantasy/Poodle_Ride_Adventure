export interface CityAnimationState {
  trafficOffset: number;
  lightFlicker: number;
}

/**
 * Calculates high-performance city street and traffic light animations based on timestamp.
 */
export function calculateCityAnimation(timestamp: number, speed: number = 1.0): CityAnimationState {
  const t = (timestamp / 1000) * speed;
  return {
    trafficOffset: (t * 50) % 500,
    lightFlicker: 0.9 + 0.1 * Math.sin(t * 12)
  };
}
