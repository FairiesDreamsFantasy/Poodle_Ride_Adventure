import { PERIMETER_WALKWAY_METRICS } from './General';

/**
 * Perimeter Walkways Building Block
 */
export const PerimeterWalkways = {
  getMetrics: () => PERIMETER_WALKWAY_METRICS,
  
  isElevated: (z: number) => z >= PERIMETER_WALKWAY_METRICS.standardHeight
};
