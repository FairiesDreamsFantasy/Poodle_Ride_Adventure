
import { SoundContext } from '../../../SoundContext';
import * as AbigaySynth from "../../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as DymondSynth from "../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";

export const C_Sounds = {
  async playCollarGraspSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    const { ctx, sfxGain, createPanner } = context;
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playCollarGraspSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playCollarGraspSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else if (animal === 'Abigail Marigold Kenyatta') {
      AbigailSynth.playCollarGraspSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else {
      AbigaySynth.playCollarGraspSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    }
  },

  async playCollisionSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.3);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.3);
  },

  async playCustomBeep(context: SoundContext, freq: number, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.frequency.setValueAtTime(freq, now);
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }
};
