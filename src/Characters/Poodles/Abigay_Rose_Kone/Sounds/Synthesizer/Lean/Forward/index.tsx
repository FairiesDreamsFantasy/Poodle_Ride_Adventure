/**
 * Abigay Rose Kone: Lean Forward Synthesizer
 */

export function playLeanForwardSound(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  volumeMultiplier: number = 1.0
) {
  const now = ctx.currentTime;
  const duration = 0.2;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04 * volumeMultiplier, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(createPanner(x, y, z)).connect(sfxGain);
  noise.start();
}
