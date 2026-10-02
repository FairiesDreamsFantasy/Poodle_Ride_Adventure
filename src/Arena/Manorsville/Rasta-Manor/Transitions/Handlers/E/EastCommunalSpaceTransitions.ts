import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleEastCommunalSpaceTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'EastCommunalSpace';
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

  // West to East Grand Arcade
  if (direction === 'West' && nextX <= 1 && nextY >= 970 && nextY <= 1010) {
    msg = "You return to the East Grand Arcade.";
    nextArea = 'EastGrandArcade';
    nextX_out = AREA_DIMENSIONS.EastGrandArcade.width - 10;
    nextY_out = nextY;
    handled = true;
  }

  // Ramps and Upper Level logic
  // Landing at x969 to x1000, y980 to y1000
  const isAtLanding = nextX >= 969 && nextX <= 1000 && nextY >= 980 && nextY <= 1000;
  
  // Overlap Fix: Ramp Up is x980 to x1000. Ramp Down is now x964 to x979.
  // Ramp Up to Upper Level (y522 to y980, x980 to x1000)
  if (nextX >= 980 && nextX <= 1000 && nextY >= 522 && nextY <= 980 && !handled) {
    isRampStep = true;
    if (level === 'Floor' && direction === 'North' && nextY >= 975) {
      msg = "You are now on the upper level of the Communal Space.";
      nextLevel = 'Sky';
      handled = true;
    } else if (level === 'Sky' && direction === 'South' && nextY <= 530) {
      msg = "You return to the floor level.";
      nextLevel = 'Floor';
      handled = true;
    }
  }

  // Ramp Down to Cellar (x964 to x979, y522 to y980)
  if (nextX >= 964 && nextX <= 979 && nextY >= 522 && nextY <= 980 && !handled) {
    isRampStep = true;
    isDescending = true;
    if (level === 'Floor' && direction === 'South' && nextY <= 530) {
      msg = "You descend into the cellar area.";
      nextLevel = 'Cellar';
      handled = true;
    } else if (level === 'Cellar' && direction === 'North' && nextY >= 975) {
      msg = "You return to the 1st floor communal space.";
      nextLevel = 'Floor';
      handled = true;
    }
  }

  // Vending Machine Room (x669 to x1000, y1 to y498)
  if (nextX >= 669 && nextX <= 1000 && nextY >= 1 && nextY <= 498) {
    // This could be a separate room or just a sub-area. User says "Vending machine room".
    // "A transition zone is at x980 to x1000 at y498."
    if (nextX >= 980 && nextX <= 1000 && nextY >= 495 && nextY <= 500) {
      msg = "You pass the transition zone into the main communal space.";
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
