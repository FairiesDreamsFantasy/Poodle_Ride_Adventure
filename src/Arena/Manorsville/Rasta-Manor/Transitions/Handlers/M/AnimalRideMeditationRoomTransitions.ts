import { Direction } from '../../../../../../types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleAnimalRideMeditationRoomTransitions = (
  nextX: number,
  nextY: number,
  direction: Direction,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'AnimalRideMeditationRoom';
  let nextX_out = nextX;
  let nextY_out = nextY;
  let msg = "";
  let handled = false;

  // East Door back to Meditation Hall's Library
  if (direction === 'East' && nextX >= currentDims.width) {
    msg = "You exit the Animal Ride Meditation Room and enter the Meditation Hall's Library.";
    nextArea = 'MeditationHallLibrary';
    nextX_out = 10;
    nextY_out = 500; // Library West Arch center
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel: 'Floor', nextDoorwayStep: 0,
    msg: msg || "", isBlocked: false, shouldBark: false, barkMsg: "", isRampStep: false, isDescending: false
  };
};
