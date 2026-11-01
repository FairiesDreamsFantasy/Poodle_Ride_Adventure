/**
 * System/AI/In-Game/Category/Sound/BGM/General/BGMEngine.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Background Music Track State Machine & Area Theme Dispatcher.
 * 
 * Maps game area states to authentic music themes and manages track transition states:
 * - WandasWarpHouse -> Warp House Reggae/Dub Theme
 * - PoodleRideStoryBookCourse -> Story Book Orchestral Adventure Theme
 * - Soca_Path -> Soca Rhythmic Theme
 * - RastaManor / Foyer -> Grand Manor Theme
 * - Garden / MeditationHall -> Cozy Acoustic Chill Theme
 */

export interface BGMTrackProfile {
  area: string;
  themeName: string;
  baseTempoBpm: number;
  baseGain: number;
  loopIntervalMs: number;
}

export const AREA_BGM_PROFILES: Record<string, BGMTrackProfile> = {
  'WandasWarpHouse': {
    area: 'WandasWarpHouse',
    themeName: 'Warp House Reggae Dub',
    baseTempoBpm: 90,
    baseGain: 0.75,
    loopIntervalMs: 16000
  },
  'PoodleRideStoryBookCourse1_Seg1': {
    area: 'PoodleRideStoryBookCourse1_Seg1',
    themeName: 'Story Book Adventure Theme',
    baseTempoBpm: 120,
    baseGain: 0.8,
    loopIntervalMs: 24000
  },
  'Soca_Path': {
    area: 'Soca_Path',
    themeName: 'Soca Celebration Groove',
    baseTempoBpm: 130,
    baseGain: 0.85,
    loopIntervalMs: 18000
  },
  'Foyer': {
    area: 'Foyer',
    themeName: 'Grand Rasta-Manor Foyer Harmony',
    baseTempoBpm: 100,
    baseGain: 0.7,
    loopIntervalMs: 32000
  },
  'Garden': {
    area: 'Garden',
    themeName: 'Simulated Garden Wind Chimes Ambient',
    baseTempoBpm: 80,
    baseGain: 0.65,
    loopIntervalMs: 40000
  }
};

export function resolveBGMProfileForArea(areaName: string): BGMTrackProfile {
  if (areaName.includes('StoryBook')) {
    return AREA_BGM_PROFILES['PoodleRideStoryBookCourse1_Seg1'];
  }
  return AREA_BGM_PROFILES[areaName] || AREA_BGM_PROFILES['Foyer'];
}
