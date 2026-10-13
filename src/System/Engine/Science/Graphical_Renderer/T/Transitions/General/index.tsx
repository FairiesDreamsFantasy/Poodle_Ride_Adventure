import { Direction } from '../../../../../../../types';
import { GameState } from '../../../../../Core/Types';
import { AREA_DIMENSIONS, SW_RECT_Y_MAX, CELLAR_LANDING_X_MIN, CELLAR_LANDING_X_MAX, CELLAR_LANDING_Y_MIN, CELLAR_LANDING_Y_MAX } from '../../../../../Core/Constants';
import { formulateAreaMetrics } from '../../../../../../AI/In-Game/Category/Arena';
import { handleRastaManorTransitions } from '../../../../../../../Arena/Manorsville/Rasta-Manor/Transitions/RastaManorTransitions';
import { handleWandaTransitions } from '../../../../../../../World/Main_Game/World/1/Levels/Level_1/Wandas_Warp_House/WandaTransitions';
import { handleMariaTransitions } from '../../../../../../../World/Main_Game/World/1/Levels/Level_7/Marias_Warp_Castle/MariaTransitions';
import { handleStoryBookCourseTransitions } from '../../../../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/StoryBookTransitions';
import { handlePinkHouseTransitions } from '../../../../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Pink_House/PinkHouseTransitions';
import { isNorthward, isSouthward, isEastward, isWestward } from '../../../../../Core/Utils/Direction';
import { MANORSVILLE_STREET_DESCRIPTION } from '../../../../../../../Arena/Manorsville/Description';

export interface TransitionResult {
  nextArea: string;
  nextX: number;
  nextY: number;
  nextLevel: 'Floor' | 'Sky' | 'Cellar';
  nextDoorwayStep: number;
  msg: string;
  isBlocked: boolean;
  shouldBark: boolean;
  barkMsg: string;
  barkCount?: number;
  barkArea?: string;
  isRampStep: boolean;
  isDescending: boolean;
  nextDirection?: Direction;
  isLevelComplete?: boolean;
}

export const handleTransitions = (
  area: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number },
  doorMin: number,
  doorMax: number,
  doorCenterX: number,
  state: GameState
): TransitionResult => {
  let nextArea = area;
  let nextX_out = nextX;
  let nextY_out = nextY;
  let nextLevel = level;
  let nextDoorwayStep = doorwayStep;
  let msg = "";
  let isBlocked = false;
  let shouldBark = false;
  let barkMsg = "";
  let isRampStep = false;
  let isDescending = false;
  let nextDirection: Direction | undefined = undefined;

  // Delegate Rasta-Manor transitions to the self-contained module
  const rastaManorResult = handleRastaManorTransitions(
    area, gridX, gridY, nextX, nextY, level, direction, doorwayStep,
    currentDims, doorMin, doorMax, doorCenterX, state
  );

  if (rastaManorResult) {
    return rastaManorResult;
  }

  // Delegate Level 1 & 7 Warp Transitions
  const wandaResult = handleWandaTransitions(area, gridX, gridY, nextX, nextY, direction, state);
  if (wandaResult) {
    return { ...rastaManorResult, ...wandaResult, msg: wandaResult.msg || "Transitioning...", nextLevel, nextDoorwayStep, isBlocked: wandaResult.isBlocked || false, shouldBark: false, barkMsg: "", isRampStep: false, isDescending: false };
  }

  const mariaResult = handleMariaTransitions(area, gridX, gridY, nextX, nextY, direction, state);
  if (mariaResult) {
    return { ...rastaManorResult, ...mariaResult, msg: mariaResult.msg || "Transitioning...", nextLevel, nextDoorwayStep, isBlocked: mariaResult.isBlocked || false, shouldBark: false, barkMsg: "", isRampStep: false, isDescending: false };
  }

  // Story Book Course Transitions
  const storyBookResult = handleStoryBookCourseTransitions(state, direction, nextX, nextY, currentDims);
  if (storyBookResult) {
    return { 
      nextArea: area, nextX: gridX, nextY: gridY,
      ...storyBookResult, 
      msg: storyBookResult.msg || "Continuing on path...", 
      nextLevel: 'Floor', 
      nextDoorwayStep: 0, 
      isBlocked: (storyBookResult as any).isBlocked || false, 
      shouldBark: false, 
      barkMsg: "", 
      isRampStep: false, 
      isDescending: false 
    } as TransitionResult;
  }

  // Pink House Transitions
  const pinkHouseResult = handlePinkHouseTransitions(state, direction, nextX, nextY, currentDims);
  if (pinkHouseResult) {
    return { 
      nextArea: area, nextX: gridX, nextY: gridY,
      ...pinkHouseResult, 
      msg: pinkHouseResult.msg || "Entering room...", 
      nextLevel: 'Floor', 
      nextDoorwayStep: 0, 
      isBlocked: (pinkHouseResult as any).isBlocked || false, 
      shouldBark: false, 
      barkMsg: "", 
      isRampStep: false, 
      isDescending: false 
    } as TransitionResult;
  }

  // --- TARDIS TRANSITIONS (Mini World) ---
  if (area === 'MiniSidewalk' && isNorthward(direction) && nextY >= currentDims.height) {
     const relX = nextX / currentDims.width;
     if (relX >= 0.4 && relX <= 0.6) { // Center-ish
        nextArea = 'MiniFrontPorch';
        nextY_out = 10;
        nextX_out = (relX - 0.4) / 0.2 * 175;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
     }
  }

  if (area === 'MiniFrontPorch' && isNorthward(direction) && nextY >= currentDims.height) {
     if (nextX >= 95 && nextX <= 105) {
        msg = "TARDIS EFFECT: The miniature porch expands instantly! You are now on the grand Front Porch.";
        nextArea = 'FrontPorch';
        nextY_out = 50; 
        nextX_out = 4000; // Center of full porch
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
     }
  }

  // Jumping back out to Mini Sidewalk
  if (area === 'FrontPorch' && isNorthward(direction) && nextY >= currentDims.height) {
      msg = "TARDIS EFFECT: The manor shrinks into the distance. You are on the sidewalk.";
      nextArea = 'Sidewalk';
      nextY_out = 10;
      nextX_out = 4000;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // --- REGULAR TRANSITIONS ---
  if (area === 'Sidewalk' && isSouthward(direction) && nextY <= 1) {
    if (nextDoorwayStep === 8) {
      msg = "You are back on the porch.";
      nextArea = 'FrontPorch';
      nextY_out = formulateAreaMetrics('FrontPorch').height - 10;
      const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
      nextX_out = Math.floor(relX * formulateAreaMetrics('FrontPorch').width);
      nextDoorwayStep = 0;
      isBlocked = false;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = 1;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    }
  }

  // Street Transition
  if (area === 'Sidewalk' && isNorthward(direction) && nextY >= currentDims.height) {
    msg = "You are now on the Streets of Manorsville. Ahead of you is the Adventure House.";
    nextArea = 'Street';
    nextY_out = 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('Street').width);
    isBlocked = false;
  } else if (area === 'Street' && direction === 'South' && nextY <= 1) {
    msg = "You are back on the sidewalk.";
    nextArea = 'Sidewalk';
    nextY_out = formulateAreaMetrics('Sidewalk').height - 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('Sidewalk').width);
    isBlocked = false;
  }

  // Widen door threshold for Street to Adventure House
  const isAtStreetNorthDoor = nextX >= doorMin - 100 && nextX <= doorMax + 100 && nextY >= currentDims.height;

  // Street to Adventure House
  if (area === 'Street' && isNorthward(direction) && isAtStreetNorthDoor) {
    msg = "You enter the Adventure House foyer.";
    nextArea = 'AdventureHouseFoyer';
    nextY_out = 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseFoyer').width);
    isBlocked = false;
  } else if (area === 'AdventureHouseFoyer' && direction === 'South' && nextY <= 1) {
    msg = "You are back on the street.";
    nextArea = 'Street';
    nextY_out = formulateAreaMetrics('Street').height - 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('Street').width);
    isBlocked = false;
  }

  // Adventure House Internal Transitions
  let isLevelComplete = false;

  if (area === 'AdventureHouseFoyer' && isNorthward(direction) && nextY >= currentDims.height) {
    msg = "You enter the long hallway.";
    nextArea = 'AdventureHouseHallway';
    nextY_out = 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseHallway').width);
    isBlocked = false;
  } else if (area === 'AdventureHouseHallway' && direction === 'South' && nextY <= 1) {
    msg = "You are back in the foyer.";
    nextArea = 'AdventureHouseFoyer';
    nextY_out = formulateAreaMetrics('AdventureHouseFoyer').height - 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseFoyer').width);
    isBlocked = false;
  }

  if (area === 'AdventureHouseHallway' && isNorthward(direction) && nextY >= currentDims.height) {
    msg = "You enter the tea room.";
    nextArea = 'AdventureHouseTeaRoom';
    nextY_out = 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseTeaRoom').width);
    isBlocked = false;
  } else if (area === 'AdventureHouseTeaRoom' && direction === 'South' && nextY <= 1) {
    msg = "You are back in the hallway.";
    nextArea = 'AdventureHouseHallway';
    nextY_out = formulateAreaMetrics('AdventureHouseHallway').height - 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseHallway').width);
    isBlocked = false;
  }

  if (area === 'AdventureHouseTeaRoom' && isNorthward(direction) && nextY >= currentDims.height) {
    msg = "You enter the narrow hallway.";
    nextArea = 'AdventureHouseNarrowHallway';
    nextY_out = 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseNarrowHallway').width);
    isBlocked = false;
  } else if (area === 'AdventureHouseNarrowHallway' && direction === 'South' && nextY <= 1) {
    msg = "You are back in the tea room.";
    nextArea = 'AdventureHouseTeaRoom';
    nextY_out = formulateAreaMetrics('AdventureHouseTeaRoom').height - 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseTeaRoom').width);
    isBlocked = false;
  }

  if (area === 'AdventureHouseNarrowHallway' && direction === 'East' && nextX >= currentDims.width) {
    msg = "You make a right turn and enter the music room.";
    nextArea = 'AdventureHouseMusicRoom';
    nextX_out = 10;
    const relY = Math.max(0, Math.min(1, nextY / currentDims.height));
    nextY_out = Math.floor(relY * formulateAreaMetrics('AdventureHouseMusicRoom').height);
    isBlocked = false;
  } else if (area === 'AdventureHouseMusicRoom' && direction === 'West' && nextX <= 1) {
    msg = "You are back in the narrow hallway.";
    nextArea = 'AdventureHouseNarrowHallway';
    nextX_out = formulateAreaMetrics('AdventureHouseNarrowHallway').width - 10;
    const relY = Math.max(0, Math.min(1, nextY / currentDims.height));
    nextY_out = Math.floor(relY * formulateAreaMetrics('AdventureHouseNarrowHallway').height);
    isBlocked = false;
  }

  if (area === 'AdventureHouseMusicRoom' && direction === 'North' && nextY >= currentDims.height) {
    msg = "You make a left turn to enter the door, and ride Abigay through a bridge hallway.";
    nextArea = 'AdventureHouseBridgeHallway';
    nextY_out = 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseBridgeHallway').width);
    isBlocked = false;
  } else if (area === 'AdventureHouseBridgeHallway' && direction === 'South' && nextY <= 1) {
    msg = "You are back in the music room.";
    nextArea = 'AdventureHouseMusicRoom';
    nextY_out = formulateAreaMetrics('AdventureHouseMusicRoom').height - 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseMusicRoom').width);
    isBlocked = false;
  }

  if (area === 'AdventureHouseBridgeHallway' && direction === 'North' && nextY >= currentDims.height) {
    msg = "You enter the trench hallway.";
    nextArea = 'AdventureHouseTrenchHallway';
    nextY_out = 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseTrenchHallway').width);
    isBlocked = false;
  } else if (area === 'AdventureHouseTrenchHallway' && direction === 'South' && nextY <= 1) {
    msg = "You are back in the bridge hallway.";
    nextArea = 'AdventureHouseBridgeHallway';
    nextY_out = formulateAreaMetrics('AdventureHouseBridgeHallway').height - 10;
    const relX = Math.max(0, Math.min(1, nextX / currentDims.width));
    nextX_out = Math.floor(relX * formulateAreaMetrics('AdventureHouseBridgeHallway').width);
    isBlocked = false;
  }

  if (area === 'AdventureHouseTrenchHallway' && direction === 'North' && nextY >= currentDims.height) {
    msg = "You go through the backdoor into the beautiful Adventure Garden.";
    nextArea = 'Adventure_Garden';
    nextY_out = 10;
    nextX_out = 500;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // Adventure Garden Transitions
  if (area === 'Adventure_Garden' && direction === 'South' && nextY <= 1) {
    msg = "You return to the trench hallway of the Adventure House.";
    nextArea = 'AdventureHouseTrenchHallway';
    nextX_out = 35;
    nextY_out = currentDims.height - 10;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  if (area === 'Adventure_Garden' && direction === 'North' && nextY >= currentDims.height - 20) {
    msg = "You cross the 20-foot bridge over the dirt road with horses and cowboys passing below, and enter through the South door of the Selector House. The south door locks behind you.";
    nextArea = 'SelectorHouse';
    nextX_out = 1000;
    nextY_out = 20;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // Selector House Transitions
  if (area === 'SelectorHouse' || area === 'Selector_House') {
    if (direction === 'South' && nextY <= 10) {
      msg = "The south door locks after entering this house. You cannot return to the Adventure Garden.";
      isBlocked = true;
      return { nextArea, nextX, nextY, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    }
    // East Gate to Arena
    if (direction === 'East' && nextX >= currentDims.width - 20 && nextY >= 980 && nextY <= 1020) {
      msg = "You step through the East Gate into the Do You Remember This arena!";
      nextArea = 'Do_You_Remember_This';
      nextX_out = 10;
      nextY_out = 200;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    }
    // North Gate to Staging Tunnel
    if (direction === 'North' && nextY >= currentDims.height - 20 && nextX >= 980 && nextX <= 1020) {
      msg = "The North Gate slides open to reveal the staging tunnel. Ahead lies a path to Level 1!";
      nextArea = 'PortalTunnel';
      nextX_out = 5;
      nextY_out = 10;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    }
    // West Gate 1 to Rasta-Manor
    if (direction === 'West' && nextX <= 20 && nextY >= 1480 && nextY <= 1520) {
      msg = "You are back to the Rasta-Manor. A gentle fall onto a center rug at 1000 feet by 1000 feet.";
      nextArea = 'RuggedPlayField';
      nextX_out = 1000;
      nextY_out = 1000;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending, nextDirection: 'North' };
    }
    // West Gate 2 to AI-Generated Level
    if (direction === 'West' && nextX <= 20 && nextY >= 480 && nextY <= 520) {
      const hasAIKey = !!(localStorage.getItem('GEMINI_API_KEY') || (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY);
      if (hasAIKey) {
        msg = "West Gate 2 unlocks and slides open. You enter the AI-Generated level!";
        nextArea = 'AIGeneratedLevel';
        nextX_out = 1000;
        nextY_out = 20;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      } else {
        msg = "West Gate 2 is locked. An AI key is required to unlock this gateway. Use the Insert AI option in the Toolbox menu.";
        isBlocked = true;
        return { nextArea, nextX, nextY, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
    }
  }

  // AI-Generated Level Return
  if (area === 'AIGeneratedLevel' && direction === 'South' && nextY <= 10) {
    msg = "You exit the AI-Generated level and return to Selector House.";
    nextArea = 'SelectorHouse';
    nextX_out = 20;
    nextY_out = 500;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // Arena Return
  if (area === 'Do_You_Remember_This' && direction === 'West' && nextX <= 10) {
    msg = "You exit the arena course and return to Selector House.";
    nextArea = 'SelectorHouse';
    nextX_out = 1980;
    nextY_out = 1000;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // Portal Tunnel to Wanda Platform
  if (area === 'PortalTunnel' && direction === 'North' && nextY >= 195) {
    msg = "TARSIS EFFECT: You ascend the 30-degree ramp and are teleported to the platform above!";
    nextArea = 'WandaPlatform';
    nextY_out = 10;
    nextX_out = 50; // Center of WandaPlatform
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep: 0, msg, isBlocked, shouldBark: false, barkMsg: "", isRampStep: false, isDescending: false };
  }

  if (area === 'PortalTunnel' && direction === 'South' && nextY <= 1) {
    msg = "The portal closure prevents you from returning to the Adventure House.";
    isBlocked = true;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // Side Path Transitions to Wanda Platform
  if ((area === 'WestManorPath' || area === 'EastManorPath') && isNorthward(direction) && nextY >= currentDims.height) {
    msg = "You reach the end of the path and ascend the Tarsis incline onto a square platform. Behind you, the gate at the south end of the platform automatically closes and locks.";
    nextArea = 'WandaPlatform';
    nextY_out = 10;
    nextX_out = 50; // Centered on 100x100
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep: 0, msg, isBlocked, shouldBark: false, barkMsg: "", isRampStep: false, isDescending: false };
  }

  // Allison's Manor Transitions (Soca Path to Porch via 10-cycle ramp)
  const isAtAllisonsRamp = nextY >= currentDims.height;
  if (area === 'Soca_Path' && direction === 'North' && isAtAllisonsRamp) {
    if (nextDoorwayStep === 10) {
      msg = "You reach the top of the ramp and pass through the open gate onto the hexagonal brick path. As you reach the manor, the ornate gate—red with yellow flowers, green vines, and brown twigs, built with brass and steel—automatically closes behind you.";
      nextArea = 'AllisonsPorch';
      nextY_out = 10;
      const relX = nextX / currentDims.width;
      nextX_out = Math.floor(relX * formulateAreaMetrics('AllisonsPorch').width);
      nextDoorwayStep = 0;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    } else {
      shouldBark = false;
      barkMsg = "";
      const barkCount = 0;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height;
      nextX_out = nextX;
      isBlocked = false;
      isRampStep = true;
      isDescending = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending };
    }
  } else if (area === 'AllisonsPorch' && direction === 'South' && nextY <= 1) {
    msg = "The ornate gate—red with yellow flowers, green vines, and brown twigs, built with brass and steel—is closed and locked. You cannot return to the Soca Path.";
    isBlocked = true;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // Porch to Foyer (9-bark transition)
  const isAtPorchCenterRamp = nextX >= 490 && nextX <= 510 && nextY >= currentDims.height;
  if (area === 'AllisonsPorch' && direction === 'North' && isAtPorchCenterRamp) {
    if (nextDoorwayStep === 9) {
      msg = "You enter the grand foyer of Allison's Manor.";
      nextArea = 'AllisonsFoyer';
      nextY_out = 10;
      const relX = nextX / currentDims.width;
      nextX_out = Math.floor(relX * formulateAreaMetrics('AllisonsFoyer').width);
      nextDoorwayStep = 0;
      isBlocked = false;
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      const barkCount = 1;
      nextDoorwayStep = nextDoorwayStep + 1;
      nextY_out = currentDims.height;
      nextX_out = nextX;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending };
    }
  } else if (area === 'AllisonsFoyer' && direction === 'South' && nextY <= 1 && nextX >= 490 && nextX <= 510) {
    if (nextDoorwayStep === 1) {
      msg = "You step back onto the porch.";
      nextArea = 'AllisonsPorch';
      nextY_out = formulateAreaMetrics('AllisonsPorch').height - 10;
      const relX = nextX / currentDims.width;
      nextX_out = Math.floor(relX * formulateAreaMetrics('AllisonsPorch').width);
      nextDoorwayStep = 0;
      isBlocked = false;
    } else if (nextDoorwayStep >= 2) {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      const barkCount = 1;
      nextDoorwayStep = nextDoorwayStep - 1;
      nextY_out = 1;
      nextX_out = nextX;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending };
    } else {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
      const barkCount = 1;
      nextDoorwayStep = 9;
      nextY_out = 1;
      nextX_out = nextX;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending };
    }
  }

  // --- Allison's Manor Restaurant Transitions ---
  if (area === 'AllisonsFoyer' && direction === 'North' && nextY >= 500 && nextX >= 240 && nextX <= 260) {
    msg = "You enter Allison's Communal Dining & Restaurant.";
    nextArea = 'AllisonsRestaurant';
    nextY_out = 10;
    nextX_out = 250;
    isBlocked = false;
  } else if (area === 'AllisonsRestaurant' && direction === 'South' && nextY <= 1) {
    msg = "You exit the dining facility back into the Allison's Manor Foyer.";
    nextArea = 'AllisonsFoyer';
    nextY_out = 490;
    nextX_out = 250;
    isBlocked = false;
  } else if (area === 'AllisonsRestaurant' && direction === 'North' && nextY >= 199) {
    if (nextX >= 230 && nextX <= 250) {
      msg = "You step out into the outdoor cooking area's rear porch.";
      nextArea = 'AllisonsRestaurantOutdoor';
      nextY_out = 10;
      nextX_out = 100;
      isBlocked = false;
    } else if (nextX >= 480 && nextX <= 500) {
      msg = "You exit the kitchen to the outdoor cooking area.";
      nextArea = 'AllisonsRestaurantOutdoor';
      nextY_out = 10;
      nextX_out = 400;
      isBlocked = false;
    }
  } else if (area === 'AllisonsRestaurantOutdoor' && direction === 'South' && nextY <= 1) {
    msg = "You return to the kitchen of the communal dining facility.";
    nextArea = 'AllisonsRestaurant';
    nextY_out = 190;
    nextX_out = nextX <= 250 ? 240 : 490;
    isBlocked = false;
  } else if (area === 'AllisonsFoyer' && direction === 'West' && nextX <= 1 && nextY >= 230 && nextY <= 250) {
    msg = "You enter the Mountains Specific Warp Room.";
    nextArea = 'AllisonsMountainsWarpRoom';
    nextY_out = 240;
    nextX_out = 190;
    isBlocked = false;
  } else if (area === 'AllisonsMountainsWarpRoom' && direction === 'East' && nextX >= 199) {
    if (nextY >= 230 && nextY <= 250) {
      msg = "You exit the warp room back into the Foyer.";
      nextArea = 'AllisonsFoyer';
      nextY_out = 240;
      nextX_out = 10;
      isBlocked = false;
    }
  } else if (area === 'AllisonsFoyer' && direction === 'North' && nextY >= 500 && nextX >= 115 && nextX <= 135) {
    msg = "You enter Allison's Store. The air is warm and filled with the smell of new clothes and fresh products.";
    nextArea = 'AllisonsStore';
    nextX_out = 200;
    nextY_out = 10;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } else if (area === 'AllisonsStore' && direction === 'South' && nextY <= 1) {
    msg = "You exit the store back into the Manor Foyer.";
    nextArea = 'AllisonsFoyer';
    nextX_out = 125;
    nextY_out = 490;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } else if (area === 'AllisonsMountainsWarpRoom' && direction === 'North' && nextY >= 475 && nextX >= 4 && nextX <= 20) {
    msg = "You ride through the rock-framed picture of the Mountain Pass. A freezing wind blows past as you pass through the wall!";
    nextX_out = 100;
    nextY_out = 100;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // --- Allison's Manor Teleportation ---
  const isNWCorner = nextX >= 1 && nextX <= 30 && nextY >= 320 && nextY <= 500;

  if (isNWCorner) {
    if (area === 'AllisonsFoyer') {
      if (nextX >= 15 && nextX <= 30 && nextY >= 325 && nextY <= 340) {
        msg = "TARSIS EFFECT: The space twists as you are teleported to the second floor!";
        nextArea = 'Allisons2ndFloor';
        nextX_out = 20;
        nextY_out = 335;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
      if (nextX >= 15 && nextX <= 30 && nextY >= 470 && nextY <= 485 && direction === 'South') {
        msg = "TARSIS EFFECT: A warp zone sends you back to the center of the foyer.";
        nextX_out = 250;
        nextY_out = 100;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
    }

    if (area === 'Allisons2ndFloor') {
      if (nextX >= 15 && nextX <= 30 && nextY >= 470 && nextY <= 485) {
        msg = "TARSIS EFFECT: You are teleported to the third floor!";
        nextArea = 'Allisons3rdFloor';
        nextX_out = 20;
        nextY_out = 475;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
      if (nextX >= 15 && nextX <= 30 && nextY >= 325 && nextY <= 340) {
        msg = "TARSIS EFFECT: You are teleported back down to the first floor foyer.";
        nextArea = 'AllisonsFoyer';
        nextX_out = 20;
        nextY_out = 335;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
    }

    if (area === 'Allisons3rdFloor') {
      if (nextX >= 15 && nextX <= 30 && nextY >= 325 && nextY <= 340) {
        msg = "TARSIS EFFECT: You emerge onto the rooftop garden via teleportation!";
        nextArea = 'AllisonsRooftop';
        nextX_out = 20;
        nextY_out = 335;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
      if (nextX >= 15 && nextX <= 30 && nextY >= 470 && nextY <= 485) {
        msg = "TARSIS EFFECT: You return to the second floor via teleportation.";
        nextArea = 'Allisons2ndFloor';
        nextX_out = 20;
        nextY_out = 475;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
    }

    if (area === 'AllisonsRooftop') {
      if (nextX >= 15 && nextX <= 30 && nextY >= 470 && nextY <= 485) {
        msg = "TARSIS EFFECT: You return to the third floor landing.";
        nextArea = 'Allisons3rdFloor';
        nextX_out = 20;
        nextY_out = 475;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
      }
    }
  } else if (area === 'PablotsFarm') {
    const scale = currentDims.width / 2087;
    if (nextX >= 2040 * scale && nextY >= 950 * scale && nextY <= 1050 * scale) {
      msg = "You enter the red barn and feel the familiar magic taking you back towards the manor.";
      nextArea = 'WesternTarsisEffect';
      nextX_out = 10; 
      nextY_out = 10;
      isBlocked = false;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    }
    if (nextX >= 0 && nextX <= 250 * scale && nextY >= 1900 * scale && nextY <= 2087 * scale) {
      const hasWand = state.inventory.items.some(item => item.id === 'magic-wand');
      if (hasWand) {
        msg = "With the magic wand in hand, the yellow barn door swings open. 20,000 feet of adventure await!";
        nextArea = 'PablotsPonyField';
        nextX_out = 19995; 
        nextY_out = 10;
        isBlocked = false;
        return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending, nextDirection: 'West' };
      } else {
        msg = "The yellow barn door is sealed shut with a magical force. You feel like you need a magic wand to open it.";
        isBlocked = true;
      }
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    }
  }
  
  // --- Garden Specific Warp Room Transitions ---
  if (area === 'AllisonsFoyer' && direction === 'North' && nextY >= 600 && nextX >= 765 && nextX <= 785) {
    msg = "You enter the Garden Specific Warp Room. The air is filled with the scent of white roses.";
    nextArea = 'GardenSpecificWarpRoom';
    nextX_out = 25;
    nextY_out = 10;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } else if (area === 'GardenSpecificWarpRoom' && direction === 'South' && nextY <= 1) {
    msg = "You exit the Garden Specific Warp Room and return to the foyer.";
    nextArea = 'AllisonsFoyer';
    nextX_out = 775;
    nextY_out = 590;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // --- Southeast Coast Warp Room Transitions ---
  if (area === 'AllisonsFoyer' && direction === 'South' && nextY <= 100 && nextX >= 765 && nextX <= 785) {
    msg = "You enter the Southeast Coast Warp Room. The air smells of sea salt and palm trees.";
    nextArea = 'SoutheastCoastWarpRoom';
    nextX_out = 25;
    nextY_out = 95; 
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } else if (area === 'SoutheastCoastWarpRoom' && direction === 'North' && nextY >= 100) {
    msg = "You exit the Southeast Coast Warp Room and return to the foyer.";
    nextArea = 'AllisonsFoyer';
    nextX_out = 775;
    nextY_out = 110;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // --- Western Warp Room Transitions ---
  if (area === 'AllisonsFoyer' && direction === 'South' && nextY <= 180 && nextX >= 2 && nextX <= 14) {
    msg = "You enter the Western Warp Room. The air smells of polished wood and farm life.";
    nextArea = 'WesternWarpRoom';
    nextX_out = 8;
    nextY_out = 175; 
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } 

  // --- Futuristic Frenzy Transitions ---
  if (area === 'AllisonsFoyer' && direction === 'East' && nextX >= 800 && nextY >= 465 && nextY <= 485) {
    msg = "The sliding riveted steel doors pull apart, revealing a neon-lit futuristic city. You have entered Futuristic Frenzy.";
    nextArea = 'FuturisticFrenzy';
    nextX_out = 5;
    nextY_out = 115;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } else if (area === 'FuturisticFrenzy' && direction === 'West' && nextX <= 1 && nextY >= 105 && nextY <= 125) {
    msg = "You exit Futuristic Frenzy and return to the manor foyer.";
    nextArea = 'AllisonsFoyer';
    nextX_out = 795; 
    nextY_out = 475;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // --- Babylon Is Finally Fallen Transitions ---
  if (area === 'AllisonsFoyer' && direction === 'East' && nextX >= 800 && nextY >= 215 && nextY <= 235) {
    msg = "The sliding doors, depicting a beautiful African sunset, open to reveal a room celebrating African heritage and future tech. You enter 'Babylon' Is Finally Fallen.";
    nextArea = 'BabylonIsFinallyFallen';
    nextX_out = 5; 
    nextY_out = 110;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } else if (area === 'BabylonIsFinallyFallen' && direction === 'West' && nextX <= 1 && nextY >= 105 && nextY <= 115) {
    msg = "You exit the room and return to the foyer.";
    nextArea = 'AllisonsFoyer';
    nextX_out = 795;
    nextY_out = 225;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  if (area === 'WesternWarpRoom' && direction === 'East' && nextX >= currentDims.width && nextY >= 0 && nextY <= 15) {
    msg = "The colors of the picture engulf you. You find yourself on a wide brick path leading towards a distant farm.";
    nextArea = 'WesternTarsisEffect';
    nextX_out = 1090;
    nextY_out = 10;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending, nextDirection: 'West' };
  } else if (area === 'WesternTarsisEffect' && direction === 'West' && nextX <= 0) {
    msg = "You ride through the open gate and into the red barn. The barn door closes behind you as you arrive at Pablo's Farm.";
    nextArea = 'PablotsFarm';
    nextX_out = 1950;
    nextY_out = 1000;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending, nextDirection: 'West' };
  } else if (area === 'WesternWarpRoom' && direction === 'North' && nextY >= currentDims.height) {
    msg = "You exit the Western Warp Room and are back in the Allison's Manor Foyer.";
    nextArea = 'AllisonsFoyer';
    nextX_out = 8;
    nextY_out = 190; 
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // --- 2nd Floor Rooms & Hallways ---
  if (area === 'Allisons2ndFloor') {
    if (nextX >= 30 && nextX <= 685 && nextY >= 520 && nextY <= 645) {
      msg = "You are in the Gaming Room. A large screen sits at the north end. There are toys, books, and a freezer here.";
    }
    if (nextX >= 685 && nextX <= 900 && nextY >= 505 && nextY <= 520) {
      msg = "You enter the Arts and Crafts room. Materials for creation are everywhere.";
    }
    if (nextX >= 700 && nextX <= 1000 && nextY >= 1 && nextY <= 300) {
      msg = "You are in the Tea Room. A white tablecloth with colored circles covers the center table. The walls show a beautiful night sky.";
    }
  }

  // 2nd Floor West Door to Elevated Path
  if (area === 'Allisons2ndFloor' && direction === 'West' && nextX <= 10) {
    if (state.isLeverDown) {
      msg = "You pass through the open door onto the elevated path.";
      nextArea = 'ElevatedPath';
      nextX_out = 7;
      nextY_out = 10;
      isBlocked = false;
    } else {
      msg = "The door to the elevated path is closed. You need to pull the lever on the 3rd floor.";
      isBlocked = true;
    }
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  } else if (area === 'ElevatedPath' && direction === 'East' && nextY <= 20) {
    msg = "You return to the manor's second floor.";
    nextArea = 'Allisons2ndFloor';
    nextX_out = 20;
    nextY_out = gridY;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  // Elevated Path to Barn
  if (area === 'ElevatedPath' && direction === 'North' && nextY >= currentDims.height) {
    const hasKey = state.inventory.items.some(i => i.id === 'barn_house_key');
    if (hasKey) {
      msg = "You use the Barn House Key and enter the barn. The large doors swing open with a creak.";
      nextArea = 'Barn';
      nextX_out = 1000;
      nextY_out = 10;
      isBlocked = false;
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly (Barn Entry)";
      const barkCount = 1;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, barkCount, isRampStep, isDescending };
    } else {
      msg = "The barn door is locked. You need the Barn House Key.";
      isBlocked = true;
      return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
    }
  }

  // Barn to Barn 2nd Floor
  if (area === 'Barn' && direction === 'North' && nextY >= currentDims.height) {
    msg = "You ascend to the second level of the barn. The floor is beautiful ceramic.";
    nextArea = 'Barn2ndFloor';
    nextY_out = 10;
    isBlocked = false;
    return { nextArea, nextX: nextX_out, nextY: nextY_out, nextLevel, nextDoorwayStep, msg, isBlocked, shouldBark, barkMsg, isRampStep, isDescending };
  }

  if (nextDoorwayStep > 0 && nextDoorwayStep === doorwayStep) {
    nextDoorwayStep = 0;
  }

  return {
    nextArea,
    nextX: nextX_out,
    nextY: nextY_out,
    nextLevel,
    nextDoorwayStep,
    msg,
    isBlocked,
    shouldBark,
    barkMsg,
    barkCount: 0,
    isRampStep,
    isDescending,
    nextDirection,
    isLevelComplete
  };
};
