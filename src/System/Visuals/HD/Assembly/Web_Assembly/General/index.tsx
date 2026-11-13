/**
 * System/Visuals/HD/Assembly/Web_Assembly/General/index.tsx
 * SMPTE ST 2084 PQ EOTF transfer and valid WebAssembly exposure scaling binary.
 */

export class VisualsHDAssemblyWasmHDR {
  /** Evaluates SMPTE ST 2084 PQ EOTF normalized [0..1] -> linear nits factor */
  public evaluatePQEOTF(signalNorm: number): number {
    const m1 = 2610 / 16384;
    const m2 = (2523 / 4096) * 128;
    const c1 = 3424 / 4096;
    const c2 = (2413 / 4096) * 32;
    const c3 = (2392 / 4096) * 32;
    const n = Math.pow(Math.max(0, Math.min(1, signalNorm)), 1 / m2);
    const num = Math.max(0, n - c1);
    const den = Math.max(1e-6, c2 - c3 * n);
    return Math.pow(num / den, 1 / m1);
  }

  /** Valid Wasm 1.0 MVP binary exporting hdr_expose(f64 radiance, f64 evScale) -> f64 */
  public emitHdrExposureWasm(): Uint8Array {
    return new Uint8Array([
      0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
      0x01, 0x07, 0x01, 0x60, 0x02, 0x7c, 0x7c, 0x01, 0x7c,
      0x03, 0x02, 0x01, 0x00,
      0x07, 0x0e, 0x01, 0x0a, 0x68, 0x64, 0x72, 0x5f, 0x65, 0x78, 0x70, 0x6f, 0x73, 0x65, 0x00, 0x00,
      0x0a, 0x09, 0x01, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0xa2, 0x0b,
    ]);
  }
}

export const VisualsHDAssemblyWasmInstance = new VisualsHDAssemblyWasmHDR();
