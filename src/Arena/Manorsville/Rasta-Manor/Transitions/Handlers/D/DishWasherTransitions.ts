import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleDishWasherTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'DishWasherArea';
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

  // South Door to Kitchen (y1)
  if (direction === 'South' && nextY <= 1 && nextX >= 10 && nextX <= 990) { 
    if (nextDoorwayStep === 8) {
      msg = "You return to the Kitchen.";
      nextArea = 'Kitchen';
      nextX_out = 500;
      nextY_out = currentDims.height - 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = 1;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
