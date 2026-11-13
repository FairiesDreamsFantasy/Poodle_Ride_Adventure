/**
 * System/Visuals/Animations/Assembly/Web_Assembly/General/index.tsx
 * Native Hermite cubic tangent solver and valid WebAssembly MVP lerp kernel.
 */

export class VisualsAnimationsAssemblyWasmHermite {
  public evaluateCubicHermite(p0: number, m0: number, p1: number, m1: number, t: number): number {
    const u = Math.max(0, Math.min(1, t));
    const u2 = u * u;
    const u3 = u2 * u;
    const h00 = 2 * u3 - 3 * u2 + 1;
    const h10 = u3 - 2 * u2 + u;
    const h01 = -2 * u3 + 3 * u2;
    const h11 = u3 - u2;
    return h00 * p0 + h10 * m0 + h01 * p1 + h11 * m1;
  }

  /** Valid Wasm 1.0 MVP binary exporting keyframe_step(f64 curr, f64 delta) -> f64 */
  public emitKeyframeStepWasm(): Uint8Array {
    return new Uint8Array([
      0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
      0x01, 0x07, 0x01, 0x60, 0x02, 0x7c, 0x7c, 0x01, 0x7c,
      0x03, 0x02, 0x01, 0x00,
      0x07, 0x11, 0x01, 0x0d, 0x6b, 0x65, 0x79, 0x66, 0x72, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x74, 0x65, 0x70, 0x00, 0x00,
      0x0a, 0x09, 0x01, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0xa0, 0x0b,
    ]);
  }
}

export const VisualsAnimationsAssemblyWasmInstance = new VisualsAnimationsAssemblyWasmHermite();
