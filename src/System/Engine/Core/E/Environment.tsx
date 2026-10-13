import { GameState } from '../Types';
import { drawFoyer } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Foyer/FoyerRenderer';
import { drawCellarRamp, drawCellar } from '../../../../Arena/Manorsville/Rasta-Manor/Cellar/B1/CellarRenderer';
import { drawGarden } from '../../../../Arena/Manorsville/Rasta-Manor/Garden/GardenRenderer';
import { drawWindowViews } from '../../../../Arena/Manorsville/Rasta-Manor/1st_Floor/Foyer/Windows/WindowRenderer';
import { drawFrontPorch } from '../../../../Arena/Manorsville/Rasta-Manor/Front_Porch/FrontPorchRenderer';
import { drawBackPorch } from '../../../../Arena/Manorsville/Rasta-Manor/Back_Porch/BackPorchRenderer';
import { drawSidewalk } from '../../../Building_Blocks/World/Cities/City_parts/Sidewalk/SidewalkRenderer';
import { drawStreet } from '../../../Building_Blocks/World/Cities/City_parts/Street/StreetRenderer';
import { drawAdventureHouse } from '../../../../World/Main_Game/World/0/Levels/Level_0/Adventure_House/AdventureHouseRenderer';
import { drawAdventureGarden } from '../../../../World/Main_Game/World/0/Levels/Level_0/Adventure_Garden';
import { drawSelectorHouse } from '../../../../World/Main_Game/World/0/Levels/Level_0/Selector_House';
import { drawDoYouRememberThis } from '../../../../Arena/Do_You_Remember_This';
import { drawAIGeneratedLevel } from '../../../../World/Levels/AI-Generated';
import { drawWandaWarpHouse } from '../../../../World/Main_Game/World/1/Levels/Level_1/Wandas_Warp_House/WandaRenderer';
import { drawWandaWestFarmHallway, drawWandaWestBarnWarpHouse } from '../../../../World/Main_Game/World/1/Levels/Level_1/Wandas_Warp_House/Farm_and_Western/FarmAndWesternRenderer';
import { drawWandaEastBrickHallway, drawWandaEastSquareHouse } from '../../../../World/Main_Game/World/1/Levels/Level_1/Wandas_Warp_House/Square_House/SquareHouseRenderer';
import { drawPixelGardenGallopDecisionZone } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Decision_Area/PixelGardenDecisionAreaRenderer';
import { drawPixelGardenCourse1 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_1/Course1Renderer';
import { drawPixelGardenCourse2 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_2/Course2Renderer';
import { drawPixelGardenCourse3 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_3/Course3Renderer';
import { drawPixelGardenCourse4 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_4/Course4Renderer';
import { drawPixelGardenCourse5 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_5/Course5Renderer';
import { drawPixelGardenCourse6 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_6/Course6Renderer';
import { drawPixelGardenCourse7 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_7/Course7Renderer';
import { drawPixelGardenCourse8 } from '../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Pixel_Garden_Gallop/Course_8/Course8Renderer';
import { drawAllisonsPorch as drawAllisonsManorPorch } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/Porch/PorchRenderer';
import { drawSecondFloor } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/2nd_Floor/SecondFloorRenderer';
import { drawThirdFloor } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/3rd_Floor/ThirdFloorRenderer';
import { drawRooftop } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/Garden_Rooftop/RooftopRenderer';
import { renderBabylonFallen } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Babylon_Is_Finally_Fallen/BabylonFallenRenderer';
import { renderFuturisticFrenzy } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Futuristic_Frenzy/FuturisticFrenzyRenderer';
import { renderGardenWarpRoom } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Garden_Specific_Warp_Room/GardenWarpRoomRenderer';
import { renderSoutheastCoastWarpRoom } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Southeast_Coast_Warp_Room/SoutheastCoastWarpRoomRenderer';
import { renderSoutheastWarpRoom } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Southeast_Warp_Room/SoutheastWarpRoomRenderer';
import { drawWesternWarpRoom } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/WesternWarpRoomRenderer';
import { drawPablotsFarm } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/PablotsFarmRenderer';
import { drawPonyField } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/PablotsPonyFieldRenderer';
import { drawWesternTarsis } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/WesternTarsisRenderer';
import { drawAllisonsStore } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Allisons_Store/AllisonsStoreRenderer';
import { drawMountainsWarpRoom } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Mountains_Specific_Warp_Room/MountainsWarpRoomRenderer';
import { drawRestaurant } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Restaurant-Communal_Dining_Facility/RestaurantRenderer';
import { drawRestaurantOutdoor } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Restaurant-Communal_Dining_Facility/RestaurantOutdoorRenderer';
import { drawSocaPath } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Soca_Path/SocaPath';

export function drawEnvironment(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  switch (state.area) {
    case 'Foyer':
      drawFoyer(ctx, width, height, state, time);
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
    case 'AllisonsPorch':
      drawAllisonsManorPorch(ctx, width, height, state, time);
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
    case 'BabylonIsFinallyFallen':
      renderBabylonFallen(ctx, width, height, state, time);
      break;
    case 'FuturisticFrenzy':
      renderFuturisticFrenzy(ctx, width, height, state, time);
      break;
    case 'GardenSpecificWarpRoom':
      renderGardenWarpRoom(ctx, width, height, state, time);
      break;
    case 'SoutheastCoastWarpRoom':
      renderSoutheastCoastWarpRoom(ctx, width, height, state, time);
      break;
    case 'SoutheastWarpRoom':
      renderSoutheastWarpRoom(ctx, width, height, state, time);
      break;
    case 'WesternWarpRoom':
      drawWesternWarpRoom(ctx, width, height, state, time);
      break;
    case 'PablotsFarm':
      drawPablotsFarm(ctx, width, height, state, time);
      break;
    case 'PablotsPonyField':
      drawPonyField(ctx, width, height, state, time);
      break;
    case 'WesternTarsisEffect':
      drawWesternTarsis(ctx, width, height, state, time);
      break;
    case 'AllisonsStore':
      drawAllisonsStore(ctx, width, height, state, time);
      break;
    case 'AllisonsMountainsWarpRoom':
      drawMountainsWarpRoom(ctx, width, height, state, time);
      break;
    case 'AllisonsRestaurant':
      drawRestaurant(ctx, width, height, state, time);
      break;
    case 'AllisonsRestaurantOutdoor':
      drawRestaurantOutdoor(ctx, width, height, state, time);
      break;
    case 'Soca_Path':
      drawSocaPath(ctx, width, height, state, time);
      break;
    case 'Sidewalk':
      drawSidewalk(ctx, width, height, state, time);
      break;
    case 'Street':
      drawStreet(ctx, width, height, state, time);
      break;
    case 'WandasWarpHouse':
    case 'WandaPlatform':
      drawWandaWarpHouse(ctx, width, height, state, time);
      break;
    case 'WandaWestFarmHallway':
      drawWandaWestFarmHallway(ctx, width, height, state, time);
      break;
    case 'WandaWestBarnWarpHouse':
      drawWandaWestBarnWarpHouse(ctx, width, height, state, time);
      break;
    case 'WandaEastBrickHallway':
      drawWandaEastBrickHallway(ctx, width, height, state, time);
      break;
    case 'WandaEastSquareHouse':
      drawWandaEastSquareHouse(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallopDecisionZone':
      drawPixelGardenGallopDecisionZone(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_1':
      drawPixelGardenCourse1(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_2':
      drawPixelGardenCourse2(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_3':
      drawPixelGardenCourse3(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_4':
      drawPixelGardenCourse4(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_5':
      drawPixelGardenCourse5(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_6':
      drawPixelGardenCourse6(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_7':
      drawPixelGardenCourse7(ctx, width, height, state, time);
      break;
    case 'PixelGardenGallop_Course_8':
      drawPixelGardenCourse8(ctx, width, height, state, time);
      break;
    case 'AdventureHouseFoyer':
    case 'AdventureHouseHallway':
    case 'AdventureHouseTeaRoom':
      drawAdventureHouse(ctx, width, height, state, time);
      break;
    case 'Adventure_Garden':
      drawAdventureGarden(ctx, width, height, state, time);
      break;
    case 'SelectorHouse':
    case 'Selector_House':
      drawSelectorHouse(ctx, width, height, state, time);
      break;
    case 'Do_You_Remember_This':
      drawDoYouRememberThis(ctx, width, height, state, time);
      break;
    case 'AIGeneratedLevel':
      drawAIGeneratedLevel(ctx, width, height, state, time);
      break;
    case 'AdventurePath':
      drawGarden(ctx, width, height, state, time); // Placeholder for adventure path
      break;
    default:
      drawGarden(ctx, width, height, state, time);
  }
}

export { drawFoyer, drawGarden, drawWindowViews, drawFrontPorch, drawBackPorch, drawSidewalk, drawStreet, drawAdventureHouse };
