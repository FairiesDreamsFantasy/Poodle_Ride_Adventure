
import { SoundContext } from '../../../SoundContext';

export const G_Sounds = {
  async playGoatMunch(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const time = now + i * 0.3;
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let j = 0; j < noiseBuffer.length; j++) output[j] = Math.random() * 2 - 1;
      
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, time);
      filter.Q.setValueAtTime(2, time);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(createPanner(x, y, z)).connect(sfxGain);
      noise.start(time);
    }
  },

  async playGoatSound(context: SoundContext, isLong: boolean = false, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const hardSurfaces = ['Foyer', 'AdventureHouseFoyer', 'AdventureHouseHallway', 'AdventureHouseTeaRoom', 'AdventureHouseMusicRoom', 'AdventureHouseBridgeHallway', 'AdventureHouseTrenchHallway'];
    const isOutdoor = !hardSurfaces.includes(area);
    if (!isOutdoor) return;

    const now = ctx.currentTime;
    const duration = isLong ? 1.5 : 0.6;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + duration);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.Q.setValueAtTime(5, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + duration);
  }
};
