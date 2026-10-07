import { RED_EMERALD_DOOR_DESCRIPTION } from './Description';
import { RED_EMERALD_DOOR_DIMENSIONS } from './Description/Dimensions';
import { drawRedEmeraldPane } from './Animations';
import { RedEmeraldSoundSynthesizer } from './Sound/Synthesizer';

/**
 * Red Emerald-and-Gold Decorated Sliding Door Building Block
 * Highly crafted modular system representation to eliminate hardcoding.
 */
export const RedEmeraldSlidingDoor = {
  description: RED_EMERALD_DOOR_DESCRIPTION,
  dimensions: RED_EMERALD_DOOR_DIMENSIONS,
  drawPane: drawRedEmeraldPane,
  sound: RedEmeraldSoundSynthesizer,
  
  getMetrics: () => RED_EMERALD_DOOR_DIMENSIONS,
  
  // Pocket door calculation: Panel shifts by its full width into the wall
  getPanelOffset: (progress: number) => {
    return RED_EMERALD_DOOR_DIMENSIONS.panelWidth * progress;
  }
};

export default RedEmeraldSlidingDoor;
