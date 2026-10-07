import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * East Grand Arcade East Rendering
 * Handles the view towards the eastern end.
 */
export const drawEastGrandArcadeEast = (ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, horizon: number) => {
  // Grand Arched Perspective
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.1, horizon);
  ctx.quadraticCurveTo(width * 0.5, 0, width * 0.9, horizon);
  ctx.stroke();
};
