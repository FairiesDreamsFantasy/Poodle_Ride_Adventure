import { SoundContext } from '../../../../../../../SoundContext';
import { playBlueDoorOpenAction } from './Open';
import { playBlueDoorCloseAction } from './Close';

/**
 * Blue Door (Foyer <-> Front Porch)
 * Material: Steel & Glass
 * Volume: 25% louder than poodle's elegant bark + 15% increase + 10% tune-up (0.5125 * 1.25 * 1.15 * 1.1 = 0.810390625)
 */
export const playBlueDoorOpen = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playBlueDoorOpenAction(context, x, y, z);
};

/**
 * Volume: 25% louder than poodle's elegant bark + 15% increase + 10% tune-up (0.5125 * 1.25 * 1.15 * 1.1 = 0.810390625)
 */
export const playBlueDoorClose = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playBlueDoorCloseAction(context, x, y, z);
};
