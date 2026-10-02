/**
 * Scientific Multi-Band Equalizer (EQ) General Core
 * 10-band precision graphic/parametric equalizer based on standard ISO 266 center frequencies:
 * 31Hz, 63Hz, 125Hz, 250Hz, 500Hz, 1kHz, 2kHz, 4kHz, 8kHz, 16kHz.
 */

export interface EQBandConfig {
  frequency: number;
  type: BiquadFilterType;
  gain: number;
  Q: number;
  description: string;
}

/**
 * Standard ISO 10-band scientific equalizer frequency profile
 */
export const SCIENTIFIC_EQ_BANDS: EQBandConfig[] = [
  { frequency: 31, type: 'lowshelf', gain: 0, Q: 0.7071, description: 'Sub-Bass' },
  { frequency: 63, type: 'peaking', gain: 0, Q: 1.414, description: 'Bass' },
  { frequency: 125, type: 'peaking', gain: 0, Q: 1.414, description: 'Upper Bass' },
  { frequency: 250, type: 'peaking', gain: 0, Q: 1.414, description: 'Low Mids / Warmth' },
  { frequency: 500, type: 'peaking', gain: 0, Q: 1.414, description: 'Midrange Body' },
  { frequency: 1000, type: 'peaking', gain: 0, Q: 1.414, description: 'Vocal / Bark Presence' },
  { frequency: 2000, type: 'peaking', gain: 0, Q: 1.414, description: 'Upper Mid Clarity' },
  { frequency: 4000, type: 'peaking', gain: 0, Q: 1.414, description: 'Presence / Transients' },
  { frequency: 8000, type: 'peaking', gain: 0, Q: 1.414, description: 'Treble Crispness' },
  { frequency: 16000, type: 'highshelf', gain: 0, Q: 0.7071, description: 'Air / Brilliance' },
];

/**
 * Pre-calibrated scientific equalization presets for game audio perfection
 */
export const SCIENTIFIC_EQ_PRESETS: Record<string, number[]> = {
  // Flat neutral response
  FLAT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // Enhanced clarity for footsteps, sliding doors, and acoustic bark echoes
  CRAFTED_MASTERPIECE: [2.0, 1.5, 0.5, -0.5, 0.0, 1.5, 2.0, 2.5, 2.0, 1.5],
  // Warm porch and garden acoustic ambience
  WARM_ACOUSTIC: [3.0, 2.5, 2.0, 1.0, 0.5, 0.0, 0.0, -1.0, -1.5, -2.0],
  // High-fidelity speech and screen reader clarity
  VOCAL_ENHANCE: [-2.0, -1.0, 0.0, 1.0, 2.5, 3.0, 2.5, 1.5, 0.5, 0.0],
  // Deep bass presence for heavy gallops and architectural resonance
  BASS_BOOST: [4.5, 4.0, 3.0, 1.5, 0.5, 0.0, 0.0, 0.0, 0.5, 1.0],
};

/**
 * Scientific Multi-Band Equalizer
 * Cascades 10 high-precision IIR Biquad filter nodes in serial for mathematically exact frequency shaping.
 */
export class ScientificEqualizer {
  private ctx: AudioContext;
  private inputNode: GainNode;
  private outputNode: GainNode;
  private filters: BiquadFilterNode[] = [];

  constructor(ctx: AudioContext, initialPreset: string = 'CRAFTED_MASTERPIECE') {
    this.ctx = ctx;
    this.inputNode = ctx.createGain();
    this.outputNode = ctx.createGain();

    const gains = SCIENTIFIC_EQ_PRESETS[initialPreset] || SCIENTIFIC_EQ_PRESETS.FLAT;

    let prevNode: AudioNode = this.inputNode;

    // Instantiate and chain 10 filter stages
    SCIENTIFIC_EQ_BANDS.forEach((band, index) => {
      const filter = ctx.createBiquadFilter();
      filter.type = band.type;
      filter.frequency.setValueAtTime(band.frequency, ctx.currentTime);
      filter.Q.setValueAtTime(band.Q, ctx.currentTime);
      filter.gain.setValueAtTime(gains[index] ?? 0, ctx.currentTime);

      prevNode.connect(filter);
      prevNode = filter;
      this.filters.push(filter);
    });

    // Connect the last filter to the master output
    prevNode.connect(this.outputNode);
  }

  /**
   * Sets the gain in dB (-24dB to +24dB) for a specific frequency band index (0 to 9)
   */
  public setBandGain(bandIndex: number, gainDb: number) {
    if (bandIndex >= 0 && bandIndex < this.filters.length) {
      const clamped = Math.max(-24, Math.min(24, gainDb));
      this.filters[bandIndex].gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  /**
   * Applies an entire equalization preset profile
   */
  public applyPreset(presetName: string) {
    const preset = SCIENTIFIC_EQ_PRESETS[presetName];
    if (preset) {
      const now = this.ctx.currentTime;
      preset.forEach((gainDb, index) => {
        if (this.filters[index]) {
          this.filters[index].gain.setValueAtTime(gainDb, now);
        }
      });
    }
  }

  /**
   * Returns the current gain state of all 10 bands
   */
  public getBands(): { frequency: number; gain: number; type: string }[] {
    return this.filters.map((f) => ({
      frequency: f.frequency.value,
      gain: f.gain.value,
      type: f.type,
    }));
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
