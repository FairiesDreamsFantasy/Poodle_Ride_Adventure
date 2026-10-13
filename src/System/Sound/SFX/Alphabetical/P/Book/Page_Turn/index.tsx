import { SoundContext } from '../../../../../SoundContext';

export async function playPageTurn(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2000, now);
  filter.frequency.exponentialRampToValueAtTime(100, now + 0.2);
  const gain = ctx.createGain();
  const panner = createPanner(x, y, z);
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);
  source.start();
  source.stop(now + 0.2);
}
