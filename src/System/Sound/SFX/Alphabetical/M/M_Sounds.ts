
import { SoundContext } from '../../../SoundContext';

export const M_Sounds = {
  async playMagicWand(context: SoundContext) {
    const { ctx, sfxGain } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.5);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.5);
    
    for(let i=0; i<6; i++) {
        const sTime = now + i * 0.08;
        const sOsc = ctx.createOscillator();
        const sGain = ctx.createGain();
        sOsc.type = 'sine';
        sOsc.frequency.setValueAtTime(2000 + i * 300, sTime);
        sGain.gain.setValueAtTime(0.1, sTime);
        sGain.gain.exponentialRampToValueAtTime(0.001, sTime + 0.1);
        sOsc.connect(sGain);
        sGain.connect(sfxGain);
        sOsc.start(sTime);
        sOsc.stop(sTime + 0.1);
    }
  },

  async playMultipleBarks(contextState: any, count: number, x: number = 0, y: number = 0, z: number = 0, area: string = 'Foyer', animal: string = 'Abigay Rose Kone', barkType: string = 'Generic') {
    // This needs the sound manager instance to recall playPoodleBark
    for (let i = 0; i < count; i++) {
      const delay = i * 0.4;
      setTimeout(() => {
        contextState.playPoodleBark(x, y, z, area, animal, barkType);
      }, delay * 1000);
    }
  },

  async playMagicWandSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    for (let i = 0; i < 10; i++) {
      const time = now + i * 0.05;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = createPanner(x, y, z);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000 + i * 200, time);
      gain.gain.setValueAtTime(0.05, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(sfxGain);
      
      osc.start(time);
      osc.stop(time + 0.1);
    }
  }
};
