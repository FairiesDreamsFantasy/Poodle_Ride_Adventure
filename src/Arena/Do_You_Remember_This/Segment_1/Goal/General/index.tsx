import { GameState } from '../../../../../System/Engine/Core/Types';

export interface ArenaGoalProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export function drawArenaGoal(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  const scaleX = width / 500;
  const scaleY = height / 500;

  // 750ft Goal Buffer Zone
  ctx.fillStyle = '#1A237E'; // Deep blue celebration courtyard
  ctx.fillRect(0, 0, width, height);

  // Checkered Goal Finish Banner
  const checkW = 20 * scaleX;
  for (let x = 0; x < width; x += checkW) {
    for (let y = 100 * scaleY; y < 140 * scaleY; y += checkW) {
      const isWhite = ((Math.floor(x / checkW) + Math.floor(y / checkW)) % 2 === 0);
      ctx.fillStyle = isWhite ? '#FFFFFF' : '#000000';
      ctx.fillRect(x, y, checkW, checkW);
    }
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${Math.max(12, Math.floor(16 * scaleX))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText("FINISH GOAL ZONE - ARENA COURSE COMPLETE!", 250 * scaleX, 220 * scaleY);
}
