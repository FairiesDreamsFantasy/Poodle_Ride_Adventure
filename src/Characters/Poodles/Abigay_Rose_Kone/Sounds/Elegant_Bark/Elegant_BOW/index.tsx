/**
 * Abigay's Refined "BOW" Voice Cue
 * An elegant, poodle-like vocalization used for sonic signaling.
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

  if (!disableInternalEcho) {
    const echoVolume = isInternalReverbEnabled ? volume * 0.6 : volume * 0.4;
    playSingleBow(0.15, echoVolume);
    playSingleBow(0.30, echoVolume * 0.5);
  }
}
