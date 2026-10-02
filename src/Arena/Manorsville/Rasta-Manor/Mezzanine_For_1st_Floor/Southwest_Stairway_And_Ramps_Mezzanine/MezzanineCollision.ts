import { MEZZANINE_WIDTH, MEZZANINE_HEIGHT, ELEVATOR_X_MIN, ELEVATOR_Y_MIN } from './MezzanineConstants';

export function handleMezzanineCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number
): { isBlocked: boolean; wallDesc: string; msg?: string } {
  // Area boundaries
  if (nextX < 0 || nextX > MEZZANINE_WIDTH || nextY < 0 || nextY > MEZZANINE_HEIGHT) {
    return { isBlocked: true, wallDesc: "The wall of the stairway and ramps mezzanine level." };
  }

  // Elevator Shaft (NE Corner)
  const inShaft = nextX >= ELEVATOR_X_MIN && nextY >= ELEVATOR_Y_MIN;
  const wasInShaft = gridX >= ELEVATOR_X_MIN && gridY >= ELEVATOR_Y_MIN;
  // If moving into the shaft and doesn't own transition (simplified here, but usually handled by global)
  if (inShaft && !wasInShaft) {
      // Logic for closed elevator handled globally or here
  }

  // Barrier at 220 feet from west wall (North wall area)
  // "a 30 feet long barrier from the north wall"
  if (Math.abs(nextX - 220) < 5 && nextY >= 970) {
      return { isBlocked: true, wallDesc: "A sturdy brass railing." };
  }

  return { isBlocked: false, wallDesc: "" };
}
