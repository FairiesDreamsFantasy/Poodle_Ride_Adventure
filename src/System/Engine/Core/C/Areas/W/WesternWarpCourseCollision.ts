import { CollisionResult } from '../../Collision';
import { GameState } from '../../../Types';

export function handleWesternWarpCourseCollision(
  area: string,
  nextX: number,
  nextY: number,
  dims: { width: number, height: number },
  state: GameState
): Partial<CollisionResult> {
  let isBlocked = false;
  let wallDesc = "";

  if (area === 'WesternTarsisEffect') {
    // Normal vertical path
    if (nextX <= 0 || nextX >= dims.width || nextY < 0 || nextY >= dims.height) {
      if (nextY >= dims.height) isBlocked = false;
      else if (nextY < 0) { isBlocked = true; wallDesc = "The gate behind you is closed!"; }
      else { isBlocked = true; wallDesc = "The white fence blocks your path."; }
    }
  } else if (area === 'PablotsPonyField') {
    // Horizontal path (facing West, using gridX for distance)
    if (nextX < 0 || nextX >= dims.width || nextY <= 0 || nextY >= dims.height) {
      if (nextX >= dims.width) isBlocked = false; // End of course
      else if (nextX < 0) { isBlocked = true; wallDesc = "The barn door is closed behind you. Ride West!"; }
      else { isBlocked = true; wallDesc = "The fence along the farm field keeps you on the brick path."; }
    }
  }

  return { isBlocked, wallDesc };
}
