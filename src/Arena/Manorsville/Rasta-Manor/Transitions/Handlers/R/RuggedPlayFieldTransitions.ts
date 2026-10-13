import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleRuggedPlayFieldTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'RuggedPlayField';
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

  // North Door to Foyer (previously Placeholder)
  const isNorthDoorway = nextX >= currentDims.width / 2 - 10 && nextX <= currentDims.width / 2 + 10 && nextY >= currentDims.height;

  if (direction === 'North' && isNorthDoorway) {
    if (nextDoorwayStep === 8) {
      msg = "You return to the Foyer from the Rugged Play Field.";
      nextArea = 'Foyer';
      nextY_out = 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'RuggedPlayFieldToFloorArchway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // South Door to Simulated Garden Area (previously Foyer)
  const isSouthDoorway = nextX >= 990 && nextX <= 1010 && nextY <= 0;

  if (direction === 'South' && isSouthDoorway) {
    if (nextDoorwayStep === 6) {
      msg = "You transition from the Rugged Play Field to the Simulated Garden Area through the pink and white horizontal striped archway.";
      nextArea = 'SimulatedGardenArea';
      nextY_out = AREA_DIMENSIONS.SimulatedGardenArea.height - 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'RuggedPlayfieldToSimulatedGardenArchway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = 0;
      handled = true;
    }
  }

  // Expansion Areas
  // West to West Grand Arcade (Door at y990-1010)
  if (nextX <= 1 && direction === 'West' && nextY >= 990 && nextY <= 1010) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the West Grand Arcade.";
      nextArea = 'WestGrandArcade';
      nextX_out = AREA_DIMENSIONS.WestGrandArcade.width - 10;
      nextY_out = nextY;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'RuggedPlayFieldToWestArcadeArchway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = 1;
      handled = true;
    }
  } else if (nextX >= currentDims.width && direction === 'East' && nextY >= 990 && nextY <= 1010) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the East Grand Arcade.";
      nextArea = 'EastGrandArcade';
      nextX_out = 10;
      nextY_out = nextY;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'RuggedPlayFieldToEastArcadeArchway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = currentDims.width - 1;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
  };
};
