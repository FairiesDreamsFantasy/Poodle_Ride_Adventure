/**
 * Dymond Daisy Qin-Reynolds: Gallop Synthesizer
 */

export function playDymondGallop(
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
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.1);
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(gain);
    sfxConnector(gain, hasReverb);
    osc.start(time);
    osc.stop(time + 0.1);
  };

  if (surfaceType === 'hard') {
    playThump(now, 0.25, 48); // Slightly deeper than Abigay
    playThump(now + 0.08, 0.3, 45);
    playThump(now + 0.2, 0.5, 42);
  } else {
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    noise.connect(gain);
    sfxConnector(gain, hasReverb);
    noise.start(now);
  }
}
