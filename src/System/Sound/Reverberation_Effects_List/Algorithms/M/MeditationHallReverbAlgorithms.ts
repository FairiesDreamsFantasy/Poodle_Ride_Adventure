
/**
 * Meditation Hall Reverb Algorithms
 * Handles the specialized echo behaviors for the Meditation Hall and its arches.
 * As confirmed: Meditation hall has poodle's elegant bark with built-in echo/reverb set to "ON".
 */

export const getMeditationHallEchoState = (area: string): boolean | null => {
  const isMeditationHall = area === 'MeditationHall';
  const isLibraryArch = area === 'MeditationHallLibraryArch';
  const isLibrary = area === 'MeditationHallLibrary';
  
  if (isLibrary) {
    return true; // Echo OFF for library interior
  }
  
  if (
    isLibraryArch || 
    area === 'MeditationHallLibraryToLobbyArch'
  ) {
    return true; // Echo OFF
  }
  
  if (
    isMeditationHall || 
    area === 'MeditationHallToBackPorchDoorway' ||
    area === 'SimulatedGardenAreaToMeditationHallDoorway' ||
    area === 'MeditationHallToSimulatedGardenDoorway'
  ) {
    return false; // Echo ON (disableInternalEcho = false)
  }

  if (area.includes('MeditationHall') || area.includes('Library')) {
    return true; // Echo OFF for other related transitions
  }
  
  return null; // Return null if not a specific meditation area algorithm
};

export const isMeditationHallArea = (area: string): boolean => {
  return area.includes('MeditationHall') || area.includes('Library');
};
