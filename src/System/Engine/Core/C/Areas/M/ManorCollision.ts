import { CollisionResult } from '../../Collision';
import { GameState } from '../../../Types';
import { formulateAreaMetrics } from '../../../../../AI/In-Game/Category/Arena';
import { handleWarpRoomCollision } from '../../../../Science/Physics/General';

export function handleManorCollision(
  area: string,
  nextX: number,
  nextY: number,
  state: GameState
): Partial<CollisionResult> {
  // Check for modular warp room collision first
  const warpCollision = handleWarpRoomCollision(area, nextX, nextY, state);
  if (warpCollision) return warpCollision;

  const currentAreaMetrics = formulateAreaMetrics(area);
  const currentDims = { width: currentAreaMetrics.width, height: currentAreaMetrics.height };
  let isBlocked = false;
  let wallDesc = "";

  // Allison's Manor specific logic
  if (area === 'AllisonsFoyer' || area === 'Allisons2ndFloor' || area === 'Allisons3rdFloor' || area === 'AllisonsRooftop' || area === 'AllisonsPorch' || area === 'AllisonsRestaurant' || area === 'AllisonsRestaurantOutdoor' || area === 'AllisonsMountainsWarpRoom') {
    
    // --- West Wall ---
    if (nextX <= 1) {
      isBlocked = true;
      wallDesc = "The ornate West wall of the manor is decorated with gold-trimmed panels.";
    }

    // Rampway / SW Square structure at NW Corner (x: 1-30, y: 320-500)
    // Only apply the x=30 boundary within the Y-range where the structure exists
    if (nextY >= 320 && nextY <= 500) {
      // Crossing the x=30 boundary between the main floor and the ramp area
      if ((state.gridX > 30 && nextX <= 30) || (state.gridX <= 30 && nextX > 30)) {
          const isAtNorthOpening = nextY >= 485 && nextY <= 500; // North opening
          const isAtSouthOpening = nextY >= 320 && nextY <= 335; // South opening
          
          if (!isAtNorthOpening && !isAtSouthOpening) {
              isBlocked = true;
              wallDesc = "A solid wall of the ramp structure blocks your path. Use the North (485-500) or South (320-335) openings.";
          }
      }
    }

    // --- North Wall ---
    if (nextY >= currentDims.height - 1) {
      if (area === 'AllisonsFoyer') {
        isBlocked = true;
        wallDesc = "The North wall features floor-to-ceiling windows overlooking the mountain range.";
      } else {
        isBlocked = true;
        wallDesc = "The North wall is made of solid stone with elegant carvings.";
      }
    }

    // --- South Wall ---
    if (nextY <= 1) {
      if (area === 'AllisonsFoyer') {
        const isCenterDoor = nextX >= 240 && nextX <= 260;
        if (!isCenterDoor) {
          isBlocked = true;
          wallDesc = "The South wall features massive double doors leading back to the porch.";
        }
      } else {
        isBlocked = true;
        wallDesc = "The South wall is decorated with portraits of previous manor residents.";
      }
    }

    // --- East Wall ---
    if (nextX >= currentDims.width - 1) {
      isBlocked = true;
      if (area === 'AllisonsFoyer') {
        wallDesc = "The East wall has a grand stairway leading up to the second floor.";
      } else {
        wallDesc = "The East wall features large tapestries depicting historical battles.";
      }
    }

    // --- Western Warp Room Exterior Walls (Southwest Corner) ---
    if (area === 'AllisonsFoyer') {
      // Wall 1: x = 125, y = 0 to 90 (SW)
      if (nextX >= 124 && nextX <= 126 && nextY <= 90) {
        isBlocked = true;
        wallDesc = "A high-quality brick wall with fictional farm designs prevents you from going East here.";
      }
      // Wall 2: y = 90, x = 1 to 125 (SW)
      if (nextY >= 89 && nextY <= 91 && nextX >= 1 && nextX <= 125) {
        // Entrance: x = 2 to 14
        const isAtEntrance = nextX >= 2 && nextX <= 14;
        if (!isAtEntrance) {
          isBlocked = true;
          wallDesc = "A decorative wall at y90 blocks your path. It features beautiful ceramic tiles.";
        }
      }

      // --- Allison's Store Exterior Walls (x: 15-125, y: 350-500) ---
      if (nextX >= 15 && nextX <= 125 && nextY >= 350 && nextY <= 500) {
        // South Wall Entry (y350): x115-135 (relative to parent, let's say x105-125)
        const isAtStoreEntrance = nextY <= 355 && nextX >= 105 && nextX <= 125;
        if (!isAtStoreEntrance) {
          isBlocked = true;
          wallDesc = "The exterior of Allison's Store blocks your path. The entrance is at x105-125.";
        }
      }

      // --- Southeast Coast Warp Room Exterior Walls ---
      // Wall 1: x = 375, y = 0 to 50 (SE)
      if (nextX >= 374 && nextX <= 376 && nextY <= 50) {
        isBlocked = true;
        wallDesc = "The West wall of the Southeast Coast Warp Room blocks your path. It is made of white ceramic tile.";
      }
      // Wall 2: y = 50, x = 375 to 500 (SE)
      if (nextY >= 49 && nextY <= 51 && nextX >= 375 && nextX <= 500) {
        // Entrance: relative x3 to x23 -> x378 to x398
        const isAtSEEntrance = nextX >= 378 && nextX <= 398;
        if (!isAtSEEntrance) {
          isBlocked = true;
          wallDesc = "A white ceramic tile wall at y50 blocks your path.";
        }
      }

      // --- Restaurant / Communal Dining Facility (y: 350-510, x: 125-375) ---
      if (nextY >= 350 && nextY <= 510 && nextX >= 125 && nextX <= 375) {
        const isAtEntrance = nextY <= 355 && nextX >= 240 && nextX <= 260;
        if (!isAtEntrance) {
          isBlocked = true;
          wallDesc = "The wall of the Restaurant and Communal Dining Facility blocks your path. The entrance is at the center (x240-260).";
        }
      }
    }

    if (area === 'AllisonsRestaurant') {
      // Basic wall collision for 500x200
      if (nextX <= 1 || nextX >= currentDims.width - 1 || nextY <= 1 || nextY >= currentDims.height - 1) {
        const isSouthDoor = nextY <= 1 && nextX >= 240 && nextX <= 260;
        const isKitchenInteriorDoor = nextY >= currentDims.height - 1 && nextX >= 230 && nextX <= 250;
        const isKitchenExteriorDoor = nextY >= currentDims.height - 1 && nextX >= 480 && nextX <= 500;
        
        if (!isSouthDoor && !isKitchenInteriorDoor && !isKitchenExteriorDoor) {
          isBlocked = true;
          if (nextY >= currentDims.height - 1) wallDesc = "The North wall of the dining facility.";
          else if (nextY <= 1) wallDesc = "The South wall of the dining facility.";
          else if (nextX <= 1) wallDesc = "The West wall of the dining facility.";
          else wallDesc = "The East wall of the dining facility.";
        }
      }
    }

    if (area === 'AllisonsRestaurantOutdoor') {
      if (nextX <= 1 || nextX >= currentDims.width - 1 || nextY <= 1 || nextY >= currentDims.height - 1) {
        const isSouthDoor1 = nextY <= 1 && nextX >= 80 && nextX <= 110;
        const isSouthDoor2 = nextY <= 1 && nextX >= 380 && nextX <= 410;
        if (!isSouthDoor1 && !isSouthDoor2) {
          isBlocked = true;
          wallDesc = "The boundary of the outdoor cooking area.";
        }
      }
    }

    if (area === 'AllisonsFoyer') {
      // Mountains Specific Warp Room Exterior (x: 0-200, y: 0-480)
      if (nextX <= 200 && nextY <= 480) {
        const isAtEntrance = nextX >= 195 && nextY >= 230 && nextY <= 250;
        if (!isAtEntrance) {
          isBlocked = true;
          wallDesc = "The exterior of the Mountains Specific Warp Room blocks your path.";
        }
      }
    }

    if (area === 'AllisonsMountainsWarpRoom') {
      // Logic moved to WarpRoomCollision.ts
    }
  }

  return { isBlocked, wallDesc };
}
