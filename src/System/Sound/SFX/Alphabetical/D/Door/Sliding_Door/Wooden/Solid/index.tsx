import { playSlidingDoorOpenSound } from '../../Open';
import { playSlidingDoorCloseSound } from '../../Close';

export const playWoodenSolidDoorOpen = (ctx?: AudioContext | null) =>
  playSlidingDoorOpenSound(ctx, { material: 'Wooden_Solid' });

export const playWoodenSolidDoorClose = (ctx?: AudioContext | null) =>
  playSlidingDoorCloseSound(ctx, { material: 'Wooden_Solid' });

export default {
  open: playWoodenSolidDoorOpen,
  close: playWoodenSolidDoorClose,
};
