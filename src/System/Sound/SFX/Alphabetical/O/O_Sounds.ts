
import { SoundContext } from '../../../SoundContext';

export const O_Sounds = {
  async playOpossumVocal(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const time = now + i * 0.15;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = createPanner(x, y, z);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, time);
      osc.frequency.exponentialRampToValueAtTime(1200, time + 0.1);
      gain.gain.setValueAtTime(0.05, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(sfxGain);
      
      osc.start(time);
      osc.stop(time + 0.1);
    }
  },

  async playOpossumHiss(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
    
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000, now);
    
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    noise.start();
    noise.stop(now + 0.5);
  },

  async playOpossumHunt(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const duration = 2.0;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      const rustle = Math.sin(i * 0.01) * 0.5 + 0.5;
      output[i] = (Math.random() * 2 - 1) * rustle * (1 - i / noiseBuffer.length);
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.setValueAtTime(2, now);
    
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    noise.start();
    
    const hissOsc = ctx.createOscillator();
    const hissGain = ctx.createGain();
    hissOsc.type = 'triangle';
    hissOsc.frequency.setValueAtTime(5000, now);
    hissGain.gain.setValueAtTime(0.005, now);
    hissGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    hissOsc.connect(hissGain);
    hissGain.connect(panner);
    hissOsc.start();
    hissOsc.stop(now + 0.3);
  },

  async playOpossumSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const count = 6;
    for (let i = 0; i < count; i++) {
      const time = now + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = createPanner(x, y, z);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, time);
      osc.frequency.exponentialRampToValueAtTime(400, time + 0.04);
      gain.gain.setValueAtTime(0.03, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
      
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(sfxGain);
      
      osc.start(time);
      osc.stop(time + 0.04);
    }
  },

  async playOpossumMoveSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.1);
  },

  async playOpossumJumpSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.2);
  },

  async playOpossumPetSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.3);
  }
};
