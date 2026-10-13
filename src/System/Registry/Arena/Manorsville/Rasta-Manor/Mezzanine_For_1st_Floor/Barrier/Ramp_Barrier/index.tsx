import { GlassDecorativeRhinoPictureRegistry } from './Glass_Decorative_Rhino_Picture';
import { ClearGlassBarrierRegistry } from './Clear_Glass_Barrier';

/**
 * Ramp Barrier Registry (Mezzanine for 1st Floor)
 */
export const RampBarrierRegistry = {
  id: 'Ramp_Barrier_Registry',
  name: 'Ramp Barrier',
  rhinoPicture: GlassDecorativeRhinoPictureRegistry,
  clearGlass: ClearGlassBarrierRegistry,
};

export default RampBarrierRegistry;
