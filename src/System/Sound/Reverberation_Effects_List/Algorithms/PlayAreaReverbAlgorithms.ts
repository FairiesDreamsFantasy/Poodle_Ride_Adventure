
/**
 * Play Area Reverb Algorithms
 * Handles Rugged Play Field and Playground transition logic.
 */

export const getPlayAreaEchoState = (area: string): boolean | null => {
  // Arches going to/from Foyer and Rugged Play Field
  const playFieldArches = [
    'RuggedPlayFieldToFloorArchway',
    'GrandPlaygroundToFloorFoyerArchway',
    'SkyFoyerToPlaygroundPerimeterArchway',
    'RuggedPlayfieldToSimulatedGardenArchway'
  ];

  if (playFieldArches.includes(area)) {
    return false; // Echo ON as requested (poodle internal echo)
  }

  return null;
};
