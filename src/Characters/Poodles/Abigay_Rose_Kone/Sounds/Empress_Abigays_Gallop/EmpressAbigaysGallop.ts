/**
 * EmpressAbigaysGallop.ts
 * Logic for Abigay's iconic 1-2-3 gallop rhythm.
 * [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
 */

export function playEmpressAbigaysGallop(
  ctx: AudioContext,
  sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
  surfaceType: 'hard' | 'soft',
  hasReverb: boolean,
  area: string
) {
  const now = ctx.currentTime;

  const playThump = (time: number, volume: number, freq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Use sine wave for a deep, natural thump
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.1);
    
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    
    osc.connect(gain);
    sfxConnector(gain, hasReverb);
    
    osc.start(time);
    osc.stop(time + 0.1);
  };

  const playGrassSwish = (time: number, volume: number) => {
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // High-pass filter to remove low-end rumble
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(800, time);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, time);
    filter.frequency.exponentialRampToValueAtTime(1000, time + 0.12);
    filter.Q.setValueAtTime(1.2, time);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume * 0.55, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    
    noise.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(gain);
    sfxConnector(gain, hasReverb);
    
    noise.start(time);
  };

  if (surfaceType === 'hard') {
    // Iconic Gallop Rhythm: 1-2-3 pattern (400ms rhythm)
    playThump(now, 0.25, 55);
    playThump(now + 0.08, 0.3, 50);
    playThump(now + 0.2, 0.5, 45);
  } else {
    // Single grass swish per 400ms gallop movement/rhythm
    playGrassSwish(now, 0.6);
  }
}
