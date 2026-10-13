import { ISynth } from "../I_Synth";
import * as AbigaySynth from "../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as DymondSynth from "../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";

/**
 * Classic Synth
 * Standard 8-bit inspired but refined synthesis for the Poodle Ride Adventure.
 */
export class ClassicSynth implements ISynth {
  constructor(
    private pannerFactory: (x: number, y: number, z: number) => PannerNode,
    private sfxConnector: (node: AudioNode, hasReverb: boolean) => void
  ) {}

  private playThump(ctx: AudioContext, startTime: number, volume: number, freq: number, hasReverb: boolean) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, startTime + 0.1);
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
    osc.connect(gain);
    this.sfxConnector(gain, hasReverb);
    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  playPoodleGallop(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playAnninneAmeliasGallop(ctx, this.sfxConnector, surfaceType, hasReverb, area);
    } else if (animal === 'Abigail Marigold Kenyatta') {
      AbigailSynth.playAbigailGallop(ctx, this.sfxConnector, surfaceType, hasReverb, area);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playDymondGallop(ctx, this.sfxConnector, surfaceType, hasReverb, area);
    } else {
      AbigaySynth.playEmpressAbigaysGallop(ctx, this.sfxConnector, surfaceType, hasReverb, area);
    }
  }

  playPoodleCanter(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playAnninneAmeliaCanter(ctx, this.sfxConnector, surfaceType, hasReverb);
    } else {
      AbigaySynth.playCanter(ctx, this.sfxConnector, surfaceType, hasReverb);
    }
  }

  playPoodleTrot(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playAnninneAmeliaTrot(ctx, this.sfxConnector, surfaceType, hasReverb);
    } else {
      AbigaySynth.playTrot(ctx, this.sfxConnector, surfaceType, hasReverb);
    }
  }

  playPoodleWalk(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playAnninneAmeliaWalk(ctx, this.sfxConnector, surfaceType, hasReverb, area);
    } else {
      AbigaySynth.playNyhabinghiWalk(ctx, this.sfxConnector, surfaceType, hasReverb);
    }
  }

  playPoodleSlowWalk(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playAnninneAmeliaSlowWalk(ctx, this.sfxConnector, surfaceType, hasReverb);
    } else {
      AbigaySynth.playSlowWalk(ctx, this.sfxConnector, surfaceType, hasReverb);
    }
  }

  playPoodleVerySlowWalk(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playAnninneAmeliaVerySlowWalk(ctx, this.sfxConnector, surfaceType, hasReverb);
    } else {
      AbigaySynth.playVerySlowWalk(ctx, this.sfxConnector, surfaceType, hasReverb);
    }
  }

  playPoodleScoot(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    const now = ctx.currentTime;
    if (surfaceType === 'hard') {
      this.playThump(ctx, now, 0.3, 60, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.5, hasReverb);
    }
  }

  playRunningJumpSound(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playRunningJumpSound(ctx, this.sfxConnector, hasReverb);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playRunningJumpSound(ctx, this.sfxConnector, hasReverb);
    } else if (animal === 'Abigail Marigold Kenyatta' || animal === 'Abigail Marigold_Kenyatta') {
      AbigailSynth.playRunningJumpSound(ctx, this.sfxConnector, hasReverb);
    } else {
      AbigaySynth.playRunningJumpSound(ctx, this.sfxConnector, hasReverb);
    }
  }

  playJumpSound(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playJumpSound(ctx, this.sfxConnector, hasReverb);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playJumpSound(ctx, this.sfxConnector, hasReverb);
    } else if (animal === 'Abigail Marigold Kenyatta' || animal === 'Abigail Marigold_Kenyatta') {
      AbigailSynth.playJumpSound(ctx, this.sfxConnector, hasReverb);
    } else {
      AbigaySynth.playJumpSound(ctx, this.sfxConnector, hasReverb);
    }
  }

  playElegantBark(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, disableInternalEcho: boolean): void {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(400, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    osc2.frequency.setValueAtTime(600, now);
    osc2.frequency.exponentialRampToValueAtTime(450, now + 0.15);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain);
    osc2.connect(gain);
    this.sfxConnector(gain, hasReverb);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.15);
    osc2.stop(now + 0.15);
  }

  playPoodleThump(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    const now = ctx.currentTime;
    if (surfaceType === 'hard') {
      this.playThump(ctx, now, 0.5, 45, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.6, hasReverb);
    }
  }

  private playGrassSwish(ctx: AudioContext, startTime: number, volume: number, hasReverb: boolean) {
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(800, startTime);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, startTime);
    filter.frequency.exponentialRampToValueAtTime(1000, startTime + 0.12);
    filter.Q.setValueAtTime(1.2, startTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume * 0.55, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
    noise.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(gain);
    this.sfxConnector(gain, hasReverb);
    noise.start(startTime);
  }
}
