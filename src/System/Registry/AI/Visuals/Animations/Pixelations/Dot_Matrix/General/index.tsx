/**
 * Dot Matrix, Bayer Dithering & Phosphor Grid Registry
 * Advanced discrete spatial sampling matrices.
 */

export interface DotMatrixSpec {
  pitchPx: number;
  dotRadiusPx: number;
  dutyCycle: number; // [0, 1]
  phosphorDecayMs: number;
}

export const STANDARD_DOT_MATRIX_SPEC: Readonly<DotMatrixSpec> = Object.freeze({
  pitchPx: 4.0,
  dotRadiusPx: 1.5,
  dutyCycle: 0.75,
  phosphorDecayMs: 16.67,
});

/**
 * Normalized 4x4 Bayer Dither Matrix for ordered dithering
 */
export const BAYER_MATRIX_4X4: ReadonlyArray<ReadonlyArray<number>> = Object.freeze([
  [ 0 / 16,  8 / 16,  2 / 16, 10 / 16],
  [12 / 16,  4 / 16, 14 / 16,  6 / 16],
  [ 3 / 16, 11 / 16,  1 / 16,  9 / 16],
  [15 / 16,  7 / 16, 13 / 16,  5 / 16],
]);

/**
 * Normalized 8x8 Bayer Dither Matrix
 */
export const BAYER_MATRIX_8X8: ReadonlyArray<ReadonlyArray<number>> = Object.freeze([
  [ 0/64, 32/64,  8/64, 40/64,  2/64, 34/64, 10/64, 42/64],
  [48/64, 16/64, 56/64, 24/64, 50/64, 18/64, 58/64, 26/64],
  [12/64, 44/64,  4/64, 36/64, 14/64, 46/64,  6/64, 38/64],
  [60/64, 28/64, 52/64, 20/64, 62/64, 30/64, 54/64, 22/64],
  [ 3/64, 35/64, 11/64, 43/64,  1/64, 33/64,  9/64, 41/64],
  [51/64, 19/64, 59/64, 27/64, 49/64, 17/64, 57/64, 25/64],
  [15/64, 47/64,  7/64, 39/64, 13/64, 45/64,  5/64, 37/64],
  [63/64, 31/64, 55/64, 23/64, 61/64, 29/64, 53/64, 21/64],
]);
