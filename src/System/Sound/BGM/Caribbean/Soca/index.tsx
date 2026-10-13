import { SoundContext } from '../../../SoundContext';

export const SocaLogic = {
  startSocaMusic(contextState: any) {
    const { ctx, musicGain } = contextState;
    if (contextState.musicInterval) return;
    const tempo = 160; 
    const beatTime = 60 / tempo;
    contextState.lastScheduledTime = ctx.currentTime;
    
    const playKick = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
      gain.gain.setValueAtTime(0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      osc.connect(gain);
      gain.connect(musicGain);
      osc.start(time);
      osc.stop(time + 0.1);
    };

    const playSnare = (time: number) => {
      const noise = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for(let i=0; i<buffer.length; i++) data[i] = Math.random() * 2 - 1;
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, time);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(musicGain);
      noise.start(time);
      noise.stop(time + 0.1);
    };

    const schedule = () => {
      while (contextState.lastScheduledTime < ctx.currentTime + 0.5) {
        playKick(contextState.lastScheduledTime);
        if (Math.random() > 0.5) playSnare(contextState.lastScheduledTime + beatTime * 0.5);
        playKick(contextState.lastScheduledTime + beatTime);
        playSnare(contextState.lastScheduledTime + beatTime);
        playKick(contextState.lastScheduledTime + beatTime * 2);
        if (Math.random() > 0.5) playSnare(contextState.lastScheduledTime + beatTime * 2.5);
        playKick(contextState.lastScheduledTime + beatTime * 3);
        playSnare(contextState.lastScheduledTime + beatTime * 3);
        contextState.lastScheduledTime += beatTime * 4;
      }
    };
    contextState.musicInterval = setInterval(schedule, 100);
  },

  stopSocaMusic(contextState: any) {
    if (contextState.musicInterval) {
      clearInterval(contextState.musicInterval);
      contextState.musicInterval = null;
    }
  }
};
