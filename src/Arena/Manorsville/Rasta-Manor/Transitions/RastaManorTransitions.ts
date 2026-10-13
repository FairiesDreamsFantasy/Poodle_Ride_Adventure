import { Direction, GameState } from '../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../System/Engine/Transitions';
import { handleMeditationHallTransitions } from './Handlers/M/MeditationHallTransitions';
import { handleMeditationHallLibraryTransitions } from './Handlers/M/MeditationHallLibraryTransitions';
import { handleFoyerTransitions } from './Handlers/F/FoyerTransitions';
import { handleRuggedPlayFieldTransitions } from './Handlers/R/RuggedPlayFieldTransitions';
import { handleGymTransitions } from './Handlers/G/GrandGymTransitions';
import { handleDressageTransitions } from './Handlers/D/DressageGymTransitions';
import { handleBackPorchTransitions } from './Handlers/B/BackPorchTransitions';
import { handleGardenTransitions } from './Handlers/G/GardenTransitions';
import { handleFrontPorchTransitions } from './Handlers/F/FrontPorchTransitions';
import { handleAnimalRideMeditationRoomTransitions } from './Handlers/M/AnimalRideMeditationRoomTransitions';
import { handleLobbyTransitions } from './Handlers/L/LobbyTransitions';
import { handleCellarTransitions } from './Handlers/C/CellarTransitions';
import { handleKitchenTransitions } from './Handlers/K/KitchenTransitions';
import { handleDishWasherTransitions } from './Handlers/D/DishWasherTransitions';
import { handlePlaceholderTransitions } from './Handlers/P/PlaceholderTransitions';
import { handleGrandBallroomTransitions } from './Handlers/G/GrandBallroomTransitions';
import { handleGrandPlaygroundTransitions } from './Handlers/G/GrandPlaygroundTransitions';
import { handleGrandArcadeExtensionTransitions } from './Handlers/G/GrandArcadeExtensionTransitions';
import { handleGrandDiningRoomTransitions } from './Handlers/G/GrandDiningRoomTransitions';
import { handleSimulatedGardenAreaTransitions } from './Handlers/S/SimulatedGardenAreaTransitions';
import { handleEastGrandArcadeTransitions } from './Handlers/E/EastGrandArcadeTransitions';
import { handleEastCommunalSpaceTransitions } from './Handlers/E/EastCommunalSpaceTransitions';
import { handleEmployeesLivingQuartersTransitions } from './Handlers/E/EmployeesLivingQuartersTransitions';
import { handleWestCommunalSpaceTransitions } from './Handlers/W/WestCommunalSpaceTransitions';
import { handleWestGrandArcadeTransitions } from './Handlers/W/WestGrandArcadeTransitions';
import { handleManorPathTransitions } from './Handlers/L/ManorPathTransitions';
import { handleMezzanineTransitions } from '../Mezzanine_For_1st_Floor/Southwest_Stairway_And_Ramps_Mezzanine/MezzanineTransitions';
import { handleSpectatorAreaTransitions } from '../Mezzanine_For_1st_Floor/Spectator_Area/SpectatorAreaTransitions';
import { handleBoilerRoomTransitions } from '../Cellar/B2/Boiler_Room/BoilerRoomTransitions';
import { handleCommunalStoreTransitions } from '../Communal_Store/CommunalStoreTransitions';

export const handleRastaManorTransitions = (
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
): TransitionResult | null => {
  // Update door logic for 8000ft porch vs 2000ft manor areas
  const isPorchArea = area === 'FrontPorch' || area === 'BackPorch' || area === 'Sidewalk' || area === 'Street';
  const manorCenterX = isPorchArea ? 4000 : 1000;
  
  const isAtNorthDoor = nextY >= currentDims.height && nextX >= doorMin && nextX <= doorMax;
  const isAtSouthDoor = nextY <= 0 && nextX >= doorMin && nextX <= doorMax;

  switch (area) {
    case 'MeditationHall':
      return handleMeditationHallTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, state);
    case 'MeditationHallLibrary':
      return handleMeditationHallLibraryTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, state);
    case 'Foyer':
      return handleFoyerTransitions(area, gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, isAtNorthDoor, isAtSouthDoor, state);
    case 'TheGrandGym':
      return handleGymTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, state);
    case 'NarrowDressageGym':
      return handleDressageTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, state);
    case 'FrontPorch':
      return handleFrontPorchTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, isAtSouthDoor);
    case 'AnimalRideMeditationRoom':
      return handleAnimalRideMeditationRoomTransitions(nextX, nextY, direction, currentDims);
    case 'LobbyStairwayAndRamps':
      return handleLobbyTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, state);
    case 'SouthwestMezzanineStairwayAndRamps':
      return handleMezzanineTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, state);
    case 'SpectatorArea':
      return handleSpectatorAreaTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, state);
    case 'BoilerRoom':
      return handleBoilerRoomTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, state);
    case 'RuggedPlayField':
      return handleRuggedPlayFieldTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'BackPorch':
      return handleBackPorchTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'Garden':
      return handleGardenTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, isAtNorthDoor);
    case 'Cellar':
      return handleCellarTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'Kitchen':
      return handleKitchenTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, state);
    case 'DishWasherArea':
      return handleDishWasherTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'GrandBallroom':
      return handleGrandBallroomTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'EmployeesLivingQuarters':
      return handleEmployeesLivingQuartersTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'GrandArcadeExtension':
      return handleGrandArcadeExtensionTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'TheGrandPlayground':
    case 'RastaManor2ndFloor':
    case 'GrandPlaygroundPlaceholder1':
      return handleGrandPlaygroundTransitions(area, gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'SimulatedGardenArea':
      return handleSimulatedGardenAreaTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'WestCommunalSpace':
      return handleWestCommunalSpaceTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'CommunalStore':
      return handleCommunalStoreTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'WestGrandArcade':
      return handleWestGrandArcadeTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'GrandDiningRoom':
    case 'GrandDiningRoomExtra':
    case 'GrandDiningRoomEast':
    case 'RecyclingRoom':
      return handleGrandDiningRoomTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, state);
    case 'EastGrandArcade':
      return handleEastGrandArcadeTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'EastCommunalSpace':
      return handleEastCommunalSpaceTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
    case 'WestManorPath':
      return handleManorPathTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, 'West');
    case 'EastManorPath':
      return handleManorPathTransitions(gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims, 'East');
    default:
      if (area.includes('West') || area.includes('East')) {
        return handlePlaceholderTransitions(area, gridX, gridY, nextX, nextY, level, direction, doorwayStep, currentDims);
      }
      return null;
  }
};
