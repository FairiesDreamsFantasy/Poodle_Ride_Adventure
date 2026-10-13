import { REGISTERED_SKY_FOYER_DESCRIPTION } from './Description';
import { SkyFoyerWallsRegistry } from './Walls';

/**
 * Sky Foyer Mezzanine Level Registry
 */
export const SkyFoyerRegistry = {
  id: 'Sky_Foyer',
  name: 'Sky Foyer Mezzanine',
  metadata: REGISTERED_SKY_FOYER_DESCRIPTION,
  walls: SkyFoyerWallsRegistry,
};


export default SkyFoyerRegistry;
