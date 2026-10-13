import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';
import { TO_GYM_X, TO_GYM_Y_MIN, TO_GYM_Y_MAX, TO_WEST_X, TO_WEST_Y_MIN, TO_WEST_Y_MAX } from '../../../1st_Floor/Narrow_Dressage_Gym/DressageConstants';

export const handleDressageTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number },
  state: GameState
): TransitionResult | null => {
  let nextArea = 'NarrowDressageGym';
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
  let handled = false;

  // East Transition to Grand Gym (Center)
  const isGymArch = direction === 'East' && nextX >= currentDims.width && nextY >= TO_GYM_Y_MIN && nextY <= TO_GYM_Y_MAX;
  if (isGymArch) {
    if (nextDoorwayStep === 8) {
        msg = "You enter the Grand Gym.";
        nextArea = 'TheGrandGym';
        nextX_out = 10;
        nextY_out = nextY;
        nextDoorwayStep = 0;
        handled = true;
    } else {
        shouldBark = true;
        barkMsg = "The Poodle Barks Elegantly";
        barkCount = 7; // User: "7 for going east"
        nextDoorwayStep = nextDoorwayStep + 1;
        nextX_out = currentDims.width - 1;
        handled = true;
    }
  }

  // West Transition to West Side Brick Path (x1, y990-1010)
  const isWestDoor = direction === 'West' && nextX <= 1 && nextY >= TO_WEST_Y_MIN && nextY <= TO_WEST_Y_MAX;
  if (isWestDoor) {
    if (nextDoorwayStep === 8) {
        msg = "You exit the gym through the door leading to the west side brick path.";
        nextArea = 'WestManorPath';
        nextX_out = AREA_DIMENSIONS.WestManorPath.width - 5;
        nextY_out = 3250; // Approximated center of the path
        nextDoorwayStep = 0;
        handled = true;
    } else {
        shouldBark = true;
        barkMsg = "The Poodle Barks Elegantly";
        barkCount = 3; // User: "3 for going west"
        nextDoorwayStep = nextDoorwayStep + 1;
        nextX_out = 1;
        handled = true;
    }
  }

  // North Upper Level Archway to West Communal Space
  if (level === 'Sky' && direction === 'North' && nextY >= 1999 && nextX >= 485 && nextX <= 499) {
    if (nextDoorwayStep === 1) {
      msg = "You return to the upper communal space.";
      nextArea = 'WestCommunalSpace';
      nextX_out = nextX;
      nextY_out = 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "A Poodle Barks Elegantly";
      barkCount = 3; // User: "3 barks exiting"
      barkArea = 'WestCommunalNarrowGymArch';
      nextDoorwayStep++;
      nextX_out = nextX;
      nextY_out = 1999;
      handled = true;
    }
  }

  // South Upper Level Archway to Southwest Mezzanine
  if (level === 'Sky' && direction === 'South' && nextY <= 1 && nextX >= 494 && nextX <= 506) {
    if (nextDoorwayStep === 8) {
      msg = "You return to the Southwest Mezzanine.";
      nextArea = 'SouthwestMezzanineStairwayAndRamps';
      nextX_out = 10; // Enter at its west wall door? Or mapped
      nextY_out = 500;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 3;
      nextDoorwayStep++;
      nextX_out = nextX;
      nextY_out = 1;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep: false, isDescending: false
  };
};
