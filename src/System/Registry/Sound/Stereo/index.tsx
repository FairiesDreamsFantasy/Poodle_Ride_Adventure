import { createStereoPanner, StereophonicMixer } from '../../../Sound/Stereo';

/**
 * Stereophonic System Registry
 */
export const StereoRegistry = {
  createPanner: createStereoPanner,
  Mixer: StereophonicMixer,
};
