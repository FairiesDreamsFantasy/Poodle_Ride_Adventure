/**
 * Pink House Tea Room Renderer
 * [PRESERVED ARTISTIC CRAFT]
 */
import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';
import { renderCoins } from '../../../../../../../../../../../System/Items/Coins';

export function drawPinkHouseTeaRoom(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / 400; // Based on 400x400 dimensions
  
  // 1. Silver Walls with Mirror Finish
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(0, 0, width, height);
  
  // Reflection/Sheen
  const sheen = ctx.createLinearGradient(0, 0, width, height);
  sheen.addColorStop(0, 'rgba(255,255,255,0.2)');
  sheen.addColorStop(0.5, 'rgba(255,255,255,0.05)');
  sheen.addColorStop(1, 'rgba(255,255,255,0.2)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height);

  // 2. Purple Rug (10% smaller than surface area)
  // Rug size = 360x360
  const rugMargin = 20 * scale;
  ctx.fillStyle = '#800080';
  ctx.fillRect(rugMargin, rugMargin, width - rugMargin * 2, height - rugMargin * 2);

  // 3. Tea Tables (10x10 feet) - Spread out and clear path at Y=200
  ctx.fillStyle = '#f5f5f5';
  ctx.strokeStyle = '#333';
  const tableCoords = [
    { x: 100, y: 70 }, { x: 200, y: 70 }, { x: 300, y: 70 },
    { x: 100, y: 330 }, { x: 200, y: 330 }, { x: 300, y: 330 }
  ];
  
  tableCoords.forEach(coord => {
    const tx = coord.x * scale;
    const ty = coord.y * scale;
    ctx.fillRect(tx - 10 * scale, ty - 10 * scale, 20 * scale, 20 * scale); // Larger tables for better detection
    ctx.strokeRect(tx - 10 * scale, ty - 10 * scale, 20 * scale, 20 * scale);
    
    // Small tea cups representation
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(tx, ty, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4. Coins
  if (state.coins) {
    renderCoins(ctx, state.coins.filter(c => c.area === 'PinkHouseTeaRoom'), scale, time);
  }

  // 5. Doors
  ctx.fillStyle = '#8b4513'; // Brown wood
  // West Door (From Foyer) - Y is 200 (centered)
  ctx.fillRect(0, 180 * scale, 5 * scale, 40 * scale);
  // East Door (Backdoor) - Y is 200 (centered)
  ctx.fillRect(width - 5 * scale, 180 * scale, 5 * scale, 40 * scale);
  // South Door (To Dining Room) - X 370-410 (40 feet)
  ctx.fillRect(370 * scale, height - 5 * scale, 40 * scale, 5 * scale);

  // 5. Windows (10x15 feet)
  // We'll represent these as bright rectangles on the walls
  ctx.fillStyle = '#add8e6';
  ctx.fillRect(0, 100 * scale, 2 * scale, 15 * scale); // West
  ctx.fillRect(width - 2 * scale, 100 * scale, 2 * scale, 15 * scale); // East
}
