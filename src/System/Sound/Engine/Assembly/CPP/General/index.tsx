/**
 * Scientific Sound Engine Assembly CPP Voice Node Synthesizer Core Module
 * RAII polymorphic voice pool, PolyBLEP anti-aliased oscillators,
 * exponential ADSR envelope generator, and harmonic additive synthesis.
 */

export interface ADSREnvelopeConfig {
  attackSec: number;
  decaySec: number;
  sustainLevel: number;
  releaseSec: number;
}

export interface VoiceNode {
  id: number;
  frequencyHz: number;
  phase: number;
  gain: number;
  ageSamples: number;
  active: boolean;
}

export class SoundAssemblyCPPSynth {
  private readonly voicePool: VoiceNode[];
  private nextVoiceId: number = 1;

  constructor(maxPolyphony: number = 32) {
    this.voicePool = Array.from({ length: maxPolyphony }, (_, idx) => ({
      id: idx,
      frequencyHz: 440,
      phase: 0,
      gain: 0,
      ageSamples: 0,
      active: false,
    }));
  }

  public computeSineSample(phase: number, gain: number = 1.0): number {
    return Math.sin(phase) * gain;
  }

  public computeTriangleSample(phase: number, gain: number = 1.0): number {
    const norm = ((phase / (2 * Math.PI)) % 1 + 1) % 1;
    const tri = norm < 0.25 ? 4 * norm : norm < 0.75 ? 2 - 4 * norm : 4 * norm - 4;
    return tri * gain;
  }

  /** PolyBLEP anti-aliased sawtooth to eliminate Nyquist aliasing */
  public computePolyBLEPSaw(phaseNorm: number, dt: number, gain: number = 1.0): number {
    const t = ((phaseNorm % 1) + 1) % 1;
    let y = 2.0 * t - 1.0;
    if (t < dt) {
      const k = t / dt;
      y -= k + k - k * k - 1.0;
    } else if (t > 1.0 - dt) {
      const k = (t - 1.0) / dt;
      y -= k * k + k + k + 1.0;
    }
    return y * gain;
  }

  /** Evaluates continuous ADSR gain at elapsed time with noteOff boundary */
  public evaluateADSR(
    elapsedSec: number,
    noteOffSec: number | null,
    env: ADSREnvelopeConfig
  ): number {
    const a = Math.max(0.0005, env.attackSec);
    const d = Math.max(0.0005, env.decaySec);
    const s = Math.max(0.0, Math.min(1.0, env.sustainLevel));
    const r = Math.max(0.001, env.releaseSec);

    if (noteOffSec !== null && elapsedSec >= noteOffSec) {
      const levelAtOff = this.evaluateADSR(noteOffSec, null, env);
      const relElapsed = elapsedSec - noteOffSec;
      return levelAtOff * Math.exp((-4.60517 * relElapsed) / r);
    }
    if (elapsedSec <= 0) return 0;
    if (elapsedSec < a) return elapsedSec / a;
    if (elapsedSec < a + d) {
      const decProgress = (elapsedSec - a) / d;
      return 1.0 - (1.0 - s) * decProgress;
    }
    return s;
  }

  /** Harmonic additive synthesis across partials [1..N] */
  public synthesizeHarmonicBlock(
    sampleCount: number,
    sampleRate: number,
    fundamentalHz: number,
    harmonicWeights: readonly number[]
  ): Float32Array {
    const out = new Float32Array(sampleCount);
    const twoPi = 2 * Math.PI;
    let weightSum = 0;
    for (let h = 0; h < harmonicWeights.length; h++) weightSum += Math.abs(harmonicWeights[h]);
    const norm = weightSum > 0 ? 1.0 / weightSum : 1.0;

    for (let i = 0; i < sampleCount; i++) {
      const t = i / sampleRate;
      let acc = 0;
      for (let h = 0; h < harmonicWeights.length; h++) {
        const freq = fundamentalHz * (h + 1);
        if (freq >= sampleRate * 0.48) break;
        acc += Math.sin(twoPi * freq * t) * harmonicWeights[h];
      }
      out[i] = acc * norm;
    }
    return out;
  }

  public allocateVoice(frequencyHz: number, gain: number = 1.0): VoiceNode {
    let slot = this.voicePool.find((v) => !v.active);
    if (!slot) {
      // Oldest-voice stealing policy
      slot = this.voicePool.reduce((oldest, curr) =>
        curr.ageSamples > oldest.ageSamples ? curr : oldest
      );
    }
    slot.id = this.nextVoiceId++;
    slot.frequencyHz = frequencyHz;
    slot.phase = 0;
    slot.gain = gain;
    slot.ageSamples = 0;
    slot.active = true;
    return slot;
  }

  public releaseVoice(voiceId: number): void {
    const v = this.voicePool.find((item) => item.id === voiceId);
    if (v) v.active = false;
  }

  public getActiveVoiceCount(): number {
    let count = 0;
    for (const v of this.voicePool) if (v.active) count++;
    return count;
  }
}

export const SoundAssemblyCPPSynthInstance = new SoundAssemblyCPPSynth();
