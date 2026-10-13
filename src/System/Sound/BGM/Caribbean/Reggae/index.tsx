import { SoundContext } from '../../../SoundContext';

export const ReggaeLogic = {
  startReggae(contextState: any) {
    const { ctx, musicGain } = contextState;
    if (contextState.musicInterval) return;
    const tempo = 120;
    const beatTime = 60 / tempo;
    contextState.lastScheduledTime = ctx.currentTime;
    
    const playBass = (time: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 0.8);
      osc.connect(gain);
      gain.connect(musicGain);
      osc.start(time);
      osc.stop(time + beatTime * 0.8);
    };

    const schedule = () => {
      while (contextState.lastScheduledTime < ctx.currentTime + 0.5) {
        playBass(contextState.lastScheduledTime, 55);
        contextState.lastScheduledTime += beatTime * 4;
      }
    };
    contextState.musicInterval = setInterval(schedule, 100);
  },

  stopReggae(contextState: any) {
    if (contextState.musicInterval) {
      clearInterval(contextState.musicInterval);
      contextState.musicInterval = null;
    }
  }
};
