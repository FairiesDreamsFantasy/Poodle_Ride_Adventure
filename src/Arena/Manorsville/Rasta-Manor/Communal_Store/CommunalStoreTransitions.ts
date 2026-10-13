import { Direction } from '../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../System/Engine/Transitions';

export const handleCommunalStoreTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'CommunalStore';
  let nextX_out = nextX;
  let nextY_out = nextY;
  let nextLevel = level;
  let nextDoorwayStep = doorwayStep;
  let msg = "";
  let isBlocked = false;
  let shouldBark = false;
  let barkMsg = "";
  let barkCount = 1;

  // 1. East Door -> Grand Playground
  if (direction === 'East' && nextX >= currentDims.width && nextY >= 990 && nextY <= 1010) {
    if (doorwayStep === 6) {
      msg = "The welcoming glass sliding doors partition open, and you gallop into the Grand Indoor Playground.";
      nextArea = 'TheGrandPlayground';
      nextX_out = 20;
      nextY_out = nextY; // keeps alignment
      nextDoorwayStep = 0;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = doorwayStep + 1;
      nextX_out = currentDims.width - 1;
    }
    return {
      nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
      msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep: false, isDescending: false
    };
  }

  // 2. West Door -> West Manor Path
  if (direction === 'West' && nextX <= 0 && nextY >= 990 && nextY <= 1010) {
    if (doorwayStep === 6) {
      msg = "The glass sliding doors roll open smoothly, and you step out onto the quiet brick West Manor Path.";
      nextArea = 'WestManorPath';
      nextX_out = 40; // Enter the path from its east edge
      nextY_out = 1500; // Aligned onto the path
      nextDoorwayStep = 0;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = doorwayStep + 1;
      nextX_out = 1;
    }
    return {
      nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
      msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep: false, isDescending: false
    };
  }

  // 3. North Door -> Front Porch
  if (direction === 'North' && nextY >= currentDims.height && nextX >= 490 && nextX <= 510) {
    if (doorwayStep === 6) {
      msg = "You step through the welcoming glass sliding doors onto the expansive Front Porch.";
      nextArea = 'FrontPorch';
      nextX_out = 1000; // Near west side of FrontPorch (which spans 8000)
      nextY_out = 20;
      nextDoorwayStep = 0;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = doorwayStep + 1;
      nextY_out = currentDims.height - 1;
    }
    return {
      nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
      msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep: false, isDescending: false
    };
  }

  return null;
};
