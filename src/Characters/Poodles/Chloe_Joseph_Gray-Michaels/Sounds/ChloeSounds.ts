/**
 * ChloeSounds.ts
 * Comical and raspy synthesizer sound logic for Chloe Joseph Gray-Michaels.
 * She has a bad imitation of our crafted elegance, using slightly chaotic, higher pitch tones.
 */
export function playChloeImitationBark(ctx: AudioContext, destination: AudioNode) {
  if (!ctx || ctx.state === 'suspended') return;

  const now = ctx.currentTime;
  
  // High-pass pitch with rapid modulation to sound shallow and raspy (un-elegant imitation)
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(650, now); // Slightly screechy frequency
  osc1.frequency.exponentialRampToValueAtTime(150, now + 0.15);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(320, now);
  osc2.frequency.exponentialRampToValueAtTime(80, now + 0.18);

  gainNode.gain.setValueAtTime(0.3, now);
  gainNode.gain.linearRampToValueAtTime(0.01, now + 0.2);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.22);
  osc2.stop(now + 0.22);
}

export function playChloeGallopShortcuts(ctx: AudioContext, destination: AudioNode) {
  if (!ctx || ctx.state === 'suspended') return;

  const now = ctx.currentTime;
  
  // Sharp clicking/thumping sound to simulate jerky gallop imitation
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

  gain.gain.setValueAtTime(0.32, now);
  gain.gain.linearRampToValueAtTime(0.01, now + 0.09);

  osc.connect(gain);
  gain.connect(destination);

  osc.start(now);
  osc.stop(now + 0.1);
}
