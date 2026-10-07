
import { SoundContext } from '../../../SoundContext';

export const T_Sounds = {
  toggleMute(contextState: any) {
    const { ctx, masterGain } = contextState;
    const now = ctx.currentTime;
    const currentVol = masterGain.gain.value;
    masterGain.gain.setValueAtTime(currentVol, now);
    masterGain.gain.linearRampToValueAtTime(currentVol > 0 ? 0 : 1, now + 0.1);
  },

  async playThump(context: SoundContext, time: number, x: number, y: number, z: number) {
    const { ctx, sfxGain, createPanner } = context;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(60, time);
    osc.frequency.exponentialRampToValueAtTime(20, time + 0.1);
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start(time);
    osc.stop(time + 0.1);
  }
};
