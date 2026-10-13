import { GameState } from '../../../System/AI/In-Game/Logic/GameLogic';

/**
 * SIDEWALK RENDERER
 */
export function drawSidewalk(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  // Red brick sidewalk
  ctx.fillStyle = isNight ? '#331111' : '#8b4513';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Sky
  ctx.fillStyle = isNight ? '#000011' : '#87ceeb';
  ctx.fillRect(0, 0, width, horizon);

  ctx.restore();
}
