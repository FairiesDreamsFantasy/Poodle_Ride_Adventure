/**
 * Abigay Rose Kone: Very Slow Walk Synthesizer
 * [PRESERVED ARTISTIC CRAFT: Nyhabinghi Rhythm]
 */

export function playVerySlowWalk(
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
      osc.frequency.setValueAtTime(50, time);
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      osc.connect(gain);
      sfxConnector(gain, hasReverb);
      osc.start(time);
      osc.stop(time + 0.1);
    };

    playThump(now, 0.3, 50);
    playThump(now + 0.15, 0.3, 50);
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
    gain.gain.setValueAtTime(0.4, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    sfxConnector(gain, hasReverb);
    osc.start(now + 0.3);
    osc.stop(now + 0.4);
  } else {
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    noise.connect(gain);
    sfxConnector(gain, hasReverb);
    noise.start(now);
  }
}
