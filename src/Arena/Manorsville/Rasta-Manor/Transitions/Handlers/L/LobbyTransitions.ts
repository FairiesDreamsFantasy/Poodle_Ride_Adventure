import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';
import { EAST_ARCH_Y_MIN, EAST_ARCH_Y_MAX, ELEVATOR_X_MIN, ELEVATOR_Y_MIN, WEST_DOOR_Y_MIN, WEST_DOOR_Y_MAX } from '../../../1st_Floor/Lobby_Stairway_and_Ramps_Level/LobbyConstants';

export const handleLobbyTransitions = (
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
  let nextArea = 'LobbyStairwayAndRamps';
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

  // East Archway to Library
  const isEastArchway = nextX >= currentDims.width && nextY >= EAST_ARCH_Y_MIN && nextY <= EAST_ARCH_Y_MAX;
  if (direction === 'East' && isEastArchway) {
    if (nextDoorwayStep === 8) {
      msg = "You pass through the archway into the Meditation Hall Library.";
      nextArea = 'MeditationHallLibrary';
      nextX_out = 10;
      nextY_out = nextY;
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = currentDims.width - 1;
      handled = true;
    }
  } else if (direction === 'West' && isEastArchway) {
    // Arrival from Meditation Hall Library
    msg = "You enter the Southwest Lobby Area from the Meditation Hall's Library.";
    nextX_out = currentDims.width - 10;
    nextDoorwayStep = 0; // Ensure step is reset
    handled = true;
  }

  // West Glass Door to West Manor Path
  const isWestDoor = nextX <= 1 && nextY >= WEST_DOOR_Y_MIN && nextY <= WEST_DOOR_Y_MAX;
  if (direction === 'West' && isWestDoor) {
    if (nextDoorwayStep === 8) {
      msg = "You push the glass door and step outside onto the red brick path.";
      nextArea = 'WestManorPath';
      nextX_out = AREA_DIMENSIONS.WestManorPath.width - 5;
      // Map Lobby y (0-1000) to global path y
      // BackPorch (250) + MedHall (2000) = current start of Library/Lobby is roughly y=2250 relative to path start?
      // Wait, Meditation Hall is y=250-2250.
      // Lobby y=500 corresponds to path y = 250 + 500 = 750.
      nextY_out = 250 + nextY; 
      nextDoorwayStep = 0;
      handled = true;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      barkCount = 1;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextX_out = 2;
      handled = true;
    }
  }

  // Elevator (NE)
  const isAtElevator = nextX >= ELEVATOR_X_MIN && nextY >= ELEVATOR_Y_MIN;
  const isInsideElevatorAscending = doorwayStep > 0 && gridX >= ELEVATOR_X_MIN && gridY >= ELEVATOR_Y_MIN;
  if (isAtElevator || isInsideElevatorAscending) {
    // Check if we are already in an elevator or ramp sequence
    // If doorwayStep > 0, we are likely in a sequence
    if (doorwayStep > 0 && doorwayStep <= 8) {
       const isFinished = doorwayStep === 8;
       if (isFinished) {
         msg = "The elevator arrives at the Southwest Mezzanine.";
          nextArea = 'SouthwestMezzanineStairwayAndRamps';
         nextLevel = 'Sky';
         nextX_out = 990;
          nextY_out = 990;
         nextDoorwayStep = 0;
         handled = true;
       } else {
         msg = `The elevator ascends... (Gallop ${doorwayStep}/8)`;
         nextDoorwayStep = doorwayStep + 1;
         nextX_out = gridX;
         nextY_out = gridY;
         shouldBark = true;
         barkMsg = "The Poodle Barks Elegantly";
         handled = true;
       }
    } else if (isAtElevator && (direction === 'North' || direction === 'East')) {
       msg = "You enter the elevator. The doors close and the ascent begins.";
       nextDoorwayStep = 1;
       nextX_out = gridX;
       nextY_out = gridY;
       shouldBark = true;
       barkMsg = "The Poodle Barks Elegantly";
       handled = true;
    }
  }

  // Tarsis Effects / Ramps (Northwest Corner Ramp System: X 1-220, Y 950-1000)
  if (!handled && nextY >= 950 && nextX <= 220) {
      const isEnteringRamp = gridY < 950 || gridX > 220;
      if (isEnteringRamp) {
          // West Wing (1-110)
          if (nextX <= 110) {
              if (nextX <= 55) {
                  // Ramp 1: Mezzanine
                  msg = state.hasAnnouncedLobbyRampRide ? "" : "You ride up the Westernmost ramp of the West Wing to the Southwest Mezzanine level.";
                  nextArea = 'SouthwestMezzanineStairwayAndRamps';
                  nextLevel = 'Sky'; // Mezzanine is tagged as Sky level in current system
                  nextX_out = nextX; // Maintain relative X
                  nextY_out = 945; // Place at bottom of Mezzanine triggers to avoid loop
                  handled = true;
              } else {
                  // Ramp 2: Cellar
                  msg = state.hasAnnouncedCellarRampUsed ? "" : "You ride down the Eastern ramp of the West Wing into the Cellar.";
                  nextArea = 'Cellar';
                  nextLevel = 'Cellar';
                  nextX_out = 162.5; 
                  nextY_out = 100;
                  isDescending = true;
                  handled = true;
              }
          } 
          // East Wing (111-220)
          else {
              if (nextX >= 166) {
                  // Ramp 1: Mezzanine
                  msg = state.hasAnnouncedLobbyRampRide ? "" : "You ride up the Easternmost ramp of the East Wing to the Southwest Mezzanine level.";
                  nextArea = 'SouthwestMezzanineStairwayAndRamps';
                  nextLevel = 'Sky';
                  nextX_out = nextX;
                  nextY_out = 945;
                  handled = true;
              } else {
                  // Ramp 2: Cellar
                  msg = state.hasAnnouncedCellarRampUsed ? "" : "You ride down the Western ramp of the East Wing into the Cellar.";
                  nextArea = 'Cellar';
                  nextLevel = 'Cellar';
                  nextX_out = 162.5;
                  nextY_out = 100;
                  isDescending = true;
                  handled = true;
              }
          }
      }
  }

  if (!handled) return null;

  return {
    nextArea: nextArea as any, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep,
    msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending
  };
};
