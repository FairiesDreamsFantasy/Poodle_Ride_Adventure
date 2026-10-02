/**
 * Elegant "BOW" Synthesizer Registry
 */

/**
 * Abigay Rose Kone: Elegant "BOW" Synthesizer
 */
export function playAbigayBow(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false
) {
  const now = ctx.currentTime;
  const duration = 0.15;
  const volume = 0.55;

  const playSingleBow = (delay: number, baseVol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(585, now + delay);
    osc.frequency.exponentialRampToValueAtTime(1080, now + delay + 0.03);
    osc.frequency.exponentialRampToValueAtTime(315, now + delay + 0.13);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1260, now + delay);
    filter.Q.setValueAtTime(4, now + delay);
    
    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(baseVol, now + delay + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.13);
    
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1170, now + delay);
    osc2.frequency.exponentialRampToValueAtTime(1710, now + delay + 0.03);
    osc2.frequency.exponentialRampToValueAtTime(432, now + delay + 0.13);
    
    gain2.gain.setValueAtTime(0, now + delay);
    gain2.gain.linearRampToValueAtTime(baseVol * 0.45, now + delay + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.13);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    
    osc2.connect(gain2);
    gain2.connect(panner);
    
    panner.connect(sfxGain);
    
    osc.start(now + delay);
    osc2.start(now + delay);
    osc.stop(now + delay + duration);
    osc2.stop(now + delay + duration);
  };

  playSingleBow(0, volume);
}

/**
 * Anninne-Amelia Rose Julisus: Elegant "BOW" Synthesizer
 */
export function playAnninneAmeliaBow(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false
) {
  const now = ctx.currentTime;
  const duration = 0.15;
  const volume = 0.55;

  const playSingleBow = (delay: number, baseVol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, now + delay);
    osc.frequency.exponentialRampToValueAtTime(1200, now + delay + 0.03);
    osc.frequency.exponentialRampToValueAtTime(350, now + delay + 0.13);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now + delay);
    filter.Q.setValueAtTime(4, now + delay);
    
    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(baseVol, now + delay + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.13);
    
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1300, now + delay);
    osc2.frequency.exponentialRampToValueAtTime(1900, now + delay + 0.03);
    osc2.frequency.exponentialRampToValueAtTime(480, now + delay + 0.13);
    
    gain2.gain.setValueAtTime(0, now + delay);
    gain2.gain.linearRampToValueAtTime(baseVol * 0.45, now + delay + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.13);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    
    osc2.connect(gain2);
    gain2.connect(panner);
    
    panner.connect(sfxGain);
    
    osc.start(now + delay);
    osc2.start(now + delay);
    osc.stop(now + delay + duration);
    osc2.stop(now + delay + duration);
  };

  playSingleBow(0, volume);
}

/**
 * Dymond Daisy Qin-Reynolds: Elegant "BOW" Synthesizer
 */
export function playDymondBow(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false
) {
  const now = ctx.currentTime;
  const duration = 0.15;
  const volume = 0.55;

  const playSingleBow = (delay: number, baseVol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(500, now + delay); // Warm tone (lower than Abigay)
    osc.frequency.exponentialRampToValueAtTime(900, now + delay + 0.03);
    osc.frequency.exponentialRampToValueAtTime(280, now + delay + 0.13);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now + delay);
    filter.Q.setValueAtTime(4, now + delay);
    
    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(baseVol, now + delay + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.13);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start(now + delay);
    osc.stop(now + delay + duration);
  };

  playSingleBow(0, volume);
}

/**
 * Abigail Marigold Kenyatta: Elegant "BOW" Synthesizer
 */
export function playAbigailBow(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  disableInternalEcho: boolean = false,
  isInternalReverbEnabled: boolean = false
) {
  const now = ctx.currentTime;
  const duration = 0.15;
  const volume = 0.55;

  const playSingleBow = (delay: number, baseVol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now + delay);
    osc.frequency.exponentialRampToValueAtTime(960, now + delay + 0.03);
    osc.frequency.exponentialRampToValueAtTime(280, now + delay + 0.13);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1120, now + delay);
    filter.Q.setValueAtTime(4, now + delay);
    
    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(baseVol, now + delay + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.13);
    
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1040, now + delay);
    osc2.frequency.exponentialRampToValueAtTime(1520, now + delay + 0.03);
    osc2.frequency.exponentialRampToValueAtTime(384, now + delay + 0.13);
    
    gain2.gain.setValueAtTime(0, now + delay);
    gain2.gain.linearRampToValueAtTime(baseVol * 0.45, now + delay + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.13);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    
    osc2.connect(gain2);
    gain2.connect(panner);
    
    panner.connect(sfxGain);
    
    osc.start(now + delay);
    osc2.start(now + delay);
    osc.stop(now + delay + duration);
    osc2.stop(now + delay + duration);
  };

  playSingleBow(0, volume);
}
