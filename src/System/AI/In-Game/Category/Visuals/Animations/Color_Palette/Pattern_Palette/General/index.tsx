import { 
  Pattern8x8, 
  CHECKERBOARD_PATTERN, 
  DIAGONAL_HATCH_PATTERN, 
  HERRINGBONE_PATTERN 
} from '../../../../../../../../Registry/AI/Visuals/Animations/Color_Palette/Pattern_Palette/General/index.tsx';

/**
 * Samples an 8x8 bitmask pattern at continuous screen coordinates (x, y)
 * Returns true if the bit at (x % 8, y % 8) is set (1), false if 0.
 */
export function samplePatternBit(pattern: Pattern8x8, x: number, y: number): boolean {
  const rowIdx = ((Math.floor(y) % 8) + 8) % 8;
  const colIdx = ((Math.floor(x) % 8) + 8) % 8;

  const rowMask = pattern.bitmaskRows[rowIdx];
  // Check bit at bit position (7 - colIdx)
  const bit = (rowMask >> (7 - colIdx)) & 1;
  return bit === 1;
}

/**
 * Generates an 8x8 ImageData tile buffer for HTML5 Canvas Pattern creation
 */
export function createPatternImageData(
  pattern: Pattern8x8,
  fgColorRgba: [number, number, number, number],
  bgColorRgba: [number, number, number, number]
): ImageData {
  const data = new Uint8ClampedArray(8 * 8 * 4);

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const isSet = samplePatternBit(pattern, x, y);
      const color = isSet ? fgColorRgba : bgColorRgba;
      const offset = (y * 8 + x) * 4;

      data[offset] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = color[3];
    }
  }

  return new ImageData(data, 8, 8);
}

export { CHECKERBOARD_PATTERN, DIAGONAL_HATCH_PATTERN, HERRINGBONE_PATTERN };
