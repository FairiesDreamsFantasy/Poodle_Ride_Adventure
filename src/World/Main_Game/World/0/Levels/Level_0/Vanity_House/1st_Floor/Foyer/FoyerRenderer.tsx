import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

/**
 * FoyerRenderer.tsx
 * Renderer for the Foyer in Priscilla's Vanity House.
 * Dimensions: 400 feet wide by 400 feet deep.
 * Features 15-foot high elegant doors to allow deep/high jumping crafted poodles to enter.
 */
export function drawVanityFoyer(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  
  // 1. Floor Drawing (Glossy Marble with Gold Joints - Pure Vanity)
  ctx.fillStyle = isNight ? '#201828' : '#e0e0e0';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Tiles layout simulation
  ctx.strokeStyle = '#d4af37'; // Gold joints/accents
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, horizon);
    ctx.lineTo(i, height);
    ctx.stroke();
  }

  // 2. Ceiling and Wall (Matte Plum Color with Gold Rails)
  ctx.fillStyle = isNight ? '#120d1c' : '#4d1e3b';
  ctx.fillRect(0, 0, width, horizon);

  // Decorative wall trim/borders
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(0, horizon - 15, width, 5); // Base rail
  ctx.fillRect(0, 40, width, 4); // Top cornice

  // 3. Huge 15-ft high doorways on flanking sides (oriented towards other rooms)
  // Left door (to Living Room - West)
  ctx.fillStyle = '#8b5a2b'; // Wood framing
  ctx.fillRect(15, horizon - 60, 30, 60);
  ctx.strokeStyle = '#d4af37';
  ctx.strokeRect(15, horizon - 60, 30, 60);

  // Right door (to Collectibles Zone - East)
  ctx.fillRect(width - 45, horizon - 60, 30, 60);
  ctx.strokeRect(width - 45, horizon - 60, 30, 60);
  
  // Labels to identify doors
  ctx.fillStyle = '#ffffff';
  ctx.font = '8px monospace';
  ctx.fillText("LR", 23, horizon - 65);
  ctx.fillText("CZ", width - 38, horizon - 65);

  ctx.restore();
}
