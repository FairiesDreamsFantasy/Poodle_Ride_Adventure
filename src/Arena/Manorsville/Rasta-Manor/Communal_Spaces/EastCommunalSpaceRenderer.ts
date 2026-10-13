import { GameState } from '../../../../System/AI/In-Game/Logic/GameLogic';
import { TILES, BRICKS } from '../../../../System/Building_Blocks/BlocksConstants';
import { drawFloorTiling } from '../../../../System/Engine/Science/Graphical_Renderer/General';
import { AREA_DIMENSIONS } from '../../../../System/Engine/Core/Constants';

export function drawEastCommunalSpace(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const { gridX, gridY } = state;
  const areaDims = AREA_DIMENSIONS['EastCommunalSpace'];

  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);

  const viewScale = 0.5;
  ctx.save();
  const offsetX = width / 2 - (gridX * viewScale);
  const offsetY = height / 2 - (gridY * viewScale);
  ctx.translate(offsetX, offsetY);

  // Floor: Pink and White checked ceramic
  const checkered = TILES.find(t => t.id === 'pink_white_ceramic_checkered') || TILES[0];
  drawFloorTiling(ctx, checkered, areaDims.width * viewScale, areaDims.height * viewScale, 0, 0, viewScale * 10);

  // Perimeter Walls
  const brick = BRICKS[0];
  ctx.fillStyle = brick.color || '#b35d4d';
  // South Wall
  ctx.fillRect(0, -10, areaDims.width * viewScale, 10);
  // North Wall
  ctx.fillRect(0, areaDims.height * viewScale, areaDims.width * viewScale, 10);
  // West Wall
  ctx.fillRect(-10, 0, 10, areaDims.height * viewScale);
  // East Wall
  ctx.fillRect(areaDims.width * viewScale, 0, 10, areaDims.height * viewScale);

  ctx.restore();
}
