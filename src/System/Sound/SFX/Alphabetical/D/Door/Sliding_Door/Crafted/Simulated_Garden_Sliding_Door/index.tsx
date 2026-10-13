import { SoundContext } from '../../../../../../../SoundContext';
import { playSimulatedGardenSlidingDoorOpenAction } from './Open';
import { playSimulatedGardenSlidingDoorCloseAction } from './Close';

/**
 * Simulated Garden Sliding Door
 * Material: Steel & Glass
 * Volume: 25% louder than poodle's elegant bark + 15% increase + 10% tune-up (0.5125 * 1.25 * 1.15 * 1.1 = 0.810390625)
 */
export const playSimulatedGardenSlidingDoorOpen = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playSimulatedGardenSlidingDoorOpenAction(context, x, y, z);
};

/**
 * Volume: 25% louder than poodle's elegant bark + 15% increase + 10% tune-up (0.5125 * 1.25 * 1.15 * 1.1 = 0.810390625)
 */
export const playSimulatedGardenSlidingDoorClose = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playSimulatedGardenSlidingDoorCloseAction(context, x, y, z);
};
