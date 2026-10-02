import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';
import { SOUTHEAST_COAST_WARP_ROOM_CONSTANTS as C } from './SoutheastCoastWarpRoomConstants';

/**
 * renderSoutheastCoastWarpRoom
 * Renders the Southeast Coast Warp Room on a canvas.
 * Dimensions: 250x100
 */
export function renderSoutheastCoastWarpRoom(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / C.WIDTH;
  const scaleY = height / C.HEIGHT;

  // 1. Floor: White Ceramic Tile
  ctx.fillStyle = "#FFFFFF"; 
  ctx.fillRect(0, 0, width, height);

  // Draw tile grid
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  const tileSize = 20 * scaleX;
  for (let x = 0; x < width; x += tileSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += tileSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // 2. Walls (The user specified murals/views)
  const borderSize = 10;

  // WEST WALL: Palm Trees
  ctx.fillStyle = "#4FC3F7"; // Sky background
  ctx.fillRect(0, 0, borderSize, height);
  for (let i = 0; i < 3; i++) {
    const py = (i * 30 + 15) * scaleY;
    ctx.font = `${15 * scaleX}px sans-serif`;
    ctx.fillText("🌴", 2, py);
  }

  // EAST WALL: Horizon of the sea with docks
  ctx.fillStyle = "#0288D1"; // Deep Sky Blue (Sea)
  ctx.fillRect(width - borderSize, 0, borderSize, height);
  ctx.fillStyle = "#5D4037"; // Brown (Dock)
  ctx.fillRect(width - borderSize, height / 2 - 5, borderSize, 10);

  // SOUTH WALL: Palm trees and horizon of the sea
  ctx.fillStyle = "#81D4FA"; // Sky
  ctx.fillRect(0, height - borderSize, width, borderSize);
  ctx.fillStyle = "#03A9F4"; // Closer Water
  ctx.fillRect(0, height - borderSize / 2, width, borderSize / 2);
  for (let i = 0; i < 8; i++) {
    const px = (i * 30 + 15) * scaleX;
    ctx.font = `${12 * scaleX}px sans-serif`;
    ctx.fillText("🌴", px, height - 2);
  }

  // NORTH WALL: Ceiling/Transition area
  // User: "The sky is blue" - usually refers to ceiling/high murals
  ctx.fillStyle = "#E1F5FE";
  ctx.fillRect(0, 0, width, 5);

  // Doorway: x3 to x23 at y100 (North wall exit)
  ctx.fillStyle = "#f5f5f5"; // Slightly greyish door threshold
  ctx.fillRect(C.DOORWAY.X_START * scaleX, 0, (C.DOORWAY.X_END - C.DOORWAY.X_START) * scaleX, 5);

  // Room Title
  ctx.fillStyle = "#37474F";
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(C.NAME, width / 2, 25 * scaleY);
}
