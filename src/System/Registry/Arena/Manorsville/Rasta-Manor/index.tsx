/**
 * Rasta-Manor Registry
 * Comprehensive registry for Level 0's primary location.
 */

import { FirstFloorRegistry } from './1st_Floor';
import { MezzanineForFirstFloorRegistry } from './Mezzanine_For_1st_Floor';
import { CellarRegistry } from './Cellar';
import { RampsAndStairsRegistry } from './Ramps_and_Stairs';

export const RastaManorRegistry = {
  floors: {
    firstFloor: FirstFloorRegistry,
    mezzanineForFirstFloor: MezzanineForFirstFloorRegistry,
    cellar: CellarRegistry,
  },
  rampsAndStairs: RampsAndStairsRegistry,
  areas: {
    foyer: 'Foyer',
    frontPorch: 'Front_Porch',
    garden: 'Garden',
    backPorch: 'Back_Porch',
  },
  animations: 'Animations',
  description: 'Description',
};

