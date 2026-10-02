import { GameState, AREA_DIMENSIONS, GRID_SIZE } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { TILES } from '../../../../../System/Building_Blocks/BlocksConstants';
import { drawFloorTiling } from '../../../../../System/Engine/Science/Graphical_Renderer/General';
import { drawRuggedPlayFieldNorth } from './Animations/North';
import { drawRuggedPlayFieldSouth } from './Animations/South';
import { drawRuggedPlayFieldEast } from './Animations/East';
import { drawRuggedPlayFieldWest } from './Animations/West';

export function drawRuggedPlayField(ctx: CanvasRenderingContext2D, width: number, height: number, horizon: number, state: GameState) {
  const currentDims = AREA_DIMENSIONS[state.area] || { width: GRID_SIZE, height: GRID_SIZE };
  const viewScale = width / currentDims.width;

  // Floor (Using centralized forest green tiles)
  const forestTile = TILES.find(t => t.id === 'ceramic_tile_forest')!;
  const scrollX = -state.gridX * viewScale;
  const scrollY = -state.gridY * viewScale;

  drawFloorTiling(ctx, forestTile, width, height - horizon, scrollX, scrollY, viewScale * 50);

  // Forest floor accents (brown and dark green patches)
  for (let i = 0; i < width; i += 100) {
    for (let j = horizon; j < height; j += 100) {
      if ((i + j) % 300 === 0) {
        ctx.fillStyle = "rgba(139, 69, 19, 0.2)"; // Saddle Brown
        ctx.beginPath();
        ctx.arc(i + 25, j + 25, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Circular Rug (Centered at 1000, 1000 in game coordinates)
  const rugRadius = 300;
  const rugX = width / 2;
  const rugY = horizon + (height - horizon) / 2;

  ctx.save();
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.ellipse(rugX, rugY, rugRadius, rugRadius * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#008000";
  ctx.beginPath();
  ctx.ellipse(rugX, rugY, rugRadius - 10, (rugRadius - 10) * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // High Ceiling
  ctx.save();
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, width, horizon * 0.3);
  
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  for (let i = 0; i < width; i += 200) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, horizon * 0.3);
    ctx.stroke();
  }
  ctx.restore();

  // Walls
  ctx.fillStyle = "#2E8B57"; // Sea Green
  ctx.fillRect(0, horizon * 0.3, width, horizon * 0.7);

  // Directional Animation Delegation
  if (state.direction === 'North') {
    drawRuggedPlayFieldNorth(ctx, width, height, state, horizon);
  } else if (state.direction === 'South') {
    drawRuggedPlayFieldSouth(ctx, width, height, state, horizon);
  } else if (state.direction === 'East') {
    drawRuggedPlayFieldEast(ctx, width, height, state, horizon);
  } else if (state.direction === 'West') {
    drawRuggedPlayFieldWest(ctx, width, height, state, horizon);
  }
}
