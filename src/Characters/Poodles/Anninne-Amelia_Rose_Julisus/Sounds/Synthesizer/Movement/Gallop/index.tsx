/**
 * Anninne-Amelia Rose Julisus: Gallop Synthesizer
 * [PRESERVED ARTISTIC CRAFT: 1-2-3 (400ms) pattern]
 */

export const ANNINNE_AMELIA_GALLOP = {
  timing: [0, 0.08, 0.2],
  volumes: [0.25, 0.3, 0.5],
  pitches: [55, 50, 45]
};

export function playAnninneAmeliasGallop(
  ctx: AudioContext,
  sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
  surfaceType: 'hard' | 'soft',
  hasReverb: boolean,
  area: string
) {
  const now = ctx.currentTime;

  const playThump = (time: number, volume: number, freq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.1);
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(gain);
    sfxConnector(gain, hasReverb);
    osc.start(time);
    osc.stop(time + 0.1);
  };

  const playGrassSwish = (time: number, volume: number) => {
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(1000, time);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, time);
    filter.frequency.exponentialRampToValueAtTime(1200, time + 0.12);
    filter.Q.setValueAtTime(1.5, time);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume * 0.6, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    noise.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(gain);
    sfxConnector(gain, hasReverb);
    noise.start(time);
  };

  if (surfaceType === 'hard') {
    ANNINNE_AMELIA_GALLOP.timing.forEach((offset, i) => {
      playThump(now + offset, ANNINNE_AMELIA_GALLOP.volumes[i], ANNINNE_AMELIA_GALLOP.pitches[i]);
    });
  } else {
    playGrassSwish(now, 0.65);
  }
}
