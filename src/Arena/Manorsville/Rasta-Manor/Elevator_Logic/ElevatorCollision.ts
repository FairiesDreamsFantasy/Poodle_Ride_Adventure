import { SHAFT_MIN_X, SHAFT_MAX_X, SHAFT_MIN_Y, SHAFT_MAX_Y } from './ElevatorConstants';

export function handleElevatorCollision(
  nextX: number,
  nextY: number
): { isBlocked: boolean; wallDesc: string } {
  // Check if player is trying to move into the elevator shaft from outside when it's closed?
  // Or simply define the boundaries.
  // "Elevator's boundaries must not be overlapped because, like real elevators; falling into a shaft can spell disaster."
  
  const isInsideShaft = nextX >= SHAFT_MIN_X && nextX <= SHAFT_MAX_X && nextY >= SHAFT_MIN_Y && nextY <= SHAFT_MAX_Y;

  if (isInsideShaft) {
      // If we are precisely in the shaft but not in a transition, maybe we shouldn't be there.
      // But standard collision usually blocks the walls.
  }

  return { isBlocked: false, wallDesc: "" };
}
