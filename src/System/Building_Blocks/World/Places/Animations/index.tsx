export interface PlaceAnimationState {
  bannerWave: number;
}

/**
 * Calculates animations for landmark heraldry, banners, and decor.
 */
export function calculatePlaceAnimation(timestamp: number): PlaceAnimationState {
  const t = timestamp / 1000;
  return {
    bannerWave: Math.sin(t * 1.8) * 5
  };
}
