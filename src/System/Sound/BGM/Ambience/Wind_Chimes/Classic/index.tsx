import { SoundContext } from '../../../../SoundContext';
import { SCIENTIFIC_CHIME_FREQUENCIES } from '../../../../../Registry/Sound/Ambience/Wind_Chimes/Scientific';

let activeChimeOscillators = 0;
const MAX_CHIME_OSCILLATORS = 12;

export const ClassicWindChimes = {
  async playAmbientChimes(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.06) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const chimePipes = SCIENTIFIC_CHIME_FREQUENCIES;
    const strikesCount = 3 + Math.floor(Math.random() * 2);
    const selectedFrequencies: number[] = [];
    const tempPipes = [...chimePipes];
    for (let i = 0; i < strikesCount; i++) {
      if (tempPipes.length === 0) break;
      const idx = Math.floor(Math.random() * tempPipes.length);
      selectedFrequencies.push(tempPipes.splice(idx, 1)[0]);
    }

    selectedFrequencies.forEach((freq, index) => {
      if (activeChimeOscillators >= MAX_CHIME_OSCILLATORS) return;
      activeChimeOscillators++;
      const delay = index * (0.05 + Math.random() * 0.12);
      const strikeTime = now + delay;
      const chimeDuration = 2.5 + Math.random() * 1.0;
      const primaryOsc = ctx.createOscillator();
      const overtoneOsc = ctx.createOscillator();
      const primaryGain = ctx.createGain();
      const overtoneGain = ctx.createGain();
      const panner = createPanner(x, y, z);
      primaryOsc.type = 'sine';
      primaryOsc.frequency.setValueAtTime(freq, strikeTime);
      primaryOsc.frequency.linearRampToValueAtTime(freq + (Math.random() * 4 - 2), strikeTime + chimeDuration);
      primaryGain.gain.setValueAtTime(0, strikeTime);
      primaryGain.gain.linearRampToValueAtTime(volume * 0.8, strikeTime + 0.01);
      primaryGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + chimeDuration);
      const overtoneFreq = freq * 2.76;
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(overtoneFreq, strikeTime);
      overtoneGain.gain.setValueAtTime(0, strikeTime);
      overtoneGain.gain.linearRampToValueAtTime(volume * 0.22, strikeTime + 0.005);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 0.6);
      primaryOsc.connect(primaryGain);
      primaryGain.connect(panner);
      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(panner);
      panner.connect(sfxGain);
      primaryOsc.start(strikeTime);
      overtoneOsc.start(strikeTime);
      primaryOsc.stop(strikeTime + chimeDuration);
      overtoneOsc.stop(strikeTime + 0.6);

      setTimeout(() => {
        activeChimeOscillators = Math.max(0, activeChimeOscillators - 1);
        try {
          primaryOsc.disconnect();
          overtoneOsc.disconnect();
          primaryGain.disconnect();
          overtoneGain.disconnect();
          panner.disconnect();
        } catch (e) {}
      }, (chimeDuration + delay + 0.1) * 1000);
    });
  }
};
