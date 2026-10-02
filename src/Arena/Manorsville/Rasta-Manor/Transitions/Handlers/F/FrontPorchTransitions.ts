import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleFrontPorchTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number },
  isAtSouthDoor: boolean
): TransitionResult | null => {
  let nextArea = 'FrontPorch';
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

  // South Door to Foyer
  if (direction === 'South' && isAtSouthDoor) {
    if (nextDoorwayStep === 1) {
      nextArea = 'Foyer';
      nextY_out = AREA_DIMENSIONS.Foyer.height - 10;
      const relX = nextX / currentDims.width;
      nextX_out = Math.floor(relX * AREA_DIMENSIONS.Foyer.width);
      nextDoorwayStep = 0;
      msg = "You pass through the north doors into the grand Foyer.";
      handled = true;
    } else if (nextDoorwayStep >= 2) {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = nextDoorwayStep - 1;
      nextY_out = 1;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = 7;
      nextY_out = 1;
      handled = true;
    }
  }

  // South Door to Communal Store
  if (direction === 'South' && nextY <= 1 && nextX >= 990 && nextX <= 1010) {
    if (nextDoorwayStep === 6) {
      msg = "The welcoming glass sliding doors partition open, and you step inside the massive Communal Store.";
      nextArea = 'CommunalStore';
      nextX_out = 500;
      nextY_out = AREA_DIMENSIONS.CommunalStore.height - 20;
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

  // Sidewalk Transition (North edge, full width)
  const isAtSidewalkExit = nextY >= currentDims.height;
  if (direction === 'North' && isAtSidewalkExit) {
    if (nextDoorwayStep === 4) {
      msg = "Manorsville. You are now on the 8000-foot long red brick sidewalk.";
      nextArea = 'Sidewalk';
      nextY_out = 10;
      // Preserve relative X position
      const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
      nextX_out = Math.floor(relX * AREA_DIMENSIONS.Sidewalk.width);
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // Connect to Manor Paths (East/West edges)
  if (direction === 'West' && nextX <= 1) {
      msg = "You step off the Front Porch onto the West Manor Path.";
      nextArea = 'WestManorPath';
      nextX_out = AREA_DIMENSIONS.WestManorPath.width - 5;
      nextY_out = AREA_DIMENSIONS.WestManorPath.height - 5; // North end of path
      handled = true;
  } else if (direction === 'East' && nextX >= currentDims.width - 1) {
      msg = "You step off the Front Porch onto the East Manor Path.";
      nextArea = 'EastManorPath';
      nextX_out = 5;
      nextY_out = AREA_DIMENSIONS.EastManorPath.height - 5; // North end of path
      handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
