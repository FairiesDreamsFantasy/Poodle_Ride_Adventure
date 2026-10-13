import { WINDOW_FRAME_METRICS } from './General';

/**
 * Window Frames Building Block
 * Manages the structural framing of windows.
 */
export const WindowFrames = {
  getMetrics: () => WINDOW_FRAME_METRICS,
  
  getSillDescription: () => {
    return `A window sill positioned at ${WINDOW_FRAME_METRICS.sillHeight}cm from the floor level.`;
  }
};
