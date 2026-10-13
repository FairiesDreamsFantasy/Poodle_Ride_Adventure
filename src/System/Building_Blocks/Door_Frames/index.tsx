import { DOOR_FRAME_METRICS } from './General';

/**
 * Door Frames Building Block
 * Manages the structural framing of doors.
 */
export const DoorFrames = {
  getMetrics: () => DOOR_FRAME_METRICS,
  
  getMaterialDescription: (index: number = 0) => {
    return DOOR_FRAME_METRICS.materials[index] || DOOR_FRAME_METRICS.materials[0];
  }
};
