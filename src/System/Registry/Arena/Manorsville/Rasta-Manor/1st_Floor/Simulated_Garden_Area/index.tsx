export * from './Wall';

import { SimulatedGardenWallRegistry } from './Wall';

export const SimulatedGardenAreaRegistry = {
  id: 'Simulated_Garden_Area_Registry',
  name: 'Simulated Garden Area',
  walls: SimulatedGardenWallRegistry
};
