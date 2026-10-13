import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';
import { GARDEN_WARP_ROOM_CONSTANTS as C } from './GardenWarpRoomConstants';

/**
 * Renders the Garden Specific Warp Room.
 * Dimensions: 250x100
 */
export function renderGardenWarpRoom(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / C.WIDTH;
  const scaleY = height / C.HEIGHT;

  // 1. Floor: Pink Tiles & Green Rug
  ctx.fillStyle = "#F8BBD0"; // Soft pink tiles
  ctx.fillRect(0, 0, width, height);

  // Draw tile grid
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1;
  const tileSize = 20 * scaleX;
  for (let x = 0; x < width; x += tileSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += tileSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Green Rug (10% of surface area)
  const rugW = C.RUG.WIDTH * scaleX;
  const rugH = C.RUG.HEIGHT * scaleY;
  const rugX = C.RUG.X * scaleX;
  const rugY = C.RUG.Y * scaleY;
  
  ctx.fillStyle = "#2E7D32"; // Green rug
  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.fillRect(rugX, rugY, rugW, rugH);
  ctx.shadowBlur = 0;

  // Pattern on rug: white roses, grass, white flowers with pink centers
  ctx.save();
  ctx.clip(); // Keep pattern inside rug
  ctx.translate(rugX, rugY);
  for (let i = 0; i < 20; i++) {
    const rx = (i * 37) % rugW;
    const ry = (i * 19) % rugH;
    // Simple rose/flower shapes
    ctx.fillStyle = "white";
    ctx.beginPath(); ctx.arc(rx, ry, 3 * scaleX, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#F06292"; // Pink center
    ctx.beginPath(); ctx.arc(rx, ry, 1 * scaleX, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();

  // 2. Walls (drawn as interactive/visual borders or separate views)
  // For this kind of room, we'll draw the "mural" content on the canvas edges.
  
  const borderSize = 15;
  
  // NORTH WALL Mural: Windows near ceiling
  ctx.fillStyle = "#81D4FA"; // Sky blue base
  ctx.fillRect(0, 0, width, borderSize);
  for (let x = 10; x < C.WIDTH; x += 15) { // Each window 10ft wide + 5ft sep
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillRect(x * scaleX, 2, 10 * scaleX, 8);
  }

  // SOUTH WALL Mural: Garden horizon & Mice tea party
  ctx.fillStyle = "#A5D6A7"; // Lawn green horizon
  ctx.fillRect(0, height - borderSize, width, borderSize);
  // Mice tea party (at the East end distance)
  ctx.fillStyle = "white";
  ctx.font = "10px sans-serif";
  ctx.fillText("☕ (Mice Tea Party)", 200 * scaleX, height - 5);

  // WEST WALL Mural: Windmill, Pump, Butterflies
  ctx.fillStyle = "#4FC3F7"; // Afternoon sky
  ctx.fillRect(0, 0, borderSize, height);
  // Windmill icon
  ctx.fillStyle = "#795548";
  ctx.fillRect(2, height / 2 - 10, 8, 20);
  ctx.fillStyle = "#B0BEC5";
  const rot = time / 1000;
  ctx.save();
  ctx.translate(6, height / 2);
  ctx.rotate(rot);
  ctx.fillRect(-8, -1, 16, 2);
  ctx.fillRect(-1, -8, 2, 16);
  ctx.restore();

  // EAST WALL Mural: 3-Story Blue House
  ctx.fillStyle = "#1E88E5"; // Blue house mural
  ctx.fillRect(width - borderSize, 0, borderSize, height);
  // House detail
  ctx.fillStyle = "white";
  ctx.fillRect(width - 12, height / 2 - 20, 10, 40);
  ctx.fillStyle = "#FFEB3B"; // Lit windows
  ctx.fillRect(width - 10, height / 2 - 15, 6, 4);
  ctx.fillRect(width - 10, height / 2 + 5, 6, 4);

  // 3. Central Lighting: Globe light
  const cX = width / 2;
  const cY = height / 2;
  const grad = ctx.createRadialGradient(cX, cY, 0, cX, cY, 150 * scaleX);
  grad.addColorStop(0, "rgba(255, 255, 224, 0.4)");
  grad.addColorStop(1, "rgba(255, 255, 224, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  
  // Center Globe
  ctx.fillStyle = "white";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "white";
  ctx.beginPath();
  ctx.arc(cX, cY, 10 * scaleX, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Door at South-West (x2-x14)
  ctx.fillStyle = "#D4AF37"; // Brass door
  ctx.fillRect(C.DOOR_X_MIN * scaleX, height - 10, (C.DOOR_X_MAX - C.DOOR_X_MIN) * scaleX, 10);
  // Glass window in door (rose garden)
  ctx.fillStyle = "#81D4FA";
  ctx.fillRect(C.DOOR_X_MIN * scaleX + 2, height - 8, (C.DOOR_X_MAX - C.DOOR_X_MIN) * scaleX - 4, 6);

  // Status Text
  ctx.fillStyle = "black";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(C.NAME, width / 2, 40);
}
