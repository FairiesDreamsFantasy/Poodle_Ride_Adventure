import { SkyFoyerNorthWallRegistry } from './North';
import { SkyFoyerSouthWallRegistry } from './South';
import { SkyFoyerEastWallRegistry } from './East';
import { SkyFoyerWestWallRegistry } from './West';

/**
 * Sky Foyer Walls Registry Bundle
 */
export const SkyFoyerWallsRegistry = {
  north: SkyFoyerNorthWallRegistry,
  south: SkyFoyerSouthWallRegistry,
  east: SkyFoyerEastWallRegistry,
  west: SkyFoyerWestWallRegistry,
};

export default SkyFoyerWallsRegistry;
