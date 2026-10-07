/**
 * Sky Foyer Mezzanine Renderer
 */
import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';

export function drawSkyFoyerMezzanine(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number, horizon: number, isNight: boolean, isEvening: boolean) {
  // Upper Foyer Perimeter Walkway (Sky Level)
  // This level maintains the 45-foot ceiling height, providing a consistent sense of space.
  ctx.save();
  ctx.fillStyle = isNight ? "rgba(68, 17, 51, 0.8)" : (isEvening ? "rgba(136, 34, 85, 0.8)" : "rgba(255, 204, 224, 0.8)");
  const walkwayWidth = width * 0.15;
  ctx.fillRect(0, 0, width, walkwayWidth);
  ctx.fillRect(0, height - walkwayWidth, width, walkwayWidth);
  ctx.fillRect(0, 0, walkwayWidth, height);
  ctx.fillRect(width - walkwayWidth, 0, walkwayWidth, height);
  
  // Glass Barrier (7 feet high = 70 units)
  const barrierHeight = 70;
  ctx.strokeStyle = "#d4af37"; // Brass rail
  ctx.lineWidth = 4;
  const x1 = walkwayWidth;
  const y1 = walkwayWidth;
  const x2 = width - walkwayWidth;
  const y2 = height - walkwayWidth;
  
  // Glass base
  ctx.fillStyle = "rgba(173, 216, 230, 0.05)";
  
  // Draw North barrier
  ctx.fillRect(x1, y1 - barrierHeight, x2 - x1, barrierHeight);
  ctx.strokeRect(x1, y1 - barrierHeight, x2 - x1, barrierHeight);
  // Reflection
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.moveTo(x1, y1 - barrierHeight);
  ctx.lineTo(x1 + 50, y1 - barrierHeight);
  ctx.lineTo(x1 + 20, y1);
  ctx.lineTo(x1, y1);
  ctx.fill();

  // Draw South barrier
  ctx.fillStyle = "rgba(173, 216, 230, 0.05)";
  ctx.fillRect(x1, y2, x2 - x1, barrierHeight);
  ctx.strokeRect(x1, y2, x2 - x1, barrierHeight);
  // Reflection
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 50, y2);
  ctx.lineTo(x2 - 20, y2 + barrierHeight);
  ctx.lineTo(x2, y2 + barrierHeight);
  ctx.fill();

  // Draw West barrier
  ctx.fillStyle = "rgba(173, 216, 230, 0.05)";
  const arcYMin = (1320 / 2000) * height;
  const arcYMax = (1340 / 2000) * height;
  
  // Upper West Wall sections
  ctx.fillRect(x1 - barrierHeight, y1, barrierHeight, arcYMin - y1);
  ctx.strokeRect(x1 - barrierHeight, y1, barrierHeight, arcYMin - y1);
  ctx.fillRect(x1 - barrierHeight, arcYMax, barrierHeight, y2 - arcYMax);
  ctx.strokeRect(x1 - barrierHeight, arcYMax, barrierHeight, y2 - arcYMax);
  
  // Archway Opening at y1320-1340
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(x1 - barrierHeight, arcYMin, barrierHeight, arcYMax - arcYMin);
  
  // Reflection on West Glass
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.moveTo(x1 - barrierHeight, y1);
  ctx.lineTo(x1 - barrierHeight, y1 + 50);
  ctx.lineTo(x1, y1 + 20);
  ctx.lineTo(x1, y1);
  ctx.fill();

  // Draw East barrier
  ctx.fillStyle = "rgba(173, 216, 230, 0.05)";
  ctx.fillRect(x2, y1, barrierHeight, y2 - y1);
  ctx.strokeRect(x2, y1, barrierHeight, y2 - y1);
  // Reflection
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.moveTo(x2 + barrierHeight, y2);
  ctx.lineTo(x2 + barrierHeight, y2 - 50);
  ctx.lineTo(x2, y2 - 20);
  ctx.lineTo(x2, y2);
  ctx.fill();
  
  ctx.restore();
}
