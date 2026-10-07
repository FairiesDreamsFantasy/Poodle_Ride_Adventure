import { playSlidingDoorOpenSound } from '../Open';
import { playSlidingDoorCloseSound } from '../Close';

export const playAluminumAlloyDoorOpen = (ctx?: AudioContext | null) =>
  playSlidingDoorOpenSound(ctx, { material: 'Aluminum_Alloy' });

export const playAluminumAlloyDoorClose = (ctx?: AudioContext | null) =>
  playSlidingDoorCloseSound(ctx, { material: 'Aluminum_Alloy' });

export default {
  open: playAluminumAlloyDoorOpen,
  close: playAluminumAlloyDoorClose,
};
