/**
 * Poodle Ride Adventure: Core Mathematical and Trigonometric Utility Functions
 */

/**
 * Calculates the Euclidean distance between two 2D points.
 */
export function getDistance2D(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Normalizes an angle in degrees to be within the [0, 360) range.
 */
export function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}

/**
 * Returns a random number within a specified range, optionally applied as jitter.
 */
export function getRandomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Convert degrees to radians.
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees.
 */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI);
}
