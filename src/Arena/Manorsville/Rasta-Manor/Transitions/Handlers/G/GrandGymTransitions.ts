import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';
import { TO_ARCADE_X_MIN, TO_ARCADE_X_MAX, TO_DRESSAGE_Y_MIN, TO_DRESSAGE_Y_MAX } from '../../../1st_Floor/The_Grand_Gym/GymConstants';

export const handleGymTransitions = (
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
  let nextArea = 'TheGrandGym';
  let nextX_out = nextX;
  let nextY_out = nextY;
  let nextLevel = level;
  let nextDoorwayStep = doorwayStep;
  let msg = "";
  let isBlocked = false;
  let shouldBark = false;
  let barkMsg = "";
  let barkCount = 1;
  let handled = false;

  // North Transition to West Grand Arcade (x1980-2000, y2000)
  const isArcadeArch = direction === 'North' && nextY >= currentDims.height && nextX >= TO_ARCADE_X_MIN && nextX <= TO_ARCADE_X_MAX;
  if (isArcadeArch) {
    if (nextDoorwayStep === 8) {
      msg = "You pass through the pixelated space archway and enter the West Grand Arcade.";
      nextArea = 'WestGrandArcade';
      nextY_out = 10;
      nextX_out = nextX;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      // Gym to Arcade: Internal reverb ON, Reverb Profile NO_EFFECT
      // We pass the area name 'GymToArcadeArch' to SoundManager to trigger specific bark logic if needed
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // West Transition to Narrow Dressage Gym (x1, y990-1010)
  const isDressageArch = direction === 'West' && nextX <= 1 && nextY >= TO_DRESSAGE_Y_MIN && nextY <= TO_DRESSAGE_Y_MAX;
  if (isDressageArch) {
    msg = "You enter the Narrow Dressage Gym through the equestrian-themed archway.";
    nextArea = 'NarrowDressageGym';
    nextX_out = AREA_DIMENSIONS.NarrowDressageGym.width - 10;
    nextY_out = nextY;
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep: false, isDescending: false
  };
};
