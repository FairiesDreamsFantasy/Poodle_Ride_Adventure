import { GameState } from '../../../../../../../../System/Engine/Core/Types';

/**
 * PorchRenderer.tsx
 * Renderer for the Porch in Priscilla's Vanity House.
 * Width: 600 feet, Depth: 15 feet.
 * Features:
 *  - Veranda style ceiling Overhang (Yes)
 *  - Vanity lights (True - Pure Vanity)
 *  - Ultra-vanity flooring (Pearlescent marble shimmer)
 *  - Ultra-vanity fence (Gold balusters)
 */
export function drawVanityPorch(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();

  // 1. Ultra-vanity shimmery Pearl Flooring
  const gradient = ctx.createLinearGradient(0, horizon, 0, height);
  if (isNight) {
    gradient.addColorStop(0, '#2e1d3c');
    gradient.addColorStop(1, '#1b1026');
  } else {
    gradient.addColorStop(0, '#f9f6f0'); // Creamy pearl white
    gradient.addColorStop(1, '#eee6d5');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, horizon, width, height - horizon);

  // Iridescent shimmery highlight specs
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  for (let s = 10; s < width; s += 80) {
    ctx.fillRect(s, horizon + 15, 12, 1.5);
    ctx.fillRect(s + 30, horizon + 30, 8, 1);
  }

  // 2. Overhang Ceiling (Yes!)
  ctx.fillStyle = isNight ? '#140c1e' : '#4d2b40';
  ctx.fillRect(0, 0, width, 45); // Ceil structural overhang

  // 3. Vanity lights (True)
  const globes = [width * 0.15, width * 0.35, width * 0.55, width * 0.75, width * 0.95];
  globes.forEach(x => {
    // Glow aura
    ctx.fillStyle = isNight ? 'rgba(255, 215, 0, 0.28)' : 'rgba(255, 225, 160, 0.15)';
    ctx.beginPath();
    ctx.arc(x, 43, 22, 0, Math.PI * 2);
    ctx.fill();

    // Actual lamp globe
    ctx.fillStyle = '#ffdf00'; // Warm golden yellow
    ctx.beginPath();
    ctx.arc(x, 43, 6, 0, Math.PI * 2);
    ctx.fill();

    // Sconce holder
    ctx.fillStyle = '#8b6c42';
    ctx.fillRect(x - 2, 28, 4, 15);
  });

  // 4. Ultra-vanity Fence (Golden baroque baluster balustrade)
  ctx.fillStyle = '#d4af37'; // Pure gold colored fence
  // Top handrail
  ctx.fillRect(0, height - 25, width, 5);
  // Bottom shoe-rail
  ctx.fillRect(0, height - 6, width, 4);

  // Individual baluster pickets
  for (let p = 15; p < width; p += 16) {
    ctx.fillRect(p, height - 20, 4, 14); // Core picket
    // Little decorative sphere on each picket
    ctx.beginPath();
    ctx.arc(p + 2, height - 13, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
