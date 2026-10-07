/**
 * Procedural Pattern Palette Registry
 * Discrete bitmasks for checkerboards, hatchings, and stipples.
 */

export interface Pattern8x8 {
  name: string;
  bitmaskRows: ReadonlyArray<number>; // 8 unsigned 8-bit integers (0-255)
}

export const CHECKERBOARD_PATTERN: Readonly<Pattern8x8> = Object.freeze({
  name: 'Checkerboard_8x8',
  bitmaskRows: Object.freeze([
    0b10101010,
    0b01010101,
    0b10101010,
    0b01010101,
    0b10101010,
    0b01010101,
    0b10101010,
    0b01010101,
  ]),
});

export const DIAGONAL_HATCH_PATTERN: Readonly<Pattern8x8> = Object.freeze({
  name: 'Diagonal_Hatch_8x8',
  bitmaskRows: Object.freeze([
    0b10000000,
    0b01000000,
    0b00100000,
    0b00010000,
    0b00001000,
    0b00000100,
    0b00000010,
    0b00000001,
  ]),
});

export const HERRINGBONE_PATTERN: Readonly<Pattern8x8> = Object.freeze({
  name: 'Herringbone_8x8',
  bitmaskRows: Object.freeze([
    0b11000011,
    0b01100110,
    0b00111100,
    0b00011000,
    0b00111100,
    0b01100110,
    0b11000011,
    0b10000001,
  ]),
});
