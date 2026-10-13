import { Direction } from '../../../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../../../System/Engine/Transitions';

export const handleCellarDoorTransition = (
  direction: Direction,
  level: string,
  gridY: number,
  nextX: number,
  nextY: number
): TransitionResult | null => {
  const isAtCellarDoor = level === 'Floor' && nextX >= 2 && nextX <= 18 && nextY >= 1315 && nextY <= 1325;
  if (isAtCellarDoor) {
    if ((direction === 'North' && gridY <= 1320 && nextY > 1320) || (direction === 'South' && gridY >= 1320 && nextY < 1320)) {
      return {
        nextArea: 'Foyer' as any,
        nextX,
        nextY,
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: "You pass through the double cellar doors. They have diamond-patterned grates over the upper windows.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    }
  }
  return null;
};
