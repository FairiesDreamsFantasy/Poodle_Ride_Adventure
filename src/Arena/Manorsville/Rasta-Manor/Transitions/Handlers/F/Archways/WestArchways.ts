import { Direction } from '../../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../../System/Engine/Transitions';
import { isWestward } from '../../../../../../../System/Engine/Core/Utils/Direction';

export const handleWestArchwayTransitions = (
  direction: Direction,
  level: string,
  nextX: number,
  nextY: number,
  nextDoorwayStep: number
): TransitionResult | null => {
  if (!isWestward(direction)) return null;

  const isAtPlaygroundFloorNW = level === 'Floor' && nextX <= 1 && nextY >= 1980 && nextY <= 2000;
  const isAtPlaygroundFloorArchway = level === 'Floor' && nextX <= 1 && nextY >= 410 && nextY <= 430;
  const isAtPlaygroundSkyArchway = (level === 'Sky' || (level === 'Floor' && nextY >= 1320 && nextY <= 1340)) && nextX <= 1 && nextY >= 1320 && nextY <= 1340;

  if (isAtPlaygroundFloorNW || isAtPlaygroundFloorArchway || isAtPlaygroundSkyArchway) {
    // Standard 6-step transition for playground archways
    if (nextDoorwayStep === 6) {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX: AREA_DIMENSIONS.TheGrandPlayground.width - 10,
        nextY: nextY,
        nextLevel: isAtPlaygroundSkyArchway ? 'Sky' : 'Floor',
        nextDoorwayStep: 0,
        msg: "You enter the Grand Indoor Playground through the rainbow star archway.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    } else {
      let barkArea = 'GrandPlaygroundToFloorFoyerArchway';
      if (isAtPlaygroundSkyArchway) {
        barkArea = 'SkyFoyerToPlaygroundPerimeterArchway';
      }

      return {
        nextArea: 'Foyer' as any,
        nextX: 1,
        nextY,
        nextLevel: level as any,
        nextDoorwayStep: nextDoorwayStep + 1,
        msg: "",
        isBlocked: false,
        shouldBark: true,
        barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1,
        barkArea,
        isRampStep: false,
        isDescending: false
      };
    }
  }

  return null;
};
