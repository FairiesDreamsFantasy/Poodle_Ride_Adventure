import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleEmployeesLivingQuartersTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'EmployeesLivingQuarters';
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

  // West to Grand Ballroom (y between 490 and 510)
  if (direction === 'West' && nextX <= 1 && nextY >= 480 && nextY <= 520) {
    msg = "You slide open the stylish wooden Rastafari doors and enter the Grand Ballroom.";
    nextArea = 'GrandBallroom';
    nextX_out = AREA_DIMENSIONS.GrandBallroom.width - 10;
    nextY_out = nextY;
    handled = true;
  }

  // East to Grand Arcade Extension (y between 495 and 505)
  if (direction === 'East' && nextX >= currentDims.width - 1 && nextY >= 485 && nextY <= 515) {
    msg = "You slide open the sliding glass double doors and step into the Grand Arcade Extension.";
    nextArea = 'GrandArcadeExtension';
    nextX_out = 10;
    nextY_out = nextY; // Center or match
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
