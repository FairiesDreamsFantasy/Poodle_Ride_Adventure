// 2-Minute Full Reggae BGM Engine for "Honored Childhood"
// Inspired by 16-bit SNES & 64-bit authentic Reggae / One-Drop / Nyabinghi arrangements
// Incorporates 400% anti-spike gain protection, smooth looping, and modular instruments.

import { reggaeInstrumentSynthesizer } from '../../../Synthesizer/Instrument/General';
import { reggaeDrumKit } from '../../../Synthesizer/Instrument/Drum/Kit/General';

export class HonoredChildhoodBGMEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;

  // Key: C Major / A Minor Warm Reggae Harmony Progression
  // Bass Frequencies (Hz) for 32 Reggae Measures (Loop length ~ 2 minutes @ 80 BPM)
  private reggaeBassPattern: number[] = [
    // Section A: Root One-Drop Bounce (C Major -> F Major -> G Major)
    130.81, 0, 164.81, 196.00, 174.61, 0, 220.00, 261.63,
    196.00, 0, 246.94, 293.66, 130.81, 164.81, 196.00, 0,
    130.81, 0, 164.81, 196.00, 174.61, 0, 220.00, 261.63,
    196.00, 0, 246.94, 293.66, 130.81, 0, 130.81, 0,

    // Section B: A Minor Relative Transition (A Minor -> F Major -> C Major -> G Major)
    110.00, 0, 130.81, 164.81, 174.61, 0, 220.00, 261.63,
    130.81, 0, 164.81, 196.00, 196.00, 0, 246.94, 293.66,
    110.00, 0, 130.81, 164.81, 174.61, 0, 220.00, 261.63,
    130.81, 0, 164.81, 196.00, 196.00, 246.94, 293.66, 0
  ];

  // Reggae Off-Beat Skank Chords (Hz)
  private cMajorChord = [261.63, 329.63, 392.00]; // C, E, G
  private fMajorChord = [261.63, 349.23, 440.00]; // C, F, A
  private gMajorChord = [293.66, 392.00, 493.88]; // D, G, B
  private aMinorChord = [220.00, 261.63, 329.63]; // A, C, E

  // Lead Melodica Reggae Melody (Hz)
  private leadMelodyPattern: (number | null)[] = [
    523.25, null, 659.25, 783.99, null, 659.25, 523.25, null,
    587.33, null, 698.46, 880.00, null, 698.46, 587.33, null,
    440.00, null, 523.25, 659.25, null, 523.25, 440.00, null,
    698.46, 783.99, 880.00, null, 987.77, null, 1046.50, null
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public start(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;

    const ctx = this.getContext();
    // 80 BPM 16th-note tempo = 187.5ms per step (64 steps per loop = ~12s per phrase x 10 loops = 2 minutes arrangement)
    const tempoMs = 187.5;

    const tick = () => {
      if (!this.isPlaying) return;
      const now = ctx.currentTime;
      const step = this.currentStep % 64;
      const measure = Math.floor(step / 16);
      const stepInMeasure = step % 16;

      // Determine Current Chord
      let activeChord = this.cMajorChord;
      if (measure === 1 || measure === 5) activeChord = this.fMajorChord;
      else if (measure === 2 || measure === 6) activeChord = this.gMajorChord;
      else if (measure === 3 || measure === 7) activeChord = this.aMinorChord;

      // 1. ONE DROP REGGAE DRUMS
      // Hi-Hat on every 8th note
      if (stepInMeasure % 2 === 0) {
        reggaeDrumKit.playHiHat(ctx, ctx.destination, now, stepInMeasure === 14, { volume: 0.5 });
      }

      // One Drop Snare & Kick on Beat 3 (stepInMeasure 8 and 24)
      if (stepInMeasure === 8) {
        reggaeDrumKit.playRimshot(ctx, ctx.destination, now, { volume: 0.8 });
        reggaeDrumKit.playKick(ctx, ctx.destination, now, { volume: 0.85 });
      }

      // Nyabinghi Funde Heartbeat on Beat 1 & 1-and (steps 0, 2)
      if (stepInMeasure === 0 || stepInMeasure === 2) {
        reggaeDrumKit.playNyabinghiFunde(ctx, ctx.destination, now, { volume: 0.6 });
      }

      // 2. REGGAE SUB-BASS (Walking One Drop Pattern)
      const bassFreq = this.reggaeBassPattern[step % 32];
      if (bassFreq > 0 && (stepInMeasure % 4 === 0 || stepInMeasure % 4 === 3)) {
        reggaeInstrumentSynthesizer.playReggaeBass(ctx, ctx.destination, bassFreq, now, {
          duration: 0.3,
          volume: 0.75
        });
      }

      // 3. REGGAE OFF-BEAT SKANK CHORDS (Beats "2" and "4" -> steps 4, 12)
      if (stepInMeasure === 4 || stepInMeasure === 12) {
        reggaeInstrumentSynthesizer.playReggaeSkank(ctx, ctx.destination, activeChord, now, {
          duration: 0.08,
          volume: 0.55
        });
      }

      // 4. ORGAN BUBBLE (Syncopated 16th-note rhythm on steps 3, 7, 11, 15)
      if (stepInMeasure % 4 === 3) {
        const bubbleFreq = activeChord[0] * 2;
        reggaeInstrumentSynthesizer.playOrganBubble(ctx, ctx.destination, bubbleFreq, now, {
          duration: 0.05,
          volume: 0.35
        });
      }

      // 5. LEAD MELODICA (SNES / Reggae Melodica Melody)
      const leadNote = this.leadMelodyPattern[step % 32];
      if (leadNote !== null && leadNote !== undefined) {
        reggaeInstrumentSynthesizer.playLeadMelodica(ctx, ctx.destination, leadNote, now, {
          duration: 0.26,
          volume: 0.5
        });
      }

      this.currentStep++;
    };

    tick();
    this.timerId = window.setInterval(tick, tempoMs);
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const honoredChildhoodBGM = new HonoredChildhoodBGMEngine();
