import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * Rugged Play Field North Rendering
 * Handles the view towards the Foyer.
 */
export const drawRuggedPlayFieldNorth = (ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, horizon: number) => {
  const dist = state.gridY - 2000;
  const scale = 400 / (Math.abs(dist) + 50);

  const doorW = 200 * scale;
  const doorH = 300 * scale;
  const doorX = width / 2 - doorW / 2;
  const doorY = horizon - doorH;

  // North Archway (to Foyer)
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 15 * scale;
  ctx.strokeRect(doorX, doorY, doorW, doorH);

  // Connection indicator
  ctx.fillStyle = "#000";
  ctx.fillRect(doorX + 2, doorY + 2, doorW - 4, doorH - 4);
};
