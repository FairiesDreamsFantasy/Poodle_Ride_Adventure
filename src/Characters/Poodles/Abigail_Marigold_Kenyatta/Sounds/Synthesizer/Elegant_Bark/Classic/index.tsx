/**
 * Abigail Marigold Kenyatta: Classic Elegant Bark Synthesizer
 */

import { playAbigailBow } from '../Bow';

export const ABIGAIL_BARK_MSG = "Abigail Marigold Kenyatta Barks Elegantly";

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
    playAbigailBow(ctx, sfxGain, createPanner, x, y, z, disableInternalEcho, isInternalReverbEnabled);
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

  createYip(0, 800, 0.5542, false, disableDescendingPitch);
  createYip(0.01, 750, 0.4435, false, disableDescendingPitch);

  if (!disableInternalEcho) {
    const echoVolume = isInternalReverbEnabled ? 0.3426 : 0.2286;
    createYip(0.15, 800, echoVolume, true, disableDescendingPitch);
    createYip(0.3, 800, echoVolume * 0.5, true, disableDescendingPitch);
  }
}
