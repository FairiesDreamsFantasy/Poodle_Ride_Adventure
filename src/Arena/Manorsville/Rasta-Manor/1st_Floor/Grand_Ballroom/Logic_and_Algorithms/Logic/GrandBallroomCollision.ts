import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';

export interface CollisionResult {
  isBlocked: boolean;
  wallDesc: string;
}

/**
 * Handles collision logic specifically for the Grand Ballroom.
 * Features solid marble walls and high archways to the Foyer at the Sky level.
 */
export const handleGrandBallroomCollision = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar' | 'Mezzanine',
  state?: any
): CollisionResult => {
  const currentDims = AREA_DIMENSIONS['GrandBallroom'] || { width: 2000, height: 2000 };
  let isBlocked = false;
  let wallDesc = "";

  const isSky = level === 'Sky';

  // Basic boundary checks
  if (nextX < 0 || nextX > currentDims.width || nextY < 0 || nextY > currentDims.height) {
    // Archways to Foyer at Sky level (West wall)
    const isAtWestSkyArchNorth = isSky && nextX <= 0 && nextY >= 1984 && nextY <= 1994;
    const isAtWestSkyArchSouth = isSky && nextX <= 0 && nextY >= 0 && nextY <= 10;
    
    // South door to East Grand Arcade (Southeast corner)
    const isAtSouthDoor = level === 'Floor' && nextY <= 0 && nextX >= 1980 && nextX <= 2000;

    // East door to Employees' Living Quarters (y=490 to 510)
    const isAtEastDoor = level === 'Floor' && nextX >= currentDims.width && nextY >= 485 && nextY <= 515;
    
    if (isAtWestSkyArchNorth || isAtWestSkyArchSouth || isAtSouthDoor) {
      isBlocked = false;
    } else if (isAtEastDoor) {
      const animal = state ? state.ridingAnimal : null;
      const isRiding = animal && animal !== "";
      
      if (!isRiding) {
        // Human is on foot, can walk through 8-foot doors easily
        isBlocked = false;
      } else {
        const isLegacy = (animal === "Legacy Poodle" || animal === "legacy");
        const hasAdjustment = isLegacy;
        
        let headHeight = 10.0; // Default for Abigay
        if (animal === 'Anninne-Amelia Rose Julisus') {
          headHeight = 10.5;
        } else if (animal === 'Dymond Daisy Qin-Reynolds') {
          headHeight = 8.5;
        } else if (animal === 'Abigail Marigold Kenyatta') {
          headHeight = 8.0;
        } else if (isLegacy) {
          headHeight = 7.25;
        }

        if (!hasAdjustment) {
          isBlocked = true;
          wallDesc = `The 8-foot doorway is too low. You are riding ${animal}, which keeps her majestic head perched locked and upright at ${headHeight} feet as an intentional form of art. Because she does not adjust her head when you lean forward, she cannot pass.`;
        } else {
          if (state && state.isLeaning) {
            if (headHeight <= 8.0) {
              isBlocked = false;
            } else {
              isBlocked = true;
              wallDesc = `Even with head adjustment, your massive legacy poodle at ${headHeight} feet cannot squeeze through this 8-foot doorway.`;
            }
          } else {
            isBlocked = true;
            wallDesc = `The door frame is 8 feet tall. Although your legacy poodle is 7.25 feet tall, you must lean forward (duck) to guide her majestic head through safely.`;
          }
        }
      }
    } else {
      isBlocked = true;
      if (nextY >= currentDims.height) wallDesc = "The North wall of the Grand Ballroom is solid marble.";
      else if (nextY <= 0) wallDesc = "The South wall of the Grand Ballroom is solid marble, except for the Southeast archway.";
      else if (nextX >= currentDims.width) wallDesc = "The East wall of the Grand Ballroom is solid marble.";
      else if (nextX <= 0) wallDesc = "The West wall of the Grand Ballroom is solid marble, except for the high archways to the Foyer.";
    }
  }

  return { isBlocked, wallDesc };
};
