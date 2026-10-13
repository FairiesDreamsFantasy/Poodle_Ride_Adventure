import { SoundContext } from '../../../SoundContext';

export const StreetsAmbience = {
  async playAmbientStreet(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.055, filterFreq: number = 400) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, now);
    
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    noise.start();
    noise.stop(now + 2);
  }
};
