import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

/**
 * LivingRoomRenderer.tsx
 * Renderer for the Living Room in Priscilla's Vanity House.
 * Dimensions: 100 feet by 100 feet deep. Uses 0 to 100 feet markers from south wall.
 * Filled with excessive gold vanity decorations and worldly possessions.
 */
export function drawVanityLivingRoom(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();

  // 1. Shiny polished Floor (Light brown mahogany parquet)
  ctx.fillStyle = isNight ? '#1e1410' : '#d2b48c';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Parquet line markings or rug
  ctx.strokeStyle = '#8b5a2b';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Large vanity velvet rug
  ctx.fillStyle = '#800020'; // Burgundy
  ctx.beginPath();
  ctx.ellipse(width / 2, horizon + 40, 70, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Wall (Crimson background with gold frames)
  ctx.fillStyle = isNight ? '#240008' : '#9c1c31';
  ctx.fillRect(0, 0, width, horizon);

  // Gold crown molding
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(0, 30, width, 5);

  // 3. Luxurious furniture & possessions (couches, mirrors, and displays)
  // Large vanity mirror reflection outline
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(width / 2 - 30, horizon - 55, 60, 45);
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.strokeRect(width / 2 - 30, horizon - 55, 60, 45);

  // Couch rendering
  ctx.fillStyle = '#4c3527'; // Dark leather Couch
  ctx.fillRect(width / 4 - 30, horizon - 10, 60, 15);
  ctx.fillRect(width * 0.75 - 30, horizon - 10, 60, 15);

  ctx.restore();
}
