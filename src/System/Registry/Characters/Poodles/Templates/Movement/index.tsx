import { Gallop400ms } from './Gallop/400ms';
import { Gallop300ms } from './Gallop/300ms';
import { StandardWalk } from './Walk';
import { SlowWalk } from './Walk/Slow';
import { VerySlowWalk } from './Walk/Very_Slow';
import { Canter } from './Canter';
import { Trot } from './Trot';
import { Jump } from './Jump';

/**
 * System/Registry/Characters/Templates/Movement/index.tsx
 * Modular movement system registry.
 * Decouples hard-coded rhythms from specific characters.
 */

export const MovementTemplates = {
  Gallop: {
    ms400: Gallop400ms,
    ms300: Gallop300ms
  },
  Walk: {
    Standard: StandardWalk,
    Slow: SlowWalk,
    VerySlow: VerySlowWalk
  },
  Canter,
  Trot,
  Jump
};

export { 
  Gallop400ms, 
  Gallop300ms, 
  StandardWalk, 
  SlowWalk, 
  VerySlowWalk, 
  Canter, 
  Trot, 
  Jump 
};
