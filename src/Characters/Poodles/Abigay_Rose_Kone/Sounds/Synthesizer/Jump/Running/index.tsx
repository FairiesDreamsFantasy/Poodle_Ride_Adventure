/**
 * Abigay Rose Kone: Running Jump Synthesizer
 */

export function playRunningJumpSound(
  ctx: AudioContext,
  sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
  hasReverb: boolean
) {
  const now = ctx.currentTime;

  // 1. Tonal Sweep
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(100, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
  oscGain.gain.setValueAtTime(0.3, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(oscGain);
  sfxConnector(oscGain, hasReverb);
  osc.start(now);
  osc.stop(now + 0.4);

  // 2. Air / Wind Noise Sweep
  const bufferSize = Math.floor(ctx.sampleRate * 0.4);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(1500, now + 0.3);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.1, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  noise.connect(filter);
  filter.connect(noiseGain);
  sfxConnector(noiseGain, hasReverb);
  noise.start(now);
  noise.stop(now + 0.4);
}
