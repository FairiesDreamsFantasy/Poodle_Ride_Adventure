import { SoundContext } from '../../../../../../../SoundContext';
import { playRainbowGlassSlidingDoorOpenAction } from './Open';
import { playRainbowGlassSlidingDoorCloseAction } from './Close';

/**
 * Rainbow Glass Sliding Door
 * Material: Steel & Glass
 * Volume: 25% louder than poodle's elegant bark + 15% increase + 10% tune-up (0.5125 * 1.25 * 1.15 * 1.1 = 0.810390625)
 */
export const playRainbowGlassSlidingDoorOpen = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playRainbowGlassSlidingDoorOpenAction(context, x, y, z);
};

/**
 * Volume: 25% louder than poodle's elegant bark + 15% increase + 10% tune-up (0.5125 * 1.25 * 1.15 * 1.1 = 0.810390625)
 */
export const playRainbowGlassSlidingDoorClose = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playRainbowGlassSlidingDoorCloseAction(context, x, y, z);
};
