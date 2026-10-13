import { MasterSystemDefaults, SystemDefaultsRegistry } from '../../../../../Registry/AI/In-Game/Category/System_Defaults';

/**
 * Formulates state packages and validates default invariants at runtime.
 */
export const formulateSystemDefaults = (): SystemDefaultsRegistry => {
  return MasterSystemDefaults;
};

/**
 * Formulates initial state for the sound engines based on current theme/time.
 */
export const formulateAudioDefaults = () => {
  return MasterSystemDefaults.audio;
};
