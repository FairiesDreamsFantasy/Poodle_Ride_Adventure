import { 
  LuminanceCoefficients, 
  REC709_LUMINANCE, 
  REC601_LUMINANCE,
  GRAYSCALE_STEPS_4_BIT,
  GRAYSCALE_STEPS_2_BIT 
} from '../../../../../../../../../Registry/AI/Visuals/Animations/Color_Palette/Monochrome/Grayscale/General/index.tsx';

/**
 * Calculates Photometric Luminance (Y) from RGB components [0, 255]
 * Standard: Rec. 709 by default
 */
export function calculateLuminance(
  r: number, 
  g: number, 
  b: number, 
  coefficients: LuminanceCoefficients = REC709_LUMINANCE
): number {
  return coefficients.r * r + coefficients.g * g + coefficients.b * b;
}

/**
 * Converts sRGB component [0, 255] to Linear Photometric Space (de-gamma)
 */
export function sRGBToLinear(c: number): number {
  const norm = c / 255.0;
  return norm <= 0.04045 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

/**
 * Converts Linear Photometric component [0, 1] to sRGB Space (gamma 2.2 / sRGB transfer)
 */
export function linearTosRGB(l: number): number {
  const c = l <= 0.0031308 ? l * 12.92 : 1.055 * Math.pow(l, 1.0 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, Math.round(c * 255.0)));
}

/**
 * Quantizes an 8-bit luminance value (0-255) to the nearest level in a discrete palette
 */
export function quantizeLuminance(
  luminance: number, 
  steps: ReadonlyArray<number> = GRAYSCALE_STEPS_4_BIT
): number {
  let closest = steps[0];
  let minDiff = Math.abs(luminance - closest);

  for (let i = 1; i < steps.length; i++) {
    const diff = Math.abs(luminance - steps[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closest = steps[i];
    }
  }

  return closest;
}

export { REC709_LUMINANCE, REC601_LUMINANCE, GRAYSCALE_STEPS_4_BIT, GRAYSCALE_STEPS_2_BIT };
