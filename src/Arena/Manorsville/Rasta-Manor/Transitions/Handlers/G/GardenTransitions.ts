import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleGardenTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number },
  isAtNorthDoor: boolean
): TransitionResult | null => {
  let nextArea = 'Garden';
  let nextX_out = nextX;
  let nextY_out = nextY;
  let nextLevel = level;
  let nextDoorwayStep = doorwayStep;
  let msg = "";
  let isBlocked = false;
  let shouldBark = false;
  let barkMsg = "";
  let barkCount = 1;
  let isRampStep = false;
  let isDescending = false;
  let handled = false;

  // North Door to Back Porch
  if (direction === 'North' && isAtNorthDoor) {
    if (nextDoorwayStep === 1) {
      nextArea = 'BackPorch';
      nextY_out = 10;
      const relX = nextX / currentDims.width;
      nextX_out = Math.floor(relX * AREA_DIMENSIONS.BackPorch.width);
      nextDoorwayStep = 0;
      handled = true;
    } else if (nextDoorwayStep >= 2) {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = nextDoorwayStep - 1;
      nextY_out = currentDims.height;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = 16;
      nextY_out = currentDims.height;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
