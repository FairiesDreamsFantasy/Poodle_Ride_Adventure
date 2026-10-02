import { GameState, AREA_DIMENSIONS } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { drawWestGrandArcadeNorth } from './Animations/North';
import { drawWestGrandArcadeSouth } from './Animations/South';
import { drawWestGrandArcadeEast } from './Animations/East';
import { drawWestGrandArcadeWest } from './Animations/West';

/**
 * WEST GRAND ARCADE RENDERER
 * A distinctive transition lounge with gold accents and a high-quality aesthetic.
 */
export function drawWestGrandArcade(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const currentDims = AREA_DIMENSIONS.WestGrandArcade;

  ctx.save();

  // Floor (Polished White Marble with Gold trim)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Gold Tile Lines
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1;
  const tileSize = 100;
  for (let x = 0; x < width; x += tileSize) {
    ctx.beginPath(); ctx.moveTo(x, horizon); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = horizon; y < height; y += tileSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Walls (Sea Green Art Deco style)
  ctx.fillStyle = "#2E8B57"; // Sea Green
  ctx.fillRect(0, 0, width, horizon);

  // Ceiling (Art Deco Polygons)
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, width, horizon * 0.2);

  // Structural Pillars (12 inches thick as per the pattern)
  const pillarWidth = (1 / currentDims.width) * width; // 1 foot thick
  const pillarSpacing = (100 / currentDims.width) * width; // 100ft spacing
  ctx.fillStyle = '#d4af37'; // Gold Pillars
  for (let x = 0; x < width; x += pillarSpacing) {
    ctx.fillRect(x, 0, pillarWidth, height);
    
    // Cross-bracing "X" logic for structural strength (Artistic visual)
    if (state.pixelRatio >= 0.5) {
      ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + pillarSpacing, horizon);
      ctx.moveTo(x + pillarSpacing, 0);
      ctx.lineTo(x, horizon);
      ctx.stroke();
    }
  }

  // Directional Animation Delegation
  if (state.direction === 'North') {
    drawWestGrandArcadeNorth(ctx, width, height, state, horizon);
  } else if (state.direction === 'South') {
    drawWestGrandArcadeSouth(ctx, width, height, state, horizon);
  } else if (state.direction === 'East') {
    drawWestGrandArcadeEast(ctx, width, height, state, horizon);
  } else if (state.direction === 'West') {
    drawWestGrandArcadeWest(ctx, width, height, state, horizon);
  }

  ctx.restore();
}
