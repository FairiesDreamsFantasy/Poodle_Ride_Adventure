import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

/**
 * CollectiblesZoneRenderer.tsx
 * Renderer for The Collectibles Zone in Priscilla's Vanity House.
 * Dimensions: 100 feet wide by 200 feet deep. Carpeted flooring.
 * oriented east of the foyer, shares same ceiling height. Contains shelves and material possessions.
 */
export function drawCollectiblesZone(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();

  // 1. Luxuriously thick carpeted floor (Plush purple or gold-cream velvet pile texture)
  ctx.fillStyle = isNight ? '#2a1a35' : '#eeddbb'; // Soft warm velvet beige
  ctx.fillRect(0, horizon, width, height - horizon);

  // Soft carpet flocking/fluff textured dots
  ctx.fillStyle = isNight ? '#22152d' : '#e4d2ae';
  for (let i = 0; i < 40; i++) {
    const rx = (Math.sin(i * 12345.67) * 0.5 + 0.5) * width;
    const ry = horizon + ((Math.cos(i * 9876.54) * 0.5 + 0.5) * (height - horizon));
    ctx.beginPath();
    ctx.arc(rx, ry, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Display Walls (Dark obsidian or deep velvet with integrated LED neon lighting)
  ctx.fillStyle = isNight ? '#0a0d14' : '#141724';
  ctx.fillRect(0, 0, width, horizon);

  // 3. Luxurious Shelves & Material Possessions
  ctx.fillStyle = '#8b6c42'; // Mahogany shelves framing
  ctx.fillRect(20, 30, 80, 5); // Shelf line 1
  ctx.fillRect(20, 60, 80, 5); // Shelf line 2
  ctx.fillRect(20, 90, 80, 5); // Shelf line 3

  // Illumination lights under shelves
  ctx.fillStyle = "rgba(255, 235, 150, 0.4)";
  ctx.fillRect(20, 35, 80, 4);
  ctx.fillRect(20, 65, 80, 4);
  ctx.fillRect(20, 95, 80, 4);

  // Trophies and collectibles displayed
  // Gold Trophy 1
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(35, 18, 10, 12);
  ctx.beginPath();
  ctx.arc(40, 14, 5, 0, Math.PI * 2);
  ctx.fill();

  // Red Crystal Sculpture
  ctx.fillStyle = '#ff3366';
  ctx.beginPath();
  ctx.moveTo(55, 58);
  ctx.lineTo(60, 42);
  ctx.lineTo(65, 58);
  ctx.closePath();
  ctx.fill();

  // Blue porcelain vase
  ctx.fillStyle = '#0066cc';
  ctx.beginPath();
  ctx.ellipse(80, 80, 6, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
