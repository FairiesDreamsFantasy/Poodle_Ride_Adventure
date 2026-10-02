/**
 * Grayscale & Photometric Luminance Registry
 * Standards: ITU-R BT.709 and ITU-R BT.601
 */

export interface LuminanceCoefficients {
  r: number;
  g: number;
  b: number;
}

/**
 * ITU-R BT.709 (High Definition / sRGB standard)
 */
export const REC709_LUMINANCE: Readonly<LuminanceCoefficients> = Object.freeze({
  r: 0.2126,
  g: 0.7152,
  b: 0.0722,
});

/**
 * ITU-R BT.601 (Standard Definition / NTSC)
 */
export const REC601_LUMINANCE: Readonly<LuminanceCoefficients> = Object.freeze({
  r: 0.2990,
  g: 0.5870,
  b: 0.1140,
});

/**
 * Quantized Grayscale Depth Scales
 */
export const GRAYSCALE_STEPS_4_BIT: ReadonlyArray<number> = Object.freeze(
  Array.from({ length: 16 }, (_, i) => Math.round((i / 15) * 255))
);

export const GRAYSCALE_STEPS_2_BIT: ReadonlyArray<number> = Object.freeze([
  0, 85, 170, 255
]);
