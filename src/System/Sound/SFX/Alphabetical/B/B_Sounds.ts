
import { SoundContext } from '../../../SoundContext';

export const B_Sounds = {
  async playBulldogBark(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner, connectSFX } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    const panner = createPanner(x, y, z);
    connectSFX(panner, true);
    osc.connect(gain);
    gain.connect(panner);
    
    osc.start(now);
    osc.stop(now + 0.2);
  },

  async playBushHit(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain } = context;
    const now = ctx.currentTime;
    const noise = ctx.createBufferSource();
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGain);

    noise.start(now);
    noise.stop(now + 0.2);
  }
};
