import { SoundContext } from '../../../../SoundContext';

let activeChimeOscillators = 0;
const MAX_CHIME_OSCILLATORS = 12;

export const TeaPartyWindChimes = {
  async playAmbientChimes(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.05) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    
    // Sweeter, higher pentatonic scale for tea party
    const chimePipes = [1500, 1687.5, 1875, 2250, 2531.25, 2812.5, 3375];
    
    const strikesCount = 4 + Math.floor(Math.random() * 2);
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
      const delay = index * (0.04 + Math.random() * 0.1);
      const strikeTime = now + delay;
      const chimeDuration = 2.0 + Math.random() * 0.8;
      
      const primaryOsc = ctx.createOscillator();
      const overtoneOsc = ctx.createOscillator();
      const primaryGain = ctx.createGain();
      const overtoneGain = ctx.createGain();
      const panner = createPanner(x, y, z);
      
      primaryOsc.type = 'sine';
      primaryOsc.frequency.setValueAtTime(freq, strikeTime);
      
      primaryGain.gain.setValueAtTime(0, strikeTime);
      primaryGain.gain.linearRampToValueAtTime(volume * 0.7, strikeTime + 0.008);
      primaryGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + chimeDuration);
      
      const overtoneFreq = freq * 3.1; // Sharper resonance
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(overtoneFreq, strikeTime);
      
      overtoneGain.gain.setValueAtTime(0, strikeTime);
      overtoneGain.gain.linearRampToValueAtTime(volume * 0.15, strikeTime + 0.004);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 0.4);
      
      primaryOsc.connect(primaryGain);
      primaryGain.connect(panner);
      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(panner);
      panner.connect(sfxGain);
      
      primaryOsc.start(strikeTime);
      overtoneOsc.start(strikeTime);
      primaryOsc.stop(strikeTime + chimeDuration);
      overtoneOsc.stop(strikeTime + 0.4);

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
