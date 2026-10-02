import { GameState } from '../../../System/AI/In-Game/Logic/GameLogic';
import { drawMiniManor, drawEastHouse, drawWestHouse } from '../Rasta-Manor/Exterior/MiniManorRenderer';

/**
 * STREET RENDERER
 */
export function drawStreet(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  // Asphalt street
  ctx.fillStyle = isNight ? '#0a0a0a' : '#333333';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Sky
  ctx.fillStyle = isNight ? '#000011' : '#87ceeb';
  ctx.fillRect(0, 0, width, horizon);

  // Distant views
  const scale = 0.3;
  const manorX = width / 2;
  
  drawMiniManor(ctx, manorX, horizon, scale, time);
  drawEastHouse(ctx, manorX + 300 * scale, horizon, scale);
  drawWestHouse(ctx, manorX - 300 * scale, horizon, scale);

  // Yellow lines
  ctx.strokeStyle = '#ffff00';
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(width / 2, horizon);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  ctx.restore();
}
