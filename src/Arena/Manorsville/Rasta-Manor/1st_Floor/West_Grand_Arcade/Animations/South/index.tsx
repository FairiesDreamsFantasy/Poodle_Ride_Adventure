import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * West Grand Arcade South Rendering
 */
export const drawWestGrandArcadeSouth = (ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, horizon: number) => {
  ctx.fillStyle = "#2E8B57";
  ctx.fillRect(0, 0, width, horizon);
};
