import { SoundContext } from '../../../../../../SoundContext';

export async function playPianoMusic(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
  const { ctx, createPanner, connectSFX } = context;
  const now = ctx.currentTime;
  const notes = [261.63, 329.63, 392.00, 523.25];
  
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const startTime = now + (index * 0.2);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    const panner = createPanner(x, y, z);
    connectSFX(panner, true);
    osc.connect(gain);
    gain.connect(panner);
    osc.start(startTime);
    osc.stop(startTime + 0.5);
  });
}
