/**
 * Pink House Dining Room Renderer
 * [PRESERVED ARTISTIC CRAFT]
 */
import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';

export function drawPinkHouseDiningRoom(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / 400; // Based on 400x600, width is 400
  
  // 1. Wooden Hardwood Floor
  ctx.fillStyle = '#deb887';
  ctx.fillRect(0, 0, width, height);
  // Planks
  ctx.strokeStyle = '#8b4513';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 10 * scale) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // 2. White Rug (20% smaller than surface area)
  // 400*0.8 = 320, 600*0.8 = 480
  const rugW = width * 0.8;
  const rugH = height * 0.8;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect((width - rugW) / 2, (height - rugH) / 2, rugW, rugH);

  // 3. Ceramic Tile Walls (White top, colored below)
  // Drawing wall footprint
  ctx.lineWidth = 5 * scale;
  ctx.strokeStyle = '#eee';
  ctx.strokeRect(0, 0, width, height);

  // 4. Multiple Tables
  ctx.fillStyle = '#a0522d';
  for (let y = 100 * scale; y < height; y += 150 * scale) {
    ctx.fillRect(50 * scale, y, 100 * scale, 50 * scale);
    ctx.fillRect(250 * scale, y, 100 * scale, 50 * scale);
  }

  // 5. Upper Level Dining Facility (East 100x600)
  // Cannot ride poodles here (we handle this in collision/logic)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(width - 100 * scale, 0, 100 * scale, height);
  
  // Glass Barrier (6 feet tall)
  ctx.strokeStyle = 'rgba(173, 216, 230, 0.8)';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(width - 100 * scale, 0);
  ctx.lineTo(width - 100 * scale, height);
  ctx.stroke();
}
