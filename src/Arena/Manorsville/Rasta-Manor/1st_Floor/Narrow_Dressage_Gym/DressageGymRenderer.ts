import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { TILES, BRICKS, METAL_BARS, GLASS_BLOCKS } from '../../../../../System/Building_Blocks/BlocksConstants';
import { drawFloorTiling, drawBuildingBlock } from '../../../../../System/Engine/Science/Graphical_Renderer/General';
import { DRESSAGE_WIDTH, DRESSAGE_HEIGHT } from './DressageConstants';

export function drawDressageGym(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const { gridX, gridY, level } = state;

  // Background - Deep space for arena
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, 0, width, height);

  const viewScale = 0.5; // Scale for top-down view
  
  // Floor: 1000x2000
  // Hardwood planks from centralized blocks
  const hardwood = TILES.find(t => t.id === 'hardwood_plank')!;
  
  ctx.save();
  // Translate to player relative view if needed, but for now we draw static center
  const offsetX = width / 2 - (gridX * viewScale);
  const offsetY = height / 2 - (gridY * viewScale);
  ctx.translate(offsetX, offsetY);

  // Main Arena Floor
  drawFloorTiling(ctx, hardwood, DRESSAGE_WIDTH * viewScale, DRESSAGE_HEIGHT * viewScale, 0, 0, viewScale * 10);
  
  // Glass Overlay (Semi-transparent layer)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(0, 0, DRESSAGE_WIDTH * viewScale, DRESSAGE_HEIGHT * viewScale);

  // Gallop Lines
  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([20, 10]);
  ctx.lineWidth = 2;
  for (let x = 100; x < DRESSAGE_WIDTH; x += 200) {
    ctx.beginPath();
    ctx.moveTo(x * viewScale, 0);
    ctx.lineTo(x * viewScale, DRESSAGE_HEIGHT * viewScale);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Perimeter Walls (Bricks)
  const brick = BRICKS[0];
  ctx.fillStyle = brick.color || '#b35d4d';
  // South Wall (Labels were flipped)
  ctx.fillRect(0, -10, DRESSAGE_WIDTH * viewScale, 10);
  // North Wall
  ctx.fillRect(0, DRESSAGE_HEIGHT * viewScale, DRESSAGE_WIDTH * viewScale, 10);
  // West Wall
  ctx.fillRect(-10, 0, 10, DRESSAGE_HEIGHT * viewScale);
  
  // West Wall Windows (start from 10 feet)
  ctx.fillStyle = 'rgba(135, 206, 235, 0.4)';
  for (let y = 100 * viewScale; y < DRESSAGE_HEIGHT * viewScale; y += 100 * viewScale) {
    ctx.fillRect(-2, y, 4, 30 * viewScale);
  }

  // East Wall
  ctx.fillRect(DRESSAGE_WIDTH * viewScale, 0, 10, DRESSAGE_HEIGHT * viewScale);

  // North Window (overlooks West Communal Space)
  ctx.fillStyle = 'rgba(135, 206, 235, 0.6)';
  ctx.fillRect(200 * viewScale, DRESSAGE_HEIGHT * viewScale - 2, 80 * viewScale, 4); // 40ft wide window for better view

  // Upper Level Walkway (Sky Level)
  if (level === 'Sky') {
     const glassSquare = GLASS_BLOCKS.find(g => g.id === 'glass_square_2x2')!;
     const walkwayWidth = 20 * viewScale;
     ctx.globalAlpha = 0.8;
     // Glass floor around perimeter
     ctx.fillStyle = glassSquare.color || 'rgba(255,255,255,0.3)';
     // South (Labels were flipped)
     ctx.fillRect(0, 0, DRESSAGE_WIDTH * viewScale, walkwayWidth);
     // North
     ctx.fillRect(0, (DRESSAGE_HEIGHT - 20) * viewScale, DRESSAGE_WIDTH * viewScale, walkwayWidth);
     // West
     ctx.fillRect(0, 0, walkwayWidth, DRESSAGE_HEIGHT * viewScale);
     // East
     ctx.fillRect((DRESSAGE_WIDTH - 20) * viewScale, 0, walkwayWidth, DRESSAGE_HEIGHT * viewScale);
     ctx.globalAlpha = 1.0;

     // Archway to Southwest Mezzanine (South end, Sky Level)
     const archX = 494 * viewScale;
     const archW = 12 * viewScale;
     const archY = 0;

     // Sign on top
     ctx.fillStyle = '#FFD700';
     ctx.font = `bold ${12 * viewScale}px sans-serif`;
     ctx.textAlign = 'center';
     ctx.fillText("SOUTHWEST MEZZANINE", (archX + archW/2), archY + 25 * viewScale);

     // Television Screen above archway
     const tvX = archX - 5 * viewScale;
     const tvY = archY - 10 * viewScale;
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
     
     // Cowboys and Ponies (Simple shapes)
     ctx.fillStyle = '#8B4513'; // Brown pony
     ctx.fillRect(tvX + 5 * viewScale, tvY + 12 * viewScale, 4 * viewScale, 3 * viewScale); 
     ctx.fillStyle = '#CD853F'; // Tan pony
     ctx.fillRect(tvX + 15 * viewScale, tvY + 14 * viewScale, 4 * viewScale, 3 * viewScale);
     
     ctx.fillStyle = '#000'; // Cowboys
     ctx.fillRect(tvX + 6 * viewScale, tvY + 10 * viewScale, 2 * viewScale, 4 * viewScale);
     ctx.fillRect(tvX + 16 * viewScale, tvY + 12 * viewScale, 2 * viewScale, 4 * viewScale);

     // Barred Fence (Metal Bars)
     const brassBar = METAL_BARS.find(m => m.id === 'brass_bar_10ft')!;
     ctx.fillStyle = brassBar.color || '#ffd700';
     // Draw bars along the inner edge of the walkway, skipping archway area
     for (let i = 0; i < DRESSAGE_WIDTH * viewScale; i += 10) {
        if (i >= archX && i <= archX + archW) continue; 
        ctx.fillRect(i, walkwayWidth, 2, 2); // Top perspective of bars
        ctx.fillRect(i, (DRESSAGE_HEIGHT - 20) * viewScale, 2, 2);
     }

     // Seating: Benches (10ft wide)
     const benchW = 10 * viewScale;
     ctx.fillStyle = '#000080'; // Navy Blue for benches
     
     // South Benches with 12ft gap (494-506)
     ctx.fillRect(0, 0, 494 * viewScale, benchW);
     ctx.fillRect(506 * viewScale, 0, (DRESSAGE_WIDTH - 506) * viewScale, benchW);
     
     // North Benches with 12ft gap (494-506)
     ctx.fillRect(0, (DRESSAGE_HEIGHT - 10) * viewScale, 494 * viewScale, benchW);
     ctx.fillRect(506 * viewScale, (DRESSAGE_HEIGHT - 10) * viewScale, (DRESSAGE_WIDTH - 506) * viewScale, benchW);

     // East/West benches (Full)
     ctx.fillRect(0, 0, benchW, DRESSAGE_HEIGHT * viewScale);
     ctx.fillRect((DRESSAGE_WIDTH - 10) * viewScale, 0, benchW, DRESSAGE_HEIGHT * viewScale);
  }

  ctx.restore();

  // HUD/Light Glow
  const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
  grad.addColorStop(0, 'rgba(255, 230, 200, 0.05)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,width,height);
}
