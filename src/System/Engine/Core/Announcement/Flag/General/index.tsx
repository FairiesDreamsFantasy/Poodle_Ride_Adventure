import { GameState } from '../../../Types';

// Session-wide absolute singleton tracker to guarantee announcements are made exactly once per game session.
export const sessionAnnouncedKeys = new Set<string>();

/**
 * Announcement Flags Algorithm
 * Prevents repetitive screen-reader announcements for areas, ramps, and landings.
 */
export const checkAnnouncementFlags = (state: GameState, area: string, x: number, y: number): Partial<GameState> => {
  const updates: Partial<GameState> = {};

  // Foyer Southwest Rectangle
  if (area === 'Foyer' && x <= 20 && y <= 1320) {
    if (!state.hasAnnouncedSouthwestRectangle && !sessionAnnouncedKeys.has('southwest_rectangle')) {
      updates.hasAnnouncedSouthwestRectangle = true;
      sessionAnnouncedKeys.add('southwest_rectangle');
    }
  }

  // Lobby Southwest Stairway and Ramps Entry (Announce once per session)
  if (area === 'LobbyStairwayAndRamps' && x <= 220 && y >= 950) {
    if (!state.hasAnnouncedSouthwestStairwayEntry && !sessionAnnouncedKeys.has('southwest_stairway_entry')) {
      updates.hasAnnouncedSouthwestStairwayEntry = true;
      sessionAnnouncedKeys.add('southwest_stairway_entry');
    }
  }

  // Meditation Hall Landings
  if (area === 'MeditationHall' && x <= 20 && y >= 180 && y <= 200) {
    if (!state.hasAnnouncedMeditationRampLanding && !sessionAnnouncedKeys.has('meditation_ramp_landing')) {
      updates.hasAnnouncedMeditationRampLanding = true;
      sessionAnnouncedKeys.add('meditation_ramp_landing');
    }
  }
  
  if (area === 'MeditationHall' && x <= 20 && y <= 140) {
    if (!state.hasAnnouncedMeditationSkyLanding && !sessionAnnouncedKeys.has('meditation_sky_landing')) {
      updates.hasAnnouncedMeditationSkyLanding = true;
      sessionAnnouncedKeys.add('meditation_sky_landing');
    }
  }

  // Elevated Path - Keep these as they are since they are progressive
  if (area === 'ElevatedPath') {
    if (y < 50 && !state.hasAnnouncedElevatedPathEntry && !sessionAnnouncedKeys.has('elevated_path_entry')) {
      updates.hasAnnouncedElevatedPathEntry = true;
      sessionAnnouncedKeys.add('elevated_path_entry');
    }
    if (y >= 450 && y <= 550 && !state.hasAnnouncedElevatedPathHalf1 && !sessionAnnouncedKeys.has('elevated_path_half1')) {
      updates.hasAnnouncedElevatedPathHalf1 = true;
      sessionAnnouncedKeys.add('elevated_path_half1');
    }
    if (y >= 950 && !state.hasAnnouncedElevatedPathHalf2 && !sessionAnnouncedKeys.has('elevated_path_half2')) {
      updates.hasAnnouncedElevatedPathHalf2 = true;
      sessionAnnouncedKeys.add('elevated_path_half2');
    }
  }

  // Wind Chimes - Keep it one-time only as requested for key areas
  const inGardenChimes = area === 'Garden' && y > 1600;
  const inMeditationChimes = area === 'MeditationHall' && y < 400;
  if ((inGardenChimes || inMeditationChimes) && !state.hasAnnouncedWindChimes && !sessionAnnouncedKeys.has('wind_chimes')) {
    updates.hasAnnouncedWindChimes = true;
    sessionAnnouncedKeys.add('wind_chimes');
  }

  // Other Landings and Rooms
  if (area === 'Foyer' && x <= 20 && y >= 1320 && y <= 1370) {
    if (!state.hasAnnouncedSkyRampLanding && !sessionAnnouncedKeys.has('sky_ramp_landing')) {
      updates.hasAnnouncedSkyRampLanding = true;
      sessionAnnouncedKeys.add('sky_ramp_landing');
    }
  }

  // Sky Ramp Ascent/Descent Announcements (Triggered when starting movement on ramp)
  if (area === 'Foyer' && x <= 20 && y > 1370 && y < 1920) {
    if (state.direction === 'North' && !state.hasAnnouncedSkyRampDescent && !sessionAnnouncedKeys.has('sky_ramp_descent')) {
      updates.hasAnnouncedSkyRampDescent = true;
      sessionAnnouncedKeys.add('sky_ramp_descent');
    } else if (state.direction === 'South' && !state.hasAnnouncedSkyRampAscent && !sessionAnnouncedKeys.has('sky_ramp_ascent')) {
      updates.hasAnnouncedSkyRampAscent = true;
      sessionAnnouncedKeys.add('sky_ramp_ascent');
    }
  }

  if (area === 'Cellar' && x <= 20 && y <= 40) {
    if (!state.hasAnnouncedCellarRampLanding && !sessionAnnouncedKeys.has('cellar_ramp_landing')) {
      updates.hasAnnouncedCellarRampLanding = true;
      sessionAnnouncedKeys.add('cellar_ramp_landing');
    }
  }

  if (area === 'Foyer' && (state.level as any) === 'Sky' && !state.hasAnnouncedPerimeterWalkway && !sessionAnnouncedKeys.has('perimeter_walkway')) {
    updates.hasAnnouncedPerimeterWalkway = true;
    sessionAnnouncedKeys.add('perimeter_walkway');
  }

  if (area === 'DishWasherArea' && !state.hasAnnouncedDishWasherRoom && !sessionAnnouncedKeys.has('dishwasher_room')) {
    updates.hasAnnouncedDishWasherRoom = true;
    sessionAnnouncedKeys.add('dishwasher_room');
  }

  // Ramps
  if (state.doorwayStep === 10) {
    if (area === 'Foyer' && state.level === 'Sky' && !state.hasAnnouncedSkyRampUsed && !sessionAnnouncedKeys.has('sky_ramp_used')) {
      updates.hasAnnouncedSkyRampUsed = true;
      sessionAnnouncedKeys.add('sky_ramp_used');
    }
    if (area === 'Cellar' && state.level === 'Cellar' && !state.hasAnnouncedCellarRampUsed && !sessionAnnouncedKeys.has('cellar_ramp_used')) {
      updates.hasAnnouncedCellarRampUsed = true;
      sessionAnnouncedKeys.add('cellar_ramp_used');
    }
  }

  // Lobby transitions to Mezzanine/Cellar
  if (area === 'SouthwestMezzanineStairwayAndRamps' && state.level === 'Sky' && !state.hasAnnouncedLobbyRampRide && !sessionAnnouncedKeys.has('lobby_ramp_ride')) {
    updates.hasAnnouncedLobbyRampRide = true;
    sessionAnnouncedKeys.add('lobby_ramp_ride');
  }

  // Street Sounds - One-time only to avoid repetition
  const inStreetSoundsZone = area === 'Foyer' && y >= 1600;
  if (inStreetSoundsZone && !state.hasAnnouncedStreetSounds && !sessionAnnouncedKeys.has('street_sounds')) {
    updates.hasAnnouncedStreetSounds = true;
    sessionAnnouncedKeys.add('street_sounds');
  }

  // Southeast Coast Warp Room
  if (area === 'SoutheastCoastWarpRoom' && !state.hasAnnouncedSoutheastCoastWarpRoom && !sessionAnnouncedKeys.has('southeast_coast_warp_room')) {
    updates.hasAnnouncedSoutheastCoastWarpRoom = true;
    sessionAnnouncedKeys.add('southeast_coast_warp_room');
  }

  return updates;
};
