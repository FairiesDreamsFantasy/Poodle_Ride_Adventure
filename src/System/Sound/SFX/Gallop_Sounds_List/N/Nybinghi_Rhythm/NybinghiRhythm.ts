/**
 * Nybinghi Rhythm
 * A specialized gallop sound for specific cultural locations.
 * Part of the Gallop_Sounds_List system.
 */

export const NYBINGHI_RHYTHM_DESCRIPTION = "A deep, resonant gallop rhythm inspired by Nybinghi drumming.";

export function playNybinghiRhythm(
  ctx: AudioContext,
  playThump: (time: number, vol: number, pitch: number) => void
) {
  const now = ctx.currentTime;
  // Deep, rhythmic pattern
  playThump(now, 0.4, 40);
  playThump(now + 0.15, 0.3, 45);
  playThump(now + 0.3, 0.5, 35);
}
