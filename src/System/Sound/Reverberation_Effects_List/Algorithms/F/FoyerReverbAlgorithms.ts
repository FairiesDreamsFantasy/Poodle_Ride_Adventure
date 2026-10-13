
import { GENERIC_REVERB } from "../../index";

/**
 * Foyer Reverb Algorithms
 * Specialized reverb mapping for Foyer and gallery areas.
 */

export const getFoyerReverbProfile = (area: string): any | null => {
  const foyerAreas = [
    'Foyer', 
    'FloorFoyer',
    'SkyFoyer',
    'AllisonsFoyer', 
    'AdventureHouseFoyer', 
    'AdventureHouseTeaRoom', 
    'GymToDressageArch'
  ];
  
  if (foyerAreas.includes(area)) {
    return GENERIC_REVERB;
  }
  
  return null;
};

export const isFoyerArea = (area: string): boolean => {
  return area.includes('Foyer') || area.includes('FoyerFloor') || area.includes('SkyFoyer');
};
