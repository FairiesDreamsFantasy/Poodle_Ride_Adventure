import { playSlidingDoorOpenSound } from '../../Open';
import { playSlidingDoorCloseSound } from '../../Close';

export const playSteelSolidDoorOpen = (ctx?: AudioContext | null) =>
  playSlidingDoorOpenSound(ctx, { material: 'Steel_Solid' });

export const playSteelSolidDoorClose = (ctx?: AudioContext | null) =>
  playSlidingDoorCloseSound(ctx, { material: 'Steel_Solid' });

export default {
  open: playSteelSolidDoorOpen,
  close: playSteelSolidDoorClose,
};
