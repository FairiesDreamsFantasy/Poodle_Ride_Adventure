import { CentralGlassAnimationsRegistry } from './Animations';
import { CentralGlassDescriptionRegistry } from './Description';
import { CentralGlassNorthRegistry } from './North';
import { CentralGlassEastRegistry } from './East';
import { CentralGlassSouthRegistry } from './South';
import { CentralGlassWestRegistry } from './West';

/**
 * Sky Foyer Central Glass and Brass Barrier Registry
 */
export const CentralGlassAndBrassBarrierRegistry = {
  id: 'Central_Glass_And_Brass_Barrier',
  name: 'Central Glass & Brass Barrier',
  animations: CentralGlassAnimationsRegistry,
  description: CentralGlassDescriptionRegistry,
  north: CentralGlassNorthRegistry,
  east: CentralGlassEastRegistry,
  south: CentralGlassSouthRegistry,
  west: CentralGlassWestRegistry,
};

export default CentralGlassAndBrassBarrierRegistry;
