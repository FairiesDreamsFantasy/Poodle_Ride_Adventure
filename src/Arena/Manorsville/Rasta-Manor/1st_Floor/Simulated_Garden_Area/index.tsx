export * from './Description';
export * from './Animations';
export * from './Wall';

import { SIMULATED_GARDEN_AREA_DESCRIPTION } from './Description';
import { SimulatedGardenWallRegistry } from './Wall';

export const SimulatedGardenArea = {
  ...SIMULATED_GARDEN_AREA_DESCRIPTION,
  walls: SimulatedGardenWallRegistry
};
