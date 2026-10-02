import { SoundContext } from '../../../../SoundContext';

export async function playProximityBeep(context: SoundContext, distance: number, x: number = 0, y: number = 0, z: number = 0) {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const freq = 300 + (800 - distance) * 0.5;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = createPanner(x, y, z);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  const volume = Math.max(0.01, (800 - distance) / 800 * 0.2);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  osc.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);
  osc.start();
  osc.stop(now + 0.1);
}
