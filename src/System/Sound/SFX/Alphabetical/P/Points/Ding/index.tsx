import { SoundContext } from '../../../../../SoundContext';

export async function playPointDing(context: SoundContext, count: number = 1, x: number = 0, y: number = 0, z: number = 0) {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const gPitch = 392.00;
  for (let i = 0; i < count; i++) {
    const time = now + i * 0.2;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(gPitch, time);
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start(time);
    osc.stop(time + 0.3);
  }
}
