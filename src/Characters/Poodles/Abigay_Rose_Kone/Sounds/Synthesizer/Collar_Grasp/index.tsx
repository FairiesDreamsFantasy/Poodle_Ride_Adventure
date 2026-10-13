/**
 * Abigay Rose Kone: Collar Grasp Synthesizer
 */

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
