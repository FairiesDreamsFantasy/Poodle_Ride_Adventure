import { SoundContext } from '../../../../../../../../../Sound/SoundContext';

/**
 * Standardized Scientific Sliding Door Volume
 * 25% louder than poodle's elegant bark + 15% increase (Standardized ratio)
 * (0.5125 * 1.25 * 1.15 = 0.73671875)
 */
export const SCIENTIFIC_SLIDING_DOOR_VOLUME = 0.73671875;

/**
 * Common gain curve for sliding doors to ensure scientific friction modeling.
 */
export const createSlidingDoorGainCurve = (ctx: AudioContext, duration: number, volume: number) => {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration + 0.02);
  return gain;
};
