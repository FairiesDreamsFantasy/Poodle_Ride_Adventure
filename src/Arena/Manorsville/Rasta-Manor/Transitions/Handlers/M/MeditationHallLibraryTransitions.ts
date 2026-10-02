import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';
import { WEST_ARCH_Y_MIN, WEST_ARCH_Y_MAX, EAST_ARCH_Y_MIN, EAST_ARCH_Y_MAX } from '../../../1st_Floor/Meditation_Halls_Library/LibraryConstants';

export const handleMeditationHallLibraryTransitions = (
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
  let nextArea = 'MeditationHallLibrary';
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

  // East Archway to Meditation Hall (x2000, y1-21)
  const isEastArchway = nextX >= currentDims.width && nextY >= EAST_ARCH_Y_MIN && nextY <= EAST_ARCH_Y_MAX;
  if (direction === 'East' && isEastArchway) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the Meditation Hall from the Library.";
      nextArea = 'MeditationHall';
      nextX_out = 10;
      nextY_out = gridY;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1; // 1 elegant bark when going east FROM library
      const barkArea = 'MeditationHallLibraryArch';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = currentDims.width - 1;
      handled = true;
      return {
        nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
        msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
      };
    }
  }

  // West Archway (to Lobby Stairway and Ramps Southwest)
  const isWestArchway = nextX <= 1 && nextY >= WEST_ARCH_Y_MIN && nextY <= WEST_ARCH_Y_MAX;
  if (direction === 'West' && isWestArchway) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the Lobby Stairway and Ramps Southwest.";
      nextArea = 'LobbyStairwayAndRamps';
      nextX_out = AREA_DIMENSIONS.LobbyStairwayAndRamps.width - 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1; // 1 elegant bark when going west towards an animal ride room
      barkArea = 'MeditationHallLibraryToLobbyArch';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = 1;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
  };
};
