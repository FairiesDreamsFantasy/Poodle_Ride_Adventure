/**
 * Classic Elegant Bark Preservation
 * Acts as the entry point and bridges the high-precision 64-bit synthesis engine
 * with the standard Web Audio API playback pipeline.
 */

import { createUnified64BitBarkBuffer } from './General';

export { createUnified64BitBarkBuffer };

export function play64BitElegantBark(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  animal: string = 'Abigay Rose Kone',
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false,
  type: 'Generic' | 'BOW' | 'Classic_A' | 'Classic_AA' = 'Generic',
  disableDescendingPitch: boolean = false
) {
  const sampleRate = ctx.sampleRate;
  const data64 = createUnified64BitBarkBuffer(
    sampleRate,
    animal,
    type,
    disableInternalEcho,
    isInternalReverbEnabled,
    disableDescendingPitch
  );
  
  const buffer = ctx.createBuffer(1, data64.length, sampleRate);
  const data32 = buffer.getChannelData(0);
  for (let i = 0; i < data64.length; i++) {
    data32[i] = data64[i];
  }
  
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const panner = createPanner(x, y, z);
  
  source.connect(panner);
  panner.connect(sfxGain);
  
  source.start();
  return source;
}
