
import { SoundContext } from '../../../SoundContext';

export const W_Sounds = {
  async playWindInBushes(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1, now);
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 1.5);
    gain.gain.linearRampToValueAtTime(0, now + 3);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    noise.start();
    noise.stop(now + 3);
  },

  async playWallHit(contextState: any, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0) {
    await contextState.playCollisionSound(x, y, z);
  }
};
