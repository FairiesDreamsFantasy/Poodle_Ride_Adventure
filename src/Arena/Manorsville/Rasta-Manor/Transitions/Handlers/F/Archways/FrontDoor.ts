import { Direction } from '@/src/System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '@/src/System/Engine/Core/Constants';
import { TransitionResult } from '@/src/System/Engine/Transitions';
import { isNorthward } from '@/src/System/Engine/Core/Utils/Direction';

export const handleFrontDoorTransition = (
  direction: Direction,
  isAtNorthDoor: boolean,
  level: string,
  nextX: number,
  currentDims: { width: number, height: number },
  nextDoorwayStep: number
): TransitionResult | null => {
  // Allow transitions from Floor or Sky (if they just descended from ramp)
  if (isNorthward(direction) && (level === 'Floor' || level === 'Sky') && isAtNorthDoor) {
    if (nextDoorwayStep === 7) {
      const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
      return {
        nextArea: 'FrontPorch' as any,
        nextX: Math.floor(relX * AREA_DIMENSIONS.FrontPorch.width),
        nextY: 10,
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: "You pass through the front doors onto the porch.",
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
        nextY: currentDims.height,
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
