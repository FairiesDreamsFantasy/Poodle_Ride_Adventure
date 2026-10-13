import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * Rugged Play Field South Rendering
 * Handles the view towards the Simulated Garden Area.
 */
export const drawRuggedPlayFieldSouth = (ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, horizon: number) => {
  const dist = state.gridY;
  const scale = 400 / (dist + 50);

  const doorW = 200 * scale;
  const doorH = 300 * scale;
  const doorX = width / 2 - doorW / 2;
  const doorY = horizon - doorH;

  // South Doorway (to Simulated Garden Area)
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 15 * scale;
  ctx.strokeRect(doorX, doorY, doorW, doorH);
};
