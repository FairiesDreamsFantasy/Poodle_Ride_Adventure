
import { SoundContext } from '../../../SoundContext';

export const F_Sounds = {
  async playForwardSound(
    context: SoundContext,
    area: string = 'Foyer',
    x: number = 0,
    y: number = 0,
    z: number = 0,
    animal: string = 'Abigay Rose Kone'
  ) {
    const mode = context.currentSynthMode || 'Classic';
    if (mode === 'Advanced' || mode === 'Advanced Yamaha' || mode === 'ADVANCED' || mode === 'Mix') {
      await context.playWithSynth('playPoodleWalk', area, x, y, z, animal);
      return;
    }

    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(250, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.1);
  }
};
