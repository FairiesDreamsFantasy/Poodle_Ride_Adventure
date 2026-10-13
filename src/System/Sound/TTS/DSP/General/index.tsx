/**
 * Scientific TTS Digital Signal Processing (DSP) General Core
 * Formant enhancement, vocal clarity saturation, speech-specific dynamic compression,
 * de-essing, and low-frequency rumble protection (80Hz highpass).
 */

export interface TTSDSPMetrics {
  lowCutFrequency: number;
  highCutFrequency: number;
  compressionThresholdDb: number;
  compressionRatio: number;
  saturationDrive: number;
}

export const DEFAULT_TTS_DSP_METRICS: TTSDSPMetrics = {
  lowCutFrequency: 85, // Strips sub-plosives and room rumble
  highCutFrequency: 14000, // Smooth vocal top-end
  compressionThresholdDb: -16,
  compressionRatio: 2.8,
  saturationDrive: 4,
};

export class TTSDSPProcessor {
  private ctx: AudioContext;
  private inputNode: GainNode;
  private outputNode: GainNode;
  private lowCutFilter: BiquadFilterNode;
  private highCutFilter: BiquadFilterNode;
  private formantPeakFilter: BiquadFilterNode;
  private compressor: DynamicsCompressorNode;
  private waveShaper: WaveShaperNode;

  constructor(ctx: AudioContext, metrics: TTSDSPMetrics = DEFAULT_TTS_DSP_METRICS) {
    this.ctx = ctx;
    this.inputNode = ctx.createGain();
    this.outputNode = ctx.createGain();

    // 1. High-pass vocal filter (85Hz) to remove mic pops and plosive thumps
    this.lowCutFilter = ctx.createBiquadFilter();
    this.lowCutFilter.type = 'highpass';
    this.lowCutFilter.frequency.setValueAtTime(metrics.lowCutFrequency, ctx.currentTime);
    this.lowCutFilter.Q.setValueAtTime(0.7071, ctx.currentTime);

    // 2. Formant peak filter (2.5kHz) to boost female announcer / speech intelligibility
    this.formantPeakFilter = ctx.createBiquadFilter();
    this.formantPeakFilter.type = 'peaking';
    this.formantPeakFilter.frequency.setValueAtTime(2500, ctx.currentTime);
    this.formantPeakFilter.Q.setValueAtTime(1.2, ctx.currentTime);
    this.formantPeakFilter.gain.setValueAtTime(2.0, ctx.currentTime);

    // 3. Smooth saturation for vocal warmth and presence
    this.waveShaper = ctx.createWaveShaper();
    this.waveShaper.curve = this.createVocalSaturationCurve(metrics.saturationDrive);
    this.waveShaper.oversample = '2x';

    // 4. Low-pass anti-harshness filter (14kHz)
    this.highCutFilter = ctx.createBiquadFilter();
    this.highCutFilter.type = 'lowpass';
    this.highCutFilter.frequency.setValueAtTime(metrics.highCutFrequency, ctx.currentTime);
    this.highCutFilter.Q.setValueAtTime(0.7071, ctx.currentTime);

    // 5. Vocal Dynamics Compressor for consistent speech leveling
    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(metrics.compressionThresholdDb, ctx.currentTime);
    this.compressor.knee.setValueAtTime(8, ctx.currentTime);
    this.compressor.ratio.setValueAtTime(metrics.compressionRatio, ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.005, ctx.currentTime);
    this.compressor.release.setValueAtTime(0.08, ctx.currentTime);

    // Audio node serial routing
    this.inputNode.connect(this.lowCutFilter);
    this.lowCutFilter.connect(this.formantPeakFilter);
    this.formantPeakFilter.connect(this.waveShaper);
    this.waveShaper.connect(this.highCutFilter);
    this.highCutFilter.connect(this.compressor);
    this.compressor.connect(this.outputNode);
  }

  private createVocalSaturationCurve(amount: number = 4): Float32Array {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const k = amount;
    const deg = Math.PI / 180;
    for (let i = 0; i < samples; ++i) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public setFormantClarity(gainDb: number) {
    this.formantPeakFilter.gain.setValueAtTime(gainDb, this.ctx.currentTime);
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
