export * from './Sliding_Doors';
export * from './Swinging_Door';
export * from './French_Doors';
export * from './Folding_Door';
export * from './Crafted';

import SlidingDoors from './Sliding_Doors';
import SwingingDoors from './Swinging_Door';
import FrenchDoors from './French_Doors';
import FoldingDoors from './Folding_Door';
import CraftedDoors from './Crafted';

export { default as SlidingDoors } from './Sliding_Doors';
export { default as SwingingDoors } from './Swinging_Door';
export { default as FrenchDoors } from './French_Doors';
export { default as FoldingDoors } from './Folding_Door';
export { default as CraftedDoors } from './Crafted';

export const DoorsPowerhouse = {
  SlidingDoors,
  SwingingDoors,
  FrenchDoors,
  FoldingDoors,
  CraftedDoors,
};

export default DoorsPowerhouse;
