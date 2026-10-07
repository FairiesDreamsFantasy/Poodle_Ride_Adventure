import { MezzanineBarrierAnimationsRegistry } from './Animations';
import { RampBarrierRegistry } from './Ramp_Barrier';

/**
 * Mezzanine Level Barrier Registry
 */
export const MezzanineBarrierRegistry = {
  id: 'Mezzanine_Barrier_System',
  name: 'Mezzanine Barrier System',
  animations: MezzanineBarrierAnimationsRegistry,
  rampBarrier: RampBarrierRegistry,
};

export default MezzanineBarrierRegistry;
