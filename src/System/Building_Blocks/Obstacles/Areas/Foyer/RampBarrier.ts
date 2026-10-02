
export interface RampBarrier {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  description: string;
}

/**
 * Rhino Barrier at the Ramp Opening
 * L-shaped safety barrier at 1980 feet marker, 20 feet from west wall.
 * Features a diamond pattern depicting a black rhino in a landscape of Kenya, South Africa, or Ethiopia.
 */
export const RHINO_BARRIER: RampBarrier[] = [
  { x1: 1, y1: 1980, x2: 20, y2: 1980, description: "Rhino Barrier North" },
  { x1: 20, y1: 1980, x2: 20, y2: 1340, description: "Rhino Barrier East" }
];

export const isCollidingWithRampBarrier = (x: number, y: number, nextX: number, nextY: number, isClassicMode: boolean): string | null => {
  // Scale coordinates if in classic mode
  const scale = isClassicMode ? 0.5 : 1.0;
  const scaledX8 = 8 * scale;
  const scaledY992 = 992 * scale;
  const scaledY772 = 772 * scale;
  const scaledX1 = 1 * scale;

  // Horizontal part: y=992, x=1-8 (North side of ramp opening)
  if (nextY >= scaledY992 && nextX <= scaledX8 && nextX >= scaledX1) {
    if (y < scaledY992) return "The rhino barrier stops you from moving North into the ramp opening.";
  }

  // Vertical part: x=8, y=992-772 (East side of ramp opening)
  if (nextX <= scaledX8 && nextY <= scaledY992 && nextY >= scaledY772) {
    if (x > scaledX8) return "The rhino barrier stops you from moving West into the ramp opening.";
  }

  // Starting post of the ramp railing at x8 y992
  if (Math.abs(nextX - scaledX8) < 2 && Math.abs(nextY - scaledY992) < 2) {
    return "You bump into the starting post of the ramp's railing. It is firmly attached to the decorative wall.";
  }

  return null;
};
