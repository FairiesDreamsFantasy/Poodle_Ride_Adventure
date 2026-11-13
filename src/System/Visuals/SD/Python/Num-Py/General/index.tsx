/**
 * System/Visuals/SD/Python/Num-Py/General/index.tsx
 * ITU-R BT.601 YCbCr vector color conversion for SD rendering pipelines.
 */

export class VisualsSDNumPyYCbCr {
  public rgbToBt601YCbCr(r: number, g: number, b: number): [number, number, number] {
    const y = 16 + 0.256788 * r + 0.504129 * g + 0.097906 * b;
    const cb = 128 - 0.148223 * r - 0.290993 * g + 0.439216 * b;
    const cr = 128 + 0.439216 * r - 0.367788 * g - 0.071427 * b;
    return [y, cb, cr];
  }
}

export const VisualsSDNumPyInstance = new VisualsSDNumPyYCbCr();
