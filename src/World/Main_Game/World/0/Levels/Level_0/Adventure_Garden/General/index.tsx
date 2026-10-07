import { GameState } from '../../../../../../../../System/Engine/Core/Types';

export interface AdventureGardenProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export function drawAdventureGarden(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  // 1000 x 1000 Garden Canvas
  const scaleX = width / 1000;
  const scaleY = height / 1000;

  // Lush green garden background
  ctx.fillStyle = '#2E7D32'; // Forest green
  ctx.fillRect(0, 0, width, height);

  // Garden flowerbeds and grass patches
  ctx.fillStyle = '#388E3C';
  ctx.fillRect(50 * scaleX, 50 * scaleY, 350 * scaleX, 800 * scaleY);
  ctx.fillRect(600 * scaleX, 50 * scaleY, 350 * scaleX, 800 * scaleY);

  // Decorative flower dots
  const flowerColors = ['#E91E63', '#FFEB3B', '#9C27B0', '#FF9800', '#2196F3'];
  for (let i = 0; i < 60; i++) {
    const fx = ((i * 137) % 800 + 100) * scaleX;
    const fy = ((i * 269) % 750 + 100) * scaleY;
    if (Math.abs(fx - 500 * scaleX) > 40 * scaleX) { // Don't block center path
      ctx.fillStyle = flowerColors[i % flowerColors.length];
      ctx.beginPath();
      ctx.arc(fx, fy, 4 * scaleX, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 20-ft wide central garden path (X = 490 to 510)
  ctx.fillStyle = '#D7CCC8'; // Warm cobblestone path
  ctx.fillRect(490 * scaleX, 0, 20 * scaleX, 900 * scaleY);

  // Dirt Road under the bridge at Y = 900 to 930
  ctx.fillStyle = '#8D6E63'; // Rich brown dirt road
  ctx.fillRect(0, 900 * scaleY, width, 30 * scaleY);

  // Animated Cowboys & Cowgirls riding horses and ponies on dirt road
  const riderOffset1 = ((time * 0.05) % 1200) - 100;
  const riderOffset2 = (1200 - ((time * 0.04) % 1200)) - 100;

  // Rider 1 (Cowboy on Brown Horse moving East)
  const r1X = riderOffset1 * scaleX;
  const r1Y = 910 * scaleY;
  ctx.fillStyle = '#5D4037'; // Horse body
  ctx.fillRect(r1X, r1Y, 20 * scaleX, 10 * scaleY);
  ctx.fillStyle = '#3E2723'; // Rider hat
  ctx.fillRect(r1X + 5 * scaleX, r1Y - 8 * scaleY, 8 * scaleX, 5 * scaleY);

  // Rider 2 (Cowgirl on White Pony moving West)
  const r2X = riderOffset2 * scaleX;
  const r2Y = 920 * scaleY;
  ctx.fillStyle = '#E0E0E0'; // Pony body
  ctx.fillRect(r2X, r2Y, 16 * scaleX, 8 * scaleY);
  ctx.fillStyle = '#AD1457'; // Cowgirl hat
  ctx.fillRect(r2X + 4 * scaleX, r2Y - 7 * scaleY, 7 * scaleX, 4 * scaleY);

  // 20-ft Bridge over the Dirt Road at Y = 890 to 940, X = 490 to 510
  ctx.fillStyle = '#A1887F'; // Wooden bridge planks
  ctx.fillRect(485 * scaleX, 890 * scaleY, 30 * scaleX, 50 * scaleY);

  // Wooden Bridge Railings
  ctx.fillStyle = '#4E342E';
  ctx.fillRect(482 * scaleX, 890 * scaleY, 4 * scaleX, 50 * scaleY);
  ctx.fillRect(514 * scaleX, 890 * scaleY, 4 * scaleX, 50 * scaleY);

  // North Path from Bridge to Selector House South Gate (Y = 940 to 1000)
  ctx.fillStyle = '#D7CCC8';
  ctx.fillRect(490 * scaleX, 940 * scaleY, 20 * scaleX, 60 * scaleY);

  // Selector House South Gate indicator
  ctx.fillStyle = '#1B5E20';
  ctx.fillRect(480 * scaleX, 990 * scaleY, 40 * scaleX, 10 * scaleY);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${Math.max(10, Math.floor(12 * scaleX))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText("SELECTOR HOUSE SOUTH GATE", 500 * scaleX, 985 * scaleY);
}
