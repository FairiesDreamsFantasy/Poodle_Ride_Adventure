
import { getMeditationHallEchoState } from "./M/MeditationHallReverbAlgorithms";
import { getPlayAreaEchoState } from "./PlayAreaReverbAlgorithms";

/**
 * Echo Logic Algorithms
 * Determines if internal echo should be enabled or disabled based on the area.
 */

export const getEffectiveEchoState = (area: string, baseDisableInternalEcho: boolean): boolean => {
  const meditationEchoState = getMeditationHallEchoState(area);
  if (meditationEchoState !== null) {
    return meditationEchoState;
  }

  const playAreaEchoState = getPlayAreaEchoState(area);
  if (playAreaEchoState !== null) {
    return playAreaEchoState;
  }
  
  return baseDisableInternalEcho;
};

export const isMeditationArea = (area: string): boolean => {
  return [
    'MeditationHall',
    'MeditationHallLibraryArch',
    'MeditationHallLibrary'
  ].includes(area);
};

export const isInternalReverbEnabled = (area: string, isSpecificMeditationArea: boolean): boolean => {
  return (area.includes('Library') || area === 'GymToArcadeArch' || area === 'MeditationHallLibraryArch' || area === 'WestCommunalNarrowGymArch') && 
         area !== 'GrandBallroom' && 
         !isSpecificMeditationArea;
};
