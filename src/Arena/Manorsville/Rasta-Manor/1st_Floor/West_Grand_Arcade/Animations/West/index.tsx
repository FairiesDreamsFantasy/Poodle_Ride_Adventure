import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * West Grand Arcade West Rendering
 * Handles the view towards the western end of the arcade.
 */
export const drawWestGrandArcadeWest = (ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, horizon: number) => {
  // Arched ceiling and grand perspective
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.1, horizon);
  ctx.quadraticCurveTo(width * 0.5, 0, width * 0.9, horizon);
  ctx.stroke();
};
