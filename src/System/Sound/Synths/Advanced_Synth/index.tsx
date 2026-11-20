import { ISynth } from "../I_Synth";

/**
 * Advanced Yamaha Synthesizer
 * Authentic 2-operator Frequency Modulation (FM) sound synthesis engine.
 * Grounded in mathematical acoustics (carrier, modulator, modulation index, harmonic ratio).
 */
export class AdvancedSynth implements ISynth {
  constructor(
    private pannerFactory: (x: number, y: number, z: number) => PannerNode,
    private sfxConnector: (node: AudioNode, hasReverb: boolean) => void
  ) {}

  /**
   * Core Yamaha 2-Operator FM Sound Synthesis Engine
   * Frequency modulation with dynamic envelope scaling, harmonic modulation index, and 3D panning.
   */
  public playFMSound(
    ctx: AudioContext,
    time: number,
    freq: number,
    duration: number,
    modRatio: number,
    modDepth: number,
    hasReverb: boolean,
    volScale: number = 1.0,
    coords: [number, number, number] = [0, 0, 0]
  ): void {
    const carrier = ctx.createOscillator();
    const carrierGain = ctx.createGain();
    const modulator = ctx.createOscillator();
    const modulatorGain = ctx.createGain();
    const panner = this.pannerFactory(coords[0], coords[1], coords[2]);

    carrier.type = 'sine';
    modulator.type = 'sine';

    carrier.frequency.setValueAtTime(freq, time);
    modulator.frequency.setValueAtTime(freq * modRatio, time);

    modulatorGain.gain.setValueAtTime(modDepth, time);
    modulatorGain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);
    carrier.connect(carrierGain);
    carrierGain.connect(panner);
    this.sfxConnector(panner, hasReverb);

    carrierGain.gain.setValueAtTime(0, time);
    carrierGain.gain.linearRampToValueAtTime(0.3 * volScale, time + 0.01);
    carrierGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    modulator.start(time);
    carrier.start(time);
    modulator.stop(time + duration);
    carrier.stop(time + duration);
  }

  /**
   * Authentic Grass Swish Noise Synthesizer (for outdoor/soft terrain)
   */
  public playGrassSwish(ctx: AudioContext, time: number, vol: number): void {
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1500, time);
    filter.frequency.exponentialRampToValueAtTime(800, time + 0.1);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol * 0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    const panner = this.pannerFactory(0, 0, 0);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    this.sfxConnector(panner, false);

    noise.start(time);
  }

  playPoodleGallop(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;

    if (surfaceType === 'hard') {
      if (animal === 'Abigail Marigold Kenyatta' || animal === 'Abigail Marigold_Kenyatta') {
        // AA Standardization: 1-2-3 (300ms) FM rhythm
        this.playFMSound(ctx, now, 65, 0.16, 1.4, 400 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.06, 60, 0.16, 1.4, 300 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.15, 55, 0.20, 1.4, 600 * volScale, hasReverb);
      } else if (animal === 'Anninne-Amelia Rose Julisus') {
        // Standardized 1-2-3 (400ms) FM rhythm with personal resonant timbre
        this.playFMSound(ctx, now, 62, 0.20, 1.4, 420 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.08, 57, 0.20, 1.4, 315 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.20, 52, 0.25, 1.4, 630 * volScale, hasReverb);
      } else if (animal === 'Dymond Daisy Qin-Reynolds') {
        // Standardized 1-2-3 (400ms) FM pattern with peach-resonance
        this.playFMSound(ctx, now, 58, 0.20, 1.4, 390 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.08, 53, 0.20, 1.4, 290 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.20, 48, 0.25, 1.4, 580 * volScale, hasReverb);
      } else {
        // Empress Abigay Rose Kone: Iconic 1-2-3 (400ms) FM rhythm
        this.playFMSound(ctx, now, 60, 0.20, 1.4, 400 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.08, 55, 0.20, 1.4, 300 * volScale, hasReverb);
        this.playFMSound(ctx, now + 0.20, 50, 0.25, 1.4, 600 * volScale, hasReverb);
      }
    } else {
      // Soft surface: Grassy swish layered with mellow FM thumps
      this.playGrassSwish(ctx, now, 0.3 * volScale);
      this.playFMSound(ctx, now, 60, 0.15, 1.4, 240 * volScale, false);
      this.playFMSound(ctx, now + 0.08, 55, 0.15, 1.4, 180 * volScale, false);
      this.playFMSound(ctx, now + 0.20, 50, 0.20, 1.4, 360 * volScale, false);
    }
  }

  playPoodleWalk(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;
    if (surfaceType === 'hard') {
      this.playFMSound(ctx, now, 50, 0.25, 1.2, 200 * volScale, hasReverb);
      this.playFMSound(ctx, now + 0.25, 45, 0.25, 1.2, 250 * volScale, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.2 * volScale);
      this.playGrassSwish(ctx, now + 0.25, 0.25 * volScale);
    }
  }

  playPoodleSlowWalk(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;
    if (surfaceType === 'hard') {
      this.playFMSound(ctx, now, 48, 0.35, 1.15, 180 * volScale, hasReverb);
      this.playFMSound(ctx, now + 0.40, 43, 0.35, 1.15, 220 * volScale, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.18 * volScale);
      this.playGrassSwish(ctx, now + 0.40, 0.22 * volScale);
    }
  }

  playPoodleVerySlowWalk(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;
    if (surfaceType === 'hard') {
      this.playFMSound(ctx, now, 45, 0.45, 1.1, 160 * volScale, hasReverb);
      this.playFMSound(ctx, now + 0.55, 40, 0.45, 1.1, 200 * volScale, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.15 * volScale);
      this.playGrassSwish(ctx, now + 0.55, 0.18 * volScale);
    }
  }

  playPoodleCanter(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;
    if (surfaceType === 'hard') {
      this.playFMSound(ctx, now, 65, 0.18, 1.6, 350 * volScale, hasReverb);
      this.playFMSound(ctx, now + 0.12, 58, 0.18, 1.6, 280 * volScale, hasReverb);
      this.playFMSound(ctx, now + 0.24, 52, 0.22, 1.6, 500 * volScale, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.25 * volScale);
      this.playGrassSwish(ctx, now + 0.12, 0.25 * volScale);
      this.playGrassSwish(ctx, now + 0.24, 0.35 * volScale);
    }
  }

  playPoodleTrot(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;
    if (surfaceType === 'hard') {
      this.playFMSound(ctx, now, 58, 0.16, 1.3, 300 * volScale, hasReverb);
      this.playFMSound(ctx, now + 0.18, 52, 0.16, 1.3, 300 * volScale, hasReverb);
    } else {
      this.playGrassSwish(ctx, now, 0.25 * volScale);
      this.playGrassSwish(ctx, now + 0.18, 0.25 * volScale);
    }
  }

  playPoodleScoot(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;
    const now = ctx.currentTime;

    if (surfaceType === 'soft') {
      this.playGrassSwish(ctx, now, 0.4 * volScale);
      return;
    }

    // Quick FM slidey scoot
    this.playFMSound(ctx, now, 150, 0.15, 0.8, 400 * volScale, hasReverb);

    // Filtered noise slide component
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.15);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05 * volScale, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    const panner = this.pannerFactory(0, 0, 0);
    gain.connect(panner);
    this.sfxConnector(panner, hasReverb);
    noise.start();
  }

  playRunningJumpSound(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    const volScale = surfaceType === 'hard' ? 1.0 : 0.7;

    // Shimmering FM Whoosh (Yamaha dual-operator ramp)
    const carrier = ctx.createOscillator();
    const carrierGain = ctx.createGain();
    const modulator = ctx.createOscillator();
    const modulatorGain = ctx.createGain();
    const panner = this.pannerFactory(0, 0, 0);

    carrier.frequency.setValueAtTime(100, now);
    carrier.frequency.exponentialRampToValueAtTime(800, now + 0.4);

    modulator.frequency.setValueAtTime(250, now);
    modulatorGain.gain.setValueAtTime(1000, now);
    modulatorGain.gain.exponentialRampToValueAtTime(1, now + 0.4);

    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);
    carrier.connect(carrierGain);
    carrierGain.connect(panner);
    this.sfxConnector(panner, hasReverb);

    carrierGain.gain.setValueAtTime(0.2 * volScale, now);
    carrierGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    modulator.start(now);
    carrier.start(now);
    modulator.stop(now + 0.4);
    carrier.stop(now + 0.4);
  }

  playJumpSound(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const volScale = surfaceType === 'hard' ? 1.0 : 0.7;
    // Classic Yamaha FM bell-like jump (Euler harmonic ratio: 2.71828)
    this.playFMSound(ctx, ctx.currentTime, 200, 0.6, 2.71828, 500 * volScale, hasReverb);
  }

  playPoodleThump(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const volScale = surfaceType === 'hard' ? 1.0 : 0.6;
    if (surfaceType === 'soft') {
      this.playGrassSwish(ctx, ctx.currentTime, 0.4 * volScale);
      return;
    }
    // Solid Yamaha FM impact
    this.playFMSound(ctx, ctx.currentTime, 45, 0.25, 0.5, 800 * volScale, hasReverb);
  }

  playElegantBark(
    ctx: AudioContext,
    destination: AudioNode,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string,
    disableInternalEcho: boolean,
    animal: string = 'Abigay Rose Kone'
  ): void {
    const now = ctx.currentTime;
    let basePitch = 900;
    if (animal === 'Anninne-Amelia Rose Julisus') {
      basePitch = 880;
    } else if (animal === 'Abigail Marigold Kenyatta' || animal === 'Abigail Marigold_Kenyatta') {
      basePitch = 940;
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      basePitch = 860;
    }

    // Authentic Yamaha FM Elegant Bark: resonant bell-yip with frequency modulation
    this.playFMSound(ctx, now, basePitch, 0.12, 1.5, 600, hasReverb);
    this.playFMSound(ctx, now + 0.015, basePitch * 0.94, 0.10, 1.5, 450, hasReverb);

    if (!disableInternalEcho) {
      this.playFMSound(ctx, now + 0.15, basePitch, 0.10, 1.5, 200, hasReverb);
      this.playFMSound(ctx, now + 0.30, basePitch, 0.08, 1.5, 100, hasReverb);
    }
  }
}

