import { SoundContext } from '../../../../../../../../SoundContext';

/**
 * Play Rainbow Glass Sliding Door Close Action
 * Material: Solid Steel Doors with Windows (Steel_Glass)
 * Feature: High-precision procedural audio synthesis implementation for the sliding glass door sounds.
 */
export const playRainbowGlassSlidingDoorCloseAction = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  const { ctx, sfxGain, createPanner } = context;
  const now = ctx.currentTime;
  const panner = createPanner(x, y, z);

  const noise = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // 1. Generate 0.8 seconds of scraping slide noise
  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;

  // 2. Frequency sweep downwards as friction slows the door down (1500Hz -> 400Hz)
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1500, now);
  filter.frequency.linearRampToValueAtTime(400, now + 0.6);

  // 3. Friction Gain Envelope
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.7, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

  // 4. Route friction noise
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(panner);

  // 5. Playback slide noise
  noise.start(now);
  noise.stop(now + 0.8);

  // 6. Impact Synthesis: Triangle wave at 100Hz triggered right as the slide terminates
  const impact = ctx.createOscillator();
  const impactGain = ctx.createGain();
  
  impact.type = 'triangle';
  impact.frequency.setValueAtTime(100, now + 0.7); // Precise impact sync at 0.7 seconds
  
  // Impact Gain Envelope (Instantaneous onset, quick decay)
  impactGain.gain.setValueAtTime(0, now + 0.7);
  impactGain.gain.linearRampToValueAtTime(0.4, now + 0.75);
  impactGain.gain.exponentialRampToValueAtTime(0.01, now + 0.9);
  
  // Route and start impact thud
  impact.connect(impactGain);
  impactGain.connect(panner);

  panner.connect(sfxGain);
  
  impact.start(now + 0.7);
  impact.stop(now + 0.9);
};
