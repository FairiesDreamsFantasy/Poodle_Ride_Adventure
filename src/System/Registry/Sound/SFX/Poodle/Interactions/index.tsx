/**
 * Poodle Interactions Synthesizer Registry
 * Consolidates Petting, Leaning, and Collar Grasp sounds.
 */

// --- Petting Sounds (Standardized Amplification) ---
export function playPoodlePetSound(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  animal: string = 'Abigay Rose Kone',
  volumeMultiplier: number = 1.0
) {
  const now = ctx.currentTime;
  const duration = 0.4;
  
  // Standardization "A": Amplified based on character
  let amplification = 1.0;
  if (animal === 'Abigay Rose Kone' || animal === 'Anninne-Amelia Rose Julisus' || animal === 'Dymond Daisy Qin-Reynolds') {
    amplification = 1.040; // 4% louder
  } else if (animal === 'Abigail Marigold Kenyatta') {
    amplification = 1.050; // 5% louder
  }

  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + duration);
  
  const gain = ctx.createGain();
  const panner = createPanner(x, y, z);
  
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.05 * volumeMultiplier * amplification, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);
  
  noise.start();
  noise.stop(now + duration);
}

// --- Leaning Sounds ---
export function playLeanForwardSound(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  volumeMultiplier: number = 1.0
) {
  const now = ctx.currentTime;
  const duration = 0.2;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04 * volumeMultiplier, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(createPanner(x, y, z)).connect(sfxGain);
  noise.start();
}

export function playReturnUprightSound(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  volumeMultiplier: number = 1.0
) {
  const now = ctx.currentTime;
  const duration = 0.2;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(600, now + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04 * volumeMultiplier, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(createPanner(x, y, z)).connect(sfxGain);
  noise.start();
}

// --- Collar Grasp ---
export function playCollarGraspSound(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  volumeMultiplier: number = 1.0
) {
  const now = ctx.currentTime;
  const frequencies = [2000, 2500, 3000];
  frequencies.forEach(f => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now);
    gain.gain.setValueAtTime(0.02 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(createPanner(x, y, z)).connect(sfxGain);
    osc.start();
    osc.stop(now + 0.1);
  });
}
