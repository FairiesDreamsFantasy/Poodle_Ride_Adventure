/**
 * Acoustics Engine (Science Subsystem)
 * Mathematical and scientific acoustic calculations for Poodle Ride Adventure.
 */

import { 
  GENERIC_REVERB, HALLWAY_REVERB, STONE_ROOM_REVERB, STONE_CORRIDOR_REVERB, 
  CAVE_REVERB, CITIES_REVERB, FORESTS_REVERB, MOUNTAINS_REVERB, 
  PARKING_LOT_REVERB, ALLEY_REVERB, HANGER_REVERB, NO_REVERB 
} from "../../../Sound/Reverberation_Effects_List";

const REVERB_AREA_MAP: Record<string, any> = {
  'Foyer': GENERIC_REVERB,
  'AdventureHouseFoyer': HALLWAY_REVERB,
  'AdventureHouseHallway': HALLWAY_REVERB,
  'Cellar': STONE_ROOM_REVERB,
  'CellarRamp': STONE_CORRIDOR_REVERB,
  'RastafariCave': CAVE_REVERB,
  'Street': CITIES_REVERB,
  'Forest': FORESTS_REVERB,
  'Mountains': MOUNTAINS_REVERB,
  'ParkingLot': PARKING_LOT_REVERB,
  'Alley': ALLEY_REVERB,
  'Hanger': HANGER_REVERB,
  'GrandBallroom': HANGER_REVERB,
  'TheGrandPlayground': HALLWAY_REVERB,
  'GrandDiningRoom': HALLWAY_REVERB,
  'RastaManor2ndFloor': HALLWAY_REVERB,
  'RastaManor3rdFloor': HALLWAY_REVERB,
  'Barn': HANGER_REVERB,
  'Barn2ndFloor': HANGER_REVERB,
  'MeditationHall': HALLWAY_REVERB,
  'MeditationHallWest': NO_REVERB,
  'MeditationHallEast': NO_REVERB,
  'MeditationHallLibrary': NO_REVERB,
};

export function resolveAcousticReverbProfile(area: string): any {
  return REVERB_AREA_MAP[area] || GENERIC_REVERB;
}

export function calculateFMCarrierFrequency(basePitch: number, ratio: number): number {
  return basePitch * ratio;
}

export function calculateExponentialDecay(initialVal: number, decayRate: number, timeDelta: number): number {
  return initialVal * Math.exp(-decayRate * timeDelta);
}
