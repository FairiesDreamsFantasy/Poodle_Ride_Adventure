import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleKitchenTransitions = (
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
  let nextArea = 'Kitchen';
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

  // South Door to Back Porch (y1)
  if (direction === 'South' && nextY <= 1 && nextX >= 980 && nextX <= 1010) {
    if (nextDoorwayStep === 8) {
      msg = "You step back out onto the Back Porch.";
      nextArea = 'BackPorch';
      nextY_out = 240;
      nextX_out = 2250; // Landing centered on the kitchen door of the porch
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      barkArea = 'KitchenToBackPorchDoorway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = 1;
      handled = true;
    }
  }

  // North Door to Dishwasher Area (y500)
  if (direction === 'North' && nextY >= currentDims.height && nextX >= 980 && nextX <= 1010) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the Dishwasher Room.";
      nextArea = 'DishWasherArea';
      nextX_out = 500;
      nextY_out = 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
    }
  }

  // West Door to Meditation Hall
  if (nextX <= 1 && direction === 'West') {
    msg = "You return to the Meditation Hall.";
    nextArea = 'MeditationHall';
    nextX_out = 1990;
    nextY_out = nextY;
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
  };
};
