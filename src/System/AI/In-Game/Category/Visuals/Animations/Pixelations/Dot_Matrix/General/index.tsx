import { 
  DotMatrixSpec, 
  STANDARD_DOT_MATRIX_SPEC, 
  BAYER_MATRIX_4X4, 
  BAYER_MATRIX_8X8 
} from '../../../../../../../../Registry/AI/Visuals/Animations/Pixelations/Dot_Matrix/General/index.tsx';

/**
 * Evaluates whether a pixel at (x, y) with normalized intensity [0, 1] passes 4x4 Bayer threshold
 */
export function evaluateBayer4x4(x: number, y: number, normalizedIntensity: number): boolean {
  const mx = Math.floor(Math.abs(x)) % 4;
  const my = Math.floor(Math.abs(y)) % 4;
  const threshold = BAYER_MATRIX_4X4[my][mx];
  return normalizedIntensity > threshold;
}

/**
 * Evaluates whether a pixel at (x, y) with normalized intensity [0, 1] passes 8x8 Bayer threshold
 */
export function evaluateBayer8x8(x: number, y: number, normalizedIntensity: number): boolean {
  const mx = Math.floor(Math.abs(x)) % 8;
  const my = Math.floor(Math.abs(y)) % 8;
  const threshold = BAYER_MATRIX_8X8[my][mx];
  return normalizedIntensity > threshold;
}

/**
 * Samples a continuous coordinate (x, y) to the nearest Dot Matrix phosphor grid center
 */
export function sampleDotMatrixGrid(
  x: number, 
  y: number, 
  spec: DotMatrixSpec = STANDARD_DOT_MATRIX_SPEC
): { gridX: number; gridY: number; centerX: number; centerY: number } {
  const gridX = Math.floor(x / spec.pitchPx);
  const gridY = Math.floor(y / spec.pitchPx);
  const centerX = gridX * spec.pitchPx + spec.pitchPx / 2;
  const centerY = gridY * spec.pitchPx + spec.pitchPx / 2;
  return { gridX, gridY, centerX, centerY };
}

/**
 * Computes phosphor persistence brightness after elapsed time (exponential decay)
 */
export function computePhosphorPersistence(
  initialBrightness: number,
  elapsedMs: number,
  spec: DotMatrixSpec = STANDARD_DOT_MATRIX_SPEC
): number {
  if (spec.phosphorDecayMs <= 0) return 0;
  const decayRate = 1.0 / spec.phosphorDecayMs;
  return initialBrightness * Math.exp(-decayRate * elapsedMs);
}

export { STANDARD_DOT_MATRIX_SPEC, BAYER_MATRIX_4X4, BAYER_MATRIX_8X8 };
