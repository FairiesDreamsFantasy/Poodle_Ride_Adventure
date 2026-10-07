import { GameState } from '../../../System/AI/In-Game/Logic/GameLogic';
import { drawFoyer } from './1st_Floor/Foyer/FoyerRenderer';
import { drawRuggedPlayField } from './1st_Floor/Rugged_Play_Field/RuggedPlayFieldRenderer';
import { drawSimulatedGardenArea } from './1st_Floor/Simulated_Garden_Area/SimulatedGardenAreaRenderer';
import { drawMeditationHall } from './1st_Floor/Meditation_Hall/MeditationHallRenderer';
import { drawAnimalRideMeditationRoom } from './1st_Floor/Meditation_Hall/Animal_Ride_Meditation_Room/AnimalRideRenderer';
import { drawCellarRamp, drawCellar } from './Cellar/B1/CellarRenderer';
import { drawGarden } from './Garden/GardenRenderer';
import { drawWindowViews } from './1st_Floor/Foyer/Windows/WindowRenderer';
import { drawFrontPorch } from './Front_Porch/FrontPorchRenderer';
import { drawBackPorch } from './Back_Porch/BackPorchRenderer';
import { drawKitchen } from './1st_Floor/Kitchen/KitchenRenderer';
import { drawDishWasher } from './1st_Floor/Dish_Washer_Area_4_1st_Floor_Kitchen/DishWasherRenderer';
import { drawGrandBallroom } from './1st_Floor/Grand_Ballroom/GrandBallroomRenderer';
import { drawGrandPlayground } from './1st_Floor/The_Grand_Playground/GrandPlaygroundRenderer';
import { drawGrandDiningRoom } from './1st_Floor/Grand_Dining_Room/GrandDiningRoomRenderer';
import { drawWestGrandArcade } from './1st_Floor/West_Grand_Arcade/WestGrandArcadeRenderer';
import { drawEastGrandArcade } from './1st_Floor/East_Grand_Arcade/EastGrandArcadeRenderer';
import { drawLobbyStairwayAndRamps } from './1st_Floor/Lobby_Stairway_and_Ramps_Level/LobbyRenderer';
import { drawManorPath } from './Exterior/ManorPathRenderer';
import { drawGrandGym } from './1st_Floor/The_Grand_Gym/GrandGymRenderer';
import { drawDressageGym } from './1st_Floor/Narrow_Dressage_Gym/DressageGymRenderer';
import { drawWestCommunalSpace } from './Communal_Spaces/WestCommunalSpaceRenderer';
import { drawEastCommunalSpace } from './Communal_Spaces/EastCommunalSpaceRenderer';
import { drawCommunalStore } from './Communal_Store/CommunalStoreRenderer';
import { drawLivingQuarters } from './Employees_Living_Quarters/LivingQuartersRenderer';
import { drawRastaManor2ndFloor } from './2nd_Floor/RastaManor2ndFloorRenderer';
import { drawRastaManor3rdFloor } from './3rd_Floor/RastaManor3rdFloorRenderer';
import { drawMezzanineStairwayAndRamps } from './Mezzanine_For_1st_Floor/Southwest_Stairway_And_Ramps_Mezzanine/MezzanineRenderer';
import { drawSpectatorArea } from './Mezzanine_For_1st_Floor/Spectator_Area/SpectatorAreaRenderer';
import { drawBoilerRoom } from './Cellar/B2/Boiler_Room/BoilerRoomRenderer';
import { drawSidewalk } from '../../../System/Building_Blocks/World/Cities/City_parts/Sidewalk/SidewalkRenderer';
import { drawStreet } from '../../../System/Building_Blocks/World/Cities/City_parts/Street/StreetRenderer';
import { drawAdventureHouse } from '../../../World/Main_Game/World/0/Levels/Level_0/Adventure_House/AdventureHouseRenderer';
import { drawAdventurePath } from '../../../World/Main_Game/World/0/Levels/Level_0/Adventure_Path/AdventurePathRenderer';
import { drawPortalTunnel } from '../../../World/Main_Game/World/0/Levels/Level_0/Portal_Tunnel/PortalTunnelRenderer';
import { drawWandaWarpHouse } from '../../../World/Main_Game/World/1/Levels/Level_1/Wandas_Warp_House/WandaRenderer';
import { drawStoryBookDecisionZone, drawStoryBookCourse } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/StoryBookRenderer';
import { drawCourse1Segment1 } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Course_Area/Course_1/Segment1';
import { drawCourse1Segment2 } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Course_Area/Course_1/Segment2';
import { drawCourse1Segment3 } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Course_Area/Course_1/Segment3';
import { drawCourse1Segment4 } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Course_Area/Course_1/Segment4';
import { drawReadingBreak } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Course_Area/Course_1/ReadingBreaks';
import { drawGoalZone } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Goal_Zone/GoalZoneRenderer';
import { drawInitialShort400FeetPath } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Initial_Short_400_Feet_Path/InitialPathRenderer';
import { renderPinkHouse } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Pink_House/PinkHouseRenderer';
import { renderCoins } from '../../../System/Items/Coins';

import { drawSocaPath } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Soca_Path/SocaPath';
import { drawAllisonsPorch } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/Porch/PorchRenderer';
import { drawAllisonsFoyer } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Foyer/FoyerRenderer';
import { drawSecondFloor } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/2nd_Floor/SecondFloorRenderer';
import { drawThirdFloor } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/3rd_Floor/ThirdFloorRenderer';
import { drawRooftop } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/Garden_Rooftop/RooftopRenderer';
import { drawWesternWarpRoom } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/WesternWarpRoomRenderer';
import { drawWesternTarsis } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/WesternTarsisRenderer';
import { drawPablotsFarm } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/PablotsFarmRenderer';
import { drawPonyField } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/PablotsPonyFieldRenderer';
import { renderGardenWarpRoom as drawGardenWarpRoom } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Garden_Specific_Warp_Room/GardenWarpRoomRenderer';
import { renderSoutheastCoastWarpRoom as drawSoutheastWarpRoom } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Southeast_Coast_Warp_Room/SoutheastCoastWarpRoomRenderer';
import { renderFuturisticFrenzy as drawFuturisticFrenzy } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Futuristic_Frenzy/FuturisticFrenzyRenderer';
import { renderBabylonFallen as drawBabylonFallen } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Babylon_Is_Finally_Fallen/BabylonFallenRenderer';
import { drawRestaurant as drawAllisonsRestaurant } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Restaurant-Communal_Dining_Facility/RestaurantRenderer';
import { drawRestaurantOutdoor as drawAllisonsRestaurantOutdoor } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Restaurant-Communal_Dining_Facility/RestaurantOutdoorRenderer';
import { drawMountainsWarpRoom as drawAllisonsMountainsWarpRoom } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Mountains_Specific_Warp_Room/MountainsWarpRoomRenderer';
import { drawAllisonsStore } from '../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Allisons_Store/AllisonsStoreRenderer';

export function drawEnvironment(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  switch (state.area) {
    case 'MiniStreet':
      drawStreet(ctx, width, height, state, time);
      break;
    case 'MiniSidewalk':
      drawSidewalk(ctx, width, height, state, time);
      break;
    case 'MiniFrontPorch':
      drawFrontPorch(ctx, width, height, state, time);
      break;
    case 'MiniBackPorch':
      drawBackPorch(ctx, width, height, state, time);
      break;
    case 'MiniGarden':
      drawGarden(ctx, width, height, state, time);
      break;
    case 'MiniWestManorPath':
      drawManorPath(ctx, width, height, state, time, 'West');
      break;
    case 'MiniEastManorPath':
      drawManorPath(ctx, width, height, state, time, 'East');
      break;
    case 'Foyer':
    case 'FoyerWest1':
    case 'FoyerWest2':
    case 'FoyerEast1':
    case 'FoyerEast2':
      drawFoyer(ctx, width, height, state, time);
      break;
    case 'RuggedPlayField':
    case 'RuggedPlayFieldWest1':
    case 'RuggedPlayFieldWest2':
    case 'RuggedPlayFieldEast1':
    case 'RuggedPlayFieldEast2':
      drawRuggedPlayField(ctx, width, height, Math.floor(height * 0.6), state);
      break;
    case 'MeditationHall':
    case 'MeditationHallWest':
    case 'MeditationHallEast':
      drawMeditationHall(ctx, width, height, Math.floor(height * 0.6), state);
      break;
    case 'AnimalRideMeditationRoom':
      drawAnimalRideMeditationRoom(ctx, width, height, Math.floor(height * 0.6), state);
      break;
    case 'CellarRamp':
      drawCellarRamp(ctx, width, height, state, time);
      break;
    case 'Cellar':
      drawCellar(ctx, width, height, state, time);
      break;
    case 'Garden':
      drawGarden(ctx, width, height, state, time);
      break;
    case 'FrontPorch':
      drawFrontPorch(ctx, width, height, state, time);
      break;
    case 'BackPorch':
      drawBackPorch(ctx, width, height, state, time);
      break;
    case 'Kitchen':
      drawKitchen(ctx, width, height, state, time);
      break;
    case 'DishWasherArea':
      drawDishWasher(ctx, width, height, state, time);
      break;
    case 'GrandBallroom':
      drawGrandBallroom(ctx, width, height, state, time);
      break;
    case 'TheGrandPlayground':
      drawGrandPlayground(ctx, width, height, state, time);
      break;
    case 'SimulatedGardenArea':
      drawSimulatedGardenArea(ctx, width, height, Math.floor(height * 0.6), state, time);
      break;
    case 'GrandDiningRoom':
    case 'GrandDiningRoomExtra':
    case 'GrandDiningRoomEast':
    case 'RecyclingRoom':
      drawGrandDiningRoom(ctx, width, height, state, time);
      break;
    case 'WestGrandArcade':
      drawWestGrandArcade(ctx, width, height, state, time);
      break;
    case 'EastGrandArcade':
      drawEastGrandArcade(ctx, width, height, state, time);
      break;
    case 'LobbyStairwayAndRamps':
      drawLobbyStairwayAndRamps(ctx, width, height, state, time);
      break;
    case 'SouthwestMezzanineStairwayAndRamps':
      drawMezzanineStairwayAndRamps(ctx, width, height, state, time);
      break;
    case 'SpectatorArea':
      drawSpectatorArea(ctx, width, height, state, time);
      break;
    case 'BoilerRoom':
      drawBoilerRoom(ctx, width, height, state, time);
      break;
    case 'WestManorPath':
      drawManorPath(ctx, width, height, state, time, 'West');
      break;
    case 'EastManorPath':
      drawManorPath(ctx, width, height, state, time, 'East');
      break;
    case 'TheGrandGym':
      drawGrandGym(ctx, width, height, state, time);
      break;
    case 'NarrowDressageGym':
      drawDressageGym(ctx, width, height, state, time);
      break;
    case 'WestCommunalSpace':
      drawWestCommunalSpace(ctx, width, height, state, time);
      break;
    case 'CommunalStore':
      drawCommunalStore(ctx, width, height, state, time);
      break;
    case 'EastCommunalSpace':
      drawEastCommunalSpace(ctx, width, height, state, time);
      break;
    case 'EmployeesLivingQuarters':
      drawLivingQuarters(ctx, width, height, state, time);
      break;
    case 'GrandArcadeExtension':
      drawEastGrandArcade(ctx, width, height, state, time);
      break;
    case 'RastaManor2ndFloor':
      drawRastaManor2ndFloor(ctx, width, height, state, time);
      break;
    case 'RastaManor3rdFloor':
      drawRastaManor3rdFloor(ctx, width, height, state, time);
      break;
    case 'RuggedPlayFieldPlaceholderEast':
    case 'ManorTransitionPlaceholder':
      drawFoyer(ctx, width, height, state, time); // Use Foyer as default for placeholders
      break;
    case 'Sidewalk':
      drawSidewalk(ctx, width, height, state, time);
      break;
    case 'Street':
      drawStreet(ctx, width, height, state, time);
      break;
    case 'AdventureHouseFoyer':
    case 'AdventureHouseHallway':
    case 'AdventureHouseTeaRoom':
      drawAdventureHouse(ctx, width, height, state, time);
      break;
    case 'PortalTunnel':
      drawPortalTunnel(ctx, width, height, state, time);
      break;
    case 'WandasWarpHouse':
    case 'WandaPlatform':
      drawWandaWarpHouse(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookDecisionZone':
      drawStoryBookDecisionZone(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookCourse':
      drawStoryBookCourse(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookCourse1_Seg1':
      drawCourse1Segment1(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookCourse1_Seg2':
      drawCourse1Segment2(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookCourse1_Seg3':
      drawCourse1Segment3(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookCourse1_Seg4':
      drawCourse1Segment4(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookCourse1_Break1':
      drawReadingBreak(ctx, width, height, state, time, 1);
      break;
    case 'PoodleRideStoryBookCourse1_Break2':
      drawReadingBreak(ctx, width, height, state, time, 2);
      break;
    case 'PoodleRideStoryBookCourse1_Break3':
      drawReadingBreak(ctx, width, height, state, time, 3);
      break;
    case 'PoodleRideStoryBookGoalZone':
      drawGoalZone(ctx, width, height, state, time);
      break;
    case 'PoodleRideStoryBookInitialPath':
      drawInitialShort400FeetPath(ctx, width, height, state, time);
      break;
    case 'PinkHouseFoyer':
    case 'PinkHouseTeaRoom':
    case 'PinkHouseDiningRoom':
    case 'PinkHouseKitchen':
      renderPinkHouse(ctx, width, height, state, time);
      break;
    case 'AdventurePath':
    case 'HedgePath':
    case 'RastafariCave':
    case 'Overpass':
    case 'Suburb':
    case 'OpenTrench':
      drawAdventurePath(ctx, width, height, state, time);
      break;
    case 'Soca_Path':
      drawSocaPath(ctx, width, height, state, time);
      break;
    case 'AllisonsPorch':
      drawAllisonsPorch(ctx, width, height, state, time);
      break;
    case 'AllisonsFoyer':
      drawAllisonsFoyer(ctx, width, height, state, time);
      break;
    case 'AllisonsRestaurant':
      drawAllisonsRestaurant(ctx, width, height, state, time);
      break;
    case 'AllisonsRestaurantOutdoor':
      drawAllisonsRestaurantOutdoor(ctx, width, height, state, time);
      break;
    case 'AllisonsMountainsWarpRoom':
      drawAllisonsMountainsWarpRoom(ctx, width, height, state, time);
      break;
    case 'AllisonsStore':
      drawAllisonsStore(ctx, width, height, state, time);
      break;
    case 'Allisons2ndFloor':
      drawSecondFloor(ctx, width, height, state, time);
      break;
    case 'Allisons3rdFloor':
      drawThirdFloor(ctx, width, height, state, time);
      break;
    case 'AllisonsRooftop':
      drawRooftop(ctx, width, height, state, time);
      break;
    case 'WesternWarpRoom':
      drawWesternWarpRoom(ctx, width, height, state, time);
      break;
    case 'GardenSpecificWarpRoom':
      drawGardenWarpRoom(ctx, width, height, state, time);
      break;
    case 'SoutheastCoastWarpRoom':
      drawSoutheastWarpRoom(ctx, width, height, state, time);
      break;
    case 'FuturisticFrenzy':
      drawFuturisticFrenzy(ctx, width, height, state, time);
      break;
    case 'BabylonIsFinallyFallen':
      drawBabylonFallen(ctx, width, height, state, time);
      break;
    case 'WesternTarsisEffect':
      drawWesternTarsis(ctx, width, height, state, time);
      break;
    case 'PablotsFarm':
      drawPablotsFarm(ctx, width, height, state, time);
      break;
    case 'PablotsPonyField':
      drawPonyField(ctx, width, height, state, time);
      break;
    default:
      drawGarden(ctx, width, height, state, time);
  }

  // Draw Coins on top of environment if in a course
  const courseAreas = ['PoodleRideStoryBookCourse', 'PoodleRideStoryBookCourse1_Seg1', 'PoodleRideStoryBookCourse1_Seg2', 'PoodleRideStoryBookCourse1_Seg3', 'PoodleRideStoryBookCourse1_Seg4', 'PoodleRideStoryBookGoalZone', 'PoodleRideStoryBookInitialPath'];
  if (courseAreas.includes(state.area)) {
    renderCoins(ctx, state.coins || [], height / 50, time);
  }
}

export { drawFoyer, drawGarden, drawWindowViews, drawFrontPorch, drawBackPorch, drawSidewalk, drawStreet, drawAdventureHouse, drawAdventurePath };
