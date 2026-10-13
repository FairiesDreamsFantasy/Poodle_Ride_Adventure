
import { 
  HALLWAY_REVERB, CAVE_REVERB, NO_REVERB 
} from "../index";
import { getFoyerReverbProfile } from "./F/FoyerReverbAlgorithms";

/**
 * Reverb Mapping Algorithms
 * Determines the appropriate reverb profile for any given area in the game.
 */

const REVERB_MAP: Record<string, any> = {
  'AdventureHouseHallway': HALLWAY_REVERB,
  'AdventureHouseNarrowHallway': NO_REVERB,
  'AdventureHouseMusicRoom': NO_REVERB,
  'AdventureHouseBridgeHallway': NO_REVERB,
  'AdventureHouseTrenchHallway': NO_REVERB,
  'RastafariCave': CAVE_REVERB,
  'FrontPorch': NO_REVERB,
  'BackPorch': NO_REVERB,
  'AllisonsPorch': NO_REVERB,
  'MeditationHall': NO_REVERB,
  'MeditationHallWest': NO_REVERB,
  'MeditationHallEast': NO_REVERB,
  'MeditationHallLibrary': NO_REVERB,
  'MeditationHallLibraryArch': NO_REVERB,
  'MeditationHallMeditationRoomArch': NO_REVERB,
  'MeditationHallToBackPorchDoorway': NO_REVERB,
  'MeditationHallToSimulatedGardenDoorway': NO_REVERB,
  'MeditationHallLibraryToLobbyArch': NO_REVERB,
  'TheGrandGym': CAVE_REVERB,
  'NarrowDressageGym': HALLWAY_REVERB,
  'GymToArcadeArch': NO_REVERB,
  'WestCommunalNarrowGymArch': NO_REVERB,
  'RuggedPlayFieldToFloorArchway': NO_REVERB,
  'GrandPlaygroundToFloorFoyerArchway': NO_REVERB,
  'SkyFoyerToPlaygroundPerimeterArchway': NO_REVERB,
  'RuggedPlayfieldToSimulatedGardenArchway': NO_REVERB,
  'SimulatedGardenAreaToMeditationHallDoorway': NO_REVERB,
  'KitchenToBackPorchDoorway': NO_REVERB,
};

export const getReverbProfileForArea = (area: string): any => {
  const foyerProfile = getFoyerReverbProfile(area);
  if (foyerProfile) return foyerProfile;

  return REVERB_MAP[area] || NO_REVERB;
};

export const shouldResetReverbForArea = (area: string): boolean => {
  return [
    'GymToArcadeArch', 
    'KitchenToBackPorchDoorway', 
    'MeditationHallToBackPorchDoorway', 
    'MeditationHallToSimulatedGardenDoorway',
    'RuggedPlayFieldToFloorArchway',
    'GrandPlaygroundToFloorFoyerArchway',
    'SkyFoyerToPlaygroundPerimeterArchway',
    'RuggedPlayfieldToSimulatedGardenArchway',
    'SimulatedGardenAreaToMeditationHallDoorway'
  ].includes(area);
};
