import { Direction, GameState } from '../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../System/Engine/Transitions';
import { SPECTATOR_WIDTH, SPECTATOR_HEIGHT, WALKWAY_WIDTH, BENCH_WIDTH, TO_MEZZANINE_X_MIN, TO_MEZZANINE_X_MAX, TO_MEZZANINE_Y, TO_WEST_COMMUNAL_X_MIN, TO_WEST_COMMUNAL_X_MAX, TO_WEST_COMMUNAL_Y } from './SpectatorAreaConstants';

export const handleSpectatorAreaTransitions = (
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
  let wallDesc = "";
  let handled = false;

  // Boundary check
  if (nextX < 0 || nextX > SPECTATOR_WIDTH || nextY < 0 || nextY > SPECTATOR_HEIGHT) {
    // South Archway to Mezzanine
    if (nextY <= 0 && nextX >= TO_MEZZANINE_X_MIN && nextX <= TO_MEZZANINE_X_MAX && direction === 'South') {
      msg = "You exit to the Southwest Mezzanine stairway.";
      nextArea = 'SouthwestMezzanineStairwayAndRamps' as any;
      nextX_out = 10; // Mapping back to Mezzanine's West wall arch
      nextY_out = 500;
      handled = true;
    }
    // North Archway to West Communal Space Mezzanine
    else if (nextY >= SPECTATOR_HEIGHT && nextX >= TO_WEST_COMMUNAL_X_MIN && nextX <= TO_WEST_COMMUNAL_X_MAX && direction === 'North') {
      msg = "You enter the West Communal Space mezzanine.";
      nextArea = 'WestCommunalSpace' as any;
      nextX_out = nextX;
      nextY_out = 10;
      handled = true;
    } else {
      isBlocked = true;
      wallDesc = "The wall is sturdy brick with a smooth gaze.";
      handled = true;
    }
  }

  // Inner Barrier Collision
  const isInPerimeter = nextX <= WALKWAY_WIDTH || nextX >= SPECTATOR_WIDTH - WALKWAY_WIDTH || nextY <= WALKWAY_WIDTH || nextY >= SPECTATOR_HEIGHT - WALKWAY_WIDTH;
  if (!isInPerimeter && !handled) {
    isBlocked = true;
    wallDesc = "Collision with the climb-resistant barred fence separating you from the main arena floor.";
    handled = true;
  }

  // Bench Collision
  if (isInPerimeter && !handled) {
    const isAtSouthGap = nextX >= TO_MEZZANINE_X_MIN && nextX <= TO_MEZZANINE_X_MAX && nextY <= WALKWAY_WIDTH;
    const isAtNorthGap = nextX >= TO_WEST_COMMUNAL_X_MIN && nextX <= TO_WEST_COMMUNAL_X_MAX && nextY >= SPECTATOR_HEIGHT - WALKWAY_WIDTH;
    
    const onBench = (nextX <= BENCH_WIDTH || nextX >= SPECTATOR_WIDTH - BENCH_WIDTH || nextY <= BENCH_WIDTH || nextY >= SPECTATOR_HEIGHT - BENCH_WIDTH);
    
    if (onBench && !isAtSouthGap && !isAtNorthGap) {
      isBlocked = true;
      wallDesc = "You bump into a long blue and black spectator bench with an integrated food table.";
      handled = true;
    }
  }

  if (!handled && !isBlocked) return null;

  return {
    nextArea,
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
}
