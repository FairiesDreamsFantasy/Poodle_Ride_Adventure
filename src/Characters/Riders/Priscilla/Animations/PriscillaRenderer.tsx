import { GameState } from '../../../../System/Engine/Core/Types';

export function drawPriscilla(ctx: CanvasRenderingContext2D, x: number, y: number, state: GameState) {
  // Priscilla: Rides Olga-Olivia.
  // 2-D rendering only.
  
  ctx.save();
  ctx.translate(x, y);
  
  // Outfit (Darker theme)
  ctx.fillStyle = '#2f4f4f'; // Dark Slate Gray
  ctx.fillRect(-6, -15, 12, 15);
  
  // Head
  ctx.fillStyle = '#ffe4c4';
  ctx.beginPath();
  ctx.arc(0, -20, 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Hair (Dark/Sharp)
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.moveTo(-7, -25);
  ctx.lineTo(7, -25);
  ctx.lineTo(5, -15);
  ctx.lineTo(-5, -15);
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();
}
