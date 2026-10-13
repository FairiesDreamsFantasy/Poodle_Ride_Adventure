import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { drawEastGrandArcadeNorth } from './Animations/North';
import { drawEastGrandArcadeSouth } from './Animations/South';
import { drawEastGrandArcadeEast } from './Animations/East';
import { drawEastGrandArcadeWest } from './Animations/West';

/**
 * Renders the East Grand Arcade.
 * A grand indoor walkway featuring marble floors and high arched ceilings.
 */
export function drawEastGrandArcade(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;

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

  // Directional Animation Delegation
  if (state.direction === 'North') {
    drawEastGrandArcadeNorth(ctx, width, height, state, horizon);
  } else if (state.direction === 'South') {
    drawEastGrandArcadeSouth(ctx, width, height, state, horizon);
  } else if (state.direction === 'East') {
    drawEastGrandArcadeEast(ctx, width, height, state, horizon);
  } else if (state.direction === 'West') {
    drawEastGrandArcadeWest(ctx, width, height, state, horizon);
  }

  ctx.restore();
}
