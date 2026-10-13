
import { SoundContext } from '../../../SoundContext';

export const Y_Sounds = {
  async playYellowPoodleBark(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, createPanner, connectSFX } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    const panner = createPanner(x, y, z);
    connectSFX(panner, true);
    osc.connect(gain);
    gain.connect(panner);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }
};
