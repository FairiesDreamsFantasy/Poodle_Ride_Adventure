import { SoundContext } from '../../../../SoundContext';

export const playDoorShut = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = createPanner(x, y, z);
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(100, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  
  osc.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);
  
  osc.start();
  osc.stop(now + 0.2);
};

export const duckMusic = (context: SoundContext, duration: number) => {
  const { ctx, musicGain } = context;
  const now = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(musicGain.gain.value, now);
  musicGain.gain.exponentialRampToValueAtTime(0.1, now + 0.1);
  musicGain.gain.setValueAtTime(0.1, now + duration);
  musicGain.gain.exponentialRampToValueAtTime(0.5, now + duration + 0.5);
};
