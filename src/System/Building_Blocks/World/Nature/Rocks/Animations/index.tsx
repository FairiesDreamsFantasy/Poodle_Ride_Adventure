export interface RocksAnimationState {
  vibration: number;
}

/**
 * Calculates rock vibration animations (e.g. during seismic events).
 */
export function calculateRocksAnimation(timestamp: number): RocksAnimationState {
  return {
    vibration: 0
  };
}
