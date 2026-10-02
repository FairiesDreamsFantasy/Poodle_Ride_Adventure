import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleGrandArcadeExtensionTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'GrandArcadeExtension';
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

  // West transitions
  if (direction === 'West' && nextX <= 1) {
    // West to East Grand Arcade (near bottom y, connects to 1002-1012 in EastGrandArcade)
    if (nextY >= 0 && nextY <= 30) {
      msg = "You walk back into the main corridor of the East Grand Arcade.";
      nextArea = 'EastGrandArcade';
      nextX_out = AREA_DIMENSIONS.EastGrandArcade.width - 10;
      nextY_out = nextY + 1000;
      handled = true;
    }
    // West into Employees' Living Quarters (sliding glass doors at y=495 to 505 / centered)
    else if (nextY >= 485 && nextY <= 515) {
      msg = "You slide open the double glass doors and step into the Employees' Living Quarters.";
      nextArea = 'EmployeesLivingQuarters';
      nextX_out = AREA_DIMENSIONS.EmployeesLivingQuarters.width - 10;
      nextY_out = nextY;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
