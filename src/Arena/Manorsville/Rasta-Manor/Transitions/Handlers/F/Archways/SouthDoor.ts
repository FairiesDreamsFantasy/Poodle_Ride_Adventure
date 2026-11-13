import { Direction } from '@/src/System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '@/src/System/Engine/Core/Constants';
import { TransitionResult } from '@/src/System/Engine/Transitions';
import { isSouthward } from '@/src/System/Engine/Core/Utils/Direction';

export const handleSouthDoorTransition = (
  direction: Direction,
  isAtSouthDoor: boolean,
  level: string,
  nextX: number,
  currentDims: { width: number, height: number },
  nextDoorwayStep: number
): TransitionResult | null => {
  // Allow transitions from Floor or Sky (if they reached the south end)
  if (isSouthward(direction) && (level === 'Floor' || level === 'Sky') && isAtSouthDoor) {
    if (nextDoorwayStep === 8) {
      const relX = nextX / currentDims.width;
      return {
        nextArea: 'RuggedPlayField' as any,
        nextX: Math.floor(relX * AREA_DIMENSIONS.RuggedPlayField.width),
        nextY: AREA_DIMENSIONS.RuggedPlayField.height - 10,
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: "You pass through the green and gold striped archway into the Rugged Play Field. The floor is covered in ceramic tiles with a forest floor theme, and the ceiling is exceptionally high.",
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
        nextX,
        nextY: 0,
        nextLevel: 'Floor' as any,
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
