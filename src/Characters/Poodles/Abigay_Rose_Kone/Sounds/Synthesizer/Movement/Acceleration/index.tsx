/**
 * Abigay Rose Kone: Acceleration Synthesizer
 */

export function playAccelerationSound(
  ctx: AudioContext,
  sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
  hasReverb: boolean
) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(100, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.5);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  sfxConnector(gain, hasReverb);

  osc.start(now);
  osc.stop(now + 0.5);
}
