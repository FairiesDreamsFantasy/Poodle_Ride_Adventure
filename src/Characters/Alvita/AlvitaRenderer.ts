
import { ALVITA_CONSTANTS as C } from './AlvitaConstants';

export function drawAlvita(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  isFacingWest: boolean,
  time: number
) {
  ctx.save();
  ctx.translate(x, y);
  if (isFacingWest) ctx.scale(-1, 1);
  
  const bounce = Math.sin(time / 200) * 5 * scale;
  
  // Body
  ctx.fillStyle = C.PONY_COLOR;
  ctx.fillRect(-20 * scale, (-40 + bounce) * scale, 40 * scale, 25 * scale);
  
  // Legs
  ctx.fillRect(-18 * scale, (-15 + bounce) * scale, 8 * scale, 15 * scale);
  ctx.fillRect(10 * scale, (-15 + bounce) * scale, 8 * scale, 15 * scale);
  
  // Neck & Head
  ctx.fillRect(15 * scale, (-55 + bounce) * scale, 12 * scale, 30 * scale);
  ctx.fillRect(15 * scale, (-65 + bounce) * scale, 20 * scale, 15 * scale);
  
  // Mane
  ctx.fillStyle = C.MANE_COLOR;
  ctx.fillRect(12 * scale, (-68 + bounce) * scale, 15 * scale, 10 * scale);
  ctx.fillRect(12 * scale, (-55 + bounce) * scale, 5 * scale, 25 * scale);
  
  // Eye
  ctx.fillStyle = C.EYE_COLOR;
  ctx.beginPath();
  ctx.arc(28 * scale, (-60 + bounce) * scale, 2 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Pablo (Rider)
  ctx.fillStyle = "#5D4037"; // Riding outfit
  ctx.fillRect(-5 * scale, (-70 + bounce) * scale, 15 * scale, 35 * scale);
  ctx.fillStyle = "#FFCCBC"; // Skin
  ctx.beginPath();
  ctx.arc(2 * scale, (-75 + bounce) * scale, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}
