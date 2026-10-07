import { Direction } from '../../../../types';
import { GameState } from '../Types';
import { formulateAreaMetrics } from '../../../AI/In-Game/Category/Arena';
import { GRID_SIZE, RAMP_X_MAX, RAMP_Y_MAX, RAMP_Y_MIN, SW_RECT_X_MAX, SW_RECT_Y_MAX, CELLAR_RAMP_X_MIN, CELLAR_RAMP_X_MAX, CELLAR_RAMP_Y_MIN, CELLAR_RAMP_Y_MAX, CELLAR_LANDING_X_MIN, CELLAR_LANDING_X_MAX, CELLAR_LANDING_Y_MIN, CELLAR_LANDING_Y_MAX } from '../Constants';
import { WALL_CLEARANCE_FEET, DOOR_CLEARANCE_FEET, POODLE_WIDTH_FEET } from '../Constants/Movement';
import { FOYER_DESCRIPTIONS } from '../../../../Description_List/F/Foyer';
import { FOYER_OBSTACLES, GARDEN_OBSTACLES } from '../O/Obstacles';
import { handleFoyerCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Foyer/Logic_and_Algorithms/Logic/FoyerCollision';
import { handleCellarCollision } from '../../../../Arena/Manorsville/Rasta-Manor/Cellar/B1/Logic_and_Algorithms/Logic/CellarCollision';
import { handleCellarRampCollision } from './Areas/C/CellarRampCollision';
import { handleGardenCollision } from '../../Science/Physics/General';
import { handleRuggedPlayFieldCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Rugged_Play_Field/Logic_and_Algorithms/Logic/RuggedPlayFieldCollision';
import { handleMeditationHallCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Meditation_Hall/Logic_and_Algorithms/Logic/MeditationHallCollision';
import { handleAnimalRideMeditationRoomCollision } from './Areas/M/AnimalRideMeditationRoomCollision';
import { handleKitchenCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Kitchen/Logic_and_Algorithms/Logic/KitchenCollision';
import { handleDishWasherCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Dish_Washer_Area_4_1st_Floor_Kitchen/Logic_and_Algorithms/Logic/DishWasherCollision';
import { handleTheGrandPlaygroundCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/The_Grand_Playground/Logic_and_Algorithms/Logic/TheGrandPlaygroundCollision';
import { handleSimulatedGardenAreaCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Simulated_Garden_Area/Logic_and_Algorithms/Logic/SimulatedGardenAreaCollision';
import { handleGymCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/The_Grand_Gym/Logic_and_Algorithms/Logic/GymCollision';
import { handleDressageCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Narrow_Dressage_Gym/Logic_and_Algorithms/Logic/DressageCollision';
import { handleLibraryCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Meditation_Halls_Library/Logic_and_Algorithms/Logic/LibraryCollision';
import { handleGrandDiningRoomCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Grand_Dining_Room/Logic_and_Algorithms/Logic/GrandDiningRoomCollision';
import { handleLobbyCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Lobby_Stairway_and_Ramps_Level/Logic_and_Algorithms/Logic/LobbyCollision';
import { handleWestGrandArcadeCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/West_Grand_Arcade/Logic_and_Algorithms/Logic/WestGrandArcadeCollision';
import { handleEastGrandArcadeCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/East_Grand_Arcade/Logic_and_Algorithms/Logic/EastGrandArcadeCollision';
import { handleGrandBallroomCollision } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Grand_Ballroom/Logic_and_Algorithms/Logic/GrandBallroomCollision';
import { handleLivingQuartersCollision } from '../../../../Arena/Manorsville/Rasta-Manor/Employees_Living_Quarters/LivingQuartersCollision';
import { handleCommunalSpaceCollision } from '../../Science/Physics/General';
import { handleCommunalStoreCollision } from '../../../../Arena/Manorsville/Rasta-Manor/Communal_Store/CommunalStoreCollision';
import { handlePorchCollision } from '../../Science/Physics/General';
import { handleAdventureHouseCollision } from './Areas/A/AdventureHouseCollision';
import { handleAdventurePathCollision } from './Areas/A/AdventurePathCollision';
import { checkSocaPathCollision } from './Areas/S/SocaPathCollision';
import { handleManorCollision } from './Areas/M/ManorCollision';
import { handleWesternWarpRoomCollision } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/WesternWarpRoomCollision';
import { handleGardenWarpRoomCollision } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Garden_Specific_Warp_Room/GardenWarpRoomCollision';
import { handleSoutheastCoastWarpRoomCollision } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Southeast_Coast_Warp_Room/SoutheastCoastWarpRoomCollision';
import { handleFuturisticFrenzyCollision } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Futuristic_Frenzy/FuturisticFrenzyCollision';
import { handleBabylonFallenCollision } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Babylon_Is_Finally_Fallen/BabylonFallenCollision';
import { handleWesternWarpCourseCollision } from './Areas/W/WesternWarpCourseCollision';
import { handleBarnCollision } from './Areas/B/BarnCollision';
import { handleExteriorCollision } from './Areas/E/ExteriorCollision';
import { handlePinkHouseCollision } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Pink_House/PinkHouseCollision';
import { handleMezzanineCollision } from '../../../../Arena/Manorsville/Rasta-Manor/Mezzanine_For_1st_Floor/Southwest_Stairway_And_Ramps_Mezzanine/MezzanineCollision';
import { handleLevel0ExternalCollision } from '../../../../World/Main_Game/World/0/Levels/Level_0/Collision/Collision_Logic';
import { handleWandaCollision } from '../../../../World/Main_Game/World/1/Levels/Level_1/Wandas_Warp_House/WandaCollision';
import { handleMariaCollision } from '../../../../World/Main_Game/World/1/Levels/Level_7/Marias_Warp_Castle/MariaCollision';
import { handleTransitions } from '../../Science/Graphical_Renderer/T';

export interface CollisionResult {
  isBlocked: boolean;
  wallDesc: string;
  nextArea: string;
  nextLevel: 'Floor' | 'Sky' | 'Cellar' | 'Mezzanine';
  nextDoorwayStep: number;
  msg: string;
  isRampStep: boolean;
  isDescending: boolean;
  shouldBark: boolean;
  barkMsg: string;
  barkCount?: number;
  barkArea?: string;
  nextX: number;
  nextY: number;
  nextDirection?: Direction;
  isLevelComplete?: boolean;
}

export const checkCollision = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar' | 'Mezzanine',
  area: string,
  direction: Direction,
  doorwayStep: number,
  state: GameState
): CollisionResult => {
  let isBlocked = false;
  let wallDesc = "";
  let nextArea = area;
  let nextLevel = level;
  let nextDoorwayStep = doorwayStep;
  let msg = "";
  let isRampStep = false;
  let isDescending = false;
  let shouldBark = false;
  let barkMsg = "";
  let barkCount = 0;
  let barkArea: string | undefined = undefined;
  let nextDirection: Direction | undefined = undefined;

  const currentAreaMetrics = formulateAreaMetrics(area);
  const currentDims = { width: currentAreaMetrics.width, height: currentAreaMetrics.height };

  // Scaled values based on currentDims
  const baseDoorWidth = (currentDims.width >= 8000) ? 10 : 50; 
  // Apply door clearance for accuracy (horizontal gap from the frame)
  const accuracyClearance = (currentDims.width >= 8000) ? DOOR_CLEARANCE_FEET : 0;
  let doorWidth = baseDoorWidth - accuracyClearance;
  
  // Specific override for Rasta-Manor Foyer and connected porch areas
  if (area === 'Foyer' || area === 'FrontPorch' || area === 'BackPorch') {
    doorWidth = 10; // 20 feet wide (990-1010 centered)
  }
  
  const doorMin = Math.floor(currentDims.width / 2) - doorWidth;
  const doorMax = Math.floor(currentDims.width / 2) + doorWidth;
  const centerMin = Math.floor(currentDims.width * 0.045);
  const centerMax = Math.floor(currentDims.width * 0.955);

  // Center X for doors
  const doorCenterX = Math.floor(currentDims.width / 2);

  // Skip obstacle checks if we are in a doorway transition
  const isTransitioning = nextDoorwayStep > 0;

  let isLevelComplete = false;

  // North/South/East/West External Boundaries and specific logic for Level 0
  const externalCollision = handleLevel0ExternalCollision(gridX, gridY, nextX, nextY, direction, area, currentDims);
  if (externalCollision.isBlocked) {
    isBlocked = true;
    wallDesc = externalCollision.wallDesc;
  }

  // Level 1: Wanda's Warp House Collisions
  const wandaCollision = handleWandaCollision(area, gridX, gridY, nextX, nextY, direction, state);
  if (wandaCollision.isBlocked) {
    isBlocked = true;
    wallDesc = wandaCollision.wallDesc;
  }

  // Level 7: Maria's Warp Castle Collisions
  const mariaCollision = handleMariaCollision(area, gridX, gridY, nextX, nextY, direction, state);
  if (mariaCollision.isBlocked) {
    isBlocked = true;
    wallDesc = mariaCollision.wallDesc;
  }

  // Handle Transitions
  const transitionResult = handleTransitions(
    area, gridX, gridY, nextX, nextY, level as any, direction, doorwayStep,
    currentDims, doorMin, doorMax, doorCenterX, state
  );

  nextArea = transitionResult.nextArea;
  nextX = transitionResult.nextX;
  nextY = transitionResult.nextY;
  nextLevel = transitionResult.nextLevel;
  nextDoorwayStep = transitionResult.nextDoorwayStep;
  msg = transitionResult.msg || msg;
  isBlocked = transitionResult.isBlocked;
  shouldBark = transitionResult.shouldBark;
  barkMsg = transitionResult.barkMsg;
  barkCount = transitionResult.barkCount || barkCount;
  barkArea = transitionResult.barkArea;
  isRampStep = transitionResult.isRampStep;
  isDescending = transitionResult.isDescending;
  nextDirection = transitionResult.nextDirection;
  isLevelComplete = transitionResult.isLevelComplete || false;

  // Elegant Bark Sequence Logic (Additional checks)
  if (!isBlocked && nextArea === area && Math.abs(nextY - gridY) > 0.01) {
    const roundedY = Math.round(nextY);
    if (nextArea === 'AdventureHouseFoyer' || nextArea === 'AdventureHouseHallway') {
      if (roundedY <= 20 || roundedY >= currentDims.height - 7) {
        shouldBark = true;
        barkMsg = "The Poodle Barks Elegantly";
      }
    } else if (nextArea === 'AdventureHouseTeaRoom') {
      if (roundedY === 31 || roundedY >= currentDims.height - 15) {
        shouldBark = true;
        barkMsg = "The Poodle Barks Elegantly";
      }
    } else if (nextArea === 'AdventureHouseNarrowHallway' || nextArea === 'AdventureHouseMusicRoom' || nextArea === 'AdventureHouseBridgeHallway') {
      shouldBark = true;
      barkMsg = "The Poodle Barks Elegantly";
    }
  }

  // Obstacles and Walls
  if (nextDoorwayStep === 0 && !isTransitioning) {
    if (area === 'Foyer' && nextArea === 'Foyer') {
      const foyerResult = handleFoyerCollision(gridX, gridY, nextX, nextY, level as any, direction, currentDims, state);
      isBlocked = foyerResult.isBlocked;
      wallDesc = foyerResult.wallDesc;
      nextLevel = foyerResult.nextLevel;
      isRampStep = foyerResult.isRampStep;
      isDescending = foyerResult.isDescending;
      msg = foyerResult.msg || msg;
    } else if (area === 'Garden' && nextArea === 'Garden') {
      const gardenResult = handleGardenCollision(nextX, nextY, currentDims, doorMin, doorMax);
      isBlocked = gardenResult.isBlocked;
      wallDesc = gardenResult.wallDesc;
    } else if (area === 'CellarRamp' && nextArea === 'CellarRamp') {
      const rampResult = handleCellarRampCollision(nextX, nextY, direction, currentDims);
      isBlocked = rampResult.isBlocked;
      wallDesc = rampResult.wallDesc;
      isRampStep = rampResult.isRampStep;
      isDescending = rampResult.isDescending;
    } else if (area === 'Cellar' && nextArea === 'Cellar') {
      const cellarResult = handleCellarCollision(gridX, gridY, nextX, nextY, currentDims);
      isBlocked = cellarResult.isBlocked;
      wallDesc = cellarResult.wallDesc;
      msg = cellarResult.msg || msg;
    } else if (area === 'RuggedPlayField' && nextArea === 'RuggedPlayField') {
      const ruggedResult = handleRuggedPlayFieldCollision(gridX, gridY, nextX, nextY, state.ridingAnimal || "Abigay");
      isBlocked = ruggedResult.isBlocked;
      wallDesc = ruggedResult.wallDesc;
      msg = ruggedResult.msg || msg;
      if (ruggedResult.nextArea) {
        nextArea = ruggedResult.nextArea;
        nextX = ruggedResult.nextX_out ?? nextX;
        nextY = ruggedResult.nextY_out ?? nextY;
        nextDirection = ruggedResult.nextDirection ?? nextDirection;
      }
    } else if (area === 'MeditationHall' && nextArea === 'MeditationHall') {
      const medResult = handleMeditationHallCollision(
        nextX, nextY, level as any, state.hasAnnouncedMeditationRampLanding, state.hasAnnouncedMeditationSkyLanding, state.isSimulatedGardenDoorOpen
      );
      isBlocked = medResult.isBlocked;
      wallDesc = medResult.wallDesc;
      msg = medResult.msg || msg;
      const setAnnouncedLanding = medResult.setAnnouncedLanding;
      const setAnnouncedSkyLanding = medResult.setAnnouncedSkyLanding;
      if (medResult.nextArea) {
        nextArea = medResult.nextArea;
        nextX = medResult.nextX_out ?? nextX;
        nextY = medResult.nextY_out ?? nextY;
        nextDirection = medResult.nextDirection ?? nextDirection;
      }
      return {
        isBlocked,
        wallDesc,
        nextArea,
        nextLevel,
        nextDoorwayStep,
        msg,
        isRampStep,
        isDescending,
        shouldBark,
        barkMsg,
        barkCount,
        nextX,
        nextY,
        nextDirection,
        isLevelComplete: false
      };
    } else if (area === 'AnimalRideMeditationRoom' && nextArea === 'AnimalRideMeditationRoom') {
      const arResult = handleAnimalRideMeditationRoomCollision(nextX, nextY, currentDims);
      isBlocked = arResult.isBlocked;
      wallDesc = arResult.wallDesc;
    } else if (area === 'Kitchen' && nextArea === 'Kitchen') {
      const kitchenResult = handleKitchenCollision(nextX, nextY);
      isBlocked = kitchenResult.isBlocked;
      wallDesc = kitchenResult.wallDesc;
    } else if (area === 'DishWasherArea' && nextArea === 'DishWasherArea') {
      const dishResult = handleDishWasherCollision(nextX, nextY);
      isBlocked = dishResult.isBlocked;
      wallDesc = dishResult.wallDesc;
    } else if (area === 'SimulatedGardenArea' && nextArea === 'SimulatedGardenArea') {
      const sgaResult = handleSimulatedGardenAreaCollision(nextX, nextY, state.isSimulatedGardenDoorOpen);
      isBlocked = sgaResult.isBlocked;
      wallDesc = sgaResult.wallDesc;
    } else if (area === 'TheGrandPlayground' && nextArea === 'TheGrandPlayground') {
      const playgroundResult = handleTheGrandPlaygroundCollision(gridX, gridY, nextX, nextY, level as any);
      isBlocked = playgroundResult.isBlocked;
      wallDesc = playgroundResult.wallDesc;
    } else if (area === 'WestGrandArcade' && nextArea === 'WestGrandArcade') {
      const wgaResult = handleWestGrandArcadeCollision(gridX, gridY, nextX, nextY, level as any, currentDims);
      isBlocked = wgaResult.isBlocked;
    } else if (area === 'EastGrandArcade' && nextArea === 'EastGrandArcade') {
      const egaResult = handleEastGrandArcadeCollision(nextX, nextY);
      isBlocked = egaResult.isBlocked;
      wallDesc = egaResult.wallDesc;
    } else if (area === 'GrandBallroom' && nextArea === 'GrandBallroom') {
      const gbResult = handleGrandBallroomCollision(gridX, gridY, nextX, nextY, level as any, state);
      isBlocked = gbResult.isBlocked;
      wallDesc = gbResult.wallDesc;
    } else if (area === 'EmployeesLivingQuarters' && nextArea === 'EmployeesLivingQuarters') {
      const elqResult = handleLivingQuartersCollision(gridX, gridY, nextX, nextY, level as any, state);
      isBlocked = elqResult.isBlocked;
      wallDesc = elqResult.wallDesc;
    } else if ((area === 'EastCommunalSpace' || area === 'WestCommunalSpace') && nextArea === area) {
      const csResult = handleCommunalSpaceCollision(area as any, nextX, nextY, level as any);
      isBlocked = csResult.isBlocked;
      wallDesc = csResult.wallDesc;
    } else if (area === 'CommunalStore' && nextArea === area) {
      const storeResult = handleCommunalStoreCollision(gridX, gridY, nextX, nextY, level as any);
      isBlocked = storeResult.isBlocked;
      wallDesc = storeResult.wallDesc;
      if (storeResult.msg) {
        msg = storeResult.msg;
      }
    } else if ((area === 'FrontPorch' || area === 'BackPorch') && nextArea === area) {
      const porchResult = handlePorchCollision(area as any, nextX, nextY, currentDims);
      isBlocked = porchResult.isBlocked;
      wallDesc = porchResult.wallDesc;
    } else if ((area === 'Sidewalk' || area === 'Street') && nextArea === area) {
      const areaDoorMin = 990;
      const areaDoorMax = 1010;
      const extResult = handleExteriorCollision(area, nextX, nextY, currentDims, areaDoorMin, areaDoorMax);
      isBlocked = extResult.isBlocked;
      wallDesc = extResult.wallDesc;
    } else if (area === 'MeditationHallLibrary' && nextArea === 'MeditationHallLibrary') {
      const libResult = handleLibraryCollision(gridX, gridY, nextX, nextY, level as any, state);
      isBlocked = libResult.isBlocked;
      wallDesc = libResult.wallDesc;
      msg = libResult.msg || msg;
    } else if (area === 'LobbyStairwayAndRamps' && nextArea === 'LobbyStairwayAndRamps') {
      const lobbyResult = handleLobbyCollision(gridX, gridY, nextX, nextY, level, nextLevel, state);
      isBlocked = lobbyResult.isBlocked;
      barkMsg = lobbyResult.barkMsg;
      nextArea = lobbyResult.nextArea || nextArea;
      nextLevel = (lobbyResult.nextLevel as any) || nextLevel;
      nextX = lobbyResult.gridX;
      nextY = lobbyResult.gridY;
    } else if (area === 'SouthwestMezzanineStairwayAndRamps' && nextArea === 'SouthwestMezzanineStairwayAndRamps') {
      const mezResult = handleMezzanineCollision(gridX, gridY, nextX, nextY);
      isBlocked = mezResult.isBlocked;
      wallDesc = mezResult.wallDesc;
      msg = mezResult.msg || msg;
    } else if (nextArea === 'LobbyStairwayAndRamps') {
      // Direct check for elevator shaft to prevent "falling into a shaft"
      const inElevatorShaft = nextX >= 980 && nextY >= 980;
      const wasInElevatorShaft = gridX >= 980 && gridY >= 980;
      const elevatorOpen = doorwayStep > 0; // Simplified check: if transitioning, it's open
      
      if (inElevatorShaft && !wasInElevatorShaft && !elevatorOpen) {
          isBlocked = true;
          wallDesc = "The elevator shaft is closed. Falling in would be a disaster. Please wait for the doors to open.";
      }
    }
 else if (area === 'TheGrandGym' && nextArea === 'TheGrandGym') {
      const gymResult = handleGymCollision(gridX, gridY, nextX, nextY, level as any);
      isBlocked = gymResult.isBlocked;
      wallDesc = gymResult.wallDesc;
      msg = gymResult.msg || msg;
    } else if (area === 'NarrowDressageGym' && nextArea === 'NarrowDressageGym') {
      const drResult = handleDressageCollision(gridX, gridY, nextX, nextY, level as any);
      isBlocked = drResult.isBlocked;
      wallDesc = drResult.wallDesc;
      msg = drResult.msg || msg;
    } else if (area === 'GrandDiningRoom' && nextArea === 'GrandDiningRoom') {
      const gdrResult = handleGrandDiningRoomCollision(nextX, nextY);
      isBlocked = gdrResult.isBlocked;
      wallDesc = gdrResult.wallDesc;
    } else if (area.startsWith('AdventureHouse') && nextArea === area) {
      const advResult = handleAdventureHouseCollision(area, nextX, nextY, currentDims, doorMin, doorMax);
      isBlocked = advResult.isBlocked;
      wallDesc = advResult.wallDesc;
    } else if (['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench'].includes(area) && nextArea === area) {
      const pathResult = handleAdventurePathCollision(area, nextX, nextY, currentDims);
      isBlocked = pathResult.isBlocked;
      wallDesc = pathResult.wallDesc;
    } else if (area === 'Soca_Path' && nextArea === area) {
      const socaResult = (checkSocaPathCollision as any)(nextX, nextY);
      isBlocked = socaResult.isBlocked;
      wallDesc = socaResult.wallDesc;
      nextX = socaResult.nextX; // Apply automatic centering
      isRampStep = socaResult.isRampStep;
      isDescending = socaResult.isDescending;
    } else if (area === 'WesternWarpRoom' && nextArea === 'WesternWarpRoom') {
      const wwrResult = handleWesternWarpRoomCollision(nextX, nextY, currentDims);
      isBlocked = wwrResult.isBlocked;
      wallDesc = wwrResult.wallDesc;
    } else if (area === 'GardenSpecificWarpRoom' && nextArea === 'GardenSpecificWarpRoom') {
      const gwrResult = handleGardenWarpRoomCollision(nextX, nextY, currentDims);
      isBlocked = gwrResult.isBlocked;
      wallDesc = gwrResult.wallDesc;
    } else if (area === 'SoutheastCoastWarpRoom' && nextArea === 'SoutheastCoastWarpRoom') {
      const swrResult = handleSoutheastCoastWarpRoomCollision(nextX, nextY, currentDims);
      isBlocked = swrResult.isBlocked || false;
      wallDesc = swrResult.wallDesc || "";
    } else if (area === 'FuturisticFrenzy' && nextArea === 'FuturisticFrenzy') {
      const ffResult = handleFuturisticFrenzyCollision(nextX, nextY, currentDims);
      isBlocked = ffResult.isBlocked;
      wallDesc = ffResult.wallDesc;
    } else if (area === 'BabylonIsFinallyFallen' && nextArea === 'BabylonIsFinallyFallen') {
      const bfResult = handleBabylonFallenCollision(nextX, nextY, currentDims);
      isBlocked = bfResult.isBlocked;
      wallDesc = bfResult.wallDesc;
    } else if (area === 'PablotsFarm' && nextArea === area) {
    const scale = currentDims.width / 2087;
    // Farmhouse (North)
    if (nextX >= 800 * scale && nextX <= 1200 * scale && nextY >= 100 * scale && nextY <= 400 * scale) {
      isBlocked = true;
      wallDesc = "The white farmhouse stands tall here. Its doors are locked, and you can see windows looking out over the 100-acre field.";
    }
    // Red Barn walls (East)
    else if (nextX >= 1950 * scale && nextY >= 900 * scale && nextY <= 1100 * scale) {
      if (nextY < 962 * scale || nextY > 1037 * scale) {
        isBlocked = true;
        wallDesc = "The red barn walls are solid wood.";
      }
    }
    // Yellow Barn walls (Southwest)
    else if (nextX <= 250 * scale && nextY >= 1850 * scale) {
      if (nextX < 70 * scale || nextX > 130 * scale) {
        isBlocked = true;
        wallDesc = "The yellow barn's magical field pushes you back unless you enter through the door.";
      }
    }
    // Perimeter Fence
    else if (nextX < 0 || nextX >= currentDims.width || nextY < 0 || nextY >= currentDims.height) {
      isBlocked = true;
      wallDesc = "A white picket fence around the farm prevents you from wandering off into the 100-acre field.";
    }
  } else if (['WesternTarsisEffect', 'PablotsPonyField'].includes(area) && nextArea === area) {
      const courseResult = handleWesternWarpCourseCollision(area, nextX, nextY, currentDims, state);
      isBlocked = courseResult.isBlocked || false;
      wallDesc = courseResult.wallDesc || "";
    } else if (area.startsWith('PinkHouse') && nextArea === area) {
      const phResult = handlePinkHouseCollision(area, nextX, nextY, currentDims, state);
      isBlocked = phResult.isBlocked;
      wallDesc = phResult.wallDesc;
    } else if (area.startsWith('Allisons') && nextArea === area) {
      const manorResult = handleManorCollision(area, nextX, nextY, state);
      isBlocked = manorResult.isBlocked || false;
      wallDesc = manorResult.wallDesc || "";
    } else if (area.startsWith('Barn') && nextArea === area) {
      const barnResult = handleBarnCollision(area, nextX, nextY, state);
      isBlocked = barnResult.isBlocked || false;
      wallDesc = barnResult.wallDesc || "";
    } else if (nextArea === area && nextDoorwayStep === 0) {
      // Default boundary check for all other areas (only if not in transition)
      if (nextX < 0 || nextX > currentDims.width || nextY < 0 || nextY > currentDims.height) {
        isBlocked = true;
        if (wallDesc === "") {
          if (nextY >= currentDims.height) wallDesc = `You have reached the North wall of the ${area}.`;
          else if (nextY <= 0) wallDesc = `You have reached the South wall of the ${area}.`;
          else if (nextX >= currentDims.width) wallDesc = `You have reached the East wall of the ${area}.`;
          else if (nextX <= 0) wallDesc = `You have reached the West wall of the ${area}.`;
        }
      }
    }
  }

  // Final Boundary Capping (Accuracy Refinement: Wall Clearance)
  if (!isBlocked && nextArea === area && nextDoorwayStep === 0) {
    const clearance = WALL_CLEARANCE_FEET;
    if (nextX < clearance) { 
      nextX = clearance; 
      isBlocked = true; 
      if (wallDesc === "") wallDesc = `You have reached the West wall of the ${area}.`;
    }
    if (nextX > currentDims.width - clearance) { 
      nextX = currentDims.width - clearance; 
      isBlocked = true; 
      if (wallDesc === "") wallDesc = `You have reached the East wall of the ${area}.`;
    }
    if (nextY < clearance) { 
      nextY = clearance; 
      isBlocked = true; 
      if (wallDesc === "") wallDesc = `You have reached the South wall of the ${area}.`;
    }
    if (nextY > currentDims.height - clearance) { 
      nextY = currentDims.height - clearance; 
      isBlocked = true; 
      if (wallDesc === "") wallDesc = `You have reached the North wall of the ${area}.`;
    }
  }

  return {
    isBlocked,
    wallDesc,
    nextArea,
    nextLevel,
    nextDoorwayStep,
    msg,
    isRampStep,
    isDescending,
    shouldBark,
    barkMsg,
    barkCount,
    barkArea,
    nextX,
    nextY,
    nextDirection,
    isLevelComplete
  };
};
