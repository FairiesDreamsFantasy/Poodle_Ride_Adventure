import { SoundContext } from '../../../../../SoundContext';

export async function playPointEarned(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
  const { ctx, sfxGain } = context;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.connect(gain);
  gain.connect(sfxGain);
  osc.start(now);
  osc.stop(now + 0.2);
}
