import { SoundContext } from '../../../SoundContext';

export const FarmAmbience = {
  async playAmbientFarm(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain } = context;
    const now = ctx.currentTime;
    const duration = 5.0;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.connect(filter); filter.connect(gain); gain.connect(sfxGain);
    noise.start();

    if (Math.random() > 0.5) {
        const chirp = ctx.createOscillator();
        const chirpGain = ctx.createGain();
        chirp.type = 'sine';
        chirp.frequency.setValueAtTime(2500, now);
        chirp.frequency.exponentialRampToValueAtTime(3500, now + 0.1);
        chirpGain.gain.setValueAtTime(0.02, now);
        chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        chirp.connect(chirpGain); chirpGain.connect(sfxGain);
        chirp.start(); chirp.stop(now + 0.1);
    }
  }
};
