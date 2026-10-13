/**
 * Poodle Ride Adventure: General Grid Calculations and Helper Utilities
 */

interface GridBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Validates if a coordinate is within the designated grid bounds.
 */
export function isWithinGridBounds(x: number, y: number, bounds: GridBounds): boolean {
  return x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY;
}

/**
 * Calculates a standard grid coordinate projection or snap-to-grid alignment.
 */
export function snapToGrid(value: number, stepSize: number = 1): number {
  return Math.round(value / stepSize) * stepSize;
}

/**
 * Interpolates smoothly between two values.
 */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}
