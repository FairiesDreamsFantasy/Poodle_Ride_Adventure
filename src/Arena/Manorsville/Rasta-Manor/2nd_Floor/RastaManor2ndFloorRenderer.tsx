import { GameState } from '../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * RASTA-MANOR 2ND FLOOR RENDERER (Placeholder)
 */
export function drawRastaManor2ndFloor(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  ctx.save();
  
  // Floor
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Walls
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, width, horizon);
  
  // Placeholder text
  ctx.fillStyle = '#000000';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('RASTA-MANOR 2ND FLOOR (PLACEHOLDER)', width / 2, height / 2);
  
  ctx.restore();
}
