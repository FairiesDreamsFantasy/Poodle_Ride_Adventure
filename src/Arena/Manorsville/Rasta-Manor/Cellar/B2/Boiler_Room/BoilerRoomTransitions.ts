import { Direction, GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';
import { BOILER_WIDTH, BOILER_HEIGHT, BOILER_WALL_THICKNESS, GATE_X, GATE_WIDTH } from './BoilerRoomConstants';

export const handleBoilerRoomTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  state: GameState
): TransitionResult | null => {
  let nextArea = state.area;
  let nextLevel = level;
  let nextX_out = nextX;
  let nextY_out = nextY;
  let msg = "";
  let isBlocked = false;
  let handled = false;

  // Boundary Checks
  if (nextX <= BOILER_WALL_THICKNESS || nextX >= BOILER_WIDTH - BOILER_WALL_THICKNESS || 
      nextY <= BOILER_WALL_THICKNESS || nextY >= BOILER_HEIGHT - BOILER_WALL_THICKNESS) {
    
    // South Gate to Railway Sidewalk (Maintenance Gate)
    const isAtGate = nextX >= GATE_X - GATE_WIDTH/2 && nextX <= GATE_X + GATE_WIDTH/2 && nextY <= 1;
    
    // North Entrance from B1 (Exit back to B1)
    const isAtNorthExit = nextX >= 3980 && nextX <= 4020 && nextY >= BOILER_HEIGHT - 1;

    if (direction === 'South' && isAtGate) {
      msg = "You exit through the massive roll-up gate onto the lower side path at the railway tracks depth.";
      nextArea = 'Sidewalk' as any; // Map to a specific sidewalk area if needed, but for now generic
      nextX_out = 4000;
      nextY_out = 20;
      handled = true;
    } else if (direction === 'North' && isAtNorthExit) {
      msg = "You climb back up to the main Cellar (B1).";
      nextArea = 'Cellar' as any;
      nextX_out = 1000;
      nextY_out = 50;
      handled = true;
    } else {
      isBlocked = true;
      handled = true;
    }
  }

  // Internal Walls (Simplified collision for now)
  if (!handled) {
      // Wall 1: x=2000, y=0 to 4000
      if (nextX >= 2000 && nextX <= 2000 + BOILER_WALL_THICKNESS && nextY <= 4000) {
          isBlocked = true;
          handled = true;
      }
      // Wall 2: x=4000 to 8000, y=3000
      if (nextX >= 4000 && nextY >= 3000 && nextY <= 3000 + BOILER_WALL_THICKNESS) {
          isBlocked = true;
          handled = true;
      }
  }

  if (!handled && !isBlocked) return null;

  return {
    nextArea: nextArea as any,
    nextX: nextX_out,
    nextY: nextY_out,
    nextLevel,
    nextDoorwayStep: 0,
    msg,
    isBlocked,
    shouldBark: false,
    barkMsg: "",
    barkCount: 0,
    isRampStep: false,
    isDescending: false
  };
};
