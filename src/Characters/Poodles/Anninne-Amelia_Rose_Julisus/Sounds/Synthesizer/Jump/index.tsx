/**
 * Anninne-Amelia Rose Julisus: Jump Synthesizer
 */

export * from './Running';
export * from './Hop';

export function playJumpSound(
  ctx: AudioContext,
  sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
  hasReverb: boolean
) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  sfxConnector(gain, hasReverb);
  osc.start(now);
  osc.stop(now + 0.5);
}
