import { playSlidingDoorOpenSound } from '../Open';
import { playSlidingDoorCloseSound } from '../Close';

export const playWoodenDoorOpen = (ctx?: AudioContext | null) =>
  playSlidingDoorOpenSound(ctx, { material: 'Wooden' });

export const playWoodenDoorClose = (ctx?: AudioContext | null) =>
  playSlidingDoorCloseSound(ctx, { material: 'Wooden' });

export default {
  open: playWoodenDoorOpen,
  close: playWoodenDoorClose,
};
