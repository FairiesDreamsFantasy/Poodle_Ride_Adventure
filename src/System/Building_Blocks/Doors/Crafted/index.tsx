export * from './Rainbow_Sliding_Doors';
export * from './Blue_Sliding_Doors';
export * from './Simulated_Garden_Sliding_Doors';

import RainbowSlidingDoors from './Rainbow_Sliding_Doors';
import BlueSlidingDoors from './Blue_Sliding_Doors';
import SimulatedGardenSlidingDoors from './Simulated_Garden_Sliding_Doors';

export { default as RainbowSlidingDoors } from './Rainbow_Sliding_Doors';
export { default as BlueSlidingDoors } from './Blue_Sliding_Doors';
export { default as SimulatedGardenSlidingDoors } from './Simulated_Garden_Sliding_Doors';

export const CraftedDoors = {
  RainbowSlidingDoors,
  BlueSlidingDoors,
  SimulatedGardenSlidingDoors,
};

export default CraftedDoors;
