/**
 * Abigay Rose Kone: Hop Synthesizer
 */

export function playHopSound(
  ctx: AudioContext,
  sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
  hasReverb: boolean
) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.1);
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  osc.connect(gain);
  sfxConnector(gain, hasReverb);
  osc.start(now);
  osc.stop(now + 0.1);
}
