import { Direction } from '../../../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../../../System/Engine/Transitions';
import { isEastward } from '../../../../../../../System/Engine/Core/Utils/Direction';

export const handleEastArchwayTransitions = (
  direction: Direction,
  level: string,
  currentDims: { width: number, height: number },
  nextX: number,
  nextY: number,
  nextDoorwayStep: number
): TransitionResult | null => {
  if (level !== 'Sky' || !isEastward(direction)) return null;

  const isAtBallroomSkyNorth = nextX >= currentDims.width && nextY >= 1984 && nextY <= 1994;
  const isAtBallroomSkySouth = nextX >= currentDims.width && nextY >= 1 && nextY <= 10;

  if (isAtBallroomSkyNorth || isAtBallroomSkySouth) {
    if (nextDoorwayStep === 8) {
      return {
        nextArea: 'GrandBallroom' as any,
        nextX: 10,
        nextY: nextY,
        nextLevel: 'Sky',
        nextDoorwayStep: 0,
        msg: "You transition through the East archway to the Ballroom's perimeter walkway.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    } else {
      return {
        nextArea: 'Foyer' as any,
        nextX: currentDims.width - 1,
        nextY,
        nextLevel: 'Sky',
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
