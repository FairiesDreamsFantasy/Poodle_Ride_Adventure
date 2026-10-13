import { Direction } from '../../../../../../../types';
import { 
  RAMP_X_MAX, RAMP_Y_MAX, RAMP_Y_MIN, 
  CELLAR_RAMP_X_MIN, CELLAR_RAMP_X_MAX, CELLAR_RAMP_Y_MIN, CELLAR_RAMP_Y_MAX, 
  CELLAR_LANDING_X_MIN, CELLAR_LANDING_X_MAX, CELLAR_LANDING_Y_MIN, CELLAR_LANDING_Y_MAX, 
  SKY_LANDING_X_MIN, SKY_LANDING_X_MAX, SKY_LANDING_Y_MIN, SKY_LANDING_Y_MAX, 
  SKY_TARCIST_WIDTH,
  CELLAR_TARCIST_WIDTH,
  FOYER_SKY_WARP_Y_MIN, FOYER_SKY_WARP_Y_MAX, 
  FOYER_FLOOR_WARP_Y_MIN, FOYER_FLOOR_WARP_Y_MAX,
  CELLAR_FLOOR_WARP_Y_MIN, CELLAR_FLOOR_WARP_Y_MAX,
  CELLAR_B1_WARP_Y_MIN, CELLAR_B1_WARP_Y_MAX
} from '../../FoyerConstants';
import { FOYER_DESCRIPTIONS } from '../../../../../../../Description_List/F/Foyer';
import { FOYER_OBSTACLES } from '../../../../../../../System/Engine/Core/O/Obstacles';

export const handleFoyerCollision = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  dims: { width: number, height: number },
  state?: any
) => {
  let isBlocked = false;
  let wallDesc = "";
  let nextLevel = level;
  let isRampStep = false;
  let isDescending = false;
  let msg = "";

  const doorMin = 990;
  const doorMax = 1010;

  // Clamped coordinates for safer boundary checks
  const clampedX = Math.max(0, Math.min(dims.width, nextX));
  const clampedY = Math.max(0, Math.min(dims.height, nextY));

  // Sky Ramp Footprint - Only active if using the warp zone logic
  const onSkyRamp = (level === 'Sky' && gridX >= 0 && gridX <= SKY_TARCIST_WIDTH && gridY >= FOYER_SKY_WARP_Y_MIN && gridY <= FOYER_SKY_WARP_Y_MAX) ||
                    (level === 'Floor' && gridX >= 0 && gridX <= SKY_TARCIST_WIDTH && gridY >= FOYER_FLOOR_WARP_Y_MIN && gridY <= FOYER_FLOOR_WARP_Y_MAX) ||
                    (state?.doorwayStep > 0 && gridX >= 0 && gridX <= SKY_TARCIST_WIDTH);
  
  const nextOnSkyRamp = (level === 'Sky' && nextX >= 0 && nextX <= SKY_TARCIST_WIDTH && nextY >= FOYER_SKY_WARP_Y_MIN && nextY <= FOYER_SKY_WARP_Y_MAX) ||
                        (level === 'Floor' && nextX >= 0 && nextX <= SKY_TARCIST_WIDTH && nextY >= FOYER_FLOOR_WARP_Y_MIN && nextY <= FOYER_FLOOR_WARP_Y_MAX) ||
                        (state?.doorwayStep > 0 && nextX >= 0 && nextX <= SKY_TARCIST_WIDTH);
  
  // Cellar Tarcist Footprint
  const onCellarTarcist = (level === 'Floor' && gridX >= 0 && gridX <= CELLAR_TARCIST_WIDTH && gridY >= CELLAR_FLOOR_WARP_Y_MIN && gridY <= CELLAR_FLOOR_WARP_Y_MAX) ||
                          (level === 'Cellar' && gridX >= 0 && gridX <= CELLAR_TARCIST_WIDTH && gridY >= CELLAR_B1_WARP_Y_MIN && gridY <= CELLAR_B1_WARP_Y_MAX);

  const nextOnCellarTarcist = (level === 'Floor' && nextX >= 0 && nextX <= CELLAR_TARCIST_WIDTH && nextY >= CELLAR_FLOOR_WARP_Y_MIN && nextY <= CELLAR_FLOOR_WARP_Y_MAX) ||
                              (level === 'Cellar' && nextX >= 0 && nextX <= CELLAR_TARCIST_WIDTH && nextY >= CELLAR_B1_WARP_Y_MIN && nextY <= CELLAR_B1_WARP_Y_MAX);
  
  const onCellarRamp = (level === 'Cellar' && gridX >= CELLAR_RAMP_X_MIN && gridX <= CELLAR_RAMP_X_MAX && gridY >= CELLAR_RAMP_Y_MIN && gridY <= CELLAR_RAMP_Y_MAX);
  const nextOnCellarRamp = (level === 'Cellar' && nextX >= CELLAR_RAMP_X_MIN && nextX <= CELLAR_RAMP_X_MAX && nextY >= CELLAR_RAMP_Y_MIN && nextY <= CELLAR_RAMP_Y_MAX);
  
  const onSkyLanding = (level === 'Sky' && gridX >= SKY_LANDING_X_MIN && gridX <= SKY_LANDING_X_MAX && gridY >= SKY_LANDING_Y_MIN && gridY <= SKY_LANDING_Y_MAX);
  const nextOnSkyLanding = (level === 'Sky' && nextX >= SKY_LANDING_X_MIN && nextX <= SKY_LANDING_X_MAX && nextY >= SKY_LANDING_Y_MIN && nextY <= SKY_LANDING_Y_MAX);

  const onCellarLanding = (level === 'Floor' && gridX >= CELLAR_LANDING_X_MIN && gridX <= CELLAR_LANDING_X_MAX && gridY >= CELLAR_LANDING_Y_MIN && gridY <= CELLAR_LANDING_Y_MAX);
  const nextOnCellarLanding = (level === 'Floor' && nextX >= CELLAR_LANDING_X_MIN && nextX <= CELLAR_LANDING_X_MAX && nextY >= CELLAR_LANDING_Y_MIN && nextY <= CELLAR_LANDING_Y_MAX);

  if (onSkyRamp || onCellarTarcist) {
    // Warp zones are open, logic is handled in Transitions.ts
    isRampStep = true;
    isDescending = (onSkyRamp && direction === 'South') || (onCellarTarcist && direction === 'North');
  } else if (onCellarRamp) {
    if (nextX > CELLAR_RAMP_X_MAX) {
      isBlocked = true;
      wallDesc = "You bumped into the side railing of the cellar ramp.";
    } else if (nextY > CELLAR_RAMP_Y_MAX) {
      // Moving North from ramp -> Enter Cellar
      msg = "You have reached the bottom of the cellar ramp. You are now in the Cellar.";
      nextLevel = 'Cellar';
    } else if (nextY < CELLAR_RAMP_Y_MIN) {
      // Moving South from ramp -> Ascend to Floor Landing (Cellar Landing)
      msg = "You have reached the top of the cellar ramp and enter the cellar landing. You are back on the Floor Foyer.";
      nextLevel = 'Floor';
    } else {
      // Exclude landing boundaries for beeps
      isRampStep = nextY > CELLAR_RAMP_Y_MIN && nextY < CELLAR_RAMP_Y_MAX && (direction === 'North' || direction === 'South');
      isDescending = direction === 'North';
    }
  } else {
    // Entering Sky Ramp from Sky Landing (South end, moving North to descend)
    if (level === 'Sky' && onSkyLanding) {
      const enteringSkyRampFromSky = (nextX >= 0 && nextX <= RAMP_X_MAX && nextY > SKY_LANDING_Y_MAX);
      if (enteringSkyRampFromSky) {
        isRampStep = nextY >= 1341 && nextY <= 1979;
        isDescending = true; // North is descending
        nextLevel = 'Sky';
      }
    }

    // Entering Cellar Ramp from Floor Landing (South end of ramp, moving North to descend)
    if (level === 'Floor' && onCellarLanding) {
      const enteringCellarRamp = (nextX >= 0 && nextX <= RAMP_X_MAX && nextY > CELLAR_LANDING_Y_MAX);
      if (enteringCellarRamp) {
        isRampStep = true;
        isDescending = true; // North is descending into cellar
        nextLevel = 'Cellar';
      }
    }

    // Entering Cellar Ramp from Cellar
    if (level === 'Cellar') {
      const enteringCellarRampFromCellar = (nextX >= CELLAR_RAMP_X_MIN && nextX <= CELLAR_RAMP_X_MAX && nextY < CELLAR_RAMP_Y_MIN);
      if (enteringCellarRampFromCellar) {
        isRampStep = true;
        isDescending = false; // South is ascending back to floor
        nextLevel = 'Cellar';
      }
    }
  }

  // Sky Foyer Central Opening
  if (nextLevel === 'Sky' && !onSkyRamp && !nextOnSkyRamp) {
    const centerMin = Math.floor(dims.width * 0.045);
    const centerMax = Math.floor(dims.width * 0.955);
    const nextInCenter = nextX > centerMin && nextX < centerMax && nextY > centerMin && nextY < centerMax;
    if (nextInCenter) {
      isBlocked = true;
      wallDesc = "A glass barrier with a shiny brass rail prevents you from falling into the center of the foyer. The perimeter is 7280 feet around the opening. Core Tip: You can effortlessly go around this glass barrier by following the perimeter walkway.";
    }
  }

  // Obstacles
  FOYER_OBSTACLES.forEach(obs => {
    // Check both current level and proposed next level for obstacles to handle transitions safely
    if (obs.level && obs.level !== level && obs.level !== nextLevel) return;
    
    // Ramp walls (restricted to archway/landing clearances)
    if (obs.id === 'ramp_wall_right' || obs.id === 'ramp_wall_left') {
      const isNWLanding = clampedY > 1980 && clampedY <= 2000;
      const isSkyArchway = clampedY >= 1320 && clampedY < 1341;
      if (isNWLanding || isSkyArchway) return;
    }
    
    // Cellar Door Passage (Precisely 16 feet wide at y1320)
    if (obs.id === 'cellar_door_wall') {
      if (clampedX >= 3 && clampedX <= 18) {
        // Allow passage through the 16-foot wide door
        return;
      }
      // Otherwise, hit the wall segments on the left/right (x1-2 and x19-20)
    }

    if (obs.isWall) {
      if (obs.xMin === obs.xMax) {
        if (((gridX < obs.xMin && clampedX >= obs.xMin) || (gridX > obs.xMin && clampedX <= obs.xMin)) && clampedY >= obs.yMin && clampedY <= obs.yMax) {
          isBlocked = true;
          wallDesc = obs.description;
        }
      } else if (obs.yMin === obs.yMax) {
        if (((gridY < obs.yMin && clampedY >= obs.yMin) || (gridY > obs.yMin && clampedY <= obs.yMin)) && clampedX >= obs.xMin && clampedX <= obs.xMax) {
          isBlocked = true;
          wallDesc = obs.description;
        }
      }
    } else {
      if (clampedX >= obs.xMin && clampedX <= obs.xMax && clampedY >= obs.yMin && clampedY <= obs.yMax) {
        isBlocked = true;
        wallDesc = obs.description;
      }
    }
  });

  // Boundary Check
  if (nextX < 0 || nextX >= dims.width || nextY < 0 || nextY >= dims.height) {
    if (nextOnSkyRamp || nextOnCellarTarcist) {
       return { isBlocked: false, wallDesc: "", nextLevel, isRampStep, isDescending, msg };
    }
    // West Transitions - Use nextLevel to allow exits immediately after landing
    const isAtWestDoorNW = nextLevel === 'Floor' && clampedX <= 0 && clampedY >= 1980 && clampedY <= 2000;
    const isAtWestFloorArchwayMid = nextLevel === 'Floor' && clampedX <= 0 && clampedY >= 410 && clampedY <= 430;
    // Precise Sky Archway detection (1320-1340 as requested)
    const isAtWestSkyArchway = (nextLevel === 'Sky' || (nextLevel === 'Floor' && gridX <= 20.5 && clampedY >= 1320 && clampedY <= 1340)) && clampedX <= 0 && clampedY >= 1320 && clampedY <= 1340;

    // East Transitions (Ballroom connections at Sky level only)
    const isAtEastSkyArchwayNorth = nextLevel === 'Sky' && clampedX >= dims.width && clampedY >= 1980 && clampedY <= 2000;
    const isAtEastSkyArchwaySouth = nextLevel === 'Sky' && clampedX >= dims.width && clampedY >= 0 && clampedY <= 20;

    // North/South Doors (990-20-990 split for Floor Floor)
    const floorDoorMin = 990;
    const floorDoorMax = 1010;
    const isAtNorthDoor = nextLevel === 'Floor' && clampedY >= dims.height && clampedX >= floorDoorMin && clampedX <= floorDoorMax;
    const isAtSouthDoor = nextLevel === 'Floor' && clampedY <= 0 && clampedX >= floorDoorMin && clampedX <= floorDoorMax;

    if (isAtNorthDoor || isAtSouthDoor || isAtWestDoorNW || isAtWestFloorArchwayMid || isAtWestSkyArchway || isAtEastSkyArchwayNorth || isAtEastSkyArchwaySouth) {
      // Allow passage through valid transitions
      isBlocked = false;
    } else {
      isBlocked = true;
      if (wallDesc === "") {
        if (nextY > dims.height) {
          if (nextLevel === 'Floor' && clampedX >= floorDoorMin && clampedX <= floorDoorMax) {
            wallDesc = "The massive high blue doors are closed shut.";
          } else {
            wallDesc = nextLevel === 'Sky' ? "You have reached the segment of the North wall on the Sky Foyer. A massive grand window stretches from floor to ceiling, acting as a transparent barrier to the outside." : `You have reached one of the 990-foot segments of the North wall. ${FOYER_DESCRIPTIONS.NORTH_WINDOWS}`;
          }
        } else if (nextY < 0) {
          if (nextLevel === 'Floor' && clampedX >= floorDoorMin && clampedX <= floorDoorMax) {
            wallDesc = "The massive high blue doors at the South end are closed shut.";
          } else {
            wallDesc = nextLevel === 'Sky' ? "You have reached the segment of the South wall on the Sky Foyer. A massive grand window stretches from floor to ceiling here." : `You have reached one of the 990-foot segments of the South wall. ${FOYER_DESCRIPTIONS.SOUTH_WINDOWS}`;
          }
        } else if (nextX <= 0) {
          if (level === 'Sky') {
            if (clampedY < 1320) {
              wallDesc = "A solid 1320-foot wall borders the West perimeter walkway of the Sky Foyer here.";
            } else if (clampedY > 1340) {
              wallDesc = "A solid 660-foot wall borders the West perimeter walkway of the Sky Foyer here.";
            } else {
              wallDesc = "You have reached the West wall near the archway to the playground's perimeter walkway.";
            }
          } else {
            // Check if we are in the Tarcist zone (Sky Ramp Floor end)
            const inSkyRampZone = clampedY >= 1320 && clampedY <= 2000;
            if (inSkyRampZone) {
               // The wall is open here for the Tarcist teleportation/ramp
               return { isBlocked: false, wallDesc: "", nextLevel, isRampStep: true, isDescending: direction === 'South', msg };
            }
            
            if (clampedY < 1980) {
              wallDesc = "A solid 1980-foot wall borders the West side of the Floor Foyer.";
            } else {
              wallDesc = "You have reached the West wall.";
            }
          }
        } else if (nextX >= dims.width) {
          wallDesc = "An East Wall is 2000 feet long here at the edge of the foyer.";
        } else if (nextY >= dims.height) {
           // Corner case where y=2000 exactly but x is mid-wall
           wallDesc = `You have reached the North wall. ${FOYER_DESCRIPTIONS.NORTH_WINDOWS}`;
        } else if (nextY <= 0) {
           wallDesc = `You have reached the South wall. ${FOYER_DESCRIPTIONS.SOUTH_WINDOWS}`;
        }
      }
    }
  }

  return { isBlocked, wallDesc, nextLevel, isRampStep, isDescending, msg };
};
