import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleBackPorchTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'BackPorch';
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
  let barkArea: string | undefined = undefined;

  // North Door to Meditation Hall (Entrance to Manor)
  const isMeditationDoorway = nextX >= 3990 && nextX <= 4010;
  const isAtNorthDoor = isMeditationDoorway && nextY >= currentDims.height;

  if (direction === 'North' && isAtNorthDoor) {
    if (nextDoorwayStep === 6) {
      msg = "You enter the grand Meditation Hall from the Back Porch.";
      nextArea = 'MeditationHall';
      nextY_out = 10;
      nextX_out = 1000; // Center of Meditation Hall
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkArea = 'MeditationHallToBackPorchDoorway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // South Door to Garden (Exit to Outside)
  const isGardenDoorway = nextX >= 3990 && nextX <= 4010;
  const isAtSouthDoor = isGardenDoorway && nextY <= 1;

  if (direction === 'South' && isAtSouthDoor) {
    if (nextDoorwayStep === 16) {
      nextArea = 'Garden';
      nextY_out = AREA_DIMENSIONS.Garden.height - 10;
      nextX_out = 4000; // Center of Garden
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

  // Kitchen Door (West of the main north entrance)
  const isKitchenDoor = nextX >= 2200 && nextX <= 2300 && nextY >= currentDims.height - 10 && direction === 'North';
  if (isKitchenDoor) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the massive Kitchen of Rasta-Manor.";
      nextArea = 'Kitchen';
      nextY_out = 10;
      nextX_out = 500; // Kitchen is 1000 wide
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'KitchenToBackPorchDoorway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // Connect to Manor Paths (East/West edges)
  if (direction === 'West' && nextX <= 1) {
      msg = "You step off the Back Porch onto the West Manor Path.";
      nextArea = 'WestManorPath';
      nextX_out = AREA_DIMENSIONS.WestManorPath.width - 5;
      nextY_out = 5; // South end of path
      handled = true;
  } else if (direction === 'East' && nextX >= currentDims.width - 1) {
      msg = "You step off the Back Porch onto the East Manor Path.";
      nextArea = 'EastManorPath';
      nextX_out = 5;
      nextY_out = 5; // South end of path
      handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
  };
};
