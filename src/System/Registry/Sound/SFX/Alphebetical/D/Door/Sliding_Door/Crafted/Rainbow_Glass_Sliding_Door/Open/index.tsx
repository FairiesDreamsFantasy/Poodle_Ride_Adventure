import { SoundContext } from '../../../../../../../../../../Sound/SoundContext';

/**
 * Play Rainbow Glass Sliding Door Open Action
 * Material: Solid Steel Doors with Windows (Steel_Glass)
 * Feature: High-precision procedural audio synthesis implementation for the sliding glass door sounds.
 */
export const playRainbowGlassSlidingDoorOpenAction = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const panner = createPanner(x, y, z);

  const noise = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // 1. Generate 1.5 seconds of high-fidelity white noise
  const bufferSize = ctx.sampleRate * 1.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;

  // 2. Linear frequency sweep to simulate the sliding door picking up speed (800Hz -> 1500Hz)
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.linearRampToValueAtTime(1500, now + 1.2);

  // 3. Gain envelope (Fade-in then slow exponential decay)
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.7, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

  // 4. Node routing
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);

  // 5. Playback schedule
  noise.start(now);
  noise.stop(now + 1.5);
};
