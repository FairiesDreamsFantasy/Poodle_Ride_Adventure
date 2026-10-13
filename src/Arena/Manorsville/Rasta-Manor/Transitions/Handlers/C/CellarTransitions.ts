import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleCellarTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  let nextArea = 'Cellar';
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

  // North Exit to Foyer (via Cellar Ramp)
  if (direction === 'North') {
    const isAtLanding = nextX <= 20 && nextY >= 1980;
    if (nextY >= 2000 && isAtLanding) {
      msg = "You leave the indigo square and enter the cellar ramp.";
      nextArea = 'Foyer';
      nextY_out = 1980;
      nextX_out = 10;
      nextLevel = 'Cellar';
      handled = true;
    } else if (nextY >= 2000) {
      msg = "You must reach the indigo landing square to exit the cellar.";
      isBlocked = true;
      handled = true;
    }
  }

  // South Exit to B2 Boiler Room
  if (direction === 'South' && nextY <= 1 && nextX >= 980 && nextX <= 1020) {
    msg = "You open the heavy maintenance door and descend into the B2 Boiler Room.";
    nextArea = 'BoilerRoom';
    nextX_out = 4000;
    nextY_out = 6980; // Entry at the North end of B2
    handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
