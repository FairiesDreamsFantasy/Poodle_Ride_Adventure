/**
 * System/Visuals/SD/Python/Sci-Py/General/index.tsx
 * 3-tap vertical interlace anti-flicker low-pass filter [0.25, 0.5, 0.25] for CRT/SD output.
 */

export class VisualsSDSciPyAntiFlicker {
  public filterVerticalScanline(prevRow: number, currRow: number, nextRow: number): number {
    return 0.25 * prevRow + 0.5 * currRow + 0.25 * nextRow;
  }
}

export const VisualsSDSciPyInstance = new VisualsSDSciPyAntiFlicker();
