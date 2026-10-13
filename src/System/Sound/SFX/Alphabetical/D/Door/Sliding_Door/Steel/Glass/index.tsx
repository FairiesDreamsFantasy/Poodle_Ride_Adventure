import { playSlidingDoorOpenSound } from '../../Open';
import { playSlidingDoorCloseSound } from '../../Close';

export const playSteelGlassDoorOpen = (ctx?: AudioContext | null) =>
  playSlidingDoorOpenSound(ctx, { material: 'Steel_Glass' });

export const playSteelGlassDoorClose = (ctx?: AudioContext | null) =>
  playSlidingDoorCloseSound(ctx, { material: 'Steel_Glass' });

export default {
  open: playSteelGlassDoorOpen,
  close: playSteelGlassDoorClose,
};
