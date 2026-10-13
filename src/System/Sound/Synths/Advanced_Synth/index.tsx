import { ISynth } from "../I_Synth";
import * as AbigaySynth from "../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as DymondSynth from "../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";

/**
 * Advanced Synth
 * Enhanced synthesis with richer textures and dynamic modulation.
 */
export class AdvancedSynth implements ISynth {
  constructor(
    private pannerFactory: (x: number, y: number, z: number) => PannerNode,
    private sfxConnector: (node: AudioNode, hasReverb: boolean) => void
  ) {}

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

  playPoodleScoot(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    const now = ctx.currentTime;
    if (surfaceType === 'hard') {
      this.playStep(ctx, now, 0.3, 300, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.4, hasReverb);
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

  playElegantBark(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, disableInternalEcho: boolean, animal: string = 'Abigay Rose Kone'): void {
    const now = ctx.currentTime;
    this.playStep(ctx, now, 0.1, 900, hasReverb);
  }

  playPoodleThump(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal: string = 'Abigay Rose Kone'): void {
    const now = ctx.currentTime;
    if (surfaceType === 'hard') {
      this.playStep(ctx, now, 0.5, 150, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.4, hasReverb);
    }
  }

  private playGrassSwish(ctx: AudioContext, startTime: number, volume: number, hasReverb: boolean) {
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(1200, startTime);
    const bpFilter = ctx.createBiquadFilter();
    bpFilter.type = 'bandpass';
    bpFilter.frequency.setValueAtTime(2800, startTime);
    bpFilter.frequency.exponentialRampToValueAtTime(1500, startTime + 0.25);
    bpFilter.Q.setValueAtTime(1.8, startTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume * 0.7, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);
    noise.connect(hpFilter);
    hpFilter.connect(bpFilter);
    bpFilter.connect(gain);
    this.sfxConnector(gain, hasReverb);
    noise.start(startTime);
  }

  private playStep(ctx: AudioContext, startTime: number, duration: number, freq: number, hasReverb: boolean) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(freq / 3, startTime + duration);
    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    this.sfxConnector(gain, hasReverb);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }
}
