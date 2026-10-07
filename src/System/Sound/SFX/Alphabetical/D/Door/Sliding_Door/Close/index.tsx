// Sliding Door Close Sound Synthesizer
// Calibrated precisely 25% higher than elegant bark baseline (0.5125 * 1.25 = ~0.6406)

import { SlidingDoorSoundOptions } from '../Open';

export const playSlidingDoorCloseSound = (
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
  const duration = options.duration || 0.90;
  const baseVolume = 0.5125 * 1.25 * (options.volumeMultiplier ?? 1.0);

  // 1. Friction / Glide Pink-Noise (reverse envelope glide as doors meet)
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

  switch (options.material) {
    case 'Steel_Glass':
    case 'Rainbow_Glass':
      // Sharper, high-pitched metallic resonance for closing on steel tracks
      bandpass.frequency.setValueAtTime(1100, now);
      bandpass.frequency.exponentialRampToValueAtTime(1550, now + duration * 0.55);
      bandpass.frequency.exponentialRampToValueAtTime(850, now + duration);
      bandpass.Q.value = 5.2; 
      break;
    case 'Aluminum_Alloy':
      bandpass.frequency.setValueAtTime(900, now);
      bandpass.frequency.exponentialRampToValueAtTime(1350, now + duration * 0.6);
      bandpass.frequency.exponentialRampToValueAtTime(700, now + duration);
      bandpass.Q.value = 2.4;
      break;
    case 'Wooden_Solid':
      bandpass.frequency.setValueAtTime(260, now);
      bandpass.frequency.exponentialRampToValueAtTime(380, now + duration * 0.6);
      bandpass.frequency.exponentialRampToValueAtTime(220, now + duration);
      bandpass.Q.value = 1.8;
      break;
    case 'Wooden':
      bandpass.frequency.setValueAtTime(360, now);
      bandpass.frequency.exponentialRampToValueAtTime(490, now + duration * 0.6);
      bandpass.frequency.exponentialRampToValueAtTime(300, now + duration);
      bandpass.Q.value = 2.0;
      break;
    case 'Steel_Solid':
      bandpass.frequency.setValueAtTime(440, now);
      bandpass.frequency.exponentialRampToValueAtTime(620, now + duration * 0.6);
      bandpass.frequency.exponentialRampToValueAtTime(350, now + duration);
      bandpass.Q.value = 2.6;
      break;
    default:
      // Zero-Fallback Policy: Steel_Solid used as explicit baseline for unknown types
      bandpass.frequency.setValueAtTime(440, now);
      bandpass.frequency.exponentialRampToValueAtTime(620, now + duration * 0.6);
      bandpass.frequency.exponentialRampToValueAtTime(350, now + duration);
      bandpass.Q.value = 2.6;
      break;
  }

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.001, now);
  noiseGain.gain.linearRampToValueAtTime(baseVolume * 0.6, now + 0.1);
  noiseGain.gain.setValueAtTime(baseVolume * 0.55, now + duration - 0.15);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noiseSource.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);

  // 2. Gentle bumper contact / frame settle sound at end of slide
  const impactOsc = audioCtx.createOscillator();
  impactOsc.type = 'sine';
  impactOsc.frequency.setValueAtTime(110, now + duration - 0.12);
  impactOsc.frequency.exponentialRampToValueAtTime(45, now + duration);

  const impactGain = audioCtx.createGain();
  impactGain.gain.setValueAtTime(0.0001, now);
  impactGain.gain.setValueAtTime(0.0001, now + duration - 0.12);
  impactGain.gain.linearRampToValueAtTime(baseVolume * 0.45, now + duration - 0.10);
  impactGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.08);

  impactOsc.connect(impactGain);
  impactGain.connect(audioCtx.destination);

  noiseSource.start(now);
  noiseSource.stop(now + duration);
  impactOsc.start(now + duration - 0.12);
  impactOsc.stop(now + duration + 0.08);
};

export default playSlidingDoorCloseSound;
