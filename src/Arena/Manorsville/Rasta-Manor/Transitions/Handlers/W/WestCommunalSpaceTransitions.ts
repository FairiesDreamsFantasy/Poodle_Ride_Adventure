import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleWestCommunalSpaceTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'WestCommunalSpace';
  let nextX_out = nextX;
  let nextY_out = nextY;
  let nextLevel = level;
  let nextDoorwayStep = doorwayStep;
  let msg = "";
  let isBlocked = false;
  let shouldBark = false;
  let barkMsg = "";
  let barkCount = 1;
  let barkArea: string | undefined = undefined;
  let isRampStep = false;
  let isDescending = false;
  let handled = false;

  // East to West Grand Arcade (RuggedPlayFieldPlaceholderWest was renamed)
  if (direction === 'East' && nextX >= currentDims.width && nextY >= 970 && nextY <= 1010) {
    msg = "You return to the West Grand Arcade.";
    nextArea = 'WestGrandArcade'; 
    nextX_out = 10;
    nextY_out = nextY;
    handled = true;
  }

  // Ramps and Upper Level logic (Mirrored to West side x1)
  // Landing at x1 to x31, y980 to y1000
  const isAtLanding = nextX >= 1 && nextX <= 31 && nextY >= 980 && nextY <= 1000;
  
  // Ramp Up to Upper Level (y522 to y980, x1 to x20)
  if (nextX >= 1 && nextX <= 20 && nextY >= 522 && nextY <= 980) {
    isRampStep = true;
    if (level === 'Floor' && direction === 'North' && nextY >= 975) {
      msg = "You are now on the upper level of the West Communal Space.";
      nextLevel = 'Sky';
      handled = true;
    } else if (level === 'Sky' && direction === 'South' && nextY <= 530) {
      msg = "You return to the floor level.";
      nextLevel = 'Floor';
      handled = true;
    }
  }

  // Ramp Down to Cellar (x21 to x36, y522 to y980)
  if (nextX >= 21 && nextX <= 36 && nextY >= 522 && nextY <= 980) {
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

  // Vending Machine Room (x1 to x331, y1 to y498)
  if (nextX >= 1 && nextX <= 331 && nextY >= 1 && nextY <= 498) {
    if (nextX >= 1 && nextX <= 20 && nextY >= 495 && nextY <= 500) {
      msg = "You pass the transition zone into the main communal space.";
    }
  }

  // Upper Level Archway to Narrow Dressage Gym (South end of West Communal Space)
  if (level === 'Sky' && direction === 'South' && nextY <= 1 && nextX >= 485 && nextX <= 499) {
    if (nextDoorwayStep === 1) {
      msg = "You pass through the archway into the animal spectator area above the Narrow Dressage Gym.";
      nextArea = 'SpectatorArea';
      nextX_out = nextX;
      nextY_out = 1990;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "A Poodle Barks Elegantly";
      barkCount = 4; // User: "4 barks entering"
      barkArea = 'WestCommunalNarrowGymArch';
      nextDoorwayStep++;
      nextX_out = nextX;
      nextY_out = 1;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
  };
};
