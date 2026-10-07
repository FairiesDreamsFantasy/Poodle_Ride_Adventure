import { playAbigayBow, playAnninneAmeliaBow, playAbigailBow } from '../../Bow';

/**
 * Standardization "A": Classic Elegant Bark Synthesizer Registry
 * Includes: Abigay Rose Kone, Anninne-Amelia Rose Julisus, Abigail Marigold Kenyatta
 */

/**
 * Abigay Rose Kone: Classic Elegant Bark
 */
export function playAbigayClassicBark(
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
  
  const createYip = (delay: number, pitch: number, volume: number, isEcho: boolean = false) => {
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

  createYip(0, 900, 0.5438, false);
  createYip(0.01, 850, 0.4352, false);
}

/**
 * Anninne-Amelia Rose Julisus: Classic Elegant Bark
 */
export function playAnninneAmeliaClassicBark(
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
    playAnninneAmeliaBow(ctx, sfxGain, createPanner, x, y, z, disableInternalEcho, isInternalReverbEnabled);
    return;
  }
  
  const createYip = (delay: number, pitch: number, volume: number, isEcho: boolean = false) => {
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

  createYip(0, 1000, 0.5464, false);
  createYip(0.01, 950, 0.4373, false);
}

/**
 * Abigail Marigold Kenyatta: Classic Elegant Bark
 */
export function playAbigailClassicBark(
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
  
  const createYip = (delay: number, pitch: number, volume: number, isEcho: boolean = false) => {
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

  createYip(0, 800, 0.5542, false);
  createYip(0.01, 750, 0.4435, false);
}
