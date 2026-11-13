/**
 * System/Visuals/Resolution/Python/Sci-Py/General/index.tsx
 * Mitchell-Netravali (B=1/3, C=1/3) cubic resampling kernel for resolution scaling.
 */

export class VisualsResolutionSciPyBicubic {
  public evaluateMitchellNetravali(x: number, b: number = 1 / 3, c: number = 1 / 3): number {
    const ax = Math.abs(x);
    if (ax < 1) {
      return (
        ((12 - 9 * b - 6 * c) * ax ** 3 + (-18 + 12 * b + 6 * c) * ax ** 2 + (6 - 2 * b)) / 6
      );
    }
    if (ax < 2) {
      return (
        ((-b - 6 * c) * ax ** 3 + (6 * b + 30 * c) * ax ** 2 + (-12 * b - 48 * c) * ax + (8 * b + 24 * c)) /
        6
      );
    }
    return 0;
  }
}

export const VisualsResolutionSciPyInstance = new VisualsResolutionSciPyBicubic();
