export * from './Tiles';
export * from './Carpet';
export * from './Hardwood';
export * from './Rugs';

import { TILES } from './Tiles';
import { CARPETS } from './Carpet';
import { HARDWOOD_FLOORS } from './Hardwood';
import { RUGS } from './Rugs';

export const FLOORING_REGISTRY = {
  tiles: TILES,
  carpets: CARPETS,
  hardwood: HARDWOOD_FLOORS,
  rugs: RUGS
};
