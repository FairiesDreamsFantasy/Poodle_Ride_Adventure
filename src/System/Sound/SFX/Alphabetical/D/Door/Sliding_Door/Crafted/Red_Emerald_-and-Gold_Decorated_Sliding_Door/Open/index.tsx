import { SoundContext } from '../../../../../../../../SoundContext';

/**
 * Play Red Emerald-and-Gold Decorated Sliding Door Open Action
 * Physics & Web Audio API synthesis for sliding double doors.
 * Acoustic Glide & Friction (Bandpass White Noise) + Mechanical End Latch Catch Click.
 */
export const playRedEmeraldSlidingDoorOpenAction = async (context: SoundContext, x: number = 0, y: number = 0, z: number = 0) => {
  const { ctx, sfxGain, createPanner } = context;
  if (!ctx || ctx.state === 'suspended') return;

  const now = ctx.currentTime;
  const duration = 0.8;
  const panner = createPanner(x, y, z);

  // --- 1. Brass Track Friction & Roller Glide (Bandpass White Noise) ---
  const bufferSize = Math.ceil(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.setValueAtTime(3.0, now);
  // Opening: Pitch climbs as door accelerates (400Hz -> 800Hz over 80% duration)
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(800, now + duration * 0.8);

  const gain = ctx.createGain();
  // Amplitude envelope
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);

  noiseSource.start(now);
  noiseSource.stop(now + duration);

  // --- 2. Mechanical End Latch / Catch Click ---
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();

  clickOsc.type = 'triangle';
  clickOsc.frequency.setValueAtTime(140, now + duration - 0.05);

  clickGain.gain.setValueAtTime(0.001, now);
  clickGain.gain.setValueAtTime(0.1, now + duration - 0.05);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  clickOsc.connect(clickGain);
  clickGain.connect(panner);

  clickOsc.start(now + duration - 0.05);
  clickOsc.stop(now + duration + 0.02);
};

