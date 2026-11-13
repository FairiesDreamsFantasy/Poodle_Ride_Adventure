export * from '@/src/Arena/Manorsville/Rasta-Manor/1st_Floor/Simulated_Garden_Area/Description';
export * from '@/src/Arena/Manorsville/Rasta-Manor/1st_Floor/Simulated_Garden_Area/Animations';
export * from '@/src/Arena/Manorsville/Rasta-Manor/1st_Floor/Simulated_Garden_Area/Wall';

import { SIMULATED_GARDEN_AREA_DESCRIPTION } from '@/src/Arena/Manorsville/Rasta-Manor/1st_Floor/Simulated_Garden_Area/Description';
import { SimulatedGardenWallRegistry } from '@/src/Arena/Manorsville/Rasta-Manor/1st_Floor/Simulated_Garden_Area/Wall';

export const SimulatedGardenArea = {
  ...SIMULATED_GARDEN_AREA_DESCRIPTION,
  walls: SimulatedGardenWallRegistry
};
