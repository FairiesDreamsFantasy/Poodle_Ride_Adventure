import { GameState, AREA_DIMENSIONS, GRID_SIZE, FOYER_DESCRIPTIONS, RUGGED_PLAY_FIELD_DESCRIPTIONS, MEDITATION_HALL_DESCRIPTIONS, GARDEN_DESCRIPTIONS, CELLAR_DESCRIPTIONS, getWallDescription } from '../../../../AI/In-Game/Logic/GameLogic';
import { getSkyFoyerWestArchwayDescription, getSkyFoyerGlassBarrierAheadDescription, getSkyFoyerBoundaryAhead } from '../../../../../Description_List/Algorithms/F/FoyerSkyAlgorithms';
import { 
  getFloorFoyerSWRectangleDescription, 
  getFloorFoyerNorthDoorsAhead, 
  getFloorFoyerSouthArchwayAhead, 
  getFloorFoyerWestArchwayAhead,
  getFoyerBoundaryAhead
} from '../../../../../Description_List/Algorithms/F/FoyerFloorAlgorithms';
import { getRuggedPlayFieldDescription, getRuggedPlayFieldAhead } from '../../../../../Description_List/Algorithms/R/RuggedPlayFieldAlgorithms';
import { getSimulatedGardenAreaDescription, getSimulatedGardenAreaAhead } from '../../../../../Description_List/Algorithms/S/SimulatedGardenAlgorithms';
import { getMeditationHallDescription, getMeditationHallAhead, getLibraryDescription, getLibraryAhead } from '../../../../../Description_List/Algorithms/M/MeditationHallAlgorithms';
import { getPlaygroundDescription, getPlaygroundAhead, getArcadeDescription, getArcadeAhead } from '../../../../../Description_List/Algorithms/A/ArcadeAlgorithms';
import { getGymDescription, getGymAhead } from '../../../../../Description_List/Algorithms/G/GymAlgorithms';
import { convertText } from '../../../../Engine/Mathematics/Measurement';
import { MANORSVILLE_STREET_DESCRIPTION, MANORSVILLE_SIDEWALK_GENERAL_DESCRIPTION, getManorsvilleSidewalkInfoDescription, getManorsvilleStreetInfoDescription } from '../../../../../Arena/Manorsville/Description/General';

const SW_RECT_Y_MAX = 1320;
const RAMP_Y_MIN = 1000;
const RAMP_Y_MAX = 2000;

const formatDistance = (val: number, system: 'Imperial' | 'Metric' = 'Imperial'): string => {
  const rounded = Math.round(val);
  if (system === 'Metric') {
    const meters = val * 0.3048;
    if (meters < 0.1) {
      const cm = Math.round(meters * 100);
      if (cm === 1) return "1 centimeter";
      return `${cm} centimeters`;
    }
    return `${meters.toFixed(2)} meters`;
  }

  if (rounded === 0) {
    if (val > 0) {
      const inches = Math.round(val * 12);
      if (inches === 1) return "1 inch";
      if (inches > 0) return `${inches} inches`;
    }
    return "0 feet";
  }
  if (rounded === 1) {
    return "1 Foot";
  }
  return `${rounded} feet`;
};

/**
 * Multi-tap activation logic (e.g., A-A-A or U-U-U).
 * Refactored to General/index.tsx under Keyboards_and_Controllers/Keyboard/Multitap.
 */

export function handleShiftMultiTap(
  count: number, 
  state: GameState, 
  speak: (t: string, l?: string) => void, 
  announce: (t: string) => void
) {
  if (count !== 3) return;

  const { direction, gridX, gridY, level, area, measurementSystem } = state;
  const mt = (t: string) => convertText(t, measurementSystem);
  const currentDims = AREA_DIMENSIONS[area] || { width: GRID_SIZE, height: GRID_SIZE };
  const doorMin = currentDims.width * 0.48;
  const doorMax = currentDims.width * 0.52;
  let desc = "";
  
  if (area === 'Foyer') {
    const isSky = level === 'Sky';
    const areaName = isSky ? "Sky Foyer" : "Floor Foyer";

    // Tarsis Rampway Algorithm (North facing, x1-20, y<=1341)
    if (isSky && direction === 'North' && gridX >= 1 && gridX <= 20 && gridY <= 1341) {
      desc = "Ahead is a tarsis rampway that leads back to Floor Foyer.";
    } 
    // Archway to Grand Playground Perimeter (West facing, y1320-1340, x1-90)
    else if (isSky && direction === 'West' && gridX >= 1 && gridX <= 90 && gridY >= 1320 && gridY <= 1340) {
      desc = getSkyFoyerWestArchwayDescription(gridX, gridY);
    }
    // High-level Western Barrier (West facing, y1341-1980, x70-90)
    else if (isSky && direction === 'West' && gridX >= 70 && gridX <= 90 && gridY >= 1341 && gridY <= 1980) {
      desc = "A barrier is ahead.";
    }
    // Perimeter Walkway Glass Barriers (90ft wide perimeter)
    else if (isSky) {
      if ((direction === 'East' && gridX <= 90 && gridY >= 90 && gridY <= 1910) ||
          (direction === 'North' && gridY <= 90 && gridX >= 90 && gridX <= 1910) ||
          (direction === 'West' && gridX >= 1910 && gridY >= 90 && gridY <= 1910) ||
          (direction === 'South' && gridY >= 1910 && gridX >= 90 && gridX <= 1910)) {
        desc = getSkyFoyerGlassBarrierAheadDescription(direction);
      }
    }

    if (!desc) {
      if (gridY === 1980 && gridX <= 20 && direction === 'South') {
        desc = `${FOYER_DESCRIPTIONS.RHINO_BARRIER}`;
      } else if (gridX <= 10) {
        if (gridY >= 1 && gridY <= 7) {
          desc = `On the west wall here is a ${FOYER_DESCRIPTIONS.LIONS_PICTURE}`;
        } else {
          desc = `You are at the West wall of the ${areaName}.`;
        }
      } else if (gridY <= 36) {
        if (isSky) {
          desc = "You are at the South wall of the Sky Foyer. It is a solid wall high above the South doors.";
        } else {
          desc = `You are at the South wall: ${FOYER_DESCRIPTIONS.SOUTH_DOOR} and ${FOYER_DESCRIPTIONS.SOUTH_WINDOWS}.`;
        }
      } else if (gridX <= 20 && gridY >= 1 && gridY <= 1320) {
        desc = `You are in the Southwest Rectangle. ${FOYER_DESCRIPTIONS.SOUTHWEST_RECTANGLE}`;
      } else if (isSky) {
        if (gridY >= currentDims.height - 36) {
          if (gridX >= 300 && gridX <= 700) {
            desc = `On the North wall of the Sky Foyer here is the ${FOYER_DESCRIPTIONS.LIONS_PICTURE}`;
          } else if (gridX >= 1300 && gridX <= 1700) {
            desc = `On the North wall of the Sky Foyer here are the ${FOYER_DESCRIPTIONS.RABBIT_CARVINGS}`;
          } else {
            desc = `You are at the North wall of the Sky Foyer. Relocated artwork is displayed nearby.`;
          }
        }
      }
    }
    if (desc) {
      speak(mt(desc), 'EN_US');
      announce(mt(desc));
      return;
    }
  }

  if (level === 'Floor') {
    if (direction === 'South' && gridX <= 36 && gridY >= SW_RECT_Y_MAX) {
      desc = "You are facing south in the northwest corner of the foyer. On your right, the west wall features an elegant brass railing. Just ahead, the brass-railed ramp begins its ascent south to the upper foyer. To your left is the vast, open expanse of the main foyer floor. The ceiling above the center is a staggering 45 feet high, while the upper foyer floor straddles the doors 25 feet above you.";
    } else if (gridX <= 36 && gridY >= RAMP_Y_MIN) {
      let artwork = "";
      if (gridX === 1 && gridY >= 1 && gridY <= 7) {
        artwork = ` On the west wall here is a ${FOYER_DESCRIPTIONS.LIONS_PICTURE}`;
      } else if (gridY === currentDims.height && gridX >= doorMin && gridX <= doorMax) {
        artwork = ` On the north wall here are ${FOYER_DESCRIPTIONS.RABBIT_CARVINGS}`;
      } else if (gridY === RAMP_Y_MAX && gridX >= 1 && gridX <= 8) {
        artwork = ` To your south is the ${FOYER_DESCRIPTIONS.RHINO_BARRIER}`;
      } else if (gridX === 8 && gridY >= RAMP_Y_MIN && gridY <= RAMP_Y_MAX) {
        artwork = ` To your west is the ${FOYER_DESCRIPTIONS.RHINO_BARRIER}`;
      }
      desc = `You are in the northwest corner area of the foyer. Position: ${gridX}x, ${gridY}y. Facing ${direction.toLowerCase()}.${artwork}`;
    } else {
      desc = getWallDescription(direction, area, gridX, gridY, level);
    }
  } else {
    desc = getWallDescription(direction, area, gridX, gridY, level);
  }
  
  if (desc) {
    speak(mt(desc), 'EN_US');
    announce(mt(desc));
  }
}

export function handleRegularMultiTap(
  count: number, 
  state: GameState, 
  speak: (t: string, l?: string) => void, 
  announce: (t: string) => void
) {
  const { area, gridX, gridY, direction, level, obstacles, isStrafingEnabled, measurementSystem } = state;
  const mt = (t: string) => convertText(t, measurementSystem);
  const currentDims = AREA_DIMENSIONS[area] || { width: GRID_SIZE, height: GRID_SIZE };

  if (count === 2) {
    let desc = "";
    if (area === 'Foyer') {
      desc = `You are in a massive ${currentDims.width}x${currentDims.height} foyer with high ceilings and a pink and white checked floor. To the North are the high blue doors leading to the street, and to the South is the green and gold striped archway leading to the Rugged Play Field.`;
    } else if (area === 'RuggedPlayField') {
      desc = getRuggedPlayFieldDescription(gridX, gridY, direction);
    } else if (area === 'SimulatedGardenArea') {
      desc = getSimulatedGardenAreaDescription(gridX, gridY, direction);
    } else if (area === 'MeditationHall') {
      desc = getMeditationHallDescription(gridX, gridY, direction);
    } else if (area.includes('MeditationHallLibrary')) {
      desc = getLibraryDescription(gridX, gridY, direction);
    } else if (area === 'TheGrandPlayground') {
      desc = getPlaygroundDescription(gridX, gridY, direction, level);
    } else if (area.includes('Arcade')) {
      desc = getArcadeDescription(area, gridX, gridY, direction);
    } else if (area.includes('Gym')) {
      desc = getGymDescription(area, gridX, gridY, direction);
    } else if (area === 'Garden') {
      desc = `You are in the ${currentDims.width}x${currentDims.height} Garden of Peace. To the North are the rainbow glass doors leading back into the Meditation Hall. To the South is a 40-foot barrier overlooking railway tracks.`;
    } else if (area === 'FrontPorch' || area === 'BackPorch') {
      desc = area === 'FrontPorch' ? `You are on the massive ${currentDims.width}x${currentDims.height} foot Front Porch. The floor is pink and white checked ceramic. To the South is the house, and to the North is the red brick sidewalk.` : `You are on the massive ${currentDims.width}x${currentDims.height} foot Back Porch. The floor is white. To the North is the house, and to the South is the garden.`;
    } else if (area === 'Sidewalk') {
      desc = getManorsvilleSidewalkInfoDescription(currentDims.height);
    } else if (area === 'Street') {
      desc = getManorsvilleStreetInfoDescription();
    } else if (area === 'Soca_Path') {
      desc = `You are on the Soca Path, a snaking path with rolling hills that leads to Allison's Manor. The path is ${currentDims.height} feet long. You can feel the rise and fall of the hills as you ride forward.`;
    } else if (area === 'AllisonsPorch') {
      desc = `You are on the grand white porch of Allison's Manor. The entrance to the foyer is to the North.`;
    } else if (area === 'AllisonsFoyer') {
      desc = `You are in the grand ${currentDims.width}x${currentDims.height} foyer of Allison's Manor. The floor is polished marble and the ceilings are 35 feet high. To the West is Allison's Store and the Northwest Corner Ramps. To the East is the Southeast Warp Room and the Restaurant Communal Dining Facility.`;
    } else if (area === 'WesternWarpRoom') {
      desc = `You are in the Western Specific Warp Station. A barn-themed room with a pink rocking pony and mural walls. To the East is a warp picture of Pablo's Pony Field with a barn frame and a mirror nearby.`;
    } else if (area === 'AllisonsStore') {
      desc = `You are in Allison's Store, a busy ${currentDims.width}x${currentDims.height} retail space. Cash registers chime and staff are busy helping customers. A large glass door leads back to the Foyer.`;
    } else if (area === 'AllisonsMountainsWarpRoom') {
      desc = `You are in the Mountains Specific Warp Room. The walls are decorated with mountain murals. A picture of a Mountain Pass with a rock frame sits on the North wall near a small table and a separator.`;
    } else if (area === 'AllisonsRestaurant') {
      desc = `You are in the Restaurant-Communal Dining Facility. A large space with tables and a busy kitchen where Rastafarian cooks are preparing food.`;
    } else if (area === 'AdventureHouseFoyer') {
      desc = `You are in the Adventure House Foyer, ${currentDims.width} feet wide, 15 feet high, and ${currentDims.height} feet deep. It has checked black and red flooring, white walls, and circular lights of many colors: pink, green, blue, gold, red, yellow, orange, purple, and indigo. There is a statue of a yellow kangaroo reading a book 5 feet from the hallway door, and a large rocking goat with pink horns and hooves 9 feet from the front door.`;
    } else if (area === 'AdventureHouseHallway') {
      desc = `You are in a ${currentDims.width} foot wide, ${currentDims.height} foot long hallway. The door ahead is brown, just like the front door.`;
    } else if (area === 'AdventureHouseTeaRoom') {
      desc = `You are in a ${currentDims.width} by ${currentDims.height} foot tea room with 4 tables. A couple is having tea, and a baby rocks on a red and white rocking horse. The walls are light green and the floor is white ceramic.`;
    } else if (area === 'AdventureHouseNarrowHallway') {
      desc = `You are in a narrow hallway with green carpet and dimmed lighting. The walls are a soft cream color.`;
    } else if (area === 'AdventureHouseMusicRoom') {
      desc = `You are in a small music room with a piano at its center. A pianist is playing public domain music. The walls are dark blue and the floor is polished wood.`;
    } else if (area === 'AdventureHouseBridgeHallway') {
      desc = `You are on a bridge hallway over a town, with 12-foot high safety barriers. You can hear the sounds of the town below through the open windows.`;
    } else if (area === 'AdventureHouseTrenchHallway') {
      desc = `You are in a functional trench hallway with 3 lanes. Gardens are visible above. The floors are ceramic with white and green squares, and the walls and ceiling are blue. You can hear the barks of a Bulldog and a Yellow Poodle from a distance.`;
    } else if (area === 'AdventurePath') {
      desc = `You are on the Outside Path. This is the first of four segments of the Adventure Path. You see Xavier riding a poodle ahead of you!`;
    } else if (area === 'HedgePath') {
      desc = `You are on the Hedge Path. This is the second of four segments. Hedges line both sides. You see Jela riding a poodle in the distance.`;
    } else if (area === 'RastafariCave') {
      desc = `You are in the Rastafari Cave. This is the third of four segments. A gentle glow illuminates the path. You hear the echo of poodle paws.`;
    } else if (area === 'Overpass') {
      desc = `You are on the Overpass Trench Path. This is the fourth of four segments. You can see cars zooming below on the highway.`;
    } else if (area === 'Suburb') {
      desc = `You are in a quiet Suburb. The suburb path is 500 feet long. Houses with gardens line the street.`;
    } else if (area === 'OpenTrench') {
      desc = `You are at the Open Trench. The trench is 800 feet long. Be ready to jump over the water!`;
    } else if (area === 'Cellar') {
      desc = `You are in the Manor Cellar. It is a large, cool space with stone walls and a dusty floor. Shelves of supplies line the perimeter.`;
    } else if (area === 'MeditationHallLibrary') {
      desc = `You are in the Meditation Hall's Library, a ${currentDims.width}x${currentDims.height} space filled with knowledge and peaceful energy. Polished wood shelves line the North wall. At the West end is an archway leading back toward the Lobby, and at the East end is an archway back to the Meditation Hall. A special librarian door with double steel doors and an LED light is at the South center.`;
    } else if (area === 'LobbyStairwayAndRamps') {
      desc = `You are in the Lobby's Southwest Stairway and Ramps, part of Rasta-Manor's 1st Floor. This area connects the Main Lobby with the Mezzanine and the Cellar. The air here is cool, and the sounds of the manor's activities are slightly muffled. You see elegant brass railings and sturdy ramps.`;
    } else if (area === 'SouthwestMezzanineStairwayAndRamps') {
      desc = `You are on the Mezzanine's 1st Floor Stairway and Ramps at the Southwest corner. This elevated area provides a view of the foyer's Northwest corner and features large windows overlooking the manor's surroundings. The floor is well-maintained, and the architecture emphasizes verticality and accessibility.`;
    }
    speak(mt(desc), 'EN_US');
    announce(mt(desc));
  } else if (count === 3) {
    const { level } = state;
    const isSky = level === 'Sky';
    let ahead = "";
    let paces = 0;
    
    if (direction === 'South') {
      paces = gridY;
      if (area === 'Foyer') {
        if (gridX >= 990 && gridX <= 1010) {
          ahead = getFloorFoyerSouthArchwayAhead(paces);
        } else {
          ahead = getFoyerBoundaryAhead('South', paces);
        }
      }
      else if (area === 'RuggedPlayField') {
        ahead = getRuggedPlayFieldAhead(gridX, gridY, direction);
      }
      else if (area === 'SimulatedGardenArea') {
        ahead = getSimulatedGardenAreaAhead(gridX, gridY, direction);
      }
      else if (area === 'MeditationHall') {
        ahead = getMeditationHallAhead(gridX, gridY, direction);
      }
      else if (area.includes('MeditationHallLibrary')) {
        ahead = getLibraryAhead(gridX, gridY, direction);
      }
      else if (area === 'TheGrandPlayground') {
        ahead = getPlaygroundAhead(gridX, gridY, direction, level as any);
      }
      else if (area.includes('Arcade')) {
        ahead = getArcadeAhead(area, gridX, gridY, direction);
      }
      else if (area.includes('Gym')) {
        ahead = getGymAhead(area, gridX, gridY, direction);
      }
      else if (area === 'Garden') ahead = `The 40-foot barrier is ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'FrontPorch') ahead = `The house doors are ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'BackPorch') ahead = `The garden is ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'Sidewalk') ahead = `The porch is ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'Street') ahead = `The sidewalk is ${formatDistance(paces, measurementSystem)} ahead.`;
      else ahead = `The South boundary is ${formatDistance(paces, measurementSystem)} ahead.`;
    } else if (direction === 'North') {
      paces = currentDims.height - gridY;
      if (area === 'Foyer') {
        if (isSky) {
          ahead = getFoyerBoundaryAhead('North', paces);
        } else if (gridX >= 1 && gridX <= 20 && gridY < 1320) {
          ahead = getFloorFoyerSWRectangleDescription(gridX, gridY, paces);
        } else if (gridX >= 990 && gridX <= 1010) {
          ahead = getFloorFoyerNorthDoorsAhead(paces);
        } else {
          ahead = getFoyerBoundaryAhead('North', paces);
        }
      }
      else if (area === 'RuggedPlayField') {
        ahead = getRuggedPlayFieldAhead(gridX, gridY, direction);
      }
      else if (area === 'SimulatedGardenArea') {
        ahead = getSimulatedGardenAreaAhead(gridX, gridY, direction);
      }
      else if (area === 'MeditationHall') {
        ahead = getMeditationHallAhead(gridX, gridY, direction);
      }
      else if (area.includes('MeditationHallLibrary')) {
        ahead = getLibraryAhead(gridX, gridY, direction);
      }
      else if (area === 'TheGrandPlayground') {
        ahead = getPlaygroundAhead(gridX, gridY, direction, level as any);
      }
      else if (area.includes('Arcade')) {
        ahead = getArcadeAhead(area, gridX, gridY, direction);
      }
      else if (area.includes('Gym')) {
        ahead = getGymAhead(area, gridX, gridY, direction);
      }
      else if (area === 'Garden') ahead = `The rainbow glass doors are ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'FrontPorch') ahead = `The sidewalk is ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'BackPorch') ahead = `The house doors are ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'Sidewalk') ahead = `The street is ${formatDistance(paces, measurementSystem)} ahead.`;
      else if (area === 'Street') ahead = `The Adventure House is ${formatDistance(paces, measurementSystem)} ahead.`;
      else ahead = `The North boundary is ${formatDistance(paces, measurementSystem)} ahead.`;
    } else if (direction === 'East') {
      paces = currentDims.width - gridX;
      if (area === 'TheGrandPlayground') {
        ahead = getPlaygroundAhead(gridX, gridY, direction, level);
      } else if (area === 'RuggedPlayField') {
        ahead = getRuggedPlayFieldAhead(gridX, gridY, direction);
      } else if (area.includes('Arcade')) {
        ahead = getArcadeAhead(area, gridX, gridY, direction);
      } else if (area.includes('Gym')) {
        ahead = getGymAhead(area, gridX, gridY, direction);
      } else if (area.includes('MeditationHallLibrary')) {
        ahead = getLibraryAhead(gridX, gridY, direction);
      } else {
        ahead = `The East boundary is ${formatDistance(paces, measurementSystem)} ahead.`;
      }
    } else if (direction === 'West') {
      paces = gridX;
      if (area === 'TheGrandPlayground') {
        ahead = getPlaygroundAhead(gridX, gridY, direction, level);
      } else if (area === 'RuggedPlayField') {
        ahead = getRuggedPlayFieldAhead(gridX, gridY, direction);
      } else if (area.includes('Arcade')) {
        ahead = getArcadeAhead(area, gridX, gridY, direction);
      } else if (area.includes('Gym')) {
        ahead = getGymAhead(area, gridX, gridY, direction);
      } else if (area === 'MeditationHall' || (area as string) === 'MeditationHallLibrary') {
        ahead = area === 'MeditationHall' ? getMeditationHallAhead(gridX, gridY, direction) : getLibraryAhead(gridX, gridY, direction);
      } else if (area === 'Foyer' && gridY >= 1980 && gridY <= 2000) {
        ahead = getFloorFoyerWestArchwayAhead(paces);
      } else {
        ahead = `The West boundary is ${formatDistance(paces, measurementSystem)} ahead.`;
      }
    }
    
    const nextObstacle = obstacles.find(o => !o.isJumped && o.distance > gridY);
    let obstacleMsg = "";
    if (nextObstacle) {
      obstacleMsg = ` Next ${nextObstacle.type} is ${formatDistance(nextObstacle.distance - gridY, measurementSystem)} ahead.`;
    }

    let strafeMsg = "";
    if (isStrafingEnabled) {
      const centerX = currentDims.width / 2;
      const offset = Math.round(gridX - centerX);
      const side = offset < 0 ? "West" : offset > 0 ? "East" : "Center";
      strafeMsg = ` Strafing Position: ${formatDistance(Math.abs(offset), measurementSystem)} ${side} of the center.`;
    }

    let areaDisplay: string = area;
    if (area === 'Foyer') areaDisplay = isSky ? "Sky Foyer" : "Floor Foyer";
    else if (area === 'AllisonsFoyer') areaDisplay = "Allison's Manor";
    else if (area === 'TheGrandPlayground') areaDisplay = "The Grand Playground";

    const ofKeyword = (area === 'TheGrandPlayground' || area === 'AllisonsFoyer') ? "of" : "of the";

    const msg = `You are at position ${gridX}, ${gridY} ${ofKeyword} ${areaDisplay}, facing ${direction}. ${ahead}${obstacleMsg}${strafeMsg}`;
    speak(mt(msg), 'EN_US');
    announce(mt(msg));
  }
}
