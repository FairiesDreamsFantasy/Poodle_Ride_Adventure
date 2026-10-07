import { RED_EMERALD_DOOR_DIMENSIONS } from '../Description/Dimensions';

/**
 * Draws the beautifully crafted Red Emerald Pane using structured dimensions
 */
export const drawRedEmeraldPane = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  scale: number
) => {
  const { colors, windowDiameter, windowFrameWidth, emeraldCount, diamondCount } = RED_EMERALD_DOOR_DIMENSIONS;

  // 1. Door Body
  ctx.fillStyle = colors.door;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(x, y, w, h);

  // 2. Circular Window (8ft diameter -> scaled)
  const winR = (windowDiameter / 2) * 10 * scale; // Approx scale factor
  const winX = x + w / 2;
  const winY = y + h * 0.3; // Upper section

  // Window Frame (Black, 6 inches wide)
  ctx.beginPath();
  ctx.arc(winX, winY, winR, 0, Math.PI * 2);
  ctx.strokeStyle = colors.frame;
  ctx.lineWidth = windowFrameWidth * 12 * scale; // 6 inches
  ctx.stroke();

  // Glass (Seeing arcade inside - simplified view)
  ctx.save();
  ctx.beginPath();
  ctx.arc(winX, winY, winR - (windowFrameWidth * 6 * scale), 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
  ctx.fillRect(winX - winR, winY - winR, winR * 2, winR * 2);
  ctx.restore();

  // 3. Emeralds and Gold Diamonds Decoration
  const decorR = winR + (windowFrameWidth * 10 * scale);
  for (let i = 0; i < emeraldCount; i++) {
    const angle = (i / emeraldCount) * Math.PI * 2;
    const ex = winX + Math.cos(angle) * decorR;
    const ey = winY + Math.sin(angle) * decorR;

    // Emerald Circle
    ctx.beginPath();
    ctx.arc(ex, ey, 5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = colors.emerald;
    ctx.fill();

    // Gold Diamond between emeralds
    const dAngle = angle + Math.PI / emeraldCount;
    const dx = winX + Math.cos(dAngle) * decorR;
    const dy = winY + Math.sin(dAngle) * decorR;

    ctx.save();
    ctx.translate(dx, dy);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = colors.diamond;
    ctx.fillRect(-4 * scale, -4 * scale, 8 * scale, 8 * scale);
    ctx.restore();
  }
};
