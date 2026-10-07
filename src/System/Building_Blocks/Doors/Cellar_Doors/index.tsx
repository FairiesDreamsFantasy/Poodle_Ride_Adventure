import { CELLAR_DOORS_METRICS } from './General';

/**
 * Cellar Doors Component
 * Handles the interaction and state of the cellar access points.
 */
export const CellarDoors = {
  getMetrics: () => CELLAR_DOORS_METRICS,
  
  isWithinProximity: (x: number, y: number) => {
    const { minX, maxX, minY, maxY } = CELLAR_DOORS_METRICS.coordinates;
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  },
  
  getInteractionMessage: () => {
    return "You are standing at the heavy reinforced steel cellar doors, located beneath the elevated sky foyer walkway.";
  }
};
