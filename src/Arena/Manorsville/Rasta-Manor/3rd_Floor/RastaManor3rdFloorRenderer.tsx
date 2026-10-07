import { GameState } from '../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * RASTA-MANOR 3RD FLOOR RENDERER (Placeholder)
 */
export function drawRastaManor3rdFloor(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  ctx.save();
  
  // Floor
  ctx.fillStyle = '#d0d0d0';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Walls
  ctx.fillStyle = '#eeeeee';
  ctx.fillRect(0, 0, width, horizon);
  
  // Placeholder text
  ctx.fillStyle = '#000000';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('RASTA-MANOR 3RD FLOOR (PLACEHOLDER)', width / 2, height / 2);
  
  ctx.restore();
}
