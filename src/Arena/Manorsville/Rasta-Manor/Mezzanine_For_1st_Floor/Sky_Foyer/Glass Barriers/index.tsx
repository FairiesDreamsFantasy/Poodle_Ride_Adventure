
export interface BarrierSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  description: string;
}

/**
 * Glass Barrier at the Upper Foyer
 * Raised by 4 feet (Total height improvement)
 * Each side is 14560 feet (728 units * 20 feet/unit)
 * Perimeter is 58240 feet (2912 units * 20 feet/unit)
 * Centered from x36 y36 to x764 y764
 */
export const GLASS_BARRIER: BarrierSegment[] = [
  { x1: 36, y1: 36, x2: 764, y2: 36, description: "North Glass Barrier" },
  { x1: 764, y1: 36, x2: 764, y2: 764, description: "East Glass Barrier" },
  { x1: 36, y1: 764, x2: 764, y2: 764, description: "South Glass Barrier" },
  { x1: 36, y1: 36, x2: 36, y2: 764, description: "West Glass Barrier" },
  { x1: 20, y1: 1340, x2: 20, y2: 1980, description: "West perimeter glass barrier" }
];

export const isCollidingWithGlassBarrier = (x: number, y: number, nextX: number, nextY: number): string | null => {
  // Check if crossing the inner perimeter (36-764)
  // If we were outside (x < 36 or x > 764 or y < 36 or y > 764) and try to move inside
  // Or if we are at the boundary
  
  if (nextX > 36 && nextX < 764 && nextY > 36 && nextY < 764) {
    if (x <= 36) return "The glass barrier prevents you from moving East into the foyer opening.";
    if (x >= 764) return "The glass barrier prevents you from moving West into the foyer opening.";
    if (y <= 36) return "The glass barrier prevents you from moving South into the foyer opening.";
    if (y >= 764) return "The glass barrier prevents you from moving North into the foyer opening.";
  }
  
  return null;
};
