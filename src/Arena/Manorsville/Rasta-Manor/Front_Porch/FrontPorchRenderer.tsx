import { GameState, AREA_DIMENSIONS } from '../../../../System/AI/In-Game/Logic/GameLogic';
import { TILES } from '../../../../System/Building_Blocks/BlocksConstants';
import { drawFloorTiling } from '../../../../System/Engine/Science/Graphical_Renderer/General';
import { drawEastHouse, drawWestHouse } from '../Exterior/MiniManorRenderer';

/**
 * FRONT PORCH RENDERER
 * Part of the Rasta-Manor powerhouse.
 */
export function drawFrontPorch(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const currentDims = AREA_DIMENSIONS[state.area];

  ctx.save();
  // Floor (Using centralized building blocks - Marble tiles)
  const stoneTile = TILES.find(t => t.id === 'marble_tile')!;
  const viewScale = width / currentDims.width;
  
  // Calculate scroll based on player position
  const scrollX = -state.gridX * viewScale;
  const scrollY = -state.gridY * viewScale;

  drawFloorTiling(ctx, stoneTile, width, height - horizon, scrollX, scrollY, viewScale * 50);
  
  // Draw floor overlay for darkening
  ctx.fillStyle = isNight ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Ceiling (Wood beams)
  ctx.fillStyle = isNight ? '#0d0d0d' : '#3d2b1f';
  ctx.fillRect(0, 0, width, horizon);

  // View Neighbors when looking East/West
  if (state.direction === 'East') {
    // Distance view of the East Neighbor (Red House)
    const dist = currentDims.width - state.gridX;
    const neighborScale = 400 / (dist + 50);
    drawEastHouse(ctx, width / 2, horizon, neighborScale);
  } else if (state.direction === 'West') {
    // Distance view of the West Neighbor
    const dist = state.gridX;
    const neighborScale = 400 / (dist + 50);
    drawWestHouse(ctx, width / 2, horizon, neighborScale);
  }

  // Railing (East/West edges as visual barriers)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  if (state.direction === 'East') {
     ctx.beginPath();
     ctx.moveTo(width * 0.9, horizon);
     ctx.lineTo(width * 0.9, height);
     ctx.stroke();
  }

  ctx.restore();
}

/**
 * PORCH SOUNDS
 * Placeholder for porch-specific sounds.
 */
export function playPorchAmbient(ctx: AudioContext) {
  // TODO: Implement porch ambient sounds
}
