import { playSlidingDoorOpenSound, SlidingDoorSoundOptions } from './Open';
import { playSlidingDoorCloseSound } from './Close';

export * from './Open';
export * from './Close';
export { default as SteelGlassDoorSFX } from './Steel/Glass';
export { default as SteelSolidDoorSFX } from './Steel/Solid';
export { default as WoodenSolidDoorSFX } from './Wooden/Solid';
export { default as WoodenDoorSFX } from './Wooden';
export { default as AluminumAlloyDoorSFX } from './Aluminum_Alloy';

export type DoorSoundOptions = SlidingDoorSoundOptions;

export const playSteelGlassDoorOpen = (ctx?: AudioContext | null) =>
  playSlidingDoorOpenSound(ctx, { material: 'Steel_Glass' });

export const playSteelGlassDoorClose = (ctx?: AudioContext | null) =>
  playSlidingDoorCloseSound(ctx, { material: 'Steel_Glass' });

export const playSteelSolidDoorOpen = (ctx?: AudioContext | null) =>
  playSlidingDoorOpenSound(ctx, { material: 'Steel_Solid' });

export const playSteelSolidDoorClose = (ctx?: AudioContext | null) =>
  playSlidingDoorCloseSound(ctx, { material: 'Steel_Solid' });

export const slidingDoorSynth = {
  playSlidingDoorSound: (options?: SlidingDoorSoundOptions) =>
    playSlidingDoorOpenSound(undefined, options),
  playOpen: playSlidingDoorOpenSound,
  playClose: playSlidingDoorCloseSound,
};

export default slidingDoorSynth;
