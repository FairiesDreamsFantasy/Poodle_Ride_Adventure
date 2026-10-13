/**
 * CanterLogic.ts
 * Logic for Anninne-Amelia's 3-beat canter rhythm.
 * [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
 */

export function playCanter(
  ctx: AudioContext,
  sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
  surfaceType: 'hard' | 'soft',
  hasReverb: boolean
) {
  const now = ctx.currentTime;
  
  if (surfaceType === 'hard') {
    const playThump = (time: number, volume: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      osc.connect(gain);
      sfxConnector(gain, hasReverb);
      osc.start(time);
      osc.stop(time + 0.1);
    };

    // 3-beat rocking rhythm for canter (0ms, 200ms, 450ms)
    playThump(now, 0.35, 75);
    playThump(now + 0.2, 0.32, 70);
    playThump(now + 0.45, 0.38, 65);
  } else {
    // Soft surface swish (3 beats)
    const playSwish = (time: number, volume: number) => {
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1500, time);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      sfxConnector(gain, hasReverb);
      noise.start(time);
    };
    playSwish(now, 0.45);
    playSwish(now + 0.2, 0.35);
    playSwish(now + 0.45, 0.4);
  }
}
