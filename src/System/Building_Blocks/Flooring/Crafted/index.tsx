import { CRAFTED_FLOORING_METRICS } from './General';

/**
 * Crafted Flooring Building Block
 * Manages specialized flooring types.
 */
export const CraftedFlooring = {
  getMetrics: () => CRAFTED_FLOORING_METRICS,
  
  getFinish: (index: number = 0) => {
    return CRAFTED_FLOORING_METRICS.finishes[index] || CRAFTED_FLOORING_METRICS.finishes[0];
  }
};
