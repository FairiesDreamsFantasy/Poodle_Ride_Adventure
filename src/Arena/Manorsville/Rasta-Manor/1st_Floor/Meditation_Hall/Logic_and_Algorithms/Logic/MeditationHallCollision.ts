import { Direction } from '../../../../../../../types';
import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { MEDITATION_HALL_DESCRIPTIONS } from '../../../../../../../Description_List/M/MeditationHall';

export function handleMeditationHallCollision(
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  hasAnnouncedLanding: boolean,
  hasAnnouncedSkyLanding: boolean,
  isDoorOpen: boolean
): { isBlocked: boolean; wallDesc: string; msg: string; nextArea?: GameState['area']; nextX_out?: number; nextY_out?: number; nextDirection?: Direction; setAnnouncedLanding?: boolean; setAnnouncedSkyLanding?: boolean } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";
  let nextArea: GameState['area'] | undefined;
  let nextX_out: number | undefined;
  let nextY_out: number | undefined;
  let nextDirection: Direction | undefined;
  let setAnnouncedLanding = false;
  let setAnnouncedSkyLanding = false;

  const width = AREA_DIMENSIONS.MeditationHall.width;
  const height = AREA_DIMENSIONS.MeditationHall.height;

  // Boundaries - Clamp to actual grid limits
  const clampedX = Math.max(0, Math.min(width, nextX));
  const clampedY = Math.max(0, Math.min(height, nextY));

  // Door/Archway segments (990-1010)
  const isAtNorthDoor = clampedX >= 990 && clampedX <= 1010;
  const isAtSouthDoor = clampedX >= 990 && clampedX <= 1010;

  // West Wall
  if (clampedX < 0.1) {
    // West Archway to Library (y1-21)
    if (clampedY >= 1 && clampedY <= 21) {
      isBlocked = false;
    } else {
      isBlocked = true;
      wallDesc = "The West wall here is made of solid, calming wood. To the right of the archway at the south end, a 12-inch embossed gold label on a blue background reads 'Meditation Hall's Library'. Below it is an embossed orange book with white pages and green paragraph lines. A detailed picture shows a person riding a large white mouse with a pink bow tie among blue flowers and a tea party under a golden sun.";
    }
  } 
  // East Wall
  else if (clampedX > width - 0.1) {
    isBlocked = true;
    wallDesc = MEDITATION_HALL_DESCRIPTIONS.EAST_WALL;
  }
  // North Wall
  else if (clampedY > height - 0.1) {
    if (isAtNorthDoor) {
      if (!isDoorOpen) {
        isBlocked = true;
        wallDesc = "The 20-foot wide sliding door to the Simulated Garden Area is currently closed. It is made of steel and brass with beautiful Japanese and Ethiopian themed windows.";
      } else {
        isBlocked = false;
      }
    } else {
      isBlocked = true;
      wallDesc = "The North wall features 990-foot segments of solid wood on either side of the 20-foot wide door.";
    }
  } 
  // South Wall
  else if (clampedY < 0.1) {
    if (isAtSouthDoor) {
      isBlocked = false;
    } else {
      isBlocked = true;
      wallDesc = "The South wall features 990-foot segments of solid wood on either side of the 20-foot wide door.";
    }
  }

  // Southwest 20x20 Landing Square (Floor Level - North end of ramp)
  const isLandingSquareFloor = level === 'Floor' && clampedX <= 20 && clampedY >= 180 && clampedY <= 200;
  if (isLandingSquareFloor && !hasAnnouncedLanding) {
    msg = MEDITATION_HALL_DESCRIPTIONS.SKY_RAMP_LANDING;
    setAnnouncedLanding = true;
  }

  // Southwest 20x20 Landing Square (Sky Level - South end of ramp)
  const isLandingSquareSky = level === 'Sky' && clampedX <= 20 && clampedY <= 140;
  if (isLandingSquareSky && !hasAnnouncedSkyLanding) {
    msg = MEDITATION_HALL_DESCRIPTIONS.SKY_LANDING;
    setAnnouncedSkyLanding = true;
  }

  // Sky Level Perimeter Walkway (50 feet wide)
  if (level === 'Sky') {
    const perimeterWidth = 50;
    const inPerimeter = clampedX <= perimeterWidth || clampedX >= width - perimeterWidth || clampedY <= perimeterWidth || clampedY >= height - perimeterWidth;
    
    if (!inPerimeter) {
      isBlocked = true;
      wallDesc = MEDITATION_HALL_DESCRIPTIONS.BARRIER;
    }
  }

  // Ramp Barrier (x20, y141 to x20, y179)
  // This barrier prevents falling off the side of the ramp
  if (level === 'Floor' || level === 'Sky') {
    if (clampedX > 20 && clampedX < 25 && clampedY > 140 && clampedY < 180) {
      isBlocked = true;
      wallDesc = "A safety barrier prevents you from falling off the side of the Sky Ramp.";
    }
  }

  return { isBlocked, wallDesc, msg, nextArea, nextX_out, nextY_out, nextDirection, setAnnouncedLanding, setAnnouncedSkyLanding };
}
