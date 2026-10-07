import { playDymondBow } from '../../Bow';

/**
 * Standardization "AA": Classic Elegant Bark Synthesizer Registry
 * Includes: Dymond Daisy Qin-Reynolds
 */

/**
 * Dymond Daisy Qin-Reynolds: Classic Elegant Bark
 */
export function playDymondClassicBark(
  ctx: AudioContext, 
  sfxGainOrConnector: any, 
  createPanner?: (x: number, y: number, z: number) => PannerNode,
  x: number = 0, 
  y: number = 0, 
  z: number = 0,
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false,
  type: 'Generic' | 'BOW' = 'Generic',
  disableDescendingPitch: boolean = false
) {
  const now = ctx.currentTime;
  
  if (createPanner) {
    if (type === 'BOW') {
      playDymondBow(ctx, sfxGainOrConnector as GainNode, createPanner, x, y, z, disableInternalEcho, isInternalReverbEnabled);
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
      filter.Q.setValueAtTime(2, now + delay);
      
      const warmFilter = ctx.createBiquadFilter();
      warmFilter.type = 'lowpass';
      warmFilter.frequency.setValueAtTime(pitch * 1.5, now + delay);
      
      osc.connect(filter);
      filter.connect(warmFilter);
      warmFilter.connect(gain);
      gain.connect(panner);
      
      panner.connect(sfxGainOrConnector as GainNode);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.08);
    };

    const p1 = 868.5;
    const p2 = 820.25;
    createYip(0, p1, 0.4846);
    createYip(0.01, p2, 0.4307);
  } else {
    // Legacy fallback (Connector style)
    if (type === 'BOW') {
      const dummyPanner = (px: number, py: number, pz: number) => {
        const p = ctx.createPanner();
        p.panningModel = 'HRTF';
        p.distanceModel = 'inverse';
        p.refDistance = 10;
        p.maxDistance = 10000;
        p.rolloffFactor = 1.0;
        p.positionX.setValueAtTime(px, now);
        p.positionY.setValueAtTime(py, now);
        p.positionZ.setValueAtTime(pz, now);
        return p;
      };
      const dummyGain = ctx.createGain();
      playDymondBow(ctx, dummyGain, dummyPanner, x, y, z, disableInternalEcho, isInternalReverbEnabled);
      sfxGainOrConnector(dummyGain, false);
      return;
    }
    
    const createYipLegacy = (delay: number, pitch: number, volume: number, isEcho: boolean = false) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const jitter = (Math.random() - 0.5) * (pitch * 0.0025);
      const naturalPitch = pitch + jitter;
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(naturalPitch, now + delay);
      osc.frequency.exponentialRampToValueAtTime(naturalPitch * 0.7, now + delay + 0.08);
      
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(isEcho ? volume * 0.5 : volume, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(pitch, now + delay);
      filter.Q.setValueAtTime(2, now + delay);
      
      const warmFilter = ctx.createBiquadFilter();
      warmFilter.type = 'lowpass';
      warmFilter.frequency.setValueAtTime(pitch * 1.5, now + delay);
      
      osc.connect(filter);
      filter.connect(warmFilter);
      warmFilter.connect(gain);
      sfxGainOrConnector(gain, false);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.08);
    };

    const p1_legacy = 868.5;
    const p2_legacy = 820.25;
    createYipLegacy(0, p1_legacy, 0.4846);
    createYipLegacy(0.01, p2_legacy, 0.4307);
  }
}
