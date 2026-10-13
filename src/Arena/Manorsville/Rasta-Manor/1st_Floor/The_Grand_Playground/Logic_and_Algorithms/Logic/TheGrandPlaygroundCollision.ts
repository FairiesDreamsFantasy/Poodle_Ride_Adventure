import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { GRAND_PLAYGROUND_OBSTACLES } from '../../../../../../../System/Engine/Core/O/Obstacles';

export function handleTheGrandPlaygroundCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar'
): { isBlocked: boolean; wallDesc: string; msg: string } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  const width = AREA_DIMENSIONS.TheGrandPlayground.width;
  const height = AREA_DIMENSIONS.TheGrandPlayground.height;

  // Sky Level Perimeter Walkway (90 feet wide)
  if (level === 'Sky') {
    const perimeterWidth = 90;
    const inPerimeter = nextX <= perimeterWidth || nextX >= width - perimeterWidth || nextY <= perimeterWidth || nextY >= height - perimeterWidth;
    
    // Check if we are on the ramp transition at x1980-2000
    const onRampArea = nextX >= 1980 && ((nextY >= 1341 && nextY <= 1360.5) || (nextY >= 1959.5 && nextY <= 1979));

    if (!inPerimeter && !onRampArea) {
      isBlocked = true;
      wallDesc = "A glass barrier with a shiny brass rail prevents you from falling into the center of the playground. The perimeter walkway is 90 feet wide here.";
    }
  }

  // Obstacles
  GRAND_PLAYGROUND_OBSTACLES.forEach(obs => {
    // If it's a ramp wall, allow passage at the landing areas
    if (obs.id === 'playground_ramp_railing_left' || obs.id === 'playground_ramp_railing_right') {
      const isTopLanding = nextY >= 1980 && nextY <= 2000;
      const isBottomLanding = nextY >= 1320 && nextY <= 1340;
      if (isTopLanding || isBottomLanding) return;
    }

    if (obs.isWall) {
      if (obs.xMin === obs.xMax) {
        if (((gridX < obs.xMin && nextX >= obs.xMin) || (gridX > obs.xMin && nextX <= obs.xMin)) && nextY >= obs.yMin && nextY <= obs.yMax) {
          isBlocked = true;
          wallDesc = obs.description;
        }
      } else if (obs.yMin === obs.yMax) {
        if (((gridY < obs.yMin && nextY >= obs.yMin) || (gridY > obs.yMin && nextY <= obs.yMin)) && nextX >= obs.xMin && nextX <= obs.xMax) {
          isBlocked = true;
          wallDesc = obs.description;
        }
      }
    } else {
      if (nextX >= obs.xMin && nextX <= obs.xMax && nextY >= obs.yMin && nextY <= obs.yMax) {
        isBlocked = true;
        wallDesc = obs.description;
      }
    }
  });

  // Boundaries for all levels
  if (nextX < 0 || nextX > width || nextY < 0 || nextY > height) {
    // East wall: Allowed transitions (level-agnostic for transitions)
    const isAtFloorDoor = nextY >= 1980 && nextY <= 2000;
    const isAtFloorArchway = nextY >= 410 && nextY <= 430;
    const isAtSkyArchway = nextY >= 1320 && nextY <= 1340;
    
    // South wall: Openings at x0-10 and x1990-2000
    const isAtSouthArcade = nextY <= 0 && ((nextX >= 0 && nextX <= 10) || (nextX >= 1990 && nextX <= 2000));

    // North wall transition to 2nd Floor (y > height)
    const isAtSecondFloorWarp = nextY >= height && nextX >= 1980;

    if ((nextX >= width && (isAtFloorDoor || isAtFloorArchway || isAtSkyArchway)) || isAtSouthArcade || isAtSecondFloorWarp) {
      isBlocked = false;
    } else {
      isBlocked = true;
      if (wallDesc === "") {
        if (nextX <= 0) {
          wallDesc = "You have reached the West wall of the Playground. Centered at 1000 feet are welcoming glass sliding doors leading West to the Communal Store.";
        } else if (nextX >= width) {
          if (level === 'Sky') {
            if (nextY < 1320) {
              wallDesc = `A solid 1320-foot wall borders the East perimeter walkway of the Grand Playground here.`;
            } else if (nextY > 1340) {
              wallDesc = `A solid 660-foot wall borders the East perimeter walkway of the Grand Playground here.`;
            } else {
               wallDesc = "A solid wall separates the Playground from the Foyer here.";
            }
          } else {
            wallDesc = "A solid wall separates the Playground from the Foyer here.";
          }
        } else if (nextY >= height) {
          wallDesc = "You have reached the North wall of the Playground.";
        } else if (nextY <= 0) {
          wallDesc = "A solid wall with gold and green horizontal stripes.";
        }
      }
    }
  }

  return { isBlocked, wallDesc, msg };
}
