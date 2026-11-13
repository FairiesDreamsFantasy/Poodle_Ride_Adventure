/**
 * System/Theme/Engine/Python/Num-Py/General/index.tsx
 * Scientific Theme Engine Python Num-Py Tensor Color Space Module
 * Linear RGB <-> XYZ <-> perceptual lightness L* transforms and vector palette distance.
 */

export type Vec3Color = [number, number, number];

export class ThemeEngineNumPyColorTensor {
  /** D65 sRGB linear matrix to CIE XYZ */
  public linearRgbToXYZ(rgb: Vec3Color): Vec3Color {
    const [r, g, b] = rgb;
    return [
      0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
      0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
      0.0193339 * r + 0.1191920 * g + 0.9503041 * b,
    ];
  }

  /** CIE L* perceptual lightness (0..100) from relative Y luminance */
  public yToPerceptualLightness(y: number): number {
    const eps = 216 / 24389;
    const kappa = 24389 / 27;
    return y <= eps ? kappa * y : 116 * Math.cbrt(y) - 16;
  }

  public euclideanColorDistance(c1: Vec3Color, c2: Vec3Color): number {
    const dr = c1[0] - c2[0];
    const dg = c1[1] - c2[1];
    const db = c1[2] - c2[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  public normalizePaletteWeights(weights: number[]): number[] {
    const sum = weights.reduce((a, b) => a + Math.abs(b), 0);
    if (sum <= 1e-12) return weights.map(() => 0);
    return weights.map((w) => Math.abs(w) / sum);
  }
}

export const ThemeEngineNumPyInstance = new ThemeEngineNumPyColorTensor();
