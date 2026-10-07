/**
 * Anninne-Amelia Rose Julisus: Petting Sound Synthesizer
 * [PRESERVED CRAFT: Amplified 4% louder (1.040)]
 */

export function playPetSound(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  volumeMultiplier: number = 1.0
) {
  const now = ctx.currentTime;
  const duration = 0.4;
  const anninneMultiplier = 1.040; // 4% louder amplification

  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(450, now);
  filter.frequency.exponentialRampToValueAtTime(350, now + duration);
  
  const gain = ctx.createGain();
  const panner = createPanner(x, y, z);
  
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.05 * volumeMultiplier * anninneMultiplier, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);
  
  noise.start();
  noise.stop(now + duration);
}
