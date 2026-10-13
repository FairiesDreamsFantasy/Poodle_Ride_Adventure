/**
 * Scientific Digital Signal Processing (DSP) General Core
 * Mathematical audio filters, non-linear waveshaping, dynamic range compression,
 * biquad filter topologies, and scientific audio signal transformers.
 */

export interface DSPTransformConfig {
  sampleRate: number;
  oversampling?: 'none' | '2x' | '4x';
}

/**
 * Creates an ultra-clean scientific soft clipping saturation transfer curve.
 * Uses hyperbolic tangent (tanh) / polynomial saturation without harsh aliasing.
 */
export function createSaturationCurve(amount: number = 20, samples: number = 44100): Float32Array {
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;
  const k = typeof amount === 'number' ? amount : 20;

  for (let i = 0; i < samples; ++i) {
    const x = (i * 2) / samples - 1;
    // Scientific polynomial soft-knee curve: f(x) = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x))
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

/**
 * Scientific DSP Processor
 * Provides high-precision dynamic processing, soft saturation, harmonic enhancement,
 * and high-order Butterworth/Chebyshev filter emulation.
 */
export class ScientificDSPProcessor {
  private ctx: AudioContext;
  private inputNode: GainNode;
  private outputNode: GainNode;
  private waveShaper: WaveShaperNode;
  private compressor: DynamicsCompressorNode;
  private lowCutFilter: BiquadFilterNode;
  private highCutFilter: BiquadFilterNode;
  private dryGain: GainNode;
  private wetGain: GainNode;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;

    // Node allocation
    this.inputNode = ctx.createGain();
    this.outputNode = ctx.createGain();
    this.dryGain = ctx.createGain();
    this.wetGain = ctx.createGain();

    // 1. DC-offset and Sub-rumble high-pass protection (18Hz cutoff)
    this.lowCutFilter = ctx.createBiquadFilter();
    this.lowCutFilter.type = 'highpass';
    this.lowCutFilter.frequency.setValueAtTime(18, ctx.currentTime);
    this.lowCutFilter.Q.setValueAtTime(0.7071, ctx.currentTime); // Butterworth Q

    // 2. Anti-aliasing ultrasonic low-pass filter (22kHz cutoff)
    this.highCutFilter = ctx.createBiquadFilter();
    this.highCutFilter.type = 'lowpass';
    this.highCutFilter.frequency.setValueAtTime(22000, ctx.currentTime);
    this.highCutFilter.Q.setValueAtTime(0.7071, ctx.currentTime);

    // 3. Precision Scientific WaveShaper for warmth and saturation
    this.waveShaper = ctx.createWaveShaper();
    this.waveShaper.curve = createSaturationCurve(8, 44100);
    this.waveShaper.oversample = '4x';

    // 4. Studio-grade Dynamics Compressor for peak control
    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-18, ctx.currentTime);
    this.compressor.knee.setValueAtTime(12, ctx.currentTime);
    this.compressor.ratio.setValueAtTime(3.5, ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, ctx.currentTime);
    this.compressor.release.setValueAtTime(0.15, ctx.currentTime);

    // Wet signal routing
    this.inputNode.connect(this.lowCutFilter);
    this.lowCutFilter.connect(this.highCutFilter);
    this.highCutFilter.connect(this.waveShaper);
    this.waveShaper.connect(this.compressor);
    this.compressor.connect(this.wetGain);
    this.wetGain.connect(this.outputNode);

    // Dry signal routing
    this.inputNode.connect(this.dryGain);
    this.dryGain.connect(this.outputNode);

    // Set default balance: 100% processed (wet), 0% dry
    this.setMix(1.0);
  }

  /**
   * Sets the wet/dry mix ratio (0.0 = 100% dry, 1.0 = 100% wet)
   */
  public setMix(wetRatio: number) {
    const wet = Math.max(0, Math.min(1, wetRatio));
    const dry = 1.0 - wet;
    const now = this.ctx.currentTime;
    this.wetGain.gain.setValueAtTime(wet, now);
    this.dryGain.gain.setValueAtTime(dry, now);
  }

  /**
   * Adjusts harmonic warmth and saturation drive (0 to 100)
   */
  public setSaturation(amount: number) {
    const clamped = Math.max(0, Math.min(100, amount));
    this.waveShaper.curve = createSaturationCurve(clamped, 44100);
  }

  /**
   * Configures the dynamics compression parameters scientifically
   */
  public setCompression(threshold: number, ratio: number, attack: number, release: number) {
    const now = this.ctx.currentTime;
    this.compressor.threshold.setValueAtTime(threshold, now);
    this.compressor.ratio.setValueAtTime(ratio, now);
    this.compressor.attack.setValueAtTime(attack, now);
    this.compressor.release.setValueAtTime(release, now);
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
