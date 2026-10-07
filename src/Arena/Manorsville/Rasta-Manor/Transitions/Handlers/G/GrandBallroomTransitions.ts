import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleGrandBallroomTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'GrandBallroom';
  let nextX_out = nextX;
  let nextY_out = nextY;
  let nextLevel = level;
  let nextDoorwayStep = doorwayStep;
  let msg = "";
  let isBlocked = false;
  let shouldBark = false;
  let barkMsg = "";
  let barkCount = 7; // Seven barks per gallop
  let isRampStep = false;
  let isDescending = false;
  let handled = false;

  // West to Foyer
  const isAtFoyerSkyNorthArchway = level === 'Sky' && nextY >= 1984 && nextY <= 1994;
  const isAtFoyerSkySouthArchway = level === 'Sky' && nextY >= 1 && nextY <= 10;

  if (direction === 'West' && nextX <= 1 && (isAtFoyerSkyNorthArchway || isAtFoyerSkySouthArchway)) {
    if (nextDoorwayStep === 8) {
      msg = "You return to the Foyer.";
      nextArea = 'Foyer';
      nextX_out = AREA_DIMENSIONS.Foyer.width - 10;
      nextY_out = nextY;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = 1;
      handled = true;
    }
  }

  // South to East Grand Arcade (Southeast corner of Ballroom, matches Northeast of Arcade)
  const isAtSouthDoor = nextX >= 1980 && nextX <= 2000 && nextY <= 1;
  if (direction === 'South' && isAtSouthDoor) {
    if (nextDoorwayStep === 4) { // Four barks for exiting the ballroom south end
      msg = "You exit the Grand Ballroom and enter the East Grand Arcade.";
      nextArea = 'EastGrandArcade';
      nextY_out = AREA_DIMENSIONS.EastGrandArcade.height - 10;
      nextX_out = nextX;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 4;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = 1;
      handled = true;
    }
  }

  // East to Employees' Living Quarters (Doors at y=490 to 510)
  const isAtEastDoor = nextX >= currentDims.width - 1 && nextY >= 485 && nextY <= 515;
  if (direction === 'East' && isAtEastDoor) {
    msg = "You slide open the wooden Rastafari-themed doors and enter the Employees' Living Quarters.";
    nextArea = 'EmployeesLivingQuarters';
    nextX_out = 10;
    nextY_out = nextY;
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
