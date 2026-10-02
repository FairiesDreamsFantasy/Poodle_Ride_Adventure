import { Direction } from '../../../../../../../types';
import { GameState } from '../../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { isNorthward, isSouthward } from '../../../../../../../System/Engine/Core/Utils/Direction';

export interface TransitionResult {
  nextArea: string;
  nextX: number;
  nextY: number;
  msg: string;
  isBlocked: boolean;
  isLevelComplete?: boolean;
}

export const handleWandaTransitions = (
  area: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  direction: Direction,
  state: GameState
): TransitionResult | null => {
  const currentDims = AREA_DIMENSIONS[area] || { width: 500, height: 500 };

  // Wanda Platform Transitions
  if (area === 'WandaPlatform') {
    if (isNorthward(direction) && nextY >= currentDims.height) {
      if (nextX >= 40 && nextX <= 60) {
        return {
          nextArea: 'WandasWarpHouse',
          nextX: 250, // Centered Entrance
          nextY: 10,
          msg: "You enter Wanda's Warp House. The purple hardwood flooring gleams under the skylights.",
          isBlocked: false
        };
      }
    }
  }

  // Inside Wanda's Warp House
  if (area === 'WandasWarpHouse') {
    // South leads back to Wanda Platform
    if (isSouthward(direction) && nextY <= 1) {
      return {
        nextArea: 'WandaPlatform',
        nextX: 50,
        nextY: 90,
        msg: "You exit Wanda's Warp House back onto the platform.",
        isBlocked: false
      };
    }

    // EAST Wall: Travel to East Brick Hallway (Y = 240 to 260)
    if (direction === 'East' && nextX >= currentDims.width) {
      if (nextY >= 240 && nextY <= 260) {
        state.wandaEastDoorUnlocked = true;
        return {
          nextArea: 'WandaEastBrickHallway',
          nextX: 10,
          nextY: 10,
          msg: "You step through the open East doors into the brick-paved hallway.",
          isBlocked: false
        };
      }
    }

    // WEST Wall: West sliding double doors (centered at Y = 240 to 260)
    if (direction === 'West' && nextX <= 0) {
      if (nextY >= 240 && nextY <= 260) {
        if (!state.wandaWestDoorUnlocked && state.heartMeter >= 8) {
          state.wandaWestDoorUnlocked = true;
          return {
            nextArea: 'WandaWestFarmHallway',
            nextX: 290,
            nextY: 10,
            msg: "You use your 8 hearts to permanently unlock the West double doors! They slidingly separate to reveal a farm-themed hallway.",
            isBlocked: false
          };
        } else if (state.wandaWestDoorUnlocked) {
          return {
            nextArea: 'WandaWestFarmHallway',
            nextX: 290,
            nextY: 10,
            msg: "You slide through the unlocked West doors into the grassy farm grounds hallway.",
            isBlocked: false
          };
        }
      }
    }
  }

  // West Farm Hallway transitions
  if (area === 'WandaWestFarmHallway') {
    // East leads back to Wanda's Warp House
    if (direction === 'East' && nextX >= currentDims.width) {
      return {
        nextArea: 'WandasWarpHouse',
        nextX: 10,
        nextY: 250,
        msg: "You step back through the West double doors into Wanda's Warp House.",
        isBlocked: false
      };
    }
    // West leads to the West Barn Warp House
    if (direction === 'West' && nextX <= 0) {
      return {
        nextArea: 'WandaWestBarnWarpHouse',
        nextX: 390,
        nextY: 125,
        msg: "You enter the red barn-style themed warp house.",
        isBlocked: false
      };
    }
  }

  // West Barn Warp House transitions
  if (area === 'WandaWestBarnWarpHouse') {
    // East leads back to the Farm Hallway
    if (direction === 'East' && nextX >= currentDims.width) {
      if (nextY >= 100 && nextY <= 150) {
        return {
          nextArea: 'WandaWestFarmHallway',
          nextX: 10,
          nextY: 10,
          msg: "You pass through the barn gates back into the sunny farm ground hallway.",
          isBlocked: false
        };
      }
    }

    // North Wall: Relocated Princess Trinika's Riding Paths Warp (placed between 10 and 30 feet from West wall)
    if (isNorthward(direction) && nextY >= currentDims.height) {
      if (nextX >= 10 && nextX <= 30) {
        return {
          nextArea: 'PrincessTrinikasPathDecisionZone',
          nextX: 25,
          nextY: 5,
          msg: "TARSIS EFFECT: You ride through Princess Trinika's Relocated Riding Paths warp into the cozy barn decision zone.",
          isBlocked: false
        };
      }
    }
  }

  // East Brick Hallway transitions
  if (area === 'WandaEastBrickHallway') {
    // West leads back to Wanda's Warp House
    if (direction === 'West' && nextX <= 0) {
      return {
        nextArea: 'WandasWarpHouse',
        nextX: 490,
        nextY: 250,
        msg: "You walk back through the East doors into Wanda's Warp House.",
        isBlocked: false
      };
    }
    // East leads to Square House
    if (direction === 'East' && nextX >= currentDims.width) {
      return {
        nextArea: 'WandaEastSquareHouse',
        nextX: 10,
        nextY: 400,
        msg: "You pass through the rainbow sliding gate and step into the high-ceilinged Square House.",
        isBlocked: false
      };
    }
  }

  // East Square House transitions
  if (area === 'WandaEastSquareHouse') {
    // West leads back to East Brick Hallway (Y = 390 to 410)
    if (direction === 'West' && nextX <= 0) {
      if (nextY >= 390 && nextY <= 410) {
        return {
          nextArea: 'WandaEastBrickHallway',
          nextX: 290,
          nextY: 10,
          msg: "You step back into the brass fenced East brick hallway.",
          isBlocked: false
        };
      }
    }
    // East Wall Warp: Poodle Ride Story Book Warp (placed at Y = 780 to 795)
    if (direction === 'East' && nextX >= currentDims.width) {
      if (nextY >= 780 && nextY <= 795) {
        return {
          nextArea: 'PoodleRideStoryBookDecisionZone',
          nextX: 10,
          nextY: 25,
          msg: "TARSIS EFFECT: You ride through the picture of the blue reading poodle on the wall. Ahead is the Poodle Ride Story Book Adventure!",
          isBlocked: false
        };
      }
    }
    // North Wall Warp: Shimmering Pixel Garden Warp Portal (X = 3 to 17, Y = 800)
    if (isNorthward(direction) && nextY >= currentDims.height) {
      if (nextX >= 3 && nextX <= 17) {
        return {
          nextArea: 'PixelGardenGallopDecisionZone',
          nextX: 50, // Centered
          nextY: 10,
          msg: "TARSIS EFFECT: You step through the shimmering emerald block portal and gracefully land in the Pixel Garden Gallop Decision Area!",
          isBlocked: false
        };
      }
    }
  }

  // Pixel Garden Gallop Decision Zone
  if (area === 'PixelGardenGallopDecisionZone') {
    // South Wall centered Portal (17 feet wide, X = 41.5 to 58.5) leads back to Square House
    if (isSouthward(direction) && nextY <= 1) {
      if (nextX >= 41.5 && nextX <= 58.5) {
        return {
          nextArea: 'WandaEastSquareHouse',
          nextX: 10, // centered in front of warp
          nextY: 790,
          msg: "You step back through the South portal back to the Square House.",
          isBlocked: false
        };
      }
    }
    // North Wall centered Gate (17 feet wide, X = 41.5 to 58.5) leads to Course 1
    if (isNorthward(direction) && nextY >= currentDims.height - 1) {
      if (nextX >= 41.5 && nextX <= 58.5) {
        return {
          nextArea: 'PixelGardenGallop_Course_1',
          nextX: 50,
          nextY: 10,
          msg: "You pass through the centered wooden gate of the Pixel Garden. You gracefully land in this world inspired by Super Mario 64!",
          isBlocked: false
        };
      }
    }
  }

  // Poodle Ride Story Book Decision Zone
  if (area === 'PoodleRideStoryBookDecisionZone') {
    // West: Portal back to Warp House Rug
    if (direction === 'West' && nextX <= 1) {
      // Return switch consistency preserved (as per AGENTS.md rules)
      return {
        nextArea: 'WandasWarpHouse',
        nextX: 250, 
        nextY: 250,
        msg: "You go through the portal and arrive back on the center rug of Wanda's Warp House.",
        isBlocked: false
      };
    }

    // EAST Wall: Initial Path to the Pink House
    if (direction === 'East' && nextX >= currentDims.width - 1) {
      if (nextY >= 17.5 && nextY <= 32.5) {
        return {
          nextArea: 'PoodleRideStoryBookInitialPath',
          nextX: 5,
          nextY: 25,
          msg: "The double wooden gates swing open. You ride out onto the initial path leading to the Pink House!",
          isBlocked: false
        };
      }
    }
  }

  // Princess Trinika's Riding Paths Decision Zone
  if (area === 'PrincessTrinikasPathDecisionZone') {
    // South: Portal back to West Barn Warp House near relocated warp
    if (isSouthward(direction) && nextY <= 1) {
      return {
        nextArea: 'WandaWestBarnWarpHouse',
        nextX: 20, // Clean landing centered in front of [10, 30] warp
        nextY: 230,
        msg: "You go through the portal and arrive back in front of the relocated warp of the West Barn Warp House.",
        isBlocked: false
      };
    }

    // North: Gate to course via 500ft long path
    if (isNorthward(direction) && nextY >= currentDims.height) {
      return {
        nextArea: 'PrincessTrinikasRidingPaths',
        nextX: 100,
        nextY: 10,
        msg: "You ride out of the barn and onto the riding paths.",
        isBlocked: false
      };
    }
  }

  return null;
};
