import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleMeditationHallTransitions = (
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
  let nextArea = 'MeditationHall';
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

  // North Door to Simulated Garden Area (previously Back Porch)
  const isNorthDoorway = nextX >= 990 && nextX <= 1010 && nextY >= currentDims.height;

  if (direction === 'North' && isNorthDoorway) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the Simulated Garden Area from the Meditation Hall.";
      nextArea = 'SimulatedGardenArea';
      nextY_out = 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      const barkArea = 'MeditationHallToSimulatedGardenDoorway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height - 1;
      handled = true;
      return {
        nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
        msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
      };
    }
  }

  // South Door to Back Porch
  const isSouthDoorway = nextX >= 990 && nextX <= 1010 && nextY <= 0;

  if (direction === 'South' && isSouthDoorway) {
    if (nextDoorwayStep === 6) {
      msg = "You enter the Back Porch from the Meditation Hall through the rainbow doors.";
      nextArea = 'BackPorch';
      nextY_out = 240; // North end of Back Porch (height is 250)
      nextX_out = 4000; // Center of Back Porch
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      const barkArea = 'MeditationHallToBackPorchDoorway';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = 0;
      handled = true;
      return {
        nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
        msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
      };
    }
  }

  // Sky Ramp Transitions
  const isAtRampStart = nextX <= 20 && nextY >= 140 && nextY <= 180 && direction === 'South' && level === 'Floor'; 
  const isAtRampEnd = level === 'Sky' && nextX <= 20 && nextY >= 20 && nextY <= 60 && direction === 'North'; 
  
  const enteringRampFromFloor = level === 'Floor' && nextX <= 20 && nextY < 180 && gridY >= 180 && direction === 'South';
  const enteringRampFromSky = level === 'Sky' && nextX <= 20 && nextY > 20 && gridY <= 20 && direction === 'North';

  if (enteringRampFromFloor || (nextDoorwayStep > 0 && isAtRampStart)) {
    isRampStep = true;
    isDescending = false;
    if (nextDoorwayStep === 0) nextDoorwayStep = 1;
    if (nextDoorwayStep === 40) {
      if (!state.hasAnnouncedMeditationSkyLanding) {
        msg = "You have ascended the Meditation Hall's Sky Ramp to the upper perimeter walkway.";
      }
      nextLevel = 'Sky';
      nextY_out = 10;
      nextDoorwayStep = 0;
      handled = true;
      return {
        nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
        msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
      };
    } else {
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = nextY;
      handled = true;
    }
  } else if (enteringRampFromSky || (nextDoorwayStep > 0 && isAtRampEnd)) {
    isRampStep = true;
    isDescending = true;
    if (nextDoorwayStep === 0) nextDoorwayStep = 40;
    if (nextDoorwayStep === 1) {
      if (!state.hasAnnouncedMeditationRampLanding) {
        msg = "You have descended the Meditation Hall's Sky Ramp to the floor.";
      }
      nextLevel = 'Floor';
      nextY_out = 190;
      nextDoorwayStep = 0;
      handled = true;
      return {
        nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
        msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
      };
    } else {
      nextDoorwayStep = nextDoorwayStep - 1;
      nextY_out = nextY;
      handled = true;
    }
  }

  // Animal Ride Meditation Room Transition (Northwest Wall)
  const isAtAnimalRideRoomDoor = nextX <= 1 && nextY >= currentDims.height - 200;
  if (direction === 'West' && isAtAnimalRideRoomDoor) {
    msg = "You enter the special Animal Ride Meditation Room. The air is calm, and you see large toy animals along the walls.";
    nextArea = 'AnimalRideMeditationRoom';
    nextX_out = AREA_DIMENSIONS.AnimalRideMeditationRoom.width - 10;
    nextY_out = AREA_DIMENSIONS.AnimalRideMeditationRoom.height / 2;
    handled = true;
  }

  // West Archway to Meditation Hall's Library (x1, y1-21)
  const isWestArchwayToLibrary = nextX <= 1 && nextY >= 1 && nextY <= 21;
  if (direction === 'West' && isWestArchwayToLibrary) {
    if (nextDoorwayStep === 8) {
      msg = "You enter the Meditation Hall's Library. Row of green trees in Ethiopia, Ghana, and South Africa surround the archway, with Helga leading the way.";
      nextArea = 'MeditationHallLibrary';
      nextX_out = AREA_DIMENSIONS.MeditationHallLibrary.width - 10;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1; // 1 elegant bark when going west towards a meditation hall's library
      const barkArea = 'MeditationHallLibraryArch';
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = 1;
      handled = true;
      return {
        nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
        msg, isBlocked, shouldBark, barkMsg, barkCount, barkArea, isRampStep, isDescending
      };
    }
  }

  // Expansion Areas
  if (nextX <= 1 && direction === 'West' && !handled) {
    msg = "The wall here is solid wood.";
    isBlocked = true;
    handled = true;
  } else if (nextX >= currentDims.width && direction === 'East') {
    if (nextY <= 20) {
      msg = "You enter the Kitchen. The air is filled with the aroma of spices and fresh bread.";
      nextArea = 'Kitchen';
      nextX_out = 10;
    } else {
      msg = "You enter the Meditation Hall East placeholder area.";
      nextArea = 'MeditationHallEast';
      nextX_out = 10;
    }
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
