import { FoyerRegistry } from './Foyer';
import { SimulatedGardenAreaRegistry } from './Simulated_Garden_Area';
import { BackPorchRegistry } from './Back_Porch';

/**
 * 1st Floor Registry
 */
export const FirstFloorRegistry = {
  foyer: FoyerRegistry,
  simulatedGardenArea: SimulatedGardenAreaRegistry,
  backPorch: BackPorchRegistry,
};

