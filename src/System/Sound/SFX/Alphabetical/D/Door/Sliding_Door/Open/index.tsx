// Sliding Door Open Sound Synthesizer
// Calibrated precisely 25% higher than elegant bark baseline (0.5125 * 1.25 = ~0.6406)

export interface SlidingDoorSoundOptions {
  material?: 'Steel_Glass' | 'Steel_Solid' | 'Wooden_Solid' | 'Wooden' | 'Aluminum_Alloy' | 'Rainbow_Glass';
  duration?: number;
  pitchScale?: number;
  volumeMultiplier?: number;
  amplified?: boolean;
}

export const playSlidingDoorOpenSound = (
  audioCtx?: AudioContext | null,
  options: SlidingDoorSoundOptions = {}
): void => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  const duration = options.duration || 0.85;
  // Baseline elegant bark is 0.5125; 25% higher = 0.6406
  const baseVolume = 0.5125 * 1.25 * (options.volumeMultiplier ?? 1.0);

  // 1. Friction / Glide Pink-Noise Generator (Simulates physical rail friction without motor noise)
  const bufferSize = audioCtx.sampleRate * duration;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }

  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';

  // Resonant frequency varies by door material
  switch (options.material) {
    case 'Steel_Glass':
    case 'Rainbow_Glass':
      // Sharper, higher frequency metallic "zing" for steel tracks and glass
      bandpass.frequency.setValueAtTime(1250, now);
      bandpass.frequency.exponentialRampToValueAtTime(1850, now + duration * 0.45);
      bandpass.frequency.exponentialRampToValueAtTime(980, now + duration);
      bandpass.Q.value = 5.8; // High resonance for metallic rail friction
      break;
    case 'Aluminum_Alloy':
      bandpass.frequency.setValueAtTime(1200, now);
      bandpass.frequency.exponentialRampToValueAtTime(1600, now + duration * 0.5);
      bandpass.frequency.exponentialRampToValueAtTime(950, now + duration);
      bandpass.Q.value = 2.5;
      break;
    case 'Wooden_Solid':
      bandpass.frequency.setValueAtTime(320, now);
      bandpass.frequency.exponentialRampToValueAtTime(460, now + duration * 0.5);
      bandpass.frequency.exponentialRampToValueAtTime(280, now + duration);
      bandpass.Q.value = 1.8;
      break;
    case 'Wooden':
      bandpass.frequency.setValueAtTime(480, now);
      bandpass.frequency.exponentialRampToValueAtTime(620, now + duration * 0.5);
      bandpass.frequency.exponentialRampToValueAtTime(390, now + duration);
      bandpass.Q.value = 2.0;
      break;
    case 'Steel_Solid':
      bandpass.frequency.setValueAtTime(540, now);
      bandpass.frequency.exponentialRampToValueAtTime(780, now + duration * 0.5);
      bandpass.frequency.exponentialRampToValueAtTime(420, now + duration);
      bandpass.Q.value = 2.8;
      break;
    default:
      // Zero-Fallback Policy: Explicitly log and use Steel_Solid as a safe baseline only if unknown
      bandpass.frequency.setValueAtTime(540, now);
      bandpass.frequency.exponentialRampToValueAtTime(780, now + duration * 0.5);
      bandpass.frequency.exponentialRampToValueAtTime(420, now + duration);
      bandpass.Q.value = 2.8;
      break;
  }

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.001, now);
  noiseGain.gain.linearRampToValueAtTime(baseVolume * 0.65, now + 0.12);
  noiseGain.gain.setValueAtTime(baseVolume * 0.65, now + duration - 0.2);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noiseSource.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);

  // 2. Low-frequency track roller glide resonance (metallic rail friction)
  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  const startPitch = (options.material === 'Wooden_Solid' || options.material === 'Wooden') ? 85 : 120;
  osc.frequency.setValueAtTime(startPitch, now);
  osc.frequency.linearRampToValueAtTime(startPitch * 1.35, now + duration * 0.4);
  osc.frequency.linearRampToValueAtTime(startPitch * 0.9, now + duration);

  const oscGain = audioCtx.createGain();
  oscGain.gain.setValueAtTime(0.001, now);
  oscGain.gain.linearRampToValueAtTime(baseVolume * 0.35, now + 0.08);
  oscGain.gain.setValueAtTime(baseVolume * 0.35, now + duration - 0.15);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(oscGain);
  oscGain.connect(audioCtx.destination);

  noiseSource.start(now);
  noiseSource.stop(now + duration);
  osc.start(now);
  osc.stop(now + duration);
};

export default playSlidingDoorOpenSound;
