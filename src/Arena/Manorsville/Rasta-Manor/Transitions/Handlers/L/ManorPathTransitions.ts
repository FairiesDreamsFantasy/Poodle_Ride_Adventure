import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';

export const handleManorPathTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number },
  side: 'East' | 'West'
): TransitionResult | null => {
  let nextArea = side === 'West' ? 'WestManorPath' : 'EastManorPath';
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

  // Boundary Checks
  if (nextY <= 0) {
      msg = "You reach the southern end of the brick path, connecting to the Back Porch.";
      nextArea = 'BackPorch';
      nextX_out = side === 'West' ? 10 : AREA_DIMENSIONS.BackPorch.width - 10;
      nextY_out = 10; 
      nextDoorwayStep = 0;
      handled = true;
  } else if (nextY >= currentDims.height) {
      msg = "You reach the northern end of the brick path, connecting to the Front Porch.";
      nextArea = 'FrontPorch';
      nextX_out = side === 'West' ? 10 : AREA_DIMENSIONS.FrontPorch.width - 10;
      nextY_out = 240;
      nextDoorwayStep = 0;
      handled = true;
  }

  // Transitions into the Manor
  if (side === 'West' && direction === 'East' && nextX >= currentDims.width) {
      // Connect to Lobby West Door at around y=750 (mapping to Lobby y=500)
      if (nextY >= 740 && nextY <= 760) {
          if (nextDoorwayStep === 8) {
              msg = "You open the glass door and enter the Stairways and Ramps Southwest.";
              nextArea = 'LobbyStairwayAndRamps';
              nextX_out = 10;
              nextY_out = 500;
              nextDoorwayStep = 0;
              handled = true;
          } else {
              shouldBark = true;
              barkMsg = "The Poodle Barks Elegantly";
              nextDoorwayStep = nextDoorwayStep + 1;
              nextX_out = currentDims.width - 1;
              handled = true;
          }
      } else if (nextY >= 1490 && nextY <= 1510) {
          // Connect to Communal Store West Door at y=1500 (mapping to Communal Store y=1000)
          if (nextDoorwayStep === 6) {
              msg = "The automatic glass sliding doors partition open, and you enter the massive Communal Store.";
              nextArea = 'CommunalStore';
              nextX_out = 20;
              nextY_out = 1000;
              nextDoorwayStep = 0;
              handled = true;
          } else {
              shouldBark = true;
              barkMsg = "The Poodle Barks Elegantly";
              nextDoorwayStep = nextDoorwayStep + 1;
              nextX_out = currentDims.width - 1;
              handled = true;
          }
      } else {
          msg = "The manor wall is solid here.";
          isBlocked = true;
          handled = true;
      }
  }

  if (side === 'East' && direction === 'West' && nextX <= 0) {
      // Future connections to East Manor rooms
      msg = "The manor wall is solid here.";
      isBlocked = true;
      handled = true;
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
