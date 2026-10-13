import { GameState } from '../../../../../../../../System/Engine/Core/Types';

/**
 * GardenRenderer.tsx
 * Renderer for the Garden of Priscilla's Vanity House.
 * Layout: "It has a lawn field as a garden."
 * Features manicured turf lines, topiary hedges, and neat lawn mowing stripes.
 */
export function drawVanityGarden(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();

  // 1. Manicured Lawn Field
  if (isNight) {
    ctx.fillStyle = '#0f2c14'; // Dark night grass green
  } else {
    ctx.fillStyle = '#2d7c3b'; // Vibrant green turf
  }
  ctx.fillRect(0, horizon, width, height - horizon);

  // Mowing stripes (alternating light-green / dark-green lines)
  ctx.fillStyle = isNight ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.05)';
  for (let s = 0; s < width; s += 60) {
    ctx.fillRect(s, horizon, 30, height - horizon);
  }

  // Individual grass blade tufts scattered on the lawn
  ctx.strokeStyle = isNight ? '#0a1d0d' : '#225d2c';
  ctx.lineWidth = 1;
  for (let b = 1; b <= 25; b++) {
    const bx = (Math.cos(b * 5678.9) * 0.5 + 0.5) * width;
    const by = horizon + 5 + ((Math.sin(b * 91011.12) * 0.5 + 0.5) * (height - horizon - 10));
    
    // Draw three-pronged grass blade
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx - 3, by - 6);
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by - 8);
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + 3, by - 5);
    ctx.stroke();
  }

  // 2. Clear Sky & Hedges at Horizon boundary
  ctx.fillStyle = isNight ? '#050c18' : '#87ceeb'; // Sky
  ctx.fillRect(0, 0, width, horizon);

  // Topiary boundary hedges at the horizon
  ctx.fillStyle = isNight ? '#081c0c' : '#1e4d2b';
  for (let h = -10; h < width + 40; h += 40) {
    ctx.beginPath();
    ctx.arc(h, horizon, 16, 0, Math.PI, true);
    ctx.fill();
  }

  ctx.restore();
}
