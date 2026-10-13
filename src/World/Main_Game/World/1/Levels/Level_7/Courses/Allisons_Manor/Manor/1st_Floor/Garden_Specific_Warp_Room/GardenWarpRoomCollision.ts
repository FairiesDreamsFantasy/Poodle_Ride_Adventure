import { GARDEN_WARP_ROOM_CONSTANTS as C } from './GardenWarpRoomConstants';

export function handleGardenWarpRoomCollision(
  nextX: number,
  nextY: number,
  currentDims: { width: number; height: number }
) {
  let isBlocked = false;
  let wallDesc = "";

  // Standard boundary check
  if (nextX < 0 || nextX > currentDims.width || nextY < 0 || nextY > currentDims.height) {
    isBlocked = true;
    if (nextY >= currentDims.height) {
       // North Wall
       wallDesc = C.DESCRIPTIONS.WALLS.NORTH;
    } else if (nextY <= 0) {
       // South Wall (except door)
       if (nextX < C.DOOR_X_MIN || nextX > C.DOOR_X_MAX) {
         wallDesc = C.DESCRIPTIONS.WALLS.SOUTH;
       } else {
         isBlocked = false; // Door area
       }
    } else if (nextX <= 0) {
       // West Wall
       wallDesc = C.DESCRIPTIONS.WALLS.WEST;
    } else if (nextX >= currentDims.width) {
       // East Wall
       wallDesc = C.DESCRIPTIONS.WALLS.EAST;
    }
  }

  return { isBlocked, wallDesc };
}
