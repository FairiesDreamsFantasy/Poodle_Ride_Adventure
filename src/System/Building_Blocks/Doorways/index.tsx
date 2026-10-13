import { DOORWAY_METRICS } from './General';

/**
 * Doorways Building Block
 * Manages architectural openings.
 */
export const Doorways = {
  getStandardMetrics: () => DOORWAY_METRICS,
  
  getDescription: (type: string = 'Standard') => {
    return `A ${type} doorway measuring ${DOORWAY_METRICS.standardWidth}cm by ${DOORWAY_METRICS.standardHeight}cm.`;
  }
};
