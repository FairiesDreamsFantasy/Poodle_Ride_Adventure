import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleGrandDiningRoomTransitions = (
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
  let nextArea = 'GrandDiningRoom';
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

  // North to East Grand Arcade (x990-1010)
  if (direction === 'North' && nextY >= currentDims.height && nextX >= 980 && nextX <= 1020) {
    msg = "You enter the East Grand Arcade.";
    nextArea = 'EastGrandArcade';
    nextY_out = 10;
    nextX_out = nextX;
    handled = true;
  }

  // South to Kitchen/Dishwasher
  if (direction === 'South' && nextY <= 1) {
    if (nextX < currentDims.width / 2) {
      msg = "You enter the Kitchen.";
      nextArea = 'Kitchen';
      nextY_out = AREA_DIMENSIONS.Kitchen.height - 10;
    } else {
      msg = "You enter the Dishwasher Area.";
      nextArea = 'DishWasherArea';
      nextY_out = AREA_DIMENSIONS.DishWasherArea.height - 10;
    }
    handled = true;
  }

  // East to China Cabinets/Restrooms (GrandDiningRoomEast)
  if (direction === 'East' && nextX >= currentDims.width) {
    msg = "You enter the East wing of the dining area.";
    nextArea = 'GrandDiningRoomEast';
    nextX_out = 10;
    handled = true;
  }

  // West Tarsis Teleportation Ramp with 40-step Craftsmanship
  const inFloorZone = nextX <= 20 && nextY >= 1341 && nextY <= 1359 && level === 'Floor';
  const inSkyZone = nextX <= 20 && nextY >= 1960 && nextY <= 1979 && level === 'Sky';

  if (inFloorZone && direction === 'North' || (doorwayStep > 0 && level === 'Floor' && nextX <= 20)) {
    // This 40-step system exclusively works via "Gallop" mode.
    if (state.movementMode !== 'Gallop' && doorwayStep === 0) {
      msg = "You need to be in Gallop mode to use the Tarsis teleportation ramp.";
      isBlocked = true;
      handled = true;
    } else {
      isRampStep = true;
      isDescending = false;
      
      if (doorwayStep === 0) {
        nextDoorwayStep = 1;
      } else {
        nextDoorwayStep = doorwayStep + 1;
      }

      // A fifth step with an elegant bark
      if (nextDoorwayStep === 5) {
        shouldBark = true;
        barkMsg = "The Poodle Barks Elegantly";
        barkCount = 1;
      }

      if (nextDoorwayStep >= 40) {
        msg = "Tarsis Effect: You have successfully ascended the 40 steps to the Sky Dining Room.";
        nextLevel = 'Sky';
        nextY_out = 1950;
        nextX_out = 10;
        nextDoorwayStep = 0;
      } else {
        nextY_out = nextY;
        nextX_out = nextX;
      }
      handled = true;
    }
  } else if (inSkyZone && direction === 'South' || (doorwayStep > 0 && level === 'Sky' && nextX <= 20)) {
    // This 40-step system exclusively works via "Gallop" mode.
    if (state.movementMode !== 'Gallop' && doorwayStep === 0) {
      msg = "You need to be in Gallop mode to use the Tarsis teleportation ramp.";
      isBlocked = true;
      handled = true;
    } else {
      isRampStep = true;
      isDescending = true;

      if (doorwayStep === 0) {
        nextDoorwayStep = 40;
      } else {
        nextDoorwayStep = doorwayStep - 1;
      }

      // A fifth step (from the floor's perspective, or step 5 in the sequence)
      if (nextDoorwayStep === 5) {
        shouldBark = true;
        barkMsg = "The Poodle Barks Elegantly";
        barkCount = 1;
      }

      if (nextDoorwayStep <= 1) {
        msg = "Tarsis Effect: You have successfully descended the 40 steps to the Floor Dining Room.";
        nextLevel = 'Floor';
        nextY_out = 1365;
        nextX_out = 10;
        nextDoorwayStep = 0;
      } else {
        nextY_out = nextY;
        nextX_out = nextX;
      }
      handled = true;
    }
  }

  // West to Placeholders (if not on ramp)
  if (!handled && direction === 'West' && nextX <= 1) {
    msg = "You enter the West placeholder area.";
    nextArea = 'RuggedPlayFieldWest1';
    nextX_out = 990;
    handled = true;
  }

  // East to The Grand Playground
  if (direction === 'East' && nextX >= currentDims.width && nextY >= 990 && nextY <= 1010) {
    msg = "You enter The Grand Playground.";
    nextArea = 'TheGrandPlayground';
    nextX_out = 10;
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
