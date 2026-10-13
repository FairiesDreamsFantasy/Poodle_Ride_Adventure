/**
 * AbigailGallopLogic.ts
 * Logic for Abigail Marigold Kenyatta's 300ms gallop rhythm.
 * [CRAFTSMANSHIP: Standardization AA]
 */

export function playAbigailGallopLogic(
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
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.08); // Slightly shorter decay for 300ms
    
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08); // Slightly shorter decay
    
    osc.connect(gain);
    sfxConnector(gain, hasReverb);
    
    osc.start(time);
    osc.stop(time + 0.08);
  };

  const playGrassSwish = (time: number, volume: number) => {
    const bufferSize = ctx.sampleRate * 0.15; // Shorter buffer for 300ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(900, time);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, time);
    filter.frequency.exponentialRampToValueAtTime(1200, time + 0.1);
    filter.Q.setValueAtTime(1.5, time);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume * 0.6, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    
    noise.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(gain);
    sfxConnector(gain, hasReverb);
    
    noise.start(time);
  };

  if (surfaceType === 'hard') {
    // 1-2-3 Gallop Rhythm (300ms scale)
    // High-Precision timing (0, 60ms, 150ms) for optimized 300ms cycle
    playThump(now, 0.28, 62);       // Slightly tighter and punchier
    playThump(now + 0.06, 0.33, 57);
    playThump(now + 0.15, 0.55, 52); 
  } else {
    // Single grass swish per 300ms - Refined for Abigail's athletic build
    playGrassSwish(now, 0.65);
  }
}
