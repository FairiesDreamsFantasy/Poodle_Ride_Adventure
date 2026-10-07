import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { BOILER_WIDTH, BOILER_HEIGHT, ELECTRIC_BOILER_X, ELECTRIC_BOILER_Y, BOILER_WALL_THICKNESS } from './BoilerRoomConstants';

/**
 * BOILER ROOM RENDERER
 * A massive mechanical floor with ceramic tiles and industrial equipment.
 */
export function drawBoilerRoom(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const viewScale = Math.min(width / BOILER_WIDTH, height / BOILER_HEIGHT) * 0.95;
  const offsetX = (width - BOILER_WIDTH * viewScale) / 2;
  const offsetY = (height - BOILER_HEIGHT * viewScale) / 2;

  // 1. Flooring (Ceramic Tile)
  ctx.fillStyle = '#dcdcdc'; // Light Grey Ceramic look
  ctx.fillRect(offsetX, offsetY, BOILER_WIDTH * viewScale, BOILER_HEIGHT * viewScale);

  // Tile Grids
  ctx.strokeStyle = '#a9a9a9';
  ctx.lineWidth = 1;
  const tileSize = 100; // 100ft tiles
  const scaledTile = tileSize * viewScale;
  
  ctx.beginPath();
  for (let sx = 0; sx <= BOILER_WIDTH; sx += tileSize) {
    ctx.moveTo(offsetX + sx * viewScale, offsetY);
    ctx.lineTo(offsetX + sx * viewScale, offsetY + BOILER_HEIGHT * viewScale);
  }
  for (let sy = 0; sy <= BOILER_HEIGHT; sy += tileSize) {
    ctx.moveTo(offsetX, offsetY + sy * viewScale);
    ctx.lineTo(offsetX + BOILER_WIDTH * viewScale, offsetY + sy * viewScale);
  }
  ctx.stroke();

  // 2. Thick Walls (15ft)
  ctx.fillStyle = '#8b4513'; // Brick Brown/Saddle Red
  // Outer Perimeter
  ctx.fillRect(offsetX, offsetY, BOILER_WIDTH * viewScale, BOILER_WALL_THICKNESS * viewScale); // North
  ctx.fillRect(offsetX, offsetY + (BOILER_HEIGHT - BOILER_WALL_THICKNESS) * viewScale, BOILER_WIDTH * viewScale, BOILER_WALL_THICKNESS * viewScale); // South
  ctx.fillRect(offsetX, offsetY, BOILER_WALL_THICKNESS * viewScale, BOILER_HEIGHT * viewScale); // West
  ctx.fillRect(offsetX + (BOILER_WIDTH - BOILER_WALL_THICKNESS) * viewScale, offsetY, BOILER_WALL_THICKNESS * viewScale, BOILER_HEIGHT * viewScale); // East

  // Internal Dividing Walls (Representative)
  ctx.fillRect(offsetX + 2000 * viewScale, offsetY, BOILER_WALL_THICKNESS * viewScale, 4000 * viewScale);
  ctx.fillRect(offsetX + 4000 * viewScale, offsetY + 3000 * viewScale, 4000 * viewScale, BOILER_WALL_THICKNESS * viewScale);

  // 3. Electric Boilers & Pipe Set (Dishwasher Connection)
  // At Exactly 5500ft West, 1000ft South
  const ebX = offsetX + ELECTRIC_BOILER_X * viewScale;
  const ebY = offsetY + (BOILER_HEIGHT - ELECTRIC_BOILER_Y) * viewScale;

  // Blue Electric Boiler Unit
  ctx.fillStyle = '#4682b4'; // Steel Blue
  ctx.fillRect(ebX - 50 * viewScale, ebY - 50 * viewScale, 100 * viewScale, 100 * viewScale);
  
  // The Insulated Pipe & Valve (Crafted Connection)
  ctx.strokeStyle = '#ffffff'; // White insulation
  ctx.lineWidth = 15 * viewScale;
  ctx.beginPath();
  ctx.moveTo(ebX, ebY);
  ctx.lineTo(ebX, ebY - 200 * viewScale); // Vertical rise
  ctx.stroke();

  // Red Valve
  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(ebX, ebY - 100 * viewScale, 10 * viewScale, 0, Math.PI * 2);
  ctx.fill();

  // 4. Main Renewable Oil Boilers
  ctx.fillStyle = '#2f4f4f'; // Dark Slate Blue
  for (let i = 0; i < 3; i++) {
    const rx = offsetX + (1000 + i * 400) * viewScale;
    const ry = offsetY + 3000 * viewScale;
    ctx.fillRect(rx, ry, 150 * viewScale, 300 * viewScale);
    
    // Gauges on Boilers
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(rx + 75 * viewScale, ry + 50 * viewScale, 20 * viewScale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // 5. South Gate (Roll-up Gate to Sidewalk) 30x25
  const gateX = offsetX + 4000 * viewScale;
  const gateY = offsetY + (BOILER_HEIGHT - BOILER_WALL_THICKNESS) * viewScale;
  ctx.fillStyle = '#333333';
  ctx.fillRect(gateX - 15 * viewScale, gateY, 30 * viewScale, BOILER_WALL_THICKNESS * viewScale);

  // 6. Player Marker
  const playerX = offsetX + state.gridX * viewScale;
  const playerY = offsetY + (BOILER_HEIGHT - state.gridY) * viewScale;

  ctx.fillStyle = '#ffcc00';
  ctx.beginPath();
  ctx.arc(playerX, playerY, 15 * viewScale, 0, Math.PI * 2);
  ctx.fill();

  // Label
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = `${20 * viewScale}px "Inter"`;
  ctx.fillText("B2 BOILER ROOM", offsetX + 100 * viewScale, offsetY + 150 * viewScale);
}
