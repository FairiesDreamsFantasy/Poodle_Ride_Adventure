import { Direction, GameState } from '../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../System/Engine/Transitions';

export const handleMezzanineTransitions = (
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
  let shouldBark = false;
  let barkMsg = "";
  let nextDoorwayStep = 0;
  let isRampStep = false;
  let isDescending = false;
  let handled = false;

  // --- Tarsis Effects / Ramps (Northwest Corner Ramp System: X 1-220, Y 950-1000) ---
  if (!handled && nextY >= 950 && nextX <= 220) {
      const isEnteringRamp = gridY < 950 || gridX > 220;
      if (isEnteringRamp) {
          // West Wing (1-110)
          if (nextX <= 110) {
              if (nextX <= 55) {
                  // Ramp 1: 2nd Floor
                  msg = state.hasAnnouncedLobbyRampRide ? "" : "You ride up the Westernmost ramp of the West Wing to the Rasta-Manor Second Floor.";
                  nextArea = 'RastaManor2ndFloor' as any;
                  nextLevel = 'Sky'; // Second Floor is also Sky level in this building scale
                  nextX_out = nextX;
                  nextY_out = 945;
                  handled = true;
              } else {
                  // Ramp 2: 1st Floor (Lobby)
                  msg = state.hasAnnouncedLobbyRampRide ? "" : "You ride down the Eastern ramp of the West Wing back to the Lobby Level.";
                  nextArea = 'LobbyStairwayAndRamps' as any;
                  nextLevel = 'Floor';
                  nextX_out = nextX;
                  nextY_out = 945;
                  isDescending = true;
                  handled = true;
              }
          } 
          // East Wing (111-220)
          else {
              if (nextX >= 166) {
                  // Ramp 1: 1st Floor (Lobby)
                  msg = state.hasAnnouncedLobbyRampRide ? "" : "You ride down the Easternmost ramp of the East Wing back to the Lobby Level.";
                  nextArea = 'LobbyStairwayAndRamps' as any;
                  nextLevel = 'Floor';
                  nextX_out = nextX;
                  nextY_out = 945;
                  isDescending = true;
                  handled = true;
              } else {
                  // Ramp 2: 2nd Floor
                  msg = state.hasAnnouncedLobbyRampRide ? "" : "You ride up the Western ramp of the East Wing to the Rasta-Manor Second Floor.";
                  nextArea = 'RastaManor2ndFloor' as any;
                  nextLevel = 'Sky';
                  nextX_out = nextX;
                  nextY_out = 945;
                  handled = true;
              }
          }
      }
  }

  // Elevator (NE Corner)
  if (!handled && doorwayStep === 0) {
     const isAtElevator = nextX >= 980 && nextY >= 980;
     if (isAtElevator && (direction === 'North' || direction === 'East')) {
        msg = "You enter the elevator at the Northeast corner. The doors close.";
        nextArea = 'LobbyStairwayAndRamps' as any;
        nextLevel = 'Floor';
        nextX_out = 990;
        nextY_out = 990;
        handled = true;
     }
  }

  if (!handled && doorwayStep === 0) {
    // Archway to spectator area of narrow dressage gym (West wall door)
    if (nextX <= 1 && nextY >= 495 && nextY <= 505 && direction === 'West') {
      msg = "Entering the Narrow Dressage Gym spectator area.";
      nextArea = 'SpectatorArea';
      nextX_out = 495; // Entry point in SpectatorArea (South end archway)
      nextY_out = 10;
      handled = true;
    }
  }

  if (!handled) return null;

  return {
    nextArea,
    nextX: nextX_out,
    nextY: nextY_out,
    nextLevel,
    nextDoorwayStep,
    msg,
    isBlocked: false,
    shouldBark,
    barkMsg,
    barkCount: 1,
    isRampStep,
    isDescending
  };
};
