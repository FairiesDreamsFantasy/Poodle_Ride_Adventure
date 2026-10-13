import { GameState, AREA_DIMENSIONS, GRID_SIZE, FOYER_DESCRIPTIONS, RUGGED_PLAY_FIELD_DESCRIPTIONS, MEDITATION_HALL_DESCRIPTIONS, GARDEN_DESCRIPTIONS, CELLAR_DESCRIPTIONS, getWallDescription } from '../../../../../../AI/In-Game/Logic/GameLogic';
import { 
  MANORSVILLE_PORCH_AHEAD_DESCRIPTION, 
  MANORSVILLE_PORCH_BEHIND_DESCRIPTION, 
  MANORSVILLE_SIDEWALK_GENERAL_DESCRIPTION, 
  MANORSVILLE_STREET_EDGE_DESCRIPTION, 
  MANORSVILLE_STREET_BEHIND_DESCRIPTION,
  getManorsvilleSidewalkInfoDescription,
  getManorsvilleStreetInfoDescription
} from '../../../../../../../Arena/Manorsville/Description/General';

const SW_RECT_X_MAX = 20;
const SW_RECT_Y_MAX = 1320;
const RAMP_Y_MIN = 1000;
const RAMP_Y_MAX = 2000;

export function getWallInteractionDescription(state: GameState): string {
  const { area, gridX, gridY, direction, level } = state;
  const currentDims = AREA_DIMENSIONS[area] || { width: GRID_SIZE, height: GRID_SIZE };
  const isUpper = level === 'Sky';
  
  let desc = "";
  
  if (area === 'Foyer') {
    // Check for specific directional features first
    if (gridY === 1980 && gridX <= 20 && direction === 'South') {
      desc += `${FOYER_DESCRIPTIONS.RHINO_BARRIER}. `;
    } else if (level === 'Sky' && gridX === 1 && gridY >= 1320 && gridY <= 1340 && direction === 'West') {
      desc += `${FOYER_DESCRIPTIONS.PLAYGROUND_ARCHWAY}. `;
    }
    
    // West wall logic
    if (gridX <= 10 && !desc) {
      if (gridY >= 1 && gridY <= 7) {
        desc += `West wall: ${FOYER_DESCRIPTIONS.LIONS_PICTURE}. `;
      } else {
        desc += level === 'Sky' ? "West wall of the Sky Foyer. " : "West wall of the Floor Foyer. ";
      }
    }
    
    // East wall logic
    if (gridX >= currentDims.width - 10 && !desc) {
      desc += isUpper ? `East wall: ${FOYER_DESCRIPTIONS.TAPESTRY}. ` : "East wall. ";
    }
    
    if (gridX <= SW_RECT_X_MAX && gridY >= 1 && gridY <= 1320 && !desc) {
      desc += `You are in the Southwest Rectangle. ${FOYER_DESCRIPTIONS.SOUTHWEST_RECTANGLE}. `;
    }
    
    if (gridY >= currentDims.height - 36 && !desc) {
      if (isUpper) {
        if (gridX >= 300 && gridX <= 700) {
          desc += `On the North wall of the Sky Foyer here is the ${FOYER_DESCRIPTIONS.LIONS_PICTURE}. `;
        } else if (gridX >= 1300 && gridX <= 1700) {
          desc += `On the North wall of the Sky Foyer here are the ${FOYER_DESCRIPTIONS.RABBIT_CARVINGS}. `;
        } else {
          desc += `North wall of the Sky Foyer: ${FOYER_DESCRIPTIONS.NORTH_DOOR}, ${FOYER_DESCRIPTIONS.NORTH_WINDOWS}, and relocated artwork nearby. `;
        }
      } else {
        desc += `North wall: ${FOYER_DESCRIPTIONS.NORTH_DOOR} and ${FOYER_DESCRIPTIONS.NORTH_WINDOWS}. `;
      }
    }
    
    if (gridY <= 36 && !desc) {
      if (level === 'Sky') {
        desc += "South wall of the Sky Foyer. A solid wall high above the South doors. ";
      } else {
        desc += `South wall: ${FOYER_DESCRIPTIONS.SOUTH_DOOR} and ${FOYER_DESCRIPTIONS.SOUTH_WINDOWS}. `;
      }
    }
    
    if (gridX <= SW_RECT_X_MAX && gridY >= 1820 && gridY <= 1835 && !desc) {
      desc += `Cellar Door: ${FOYER_DESCRIPTIONS.CELLAR_DOOR}. `;
    }
    
    if (!desc) {
      if (level === 'Sky') {
        const isNearInnerEdge = (gridX === 90 || gridX === currentDims.width - 90 || gridY === 90 || gridY === currentDims.height - 90);
        const isNearRhinoBarrier = (gridY === RAMP_Y_MAX && gridX >= 1 && gridX <= 8) || (gridX === 8 && gridY >= RAMP_Y_MIN && gridY <= RAMP_Y_MAX);
        
        if (isNearRhinoBarrier) {
          desc = FOYER_DESCRIPTIONS.RHINO_BARRIER;
        } else if (isNearInnerEdge) {
          desc = "You are at the inner edge of the sky foyer, 25 feet above the floor level. A glass barrier with a shiny brass rail prevents you from falling into the center of the foyer.";
        } else if (gridY > currentDims.height - 90) {
          desc = "You are at the North wall of the sky foyer. A grand window offers a view of the street below, far above the North door.";
        } else if (gridY < 90) {
          desc = "You are at the South wall of the sky foyer. A grand window offers a view of the garden below, far above the rainbow glass doors.";
        } else if (gridX < 90) {
          desc = "You are at the West wall of the sky foyer, 25 feet above the floor level.";
        } else if (gridX > currentDims.width - 90) {
          desc = "You are at the East wall of the sky foyer, 25 feet above the floor level.";
        } else {
          desc = "You are on the sky foyer perimeter walkway, elevated 25 feet high with a 20-foot ceiling above.";
        }
      } else {
        desc = "You are in the grand foyer. The ceiling is a staggering 45 feet high and the floor is polished.";
      }
    }
  } else if (area === 'RuggedPlayField') {
    if (gridY >= currentDims.height - 10) desc = RUGGED_PLAY_FIELD_DESCRIPTIONS.NORTH_ARCHWAY;
    else if (gridY <= 10) desc = RUGGED_PLAY_FIELD_DESCRIPTIONS.SOUTH_DOORWAY;
    else desc = RUGGED_PLAY_FIELD_DESCRIPTIONS.MAIN;
  } else if (area === 'MeditationHall') {
    if (gridY >= currentDims.height - 10) desc = MEDITATION_HALL_DESCRIPTIONS.NORTH_DOORWAY;
    else if (gridY <= 10) desc = MEDITATION_HALL_DESCRIPTIONS.SOUTH_DOOR + " " + MEDITATION_HALL_DESCRIPTIONS.SOUTH_WINDOWS;
    else desc = MEDITATION_HALL_DESCRIPTIONS.MAIN;
  } else if (area === 'Garden') {
    if (gridX < currentDims.width * 0.2) {
      desc = "You are at the West fence. It's a peaceful spot with a bench. Opossums are active here at night.";
    } else if (gridY < currentDims.height * 0.2) {
      desc = "You are at the South barrier. You can hear the rumble of the railway tracks below.";
    } else if (gridY > currentDims.height * 0.8) {
      desc = GARDEN_DESCRIPTIONS.NORTH_DOORS;
    } else {
      desc = GARDEN_DESCRIPTIONS.MAIN;
    }
  } else if (area === 'CellarRamp') {
    desc = CELLAR_DESCRIPTIONS.RAMP;
  } else if (area === 'Cellar') {
    desc = CELLAR_DESCRIPTIONS.CELLAR;
  } else if (area === 'Sidewalk') {
    let sidewalkInputDesc = "";
    // In absence of grid coordinates defining the block side, we map direction or use North as default 
    // for this specific handcrafted description block based on the prompt's intent. 
    // We will use the direction the player is facing to provide the specific side's description.
    if (direction === 'North') {
      sidewalkInputDesc = "This is the north of 1900 block. 32,000 feet long. The AdventureHouse is located across the street. The brick sidewalk is red and its built with craftsmanship by everyday people. The sidewalk stretches from the east and west ends of this block. There are houses that are aligned neatly to make it easier for you to find your house with ease.";
    } else if (direction === 'South') {
      sidewalkInputDesc = "This is the south of the 1900 block.";
    } else if (direction === 'West') {
      sidewalkInputDesc = "This is the west of the 1900 block.";
    } else if (direction === 'East') {
      sidewalkInputDesc = "This is the east of the 1900 block.";
    }

    if (gridY <= 8) {
      if (direction === 'South') {
        desc = MANORSVILLE_PORCH_AHEAD_DESCRIPTION;
      } else if (direction === 'North') {
        desc = MANORSVILLE_PORCH_BEHIND_DESCRIPTION;
      } else {
        desc = sidewalkInputDesc;
      }
    } else if (gridY >= currentDims.height - 10) {
      if (direction === 'North') {
        desc = MANORSVILLE_STREET_EDGE_DESCRIPTION;
      } else if (direction === 'South') {
        desc = MANORSVILLE_STREET_BEHIND_DESCRIPTION;
      } else {
        desc = sidewalkInputDesc;
      }
    } else {
      desc = sidewalkInputDesc;
    }
  } else if (area === 'Street') {
    if (direction === 'East') {
      desc = "From markers 8000 to 16,000 from the west; Rasta-Manor is located on your right, south of this street. The Adventure house is located on your left, north of this street.";
    } else if (direction === 'West') {
      desc = "From the markers of 16,000 to 24,000 from the east; Rasta-Manor is on your left, south of this street. The AdventureHouse is on your right, north of this street.";
    } else {
      desc = getManorsvilleStreetInfoDescription(); // Fallback to general street desc if facing North/South
    }
  } else {
    desc = getWallDescription(direction, area, gridX, gridY, level);
  }
  
  return desc;
}
