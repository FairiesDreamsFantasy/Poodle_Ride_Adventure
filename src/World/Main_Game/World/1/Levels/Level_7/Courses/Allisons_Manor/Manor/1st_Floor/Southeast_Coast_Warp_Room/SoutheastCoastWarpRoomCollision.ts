import { SOUTHEAST_COAST_WARP_ROOM_CONSTANTS as C } from './SoutheastCoastWarpRoomConstants';

/**
 * handleSoutheastCoastWarpRoomCollision
 * Handles collision logic for the Southeast Coast Warp Room.
 */
export function handleSoutheastCoastWarpRoomCollision(
  nextX: number,
  nextY: number,
  currentDims: { width: number; height: number }
) {
  let isBlocked = false;
  let wallDesc = "";

  // Boundary checks (250x100)
  if (nextX < 0 || nextX > currentDims.width || nextY < 0 || nextY > currentDims.height) {
    isBlocked = true;
    if (nextY >= currentDims.height) {
      // North door area
      if (nextX >= C.DOORWAY.X_START && nextX <= C.DOORWAY.X_END) {
        isBlocked = false; // Transition handled by Transitions.ts
      } else {
        wallDesc = "The North wall is made of solid white ceramic tile.";
      }
    } else if (nextY <= 0) {
      wallDesc = "The South wall shows palm trees and the horizon of the sea.";
    } else if (nextX >= currentDims.width) {
      wallDesc = "The East wall shows the horizon of the sea with docks.";
    } else if (nextX <= 0) {
      wallDesc = "The West wall is lined with palm trees.";
    }
  }

  return { isBlocked, wallDesc };
}
