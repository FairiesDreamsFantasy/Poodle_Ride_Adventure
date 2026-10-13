import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { LOBBY_WIDTH, LOBBY_HEIGHT, EAST_ARCH_Y_MIN, EAST_ARCH_Y_MAX, ELEVATOR_X_MIN, ELEVATOR_Y_MIN, RAMP_ENCLOSURE_X_MAX, RAMP_ENCLOSURE_Y_MIN, WEST_DOOR_Y_MIN, WEST_DOOR_Y_MAX } from '../../LobbyConstants';

export const handleLobbyCollision = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: string,
  nextLevel: string,
  state: any
) => {
  const dims = AREA_DIMENSIONS.LobbyStairwayAndRamps;
  let isBlocked = false;
  let barkMsg = "";
  let finalNextLevel = nextLevel;
  let finalNextArea = "LobbyStairwayAndRamps";

  const clampedX = Math.max(0, Math.min(dims.width, nextX));
  const clampedY = Math.max(0, Math.min(dims.height, nextY));

  // Access points
  const isAtWestDoor = clampedX <= 1 && clampedY >= WEST_DOOR_Y_MIN && clampedY <= WEST_DOOR_Y_MAX;
  const isAtEastArch = clampedX >= dims.width - 1 && clampedY >= EAST_ARCH_Y_MIN && clampedY <= EAST_ARCH_Y_MAX;
  
  // Boundary check
  if (clampedX <= 1 || clampedX >= dims.width - 1 || clampedY <= 1 || clampedY >= dims.height - 1) {
    if (!isAtWestDoor && !isAtEastArch) {
      isBlocked = true;
    }
  }

  // Elevator Block (NE Corner: 980-1000, 980-1000)
  const insideElevator = gridX >= ELEVATOR_X_MIN && gridY >= ELEVATOR_Y_MIN;
  const enteringElevator = nextX >= ELEVATOR_X_MIN && nextY >= ELEVATOR_Y_MIN;

  if (enteringElevator) {
    // Check if entering through the door on the West side of the cab
    const isAtElevatorDoor = nextX <= ELEVATOR_X_MIN + 2 && nextY >= 985 && nextY <= 995;
    if (isAtElevatorDoor) {
      if (!state.isElevatorDoorOpen && !insideElevator) {
        isBlocked = true; // Closed door blocks entry
      }
    } else if (!insideElevator) {
      isBlocked = true; // Wall blocks entry
    }
  }

  if (insideElevator && !enteringElevator) {
    // If leaving the elevator, must go through the door and it must be open
    const isAtElevatorDoor = nextX <= ELEVATOR_X_MIN + 2 && nextY >= 985 && nextY <= 995;
    if (!isAtElevatorDoor || !state.isElevatorDoorOpen) {
      isBlocked = true;
    }
  }

  // Ramps Enclosure (NW Corner: 1-220, 950-1000)
  // User: "At the 220 feet marker from the west wall; there's no arbitrary railing there; this is ideal for entering the tarsis ramps."
  if (clampedX <= RAMP_ENCLOSURE_X_MAX && clampedY >= RAMP_ENCLOSURE_Y_MIN) {
      const isEnteringFromSouth = gridY < RAMP_ENCLOSURE_Y_MIN;
      const isEnteringFromEast = gridX > RAMP_ENCLOSURE_X_MAX;
      
      // If entering from South, we might want to block it if there's a railing
      // But the user specifically called out the East side (220) as the ideal entry.
      if (isEnteringFromSouth) {
          isBlocked = true;
          barkMsg = "A sturdy brass railing lines the front of the ramp enclosure. The entrance is further East at the 220 feet marker.";
      }
      
      // If already inside or entering from East, we allow it.
  }

  return { 
    isBlocked, 
    gridX: isBlocked ? gridX : nextX, 
    gridY: isBlocked ? gridY : nextY, 
    barkMsg,
    nextLevel: finalNextLevel,
    nextArea: finalNextArea
  };
};
