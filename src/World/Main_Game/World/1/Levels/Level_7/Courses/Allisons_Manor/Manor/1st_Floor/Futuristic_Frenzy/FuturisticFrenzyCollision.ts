import { FUTURISTIC_FRENZY_CONSTANTS as C } from './FuturisticFrenzyConstants';

export function handleFuturisticFrenzyCollision(
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
       wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (North Wall: Future City paintings)";
    } else if (nextY <= 0) {
       // South Wall
       wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (South Wall: Future City paintings)";
    } else if (nextX <= 0) {
       // West Wall (except door)
       if (nextY < C.DOOR.INTERIOR.Y_MIN || nextY > C.DOOR.INTERIOR.Y_MAX) {
         wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (West Wall: Future City paintings)";
       } else {
         isBlocked = false; // Door area
       }
    } else if (nextX >= currentDims.width) {
       // East Wall
       wallDesc = C.DESCRIPTIONS.WALLS.INTERIOR + " (East Wall: Grated Windows)";
    }
  }

  // Computer Lab is open, so no collision there

  return { isBlocked, wallDesc };
}
