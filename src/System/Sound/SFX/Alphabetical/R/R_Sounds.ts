
import { SoundContext } from '../../../SoundContext';
import * as AbigaySynth from "../../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as DymondSynth from "../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";

export const R_Sounds = {
  async playRabbitGrunt(context: SoundContext) {
    const { ctx, sfxGain } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
  },

  async playRabbitJumpSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
    
    // Thump
    const tOsc = ctx.createOscillator();
    const tGain = ctx.createGain();
    const tPanner = createPanner(x, y, z);
    tOsc.type = 'triangle';
    tOsc.frequency.setValueAtTime(60, now);
    tOsc.frequency.exponentialRampToValueAtTime(20, now + 0.1);
    tGain.gain.setValueAtTime(0.2, now);
    tGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    tOsc.connect(tGain);
    tGain.connect(tPanner);
    tPanner.connect(sfxGain);
    tOsc.start(now);
    tOsc.stop(now + 0.1);
  },

  async playRunningJumpSound(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.3);
  },

  async playRockingHorse(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, createPanner, connectSFX } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.2);
    osc.frequency.linearRampToValueAtTime(150, now + 0.4);
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.linearRampToValueAtTime(0, now + 0.4);
    const panner = createPanner(x, y, z);
    connectSFX(panner, true);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    osc.start(now);
    osc.stop(now + 0.4);
  },

  async playRockingGoat(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, createPanner, connectSFX } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.25);
    osc.frequency.linearRampToValueAtTime(180, now + 0.5);
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gain.gain.linearRampToValueAtTime(0, now + 0.5);
    const panner = createPanner(x, y, z);
    connectSFX(panner, true);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    osc.start(now);
    osc.stop(now + 0.5);
  },

  async playRailwayRumble(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const duration = 3.0;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(40, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + duration);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.03, now + duration / 2);
    gain.gain.linearRampToValueAtTime(0.01, now + duration);
    osc.connect(gain);
    gain.connect(createPanner(x, y, z)).connect(sfxGain);
    osc.start();
    osc.stop(now + duration);
  },

  async playRibbonGraspSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(createPanner(x, y, z)).connect(sfxGain);
    noise.start();
  },

  async playReturnUprightSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    const { ctx, sfxGain, createPanner } = context;
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playReturnUprightSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playReturnUprightSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else if (animal === 'Abigail Marigold Kenyatta') {
      AbigailSynth.playReturnUprightSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else {
      AbigaySynth.playReturnUprightSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    }
  },

  async playRampAscend(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start();
    osc.stop(now + 0.15);
  },

  async playRampDescend(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start();
    osc.stop(now + 0.15);
  },

  async playRampBeep(context: SoundContext, step: number, isDescending: boolean = false, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    const baseFreq = isDescending ? 880 : 440;
    const freqStep = 110;
    const freq = isDescending ? baseFreq - (step - 1) * freqStep : baseFreq + (step - 1) * freqStep;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start();
    osc.stop(now + 0.1);
  },

  async playRabbitMoveSound(contextState: any, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain } = contextState;
    const now = ctx.currentTime;
    for (let i = 0; i < 2; i++) {
        const time = now + i * 0.15;
        // Delegate back to sound manager's playThump
        contextState.playThump(time, x, y, z);
        
        const noise = ctx.createBufferSource();
        const duration = 0.05;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for(let j=0; j<buffer.length; j++) data[j] = Math.random() * 2 - 1;
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, time);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.02, time);
        g.gain.exponentialRampToValueAtTime(0.001, time + duration);
        noise.connect(filter);
        filter.connect(g);
        g.connect(sfxGain);
        noise.start(time);
        noise.stop(time + duration);
    }
  },

  async playRabbitPurrSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const duration = 0.5;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(40, now);
    for (let i = 0; i < 10; i++) {
        const t = now + (i / 10) * duration;
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.03);
    }
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    osc.start(now);
    osc.stop(now + duration);
  },

  async playRabbitCluckingSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, count: number = 5) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    for (let i = 0; i < count; i++) {
        const time = now + i * 0.15;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const panner = createPanner(x, y, z);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(100, time + 0.05);
        gain.gain.setValueAtTime(0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(sfxGain);
        osc.start(time);
        osc.stop(time + 0.05);
    }
  },

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
