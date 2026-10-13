import { SoundContext } from '../../../../../SoundContext';

export async function playPassSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = createPanner(x, y, z);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.1);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  osc.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);
  osc.start();
  osc.stop(now + 0.1);
}
