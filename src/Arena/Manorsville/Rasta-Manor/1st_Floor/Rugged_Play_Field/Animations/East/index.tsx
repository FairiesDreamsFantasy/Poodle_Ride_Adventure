import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';
import { RED_EMERALD_DOOR_METRICS } from '../../../../../../../System/Building_Blocks/Doors/Sliding_Doors/Crafted/Red_Emerald-and-Gold_Decorated_Sliding_Door/General';

/**
 * Rugged Play Field East Rendering
 * Handles the East Grand Arcade Red Emerald Sliding Door.
 */
export const drawRuggedPlayFieldEast = (ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, horizon: number) => {
  const dist = Math.abs(state.gridX - 2000);
  const scale = 400 / (dist + 50);

  const doorW = 200 * scale;
  const doorH = 300 * scale;
  const doorX = width / 2 - doorW / 2;
  const doorY = horizon - doorH;

  const progress = state.ruggedEastArcadeDoorProgress || 0;
  const paneW = doorW / 2;

  // Render Pocket Door Voids
  ctx.fillStyle = "#000";
  ctx.fillRect(doorX - paneW, doorY, paneW, doorH);
  ctx.fillRect(doorX + doorW, doorY, paneW, doorH);

  ctx.save();
  ctx.beginPath();
  ctx.rect(doorX - paneW, doorY, doorW + doorW, doorH);
  ctx.clip();

  // Left Pane
  const leftPaneX = doorX - paneW * progress;
  drawRedEmeraldPane(ctx, leftPaneX, doorY, paneW, doorH, scale);

  // Right Pane
  const rightPaneX = doorX + paneW + paneW * progress;
  drawRedEmeraldPane(ctx, rightPaneX, doorY, paneW, doorH, scale);

  ctx.restore();

  // Black Frame
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 10 * scale;
  ctx.strokeRect(doorX, doorY, doorW, doorH);
};

/**
 * Helper to draw the complex Red Emerald Pane
 */
function drawRedEmeraldPane(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, scale: number) {
  const { colors, windowDiameter, windowFrameWidth, emeraldCount, diamondCount } = RED_EMERALD_DOOR_METRICS;
  
  ctx.fillStyle = colors.door;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(x, y, w, h);

  const winR = (windowDiameter / 2) * 10 * scale;
  const winX = x + w / 2;
  const winY = y + h * 0.3;

  ctx.beginPath();
  ctx.arc(winX, winY, winR, 0, Math.PI * 2);
  ctx.strokeStyle = colors.frame;
  ctx.lineWidth = windowFrameWidth * 12 * scale;
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(winX, winY, winR - (windowFrameWidth * 6 * scale), 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "rgba(100, 200, 255, 0.3)";
  ctx.fillRect(winX - winR, winY - winR, winR * 2, winR * 2);
  ctx.restore();

  const decorR = winR + (windowFrameWidth * 10 * scale);
  for (let i = 0; i < emeraldCount; i++) {
    const angle = (i / emeraldCount) * Math.PI * 2;
    const ex = winX + Math.cos(angle) * decorR;
    const ey = winY + Math.sin(angle) * decorR;
    
    ctx.beginPath();
    ctx.arc(ex, ey, 5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = colors.emerald;
    ctx.fill();

    const dAngle = angle + (Math.PI / emeraldCount);
    const dx = winX + Math.cos(dAngle) * decorR;
    const dy = winY + Math.sin(dAngle) * decorR;
    
    ctx.save();
    ctx.translate(dx, dy);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = colors.diamond;
    ctx.fillRect(-4 * scale, -4 * scale, 8 * scale, 8 * scale);
    ctx.restore();
  }
}
