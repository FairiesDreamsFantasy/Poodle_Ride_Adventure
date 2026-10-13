/**
 * Scientific TTS Vocal Multi-Band Equalizer General Core
 * Parametric frequency shaping specifically calibrated for human vocal formants,
 * consonant crispness, vowel articulation, and low-fatigue narration listening.
 */

export interface TTSVocalEQBand {
  frequency: number;
  type: BiquadFilterType;
  gain: number;
  Q: number;
  description: string;
}

/**
 * Standard vocal formant 6-band precision profile for speech synthesis
 */
export const TTS_VOCAL_EQ_BANDS: TTSVocalEQBand[] = [
  { frequency: 100, type: 'lowshelf', gain: -2.0, Q: 0.7071, description: 'Chest Thump / Rumble Cut' },
  { frequency: 300, type: 'peaking', gain: 0.5, Q: 1.2, description: 'Vocal Warmth / Fundamental' },
  { frequency: 1000, type: 'peaking', gain: 1.5, Q: 1.4, description: 'Vowel Intelligibility' },
  { frequency: 2800, type: 'peaking', gain: 2.5, Q: 1.5, description: 'Female Voice Formant Definition' },
  { frequency: 5000, type: 'peaking', gain: 1.8, Q: 1.2, description: 'Consonant / Articulation Clarity' },
  { frequency: 10000, type: 'highshelf', gain: -1.0, Q: 0.7071, description: 'Air / Anti-Sibilance Smooth' },
];

export const TTS_EQ_PRESETS: Record<string, number[]> = {
  RP_FEMALE_ANNOUNCER: [-2.5, 0.0, 1.5, 3.0, 2.0, -1.0],
  SCREEN_READER_CLEAR: [-3.0, -0.5, 2.0, 3.5, 2.5, -0.5],
  WARM_NARRATOR: [-1.0, 1.5, 1.0, 1.5, 1.0, -2.0],
  NEUTRAL_FLAT: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
};

export class TTSVocalEqualizer {
  private ctx: AudioContext;
  private inputNode: GainNode;
  private outputNode: GainNode;
  private filters: BiquadFilterNode[] = [];

  constructor(ctx: AudioContext, initialPreset: string = 'RP_FEMALE_ANNOUNCER') {
    this.ctx = ctx;
    this.inputNode = ctx.createGain();
    this.outputNode = ctx.createGain();

    const gains = TTS_EQ_PRESETS[initialPreset] || TTS_EQ_PRESETS.RP_FEMALE_ANNOUNCER;
    let prevNode: AudioNode = this.inputNode;

    TTS_VOCAL_EQ_BANDS.forEach((band, index) => {
      const filter = ctx.createBiquadFilter();
      filter.type = band.type;
      filter.frequency.setValueAtTime(band.frequency, ctx.currentTime);
      filter.Q.setValueAtTime(band.Q, ctx.currentTime);
      filter.gain.setValueAtTime(gains[index] ?? 0, ctx.currentTime);

      prevNode.connect(filter);
      prevNode = filter;
      this.filters.push(filter);
    });

    prevNode.connect(this.outputNode);
  }

  public setBandGain(bandIndex: number, gainDb: number) {
    if (bandIndex >= 0 && bandIndex < this.filters.length) {
      const clamped = Math.max(-18, Math.min(18, gainDb));
      this.filters[bandIndex].gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public applyPreset(presetName: string) {
    const preset = TTS_EQ_PRESETS[presetName];
    if (preset) {
      const now = this.ctx.currentTime;
      preset.forEach((gainDb, index) => {
        if (this.filters[index]) {
          this.filters[index].gain.setValueAtTime(gainDb, now);
        }
      });
    }
  }

  public getInput(): GainNode {
    return this.inputNode;
  }

  public getOutput(): GainNode {
    return this.outputNode;
  }

  public connect(destination: AudioNode): AudioNode {
    return this.outputNode.connect(destination);
  }

  public disconnect() {
    this.outputNode.disconnect();
  }
}
