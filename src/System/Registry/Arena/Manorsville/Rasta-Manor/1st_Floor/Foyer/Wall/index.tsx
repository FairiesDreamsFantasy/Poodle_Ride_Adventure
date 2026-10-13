import { FoyerNorthWallRegistry } from './North';
import { FoyerSouthWallRegistry } from './South';
import { FoyerEastWallRegistry } from './East';
import { FoyerWestWallRegistry } from './West';

/**
 * Foyer Walls Registry Bundle
 */
export const FoyerWallsRegistry = {
  north: FoyerNorthWallRegistry,
  south: FoyerSouthWallRegistry,
  east: FoyerEastWallRegistry,
  west: FoyerWestWallRegistry,
};

export default FoyerWallsRegistry;
