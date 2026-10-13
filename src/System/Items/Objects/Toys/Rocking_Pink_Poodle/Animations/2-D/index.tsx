import { ROCKING_PINK_POODLE_COLORS } from '../Color_Palette';

/**
 * Rocking Pink Poodle 2-D Rendering Logic
 */
export function drawRockingPinkPoodle2D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  rockingAngle: number = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rockingAngle * Math.PI) / 180);

  // Rockers
  ctx.lineWidth = 4 * scale;
  ctx.strokeStyle = ROCKING_PINK_POODLE_COLORS.rockers;
  ctx.beginPath();
  ctx.arc(0, 10 * scale, 50 * scale, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  // Body (Simplified for 2D Registry)
  ctx.fillStyle = ROCKING_PINK_POODLE_COLORS.body;
  ctx.beginPath();
  ctx.ellipse(0, -10 * scale, 30 * scale, 20 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(25 * scale, -25 * scale, 12 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = ROCKING_PINK_POODLE_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(30 * scale, -28 * scale, 2 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
