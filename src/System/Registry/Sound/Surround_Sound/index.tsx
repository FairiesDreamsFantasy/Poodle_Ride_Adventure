import { SurroundSpatializer, QuadraphonicMixer, SurroundChannel } from '../../../Sound/Surround_Sound/SurroundSystem';
import { playSurroundSoundTest } from '../../../Sound/Surround_Sound/SpeakerTest';

/**
 * Surround Sound System Registry
 */
export const SurroundRegistry = {
  Spatializer: SurroundSpatializer,
  QuadMixer: QuadraphonicMixer,
  Test: playSurroundSoundTest,
  Channels: SurroundChannel,
};

export { SurroundSpatializer, QuadraphonicMixer, SurroundChannel, playSurroundSoundTest };
