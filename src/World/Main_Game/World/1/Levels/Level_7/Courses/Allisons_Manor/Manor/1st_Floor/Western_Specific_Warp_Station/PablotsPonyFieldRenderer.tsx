import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';
import { drawAlvita } from '../../../../../../../../../../../Characters/Alvita/AlvitaRenderer';

/**
 * Renders Pablo's Pony Ride Field course.
 * 20,000 feet long.
 */
export function drawPonyField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const dist = 20000 - state.gridX; // Progress from East (20000) to West (0)
  const horizon = height * 0.4;

  // Background: Sky & Farmland
  ctx.fillStyle = "#87CEEB"; // Sky
  ctx.fillRect(0, 0, width, horizon);
  
  // Distant farm hills
  ctx.fillStyle = "#2E7D32"; // Dark Green
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(width, horizon);
  const hillScale = width / 1000;
  for (let i = 0; i <= 10; i++) {
    const x = i * 100 * hillScale;
    const h = 15 + Math.sin(i + (dist / 2000)) * 10;
    ctx.lineTo(x, horizon - h);
  }
  ctx.lineTo(width, horizon);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();

  // Brick Path (20ft wide conceptually)
  const pathWidth = width * 0.5;
  const finalPathX = (width - pathWidth) / 2;
  ctx.fillStyle = "#D7CCC8"; // Light brick/stone color
  ctx.fillRect(finalPathX, horizon, pathWidth, height - horizon);
  
  // Brick Pattern (Horizontal lines for scale)
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    const yPos = horizon + (i / 20) * (height - horizon);
    ctx.beginPath();
    ctx.moveTo(finalPathX, yPos);
    ctx.lineTo(finalPathX + pathWidth, yPos);
    ctx.stroke();
  }

  // --- Alvita & Pablo Appearance ---
  // They appear around 10,000ft mark
  if (Math.abs(dist - 10000) < 1000) {
    const relDist = 10000 - dist;
    const alvitaX = finalPathX + pathWidth * 0.7; // Riding on the side of the path
    const alvitaY = horizon + (height - horizon) * 0.5 + (relDist / 10);
    const alvitaScale = 0.5 + (1.0 - Math.abs(relDist) / 1000);
    if (alvitaScale > 0) {
      drawAlvita(ctx, alvitaX, alvitaY, alvitaScale, true, time);
    }
  }

  // Course info
  ctx.fillStyle = "white";
  ctx.font = "bold 24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`Western Pony Course: ${Math.floor(dist)}ft / 20,000ft`, width / 2, 50);
  
  if (dist > 19500) {
    ctx.fillText("Victory! The course is complete.", width / 2, 100);
  } else if (dist > 15000) {
    ctx.fillText("Speeding Westward... home is far behind.", width / 2, 100);
  }
}
