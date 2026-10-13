import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

/**
 * DiningRoomAndKitchenRenderer.tsx
 * Renderer for the open-concept Vanity Dining Room & Kitchen Combo.
 * Occupies the 100 to 300 feet markers from the south wall.
 * Designed with glossy cabinetry, custom marble breakfast bar, and silver luxury finishes.
 */
export function drawVanityDiningAndKitchen(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();

  // 1. Sleek Floor (White and gold checkered tile pattern)
  ctx.fillStyle = isNight ? '#0a0d10' : '#f5f5f0';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Checker lines
  ctx.strokeStyle = '#e0cc95';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // 2. Kitchen & Cabinet Walls (Glossy Sage/Slate with silver hardware)
  ctx.fillStyle = isNight ? '#0d1a16' : '#2e3d36';
  ctx.fillRect(0, 0, width, horizon);

  // Cabinets lining the kitchen wall
  ctx.fillStyle = '#4a5d52';
  for (let x = 30; x < width - 60; x += 45) {
    ctx.fillRect(x, 25, 40, 40);
    ctx.strokeStyle = '#c0c0c0'; // Silver trim
    ctx.strokeRect(x, 25, 40, 40);
    
    // Knobs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 35, 45, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Central Marble Island or Long Banquet Dining Table
  ctx.fillStyle = '#ffffff'; // White Italian marble top
  ctx.fillRect(width / 3 - 10, horizon - 8, 45, 12);
  ctx.strokeStyle = '#d4af37'; // Gold base accents
  ctx.strokeRect(width / 3 - 10, horizon - 8, 45, 12);

  // Silver dining chairs/stools
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(width / 3 - 15, horizon + 4, 8, 10);
  ctx.fillRect(width / 3 + 40, horizon + 4, 8, 10);

  ctx.restore();
}
