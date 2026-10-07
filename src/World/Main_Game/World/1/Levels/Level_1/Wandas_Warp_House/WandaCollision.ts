import { CollisionResult } from '../../../../../../../System/Engine/Core/C/Collision';
import { GameState } from '../../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';

export function handleWandaCollision(
  area: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  direction: string,
  state: GameState
): CollisionResult {
  const dims = AREA_DIMENSIONS[area] || { width: 500, height: 500 };
  let isBlocked = false;
  let wallDesc = "";

  if (area === 'WandasWarpHouse') {
    if (nextY >= dims.height) {
      isBlocked = true;
      wallDesc = "The North wall of Wanda's Warp House is made of solid white bricks with dark-blue mortar. Princess Trinika's Pony Path warp has been relocated to the West themed barn.";
    } else if (nextY <= 0) {
      if (nextX < 240 || nextX > 260) {
        isBlocked = true;
        wallDesc = "The South wall of Wanda's Warp House is made of white bricks with dark-blue mortar.";
      }
    } else if (nextX >= dims.width) {
      // East sliding doors (centered at Y = 240 to 260, 20 feet wide)
      if (nextY >= 240 && nextY <= 260) {
        isBlocked = false;
      } else {
        isBlocked = true;
        wallDesc = "The East wall of Wanda's Warp House is constructed of white bricks with dark-blue mortar.";
      }
    } else if (nextX <= 0) {
      // West sliding double doors (centered at Y = 240 to 260, 20 feet wide)
      if (nextY >= 240 && nextY <= 260) {
        if (state.wandaWestDoorUnlocked || state.heartMeter >= 8) {
          isBlocked = false;
        } else {
          isBlocked = true;
          wallDesc = "The beautiful West double doors are locked. They require at least 8 hearts to unlock. You currently have " + state.heartMeter + " hearts.";
        }
      } else {
        isBlocked = true;
        wallDesc = "The side walls of Wanda's Warp House are solid white brick with dark-blue mortar.";
      }
    }
  }

  if (area === 'WandaWestFarmHallway') {
    const hallwayDims = { width: 300, height: 20 };
    if (nextY >= hallwayDims.height) {
      isBlocked = true;
      wallDesc = "A white wooden fence halts you. Beyond it is a picturesque pixelated farmland with grazing cattle and tall corn under a beautiful blue sky.";
    } else if (nextY <= 0) {
      isBlocked = true;
      wallDesc = "A white wooden fence blocks you. Beyond it is a peaceful duck pond with 4 swimming ducks in the clear blue water.";
    } else if (nextX >= hallwayDims.width) {
      // East doors back to main warp house (Y = 0 to 20 since depth is 20)
      isBlocked = false;
    } else if (nextX <= 0) {
      // West gate to new barn (Y = 0 to 20)
      isBlocked = false;
    }
  }

  if (area === 'WandaEastBrickHallway') {
    const brickHallDims = { width: 300, height: 20 };
    if (nextY >= brickHallDims.height) {
      isBlocked = true;
      wallDesc = "A brass chain-link fence blocks you. Beyond it, looking down, is a mud-coated dirt road underpass that goes beneath this brick pathway.";
    } else if (nextY <= 0) {
      isBlocked = true;
      wallDesc = "A brass chain-link fence blocks you. Beyond it is a mud-coated dirt road underpass.";
    } else if (nextX >= brickHallDims.width) {
      // East gate into Square House
      isBlocked = false;
    } else if (nextX <= 0) {
      // West doors back to Wanda's Warp House
      isBlocked = false;
    }
  }

  if (area === 'WandaEastSquareHouse') {
    const sqDims = { width: 800, height: 800 };
    
    // West Door from brick hallway (Y = 390 to 410)
    if (nextX <= 0) {
      if (nextY >= 390 && nextY <= 410) {
        isBlocked = false;
      } else {
        isBlocked = true;
        wallDesc = "The West wall of this high-ceiling square house is decorated with elegant ceramic tiles.";
      }
    } else if (nextX >= sqDims.width) {
      // Poodle Ride Story Book Warp (Y = 780 to 795 on the East Wall)
      if (nextY >= 780 && nextY <= 795) {
        isBlocked = false;
      } else {
        isBlocked = true;
        wallDesc = "The East wall of this large foyer is beautifully decorated with ceramic tiles.";
      }
    } else if (nextY >= sqDims.height) {
      if (nextX >= 3 && nextX <= 17) {
        isBlocked = false;
      } else {
        isBlocked = true;
        wallDesc = "The North wall is locked and features magnificent high ceilings. A shifting emerald portal sits near the west corner.";
      }
    } else if (nextY <= 0) {
      isBlocked = true;
      wallDesc = "The South wall is solid polished marble tile.";
    }

    // Northwest Table obstacle: X = 0 to 3, Y = 797 to 800
    if (!isBlocked && nextX <= 3 && nextY >= 797) {
      isBlocked = true;
      wallDesc = "You are blocked by the 3 by 3-foot table occupying the northwest corner of the square house, draped in a white decorative tablecloth.";
    }

    // Interactive obstacle: Table Centerpiece at X = 797 to 800, Y = 795 to 800
    if (!isBlocked && nextX >= 797 && nextY >= 795) {
      isBlocked = true;
      wallDesc = "You are blocked by the beautifully decorated 3 by 5-foot wooden table centered in the corner against the walls. It is covered in a elegant violet table cloth with a floral lamp on top.";
    }

    // Interactive obstacle: Bookshelf Divider at X = 797 to 800, Y = 779 to 780
    if (!isBlocked && nextX >= 797 && nextY >= 779 && nextY <= 780) {
      isBlocked = true;
      wallDesc = "You are blocked by the 3-foot wooden bookshelf divider, stacked with colorful books.";
    }
  }

  if (area === 'WandaWestBarnWarpHouse') {
    const barnDims = { width: 400, height: 250 };
    // North wall has relocated warp at X = 10 to 30, and a table at X = 0 to 10
    if (nextY >= barnDims.height) {
      if (nextX >= 10 && nextX <= 30) {
        isBlocked = false; // Trinika's pony path warp
      } else if (nextX >= 0 && nextX <= 10) {
        isBlocked = true;
        wallDesc = "You are blocked by the beautifully decorated 10 by 3-foot table. On it is a figure of cowboy and cowgirl pony riders and a picture of a large yellow chicken with an orange beak.";
      } else {
        isBlocked = true;
        wallDesc = "The North wall of the red barn is constructed of thick aromatic wooden planks.";
      }
    } else if (nextY <= 0) {
      isBlocked = true;
      wallDesc = "The South wall of the red barn is solid aromatic pine wood.";
    } else if (nextX <= 0) {
      isBlocked = true;
      wallDesc = "The West wall of the red barn features rustic wooden support beams.";
    } else if (nextX >= barnDims.width) {
      // East gate back to the farm hallway (centered at Y = 100 to 150)
      if (nextY >= 100 && nextY <= 150) {
        isBlocked = false;
      } else {
        isBlocked = true;
        wallDesc = "The East wall of the red barn is made of solid wooden slats painted brilliant red.";
      }
    } else if (nextX >= 0 && nextX <= 10 && nextY >= 247) {
      isBlocked = true;
      wallDesc = "You are blocked by the beautifully decorated 10 by 3-foot table. On it is a figure of cowboy and cowgirl pony riders and a picture of a large yellow chicken with an orange beak.";
    }
  }

  if (area === 'PixelGardenGallopDecisionZone') {
    const pDims = { width: 100, height: 100 };
    if (nextY >= pDims.height) {
      if (nextX >= 41.5 && nextX <= 58.5) {
        isBlocked = false;
      } else {
        isBlocked = true;
        wallDesc = "The North wall is sturdy jade stone brick. The golden majestic gate is centered.";
      }
    } else if (nextY <= 0) {
      if (nextX >= 41.5 && nextX <= 58.5) {
        isBlocked = false;
      } else {
        isBlocked = true;
        wallDesc = "The South wall is solid jade stone brick. The return portal is centered.";
      }
    } else if (nextX <= 0) {
      isBlocked = true;
      wallDesc = "The West wall is composed of polished jade blocks reaching to the 20-foot high ceiling.";
    } else if (nextX >= pDims.width) {
      isBlocked = true;
      wallDesc = "The East wall is composed of polished jade blocks.";
    }
  }

  if (area.startsWith('PixelGardenGallop_Course_')) {
    if (nextX < 10 || nextX > 90) {
      isBlocked = true;
      wallDesc = "A decorative gold railing along the side of the 4-lane course track halts you.";
    }
    if (nextY >= 1000) {
      isBlocked = true;
      wallDesc = "The finish line banner is high above! You have completed the run.";
    }
  }

  if (area === 'PoodleRideStoryBookDecisionZone') {
    if (nextX <= 0) {
       isBlocked = false;
    } else if (nextX >= dims.width) {
       // East Wall Door (15ft centered)
       if (nextY >= 17.5 && nextY <= 32.5) {
         isBlocked = false;
       } else {
         isBlocked = true;
         wallDesc = "The East wooden wall of the decision area is solid and comforting.";
       }
    } else if (nextY <= 0 || nextY >= dims.height) {
       isBlocked = true;
       wallDesc = "The North and South wooden walls of the decision area are solid and comforting.";
     }
  }

  if (area === 'WandaPlatform') {
    if (nextY >= dims.height) {
       if (nextX < 45 || nextX > 55) {
         isBlocked = true;
         wallDesc = "A gate at the north end of the platform leads to Wanda's Warp House.";
       }
    } else if (nextY <= 0) {
       isBlocked = true;
       wallDesc = "The gate to the south has closed, marking the start of your warp house decision.";
    } else if (nextX <= 0 || nextX >= dims.width) {
       isBlocked = true;
       wallDesc = "The platform edges feature rainbow pillars and an overhang with solar panels.";
    }
  }

  return { 
    isBlocked, 
    wallDesc,
    nextArea: area,
    nextLevel: state.level,
    nextDoorwayStep: 0,
    msg: "",
    isRampStep: false,
    isDescending: false,
    shouldBark: false,
    barkMsg: "",
    nextX,
    nextY
  };
}
