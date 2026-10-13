import { GameState, AREA_DIMENSIONS } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * ADVENTURE HOUSE RENDERER
 * Part of the Level_0 powerhouse.
 */
export function drawAdventureHouse(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  // Interior floor
  ctx.fillStyle = isNight ? '#1a1a1a' : '#4a4a4a';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Ceiling
  ctx.fillStyle = isNight ? '#0d0d0d' : '#2a2a2a';
  ctx.fillRect(0, 0, width, horizon);

  ctx.restore();
}

/**
 * ADVENTURE HOUSE SOUNDS
 * Placeholder for house-specific sounds.
 */
export function playHouseAmbient(ctx: AudioContext) {
  // TODO: Implement house ambient sounds
}
