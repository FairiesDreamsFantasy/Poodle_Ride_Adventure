import { Direction } from '../../../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../../../System/Engine/Transitions';

export const handlePlaygroundEastArchways = (
  direction: Direction,
  level: string,
  currentDims: { width: number, height: number },
  nextX: number,
  nextY: number,
  nextDoorwayStep: number
): TransitionResult | null => {
  if (direction !== 'East' || nextX < currentDims.width) return null;

  const isAtFloorDoor = level === 'Floor' && nextY >= 1980 && nextY <= 2000;
  const isAtFloorArchway = level === 'Floor' && nextY >= 410 && nextY <= 430;
  const isAtSkyArchway = level === 'Sky' && nextY >= 1320 && nextY <= 1340;

  if (isAtFloorDoor || isAtFloorArchway || isAtSkyArchway) {
    const totalSteps = isAtSkyArchway ? 5 : 6;
    if (nextDoorwayStep === totalSteps) {
      return {
        nextArea: 'Foyer' as any,
        nextX: 40, 
        nextY: nextY,
        nextLevel: level as any,
        nextDoorwayStep: 0,
        msg: isAtSkyArchway ? "You return to the Sky Foyer." : "You return to the Floor Foyer.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    } else {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX: currentDims.width - 1,
        nextY,
        nextLevel: level as any,
        nextDoorwayStep: nextDoorwayStep + 1,
        msg: "",
        isBlocked: false,
        shouldBark: true,
        barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    }
  }

  return null;
};
