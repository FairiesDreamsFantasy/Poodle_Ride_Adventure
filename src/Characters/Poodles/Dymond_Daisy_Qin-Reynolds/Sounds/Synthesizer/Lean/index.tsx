export function playLeanForwardSound(ctx: AudioContext, sfxGain: GainNode, createPanner: (x: number, y: number, z: number) => PannerNode, x: number, y: number, z: number, volumeMultiplier: number = 1.0) {
  const now = ctx.currentTime;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + 0.2);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04 * volumeMultiplier, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(createPanner(x, y, z)).connect(sfxGain);
  noise.start();
}

export function playReturnUprightSound(ctx: AudioContext, sfxGain: GainNode, createPanner: (x: number, y: number, z: number) => PannerNode, x: number, y: number, z: number, volumeMultiplier: number = 1.0) {
  const now = ctx.currentTime;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(600, now + 0.15);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.03 * volumeMultiplier, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(createPanner(x, y, z)).connect(sfxGain);
  noise.start();
}
