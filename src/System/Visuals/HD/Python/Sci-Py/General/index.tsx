/**
 * System/Visuals/HD/Python/Sci-Py/General/index.tsx
 * Lanczos resampling kernel (a=2, a=3) for sharp UHD upscaling without ringing distortion.
 */

export class VisualsHDSciPyLanczos {
  public sinc(x: number): number {
    if (Math.abs(x) < 1e-8) return 1.0;
    const pix = Math.PI * x;
    return Math.sin(pix) / pix;
  }

  public evaluateLanczosKernel(x: number, lobes: 2 | 3 = 3): number {
    const ax = Math.abs(x);
    if (ax >= lobes) return 0.0;
    return this.sinc(x) * this.sinc(x / lobes);
  }
}

export const VisualsHDSciPyInstance = new VisualsHDSciPyLanczos();
