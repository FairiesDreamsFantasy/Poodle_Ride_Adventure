/**
 * Classic White Poodle: Elegant Bark Synthesizer
 * Feature: Lower pitch than Abigay Rose Kone (Standardized signature)
 */

export const ELEGANT_BARK_CLASSIC = "Classic Elegant Bark (A) - Lower pitch than Abigay";

export function playElegantBark(
  ctx: AudioContext, 
  sfxGain: GainNode, 
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0, 
  y: number = 0, 
  z: number = 0,
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false,
  type: 'Generic' | 'BOW' | 'Classic_A' | 'Classic_AA' = 'Classic_A',
  disableDescendingPitch: boolean = false
) {
  const now = ctx.currentTime;
  
  if (type === 'BOW') {
    // Elegant BOW: Deep, resonant bow vocalization
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.18);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.65, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, now);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start(now);
    osc.stop(now + 0.18);
    return;
  }
  
  // Classic Elegant Bark (A) - Deeper, majestic pitch (700Hz and 650Hz, lower than Abigay's 900/850)
  const pitch1 = 700;
  const pitch2 = 650;
  
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

  createYip(0, pitch1, 0.5438, false, disableDescendingPitch);
  createYip(0.01, pitch2, 0.4352, false, disableDescendingPitch);

  if (!disableInternalEcho) {
    const echoVolume = isInternalReverbEnabled ? 0.3262 : 0.2176;
    createYip(0.15, pitch1, echoVolume, true, disableDescendingPitch);
    createYip(0.30, pitch1, echoVolume * 0.5, true, disableDescendingPitch);
  }
}
