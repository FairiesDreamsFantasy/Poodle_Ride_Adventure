import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleEastGrandArcadeTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'EastGrandArcade';
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

  // West to Rugged Play Field (x1, y990-1010)
  if (direction === 'West' && nextX <= 1 && nextY >= 980 && nextY <= 1020) {
    msg = "You return to the Rugged Play Field.";
    nextArea = 'RuggedPlayField';
    nextX_out = AREA_DIMENSIONS.RuggedPlayField.width - 10;
    nextY_out = nextY;
    handled = true;
  }

  // South to Grand Dining Room (x990-1010, y1)
  if (direction === 'South' && nextY <= 1 && nextX >= 980 && nextX <= 1020) {
    msg = "You enter the Grand Dining Room.";
    nextArea = 'GrandDiningRoom';
    nextY_out = AREA_DIMENSIONS.GrandDiningRoom.height - 10;
    nextX_out = nextX;
    handled = true;
  }

  // North end connected to Grand Ballroom (Northeast corner door)
  if (direction === 'North' && nextY >= currentDims.height && nextX >= 1980 && nextX <= 2000) {
    if (nextDoorwayStep === 6) { // Six barks for entering the ballroom at the north end
      msg = "You enter the Grand Ballroom.";
      nextArea = 'GrandBallroom';
      nextY_out = 10;
      nextX_out = nextX;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 6;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // East to East Communal Space (x2000, y979-999)
  if (direction === 'East' && nextX >= currentDims.width && nextY >= 970 && nextY <= 1005) {
    msg = "You enter the East Communal Space.";
    nextArea = 'EastCommunalSpace';
    nextX_out = 10;
    nextY_out = nextY;
    handled = true;
  }

  // East to Grand Arcade Extension (x2000, y1002-1012)
  if (direction === 'East' && nextX >= currentDims.width && nextY >= 1002 && nextY <= 1018) {
    msg = "You enter the Grand Arcade extension.";
    nextArea = 'GrandArcadeExtension';
    nextX_out = 10;
    nextY_out = nextY - 1000; // Adjustment for extension coordinates if needed, or relative
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
