import { SoundContext } from '../../../SoundContext';

export const GardenAmbience = {
  startAmbientGarden(context: any) {
    // Elegant lowpass filtered wind & birds
    this.playAmbientGarden(context, 0, 0, 0, 0.04);
  },

  async playAmbientGarden(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.04) {
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
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);
    
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    noise.start();
    noise.stop(now + 3);

    if (Math.random() < 0.6) {
      const bird = ctx.createOscillator();
      const birdGain = ctx.createGain();
      bird.type = 'sine';
      bird.frequency.setValueAtTime(2800, now + 0.5);
      bird.frequency.exponentialRampToValueAtTime(3800, now + 0.65);
      
      birdGain.gain.setValueAtTime(0, now);
      birdGain.gain.linearRampToValueAtTime(0.008, now + 0.5);
      birdGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
      
      bird.connect(birdGain);
      birdGain.connect(panner);
      
      bird.start(now + 0.5);
      bird.stop(now + 0.65);
    }
  }
};
