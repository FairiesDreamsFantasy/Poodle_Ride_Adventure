import { AREA_DIMENSIONS } from '../../../../System/Engine/Core/Constants';

export function handleCommunalStoreCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar'
): { isBlocked: boolean; wallDesc: string; msg: string } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  const width = AREA_DIMENSIONS.CommunalStore.width; // 1000
  const height = AREA_DIMENSIONS.CommunalStore.height; // 2000

  // Pillars Collisions: circle collisions for 4 aesthetics pillars
  const pillars = [
    { x: width * 0.15, y: 500, radius: 15 },
    { x: width * 0.35, y: 1500, radius: 15 },
    { x: width * 0.55, y: 500, radius: 15 },
    { x: width * 0.75, y: 1500, radius: 15 },
  ];

  for (const pillar of pillars) {
    const dx = nextX - pillar.x;
    const dy = nextY - pillar.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pillar.radius) {
      isBlocked = true;
      wallDesc = `A sturdy structural support pillar crafted with dark metallic gold bands and brass rings prevents you from passing here.`;
      return { isBlocked, wallDesc, msg };
    }
  }

  // Booth Obstacle Collisions
  const booths = [
    { name: "Rasta Crafts", xMin: width * 0.2 - 10, xMax: width * 0.2 + 170, yMin: 920, yMax: 1015 },
    { name: "Empress Herbals & Tea", xMin: width * 0.55 - 10, xMax: width * 0.55 + 190, yMin: 920, yMax: 1015 },
    { name: "Poodle Accessories", xMin: width * 0.78 - 10, xMax: width * 0.78 + 170, yMin: 920, yMax: 1015 }
  ];

  for (const booth of booths) {
    if (nextX >= booth.xMin && nextX <= booth.xMax && nextY >= booth.yMin && nextY <= booth.yMax) {
      isBlocked = true;
      wallDesc = `You approach the beautifully polished counter of the ${booth.name} booth. The friendly dreadlocked clerk in a vintage dress smiles warmly.`;
      return { isBlocked, wallDesc, msg };
    }
  }

  // Cellar goods trapdoor/shutter collision (subtle bump but not completely blocked unless wanted)
  const trapXMin = width * 0.45;
  const trapXMax = width * 0.45 + 140;
  const trapYMin = height - 90;
  const trapYMax = height - 20;
  if (nextX >= trapXMin && nextX <= trapXMax && nextY >= trapYMin && nextY <= trapYMax) {
    // Just a notice of the shutter floor, not blocked
    msg = "You gallop smoothly over the heavy golden brass frame of the cellar goods shutter.";
  }

  // Boundary logic
  if (nextX < 0 || nextX > width || nextY < 0 || nextY > height) {
    // East wall: sliding glass door at y990-1010 leading to Playground
    const isAtEastDoor = nextY >= 990 && nextY <= 1010;
    // West wall: sliding glass door at y990-1010 leading to West Manor Path
    const isAtWestDoor = nextY >= 990 && nextY <= 1010;
    // North wall: sliding glass door at x490-510 leading to Porch
    const isAtNorthDoor = nextX >= 490 && nextX <= 510;
    // North wall: Roll-up gate from x20 to x60 leads to transition or delivers goods
    const isAtNorthRollupGate = nextX >= 20 && nextX <= 60;

    if ((nextX >= width && isAtEastDoor) || (nextX <= 0 && isAtWestDoor) || (nextY >= height && (isAtNorthDoor || isAtNorthRollupGate))) {
      isBlocked = false;
    } else {
      isBlocked = true;
      if (nextX <= 0) {
        wallDesc = "A solid, fire-resistant ceramic tile wall. A sliding glass door is centered at 1000 feet.";
      } else if (nextX >= width) {
        wallDesc = "A solid, fire-resistant ceramic tile wall. A sliding glass door is centered at 1000 feet.";
      } else if (nextY >= height) {
        wallDesc = "A massive 45-foot-high fire-resistant wall at the north end of the communal store. Welcoming glass sliding doors are centered at 500 feet.";
      } else if (nextY <= 0) {
        wallDesc = "A solid, fire-resistant ceramic tile wall looking south with large clear window frames overlooking the gardens.";
      }
    }
  }

  return { isBlocked, wallDesc, msg };
}
