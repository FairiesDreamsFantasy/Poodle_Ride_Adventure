export function playCollarGraspSound(ctx: AudioContext, sfxGain: GainNode, createPanner: (x: number, y: number, z: number) => PannerNode, x: number, y: number, z: number, volumeMultiplier: number = 1.0) {
  const now = ctx.currentTime;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1000, now);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05 * volumeMultiplier, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(createPanner(x, y, z)).connect(sfxGain);
  noise.start();
}
