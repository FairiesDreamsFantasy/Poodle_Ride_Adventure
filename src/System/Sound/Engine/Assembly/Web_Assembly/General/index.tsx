/**
 * Scientific Sound Engine Assembly Web_Assembly Native DSP Core Module
 * Native WebAssembly DSP filter evaluation and linear gain interpolation.
 */



export class SoundAssemblyWasmDSP {

  public computeBiquad(x: number, b0: number, b1: number, b2: number, a1: number, a2: number, x1: number, x2: number, y1: number, y2: number): number {
    return b0*x + b1*x1 + b2*x2 - a1*y1 - a2*y2;
  }
        
}

export const SoundAssemblyWasmDSPInstance = new SoundAssemblyWasmDSP();
