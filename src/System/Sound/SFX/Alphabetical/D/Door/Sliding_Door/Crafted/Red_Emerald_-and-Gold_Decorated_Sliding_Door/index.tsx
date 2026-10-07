import { SoundContext } from '../../../../../../../SoundContext';
import { playRedEmeraldSlidingDoorOpenAction } from './Open';
import { playRedEmeraldSlidingDoorCloseAction } from './Close';

/**
 * Red Emerald-and-Gold Decorated Sliding Door
 * Material: Mahogany, Gold, Emeralds
 */
export const playRedEmeraldSlidingDoorOpen = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playRedEmeraldSlidingDoorOpenAction(context, x, y, z);
};

export const playRedEmeraldSlidingDoorClose = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  await playRedEmeraldSlidingDoorCloseAction(context, x, y, z);
};
