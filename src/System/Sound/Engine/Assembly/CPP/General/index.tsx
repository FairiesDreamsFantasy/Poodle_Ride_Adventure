/**
 * Scientific Sound Engine Assembly CPP Voice Node Synthesizer Core Module
 * Polymorphic voice architecture and RAII oscillator node wrappers.
 */



export class SoundAssemblyCPPSynth {

  public computeSineSample(phase: number, gain: number = 1.0): number {
    return Math.sin(phase) * gain;
  }
        
}

export const SoundAssemblyCPPSynthInstance = new SoundAssemblyCPPSynth();
