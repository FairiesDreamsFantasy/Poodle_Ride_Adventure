import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleWestGrandArcadeTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'WestGrandArcade';
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

  // North to The Grand Playground
  // Opening at x1-10 for Playground
  if (direction === 'North' && nextY >= currentDims.height && nextX >= 1 && nextX <= 10) {
    msg = "You enter the Grand Playground.";
    nextArea = 'TheGrandPlayground';
    nextY_out = 10;
    nextX_out = nextX;
    handled = true;
  }
  
  // Archway at x1980-2000 for Grand Indoor Playground
  if (direction === 'North' && nextY >= currentDims.height && nextX >= 1980 && nextX <= 2000) {
    msg = "You enter the Grand Indoor Playground.";
    nextArea = 'TheGrandPlayground';
    nextY_out = 10;
    nextX_out = nextX;
    handled = true;
  }

  // East to Rugged Play Field
  // Door at y990-1010
  if (direction === 'East' && nextX >= currentDims.width && nextY >= 990 && nextY <= 1010) {
    msg = "You return to the Rugged Play Field.";
    nextArea = 'RuggedPlayField';
    nextX_out = 10;
    nextY_out = nextY;
    handled = true;
  }

  // South to The Grand Gym
  // Door at x1980-2000
  if (direction === 'South' && nextY <= 1 && nextX >= 1980 && nextX <= 2000) {
    if (nextDoorwayStep === 8) {
      msg = "You enter The Grand Gym through the pixelated space archway.";
      nextArea = 'TheGrandGym';
      nextY_out = currentDims.height - 10;
      nextX_out = nextX;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
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
