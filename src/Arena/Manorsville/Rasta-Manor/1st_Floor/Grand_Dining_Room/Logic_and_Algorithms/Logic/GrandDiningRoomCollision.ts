import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';

export interface CollisionResult {
  isBlocked: boolean;
  wallDesc: string;
}

/**
 * Handles collision logic specifically for the Grand Dining Room.
 * The Grand Dining Room is a sophisticated dining space within Rasta-Manor.
 */
export const handleGrandDiningRoomCollision = (
  nextX: number,
  nextY: number
): CollisionResult => {
  const currentDims = AREA_DIMENSIONS['GrandDiningRoom'] || { width: 4000, height: 3000 };
  let isBlocked = false;
  let wallDesc = "";

  // Basic boundary checks for the Grand Dining Room
  if (nextX < 0) {
    isBlocked = true;
    wallDesc = "The West wall of the Grand Dining Room is adorned with fine tapestries.";
  } else if (nextX > currentDims.width) {
    isBlocked = true;
    wallDesc = "The East wall features grand windows overlooking the garden.";
  } else if (nextY < 0) {
    isBlocked = true;
    wallDesc = "The South wall leads back towards the main corridor.";
  } else if (nextY > currentDims.height) {
    isBlocked = true;
    wallDesc = "The North wall is where the grand fireplace stands.";
  }

  return { isBlocked, wallDesc };
};
