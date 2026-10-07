import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleSimulatedGardenAreaTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'SimulatedGardenArea';
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

  // North Archway to Rugged Play Field (x990-1010 at y2000)
  const isNorthArchway = nextX >= 990 && nextX <= 1010 && nextY >= currentDims.height;
  if (direction === 'North' && isNorthArchway) {
    if (nextDoorwayStep === 6) {
      msg = "You transition from the Simulated Garden Area to the Rugged Play Field through the pink and white horizontal striped archway.";
      nextArea = 'RuggedPlayField';
      nextY_out = 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'RuggedPlayfieldToSimulatedGardenArchway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // South Archway to Meditation Hall (x990-1010 at y0)
  const isSouthArchway = nextX >= 990 && nextX <= 1010 && nextY <= 0;
  if (direction === 'South' && isSouthArchway) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the Meditation Station (Meditation Hall) from the Simulated Garden Area.";
      nextArea = 'MeditationHall';
      nextY_out = AREA_DIMENSIONS.MeditationHall.height - 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'SimulatedGardenAreaToMeditationHallDoorway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = 0;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
  };
};
