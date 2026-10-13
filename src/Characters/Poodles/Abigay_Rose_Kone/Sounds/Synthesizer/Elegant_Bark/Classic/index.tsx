/**
 * Abigay Rose Kone: Classic Elegant Bark Synthesizer
 */

import { playAbigayBow } from '../Bow';

export const POODLE_BARK_MSG = "A Poodle Barks Elegantly";

export function playElegantBark(
  ctx: AudioContext, 
  sfxGain: GainNode, 
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0, 
  y: number = 0, 
  z: number = 0,
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false,
  type: 'Generic' | 'BOW' = 'Generic',
  disableDescendingPitch: boolean = false
) {
  const now = ctx.currentTime;
  
  if (type === 'BOW') {
    playAbigayBow(ctx, sfxGain, createPanner, x, y, z, disableInternalEcho, isInternalReverbEnabled);
    return;
  }
  
  const createYip = (delay: number, pitch: number, volume: number, isEcho: boolean = false, disableDescendingPitch: boolean = false) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    const jitter = (Math.random() - 0.5) * (pitch * 0.0025);
    const naturalPitch = pitch + jitter;
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(naturalPitch, now + delay);
    if (!disableDescendingPitch) {
      osc.frequency.exponentialRampToValueAtTime(naturalPitch * 0.7, now + delay + 0.08);
    }
    
    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(isEcho ? volume * 0.5 : volume, now + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(pitch, now + delay);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    
    panner.connect(sfxGain);
    
    osc.start(now + delay);
    osc.stop(now + delay + 0.08);
  };

  createYip(0, 900, 0.5438, false, disableDescendingPitch);
  createYip(0.01, 850, 0.4352, false, disableDescendingPitch);
}
