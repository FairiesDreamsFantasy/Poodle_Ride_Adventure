import { GameState } from '../../../../System/AI/In-Game/Logic/GameLogic';
import { TILES, BRICKS } from '../../../../System/Building_Blocks/BlocksConstants';
import { drawFloorTiling } from '../../../../System/Engine/Science/Graphical_Renderer/General';
import { AREA_DIMENSIONS } from '../../../../System/Engine/Core/Constants';

export function drawWestCommunalSpace(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const { gridX, gridY, level } = state;
  const areaDims = AREA_DIMENSIONS['WestCommunalSpace'];

  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);

  const viewScale = 0.5;
  ctx.save();
  const offsetX = width / 2 - (gridX * viewScale);
  const offsetY = height / 2 - (gridY * viewScale);
  ctx.translate(offsetX, offsetY);

  // Floor: Pink and White checked ceramic (Rastafarian choice)
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

  // Windows at West End (10 feet wide, 10 feet high, repeated along the wall)
  ctx.fillStyle = 'rgba(135, 206, 235, 0.4)'; // Window glass
  const windowSpacing = 50 * viewScale;
  const windowWidth = 10 * viewScale;
  for (let y = 100 * viewScale; y < areaDims.height * viewScale; y += windowSpacing) {
    ctx.fillRect(-2, y, 4, windowWidth); // West wall windows
  }

  // Upper Level Archway Visuals (at South end y=1)
  if (level === 'Sky') {
     const archX = 485 * viewScale;
     const archW = (499 - 485) * viewScale;
     const archY = 0; // South end

     // Sign on top
     ctx.fillStyle = '#FFD700';
     ctx.font = `bold ${12 * viewScale}px sans-serif`;
     ctx.textAlign = 'center';
     ctx.fillText("SPECTATOR AREA", (archX + archW/2), archY + 40 * viewScale);

     // Television Screen above archway
     const tvX = archX - 5 * viewScale;
     const tvY = archY + 15 * viewScale;
     const tvW = archW + 10 * viewScale;
     const tvH = 20 * viewScale;
     
     // Bezel
     ctx.fillStyle = '#333';
     ctx.fillRect(tvX, tvY, tvW, tvH);
     
     // Screen
     ctx.fillStyle = '#000';
     ctx.fillRect(tvX + 2, tvY + 2, tvW - 4, tvH - 4);

     // Screen content: Blue sky, Green horizon
     ctx.fillStyle = '#87CEEB'; // Sky blue
     ctx.fillRect(tvX + 2, tvY + 2, tvW - 4, (tvH - 4) / 2);
     ctx.fillStyle = '#228B22'; // Forest green
     ctx.fillRect(tvX + 2, tvY + 2 + (tvH - 4) / 2, tvW - 4, (tvH - 4) / 2);
     
     // Cowboys and Ponies
     ctx.fillStyle = '#8B4513';
     ctx.fillRect(tvX + 5 * viewScale, tvY + 12 * viewScale, 4 * viewScale, 3 * viewScale); 
     ctx.fillStyle = '#CD853F';
     ctx.fillRect(tvX + 15 * viewScale, tvY + 14 * viewScale, 4 * viewScale, 3 * viewScale);
     
     ctx.fillStyle = '#000';
     ctx.fillRect(tvX + 6 * viewScale, tvY + 10 * viewScale, 2 * viewScale, 4 * viewScale);
     ctx.fillRect(tvX + 16 * viewScale, tvY + 12 * viewScale, 2 * viewScale, 4 * viewScale);
  }

  ctx.restore();
}
