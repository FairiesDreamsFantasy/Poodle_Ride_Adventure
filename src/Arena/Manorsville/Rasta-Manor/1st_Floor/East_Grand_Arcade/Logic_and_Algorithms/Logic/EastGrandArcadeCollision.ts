import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';

export interface CollisionResult {
  isBlocked: boolean;
  wallDesc: string;
}

/**
 * Handles collision logic specifically for the East Grand Arcade.
 */
export const handleEastGrandArcadeCollision = (
  nextX: number,
  nextY: number
): CollisionResult => {
  const currentDims = AREA_DIMENSIONS['EastGrandArcade'] || { width: 2000, height: 2000 };
  let isBlocked = false;
  let wallDesc = "";

  if (nextX < 0 || nextX > currentDims.width || nextY < 0 || nextY > currentDims.height) {
    const isAtNorthDoor = nextY >= currentDims.height && nextX >= 1980 && nextX <= 2000; // to Grand Ballroom
    
    if (isAtNorthDoor) {
      isBlocked = false;
    } else {
      isBlocked = true;
      if (nextY >= currentDims.height) wallDesc = "The North wall is solid, except for the entrance to the Grand Ballroom.";
      else if (nextY <= 0) wallDesc = "The South wall of the East Grand Arcade is a grand, finished surface.";
      else if (nextX >= currentDims.width) wallDesc = "The East wall is solid stone.";
      else if (nextX <= 0) wallDesc = "The West wall is solid stone.";
    }
  }

  return { isBlocked, wallDesc };
};
