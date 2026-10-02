
import { SoundContext } from '../../../SoundContext';

export const S_Sounds = {
  setBitMode(contextState: any, mode: any) {
    contextState.currentBitMode = mode;
  },

  setSynthMode(contextState: any, mode: any) {
    contextState.currentSynthMode = mode;
  },

  setReverbProfile(contextState: any, profile: any) {
    contextState.init();
    const { ctx, reverbGain, reverbDelay, reverbFeedback, reverbFilter } = contextState;
    const now = ctx.currentTime;
    if (!profile) {
      reverbGain.gain.setTargetAtTime(0, now, 0.1);
      return;
    }
    
    reverbDelay.delayTime.setTargetAtTime(profile.delayTime, now, 0.1);
    reverbGain.gain.setTargetAtTime(profile.gain, now, 0.1);
    reverbFeedback.gain.setTargetAtTime(profile.feedback, now, 0.1);
    if (profile.filterFreq) {
      reverbFilter.frequency.setTargetAtTime(profile.filterFreq, now, 0.1);
    }
  },

  setMuted(contextState: any, muted: boolean) {
    contextState.init();
    contextState.masterGain.gain.setValueAtTime(muted ? 0 : 1, contextState.ctx.currentTime);
  },

  setVolume(contextState: any, volume: number) {
    contextState.masterGain.gain.setValueAtTime(volume, contextState.ctx.currentTime);
  },

  async speak(contextState: any, text: string, language: any = 'EN_En-RP') {
    try {
      contextState.init();
      await contextState.ttsManager.speak(text, language || 'EN_En-RP');
    } catch (e) {
      console.error("SoundManager speak failed:", e);
    }
  },

  setTTSEngine(contextState: any, type: 'native' | 'gemini') {
    contextState.ttsManager.setEngine(type);
  },

  stopSpeech(contextState: any) {
    if (contextState.ttsManager) {
      contextState.ttsManager.stop();
    }
  },

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
    contextState.stopReggae();
  },

  async playSubwayPass(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const duration = 6; 
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + duration);
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + duration * 0.4);
    gain.gain.linearRampToValueAtTime(0.4, now + duration * 0.6);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    noise.start();
    noise.stop(now + duration);

    const rumble = ctx.createOscillator();
    const rumbleGain = ctx.createGain();
    rumble.type = 'sine';
    rumble.frequency.setValueAtTime(40, now);
    rumbleGain.gain.setValueAtTime(0, now);
    rumbleGain.gain.linearRampToValueAtTime(0.2, now + duration * 0.4); 
    rumbleGain.gain.linearRampToValueAtTime(0, now + duration);
    rumble.connect(rumbleGain);
    rumbleGain.connect(panner);
    rumble.start();
    rumble.stop(now + duration);
  },

  playSynthVoice(contextState: any, id: number, freq: number, duration: number, volume: number) {
    contextState.init();
    contextState.voiceManager.playVoice(id, freq, duration, volume);
  },

  async playStartSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.5);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.5);
  },

  async playSqueak(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start();
    osc.stop(now + 0.1);
  }
};
