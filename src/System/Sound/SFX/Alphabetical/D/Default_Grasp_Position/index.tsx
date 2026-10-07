import { SoundContext } from '../../../../SoundContext';

/**
 * Default Grasp Position Sound
 * 2000% Scientific implementation
 */
export const playDefaultGraspSound = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0) => {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(500, now);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.03 * volumeMultiplier, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(createPanner(x, y, z)).connect(sfxGain);
  noise.start();
};
