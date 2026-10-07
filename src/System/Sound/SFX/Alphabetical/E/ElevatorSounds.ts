
import { SoundContext } from '../../../SoundContext';

export const E_Sounds = {
  async playButtonIntersection(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const panner = createPanner(x, y, z);
    
    // Vintage Click (Mechanical sound)
    const osc = ctx.createOscillator();
    const noise = ctx.createBufferSource();
    const noiseFilter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // Sudden impulsive sound
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(10, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  },

  async playFloorBeep(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const panner = createPanner(x, y, z);
    
    // Smooth Sine Beep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);

    osc.start(now);
    osc.stop(now + 0.3);
  },

  async playElevatorMovement(context: SoundContext, duration: number = 1.0) {
    const { ctx, sfxGain } = context;
    const now = ctx.currentTime;
    
    // Hum of the elevator motor
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.linearRampToValueAtTime(62, now + duration);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
    gain.gain.linearRampToValueAtTime(0.05, now + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.connect(gain);
    gain.connect(sfxGain);

    osc.start(now);
    osc.stop(now + duration);
  }
};
