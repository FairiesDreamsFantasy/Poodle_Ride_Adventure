import { WESTERN_WARP_CONSTANTS } from './WesternWarpRoomConstants';

/**
 * Collision logic for the Western Warp Room.
 * Handles boundaries, obstacles, and door transitions.
 */
export const handleWesternWarpRoomCollision = (
  nextX: number,
  nextY: number,
  currentDims: { width: number; height: number }
) => {
  const c = WESTERN_WARP_CONSTANTS;
  let isBlocked = false;
  let wallDesc = "";

  // 1. Room Boundaries
  if (nextX < 1 || nextX > c.WIDTH || nextY < 1 || nextY > c.HEIGHT) {
    isBlocked = true;

    // North Wall
    if (nextY >= c.HEIGHT) {
      // Check if in doorway (x2 - x14)
      if (nextX >= c.DOOR.X_MIN && nextX <= c.DOOR.X_MAX) {
        isBlocked = false; // Transition allowed
      } else {
        wallDesc = "You have reached the North wall. It is painted with a grass field and a blue sky.";
      }
    }
    // South Wall (y=1)
    else if (nextY <= 1) {
      wallDesc = "The South wall features a beautiful farmhouse mural and a painted fence.";
    }
    // West Wall (x=1)
    else if (nextX <= 1) {
      wallDesc = "The West wall has a brown rectangular table and a decorative rodeo cylinder.";
    }
    // East Wall (x=250)
    else if (nextX >= c.WIDTH) {
      // Check for picture interaction (y0 - y15)
      if (nextY >= c.PICTURE.Y_MIN && nextY <= c.PICTURE.Y_MAX) {
        // Warp trigger! 
        // We'll return a special flag or just handle it in Transitions.ts by checking boundaries
        wallDesc = "As you approach the animated picture of Pablo and Alvita, the colors begin to swirl. You are being drawn into the farm field!";
        isBlocked = false; // Allow passing through to trigger transition
      } else {
        wallDesc = "The East wall shows a vibrant sunrise over the western horizon, built with high-quality bricks.";
      }
    }
  }

  // 2. Objects / Obstacles
  
  // Rocking Pony Pedestal (Centered)
  const px = c.ROCKING_PONY.X;
  const py = c.ROCKING_PONY.Y;
  const pw = c.ROCKING_PONY.PEDESTAL.WIDTH;
  const pl = c.ROCKING_PONY.PEDESTAL.LENGTH;
  if (nextX >= px - pl/2 && nextX <= px + pl/2 && nextY >= py - pw/2 && nextY <= py + pw/2) {
    isBlocked = true;
    wallDesc = "You have reached the safety pedestal of the large pink rocking pony. Its sturdy springs are mounted here.";
  }

  // Decorative Fence
  if (nextY >= c.FENCE.Y && nextY <= c.FENCE.Y + c.FENCE.THICKNESS && nextX <= c.FENCE.X_MAX) {
    isBlocked = true;
    wallDesc = "A decorative wooden fence with a rodeo-style cylinder blocks your path.";
  }

  // West Table
  if (nextX <= c.TABLE_WEST.WIDTH && nextY >= c.TABLE_WEST.Y && nextY <= c.TABLE_WEST.Y + c.TABLE_WEST.HEIGHT) {
    isBlocked = true;
    wallDesc = "A brown rectangular table made of sustainable wood is here.";
  }

  return { isBlocked, wallDesc };
};
