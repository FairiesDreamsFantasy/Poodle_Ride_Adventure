import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { TILES, WALL_PANELS } from '../../../../../System/Building_Blocks/BlocksConstants';
import { drawFloorTiling } from '../../../../../System/Engine/Science/Graphical_Renderer/General';

export function drawGrandGym(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const { gridX, gridY } = state;
  const viewScale = 0.5;

  // Background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  const offsetX = width / 2 - (gridX * viewScale);
  const offsetY = height / 2 - (gridY * viewScale);
  ctx.translate(offsetX, offsetY);

  // Orange & White Grid Floor (2000x2000)
  const gymWidth = 2000;
  const gymHeight = 2000;
  
  const whiteTile = TILES.find(t => t.id === 'ceramic_tile_white')!;
  drawFloorTiling(ctx, whiteTile, gymWidth * viewScale, gymHeight * viewScale, 0, 0, viewScale * 50);

  ctx.strokeStyle = '#ff8c00'; // Orange borders for the grand grid
  ctx.lineWidth = 2;
  const step = 200 * viewScale;
  for (let i = 0; i <= gymWidth * viewScale; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, gymHeight * viewScale);
    ctx.stroke();
  }
  for (let j = 0; j <= gymHeight * viewScale; j += step) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(gymWidth * viewScale, j);
    ctx.stroke();
  }

  // Walls (White with colorful circles)
  ctx.fillStyle = '#ffffff';
  // Simplified wall boundaries
  ctx.fillRect(-10, -10, gymWidth * viewScale + 20, 10);
  ctx.fillRect(-10, gymHeight * viewScale, gymWidth * viewScale + 20, 10);
  ctx.fillRect(-10, 0, 10, gymHeight * viewScale);
  ctx.fillRect(gymWidth * viewScale, 0, 10, gymHeight * viewScale);

  // Shiny colorful circles on walls
  const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'];
  ctx.globalAlpha = 0.6;
  for(let i=0; i<100; i++) {
     const cx = Math.sin(i * 123.45) * gymWidth * viewScale;
     const cy = Math.cos(i * 456.78) * gymHeight * viewScale;
     ctx.fillStyle = colors[i % colors.length];
     ctx.beginPath();
     ctx.arc(cx, cy, 5 * (1 + Math.sin(time/1000 + i)), 0, Math.PI * 2);
     ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Padded Panels (Centralized Blocks)
  const padded = WALL_PANELS.find(p => p.id === 'padded_panel_gym')!;
  ctx.fillStyle = padded.color || '#ffffff';
  // Draw some padding at corners or edges
  ctx.fillRect(0, 0, 10, 100); 

  ctx.restore();
}
