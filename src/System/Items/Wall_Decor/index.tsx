
/**
 * Grand Tapestry at the East Wall
 * Depicts the ancient history of Ghana and the rise of New Kinxton City.
 * It hangs majestically on the East wall at 16,000x7,600 (16000x7600 feet).
 * In 1600 scale, this is x800 y380.
 * In 800 scale, this is x400 y190.
 */
export const GRAND_TAPESTRY = {
  x: 1980, // East wall
  y: 1000, // Centered vertically
  description: "A grand, hand-woven tapestry depicting the ancient history of Ghana and the rise of New Kinxton City. It hangs majestically on the East wall at y1000 in the Sky Foyer."
};

export const isCollidingWithGrandTapestry = (x: number, y: number, nextX: number, nextY: number, isClassicMode: boolean): string | null => {
  const scale = isClassicMode ? 0.5 : 1.0;
  const scaledX = GRAND_TAPESTRY.x * scale;
  const scaledY = GRAND_TAPESTRY.y * scale;

  // Check if we are at the East wall (X=800 or X=400) and near the tapestry Y
  if (nextX >= scaledX && Math.abs(nextY - scaledY) < 20) {
    return "The grand tapestry hangs majestically on the East wall, stopping your progress.";
  }

  return null;
};
