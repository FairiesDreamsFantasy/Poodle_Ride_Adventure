import { BABYLON_FALLEN_CONSTANTS as C } from '@/src/Warp_Houses/Allisons_Manor/Manor/1st_Floor/Babylon_Is_Finally_Fallen/BabylonFallenConstants';

export function handleBabylonFallenCollision(
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
       wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (North Wall: African World paintings)";
    } else if (nextY <= 0) {
       // South Wall
       wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (South Wall: African World paintings)";
    } else if (nextX <= 0) {
       // West Wall (except door)
       if (nextY < C.DOOR.INTERIOR.Y_MIN || nextY > C.DOOR.INTERIOR.Y_MAX) {
         wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (West Wall: African World paintings)";
       } else {
         isBlocked = false; // Door area
       }
    } else if (nextX >= currentDims.width) {
       // East Wall
       wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (East Wall: African World paintings)";
    }
  }

  return { isBlocked, wallDesc };
}
