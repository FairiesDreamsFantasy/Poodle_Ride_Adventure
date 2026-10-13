import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';
import { FUTURISTIC_FRENZY_CONSTANTS as C } from './FuturisticFrenzyConstants';

/**
 * Renders the Futuristic Frenzy Room.
 * Dimensions: 200x250 feet
 */
export function renderFuturisticFrenzy(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / C.WIDTH;
  const scaleY = height / C.HEIGHT;

  // 1. Floor: Solid Ceramic Floor with checked white and black design
  const tileSize = 20 * scaleX;
  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {
      const isBlack = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0;
      ctx.fillStyle = isBlack ? "#000000" : "#FFFFFF";
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }

  // 2. Walls: Mural of a futuristic city with green roofs under a blue sky
  const borderSize = 20 * scaleX;
  
  // North Wall Mural
  ctx.fillStyle = "#87CEEB"; // Blue sky
  ctx.fillRect(0, 0, width, borderSize);
  // Future buildings with green roofs
  for (let i = 0; i < 5; i++) {
    const bx = (i * 40 + 10) * scaleX;
    ctx.fillStyle = "#A9A9A9"; // Grey building
    ctx.fillRect(bx, 5 * scaleY, 20 * scaleX, 15 * scaleY);
    ctx.fillStyle = "#228B22"; // Green roof
    ctx.fillRect(bx - 2, 2 * scaleY, 24 * scaleX, 4 * scaleY);
  }

  // East Wall Mural
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(width - borderSize, 0, borderSize, height);
  // Grated Windows (10 feet high)
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  for (let y = 30 * scaleY; y < height; y += 50 * scaleY) {
    ctx.fillStyle = "rgba(100, 200, 255, 0.3)";
    ctx.fillRect(width - 15, y, 10, 10 * scaleY);
    ctx.strokeRect(width - 15, y, 10, 10 * scaleY);
  }

  // West Wall Mural
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, borderSize, height);

  // South Wall Mural
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, height - borderSize, width, borderSize);

  // 3. Open Computer Lab (Northeast corner)
  // Positioned at y200 to y250 at x100 to x200 (Note: coordinates relative to room)
  // Area: 100x50ft
  const labX = C.COMPUTER_LAB.X_MIN * scaleX;
  const labY = C.COMPUTER_LAB.Y_MIN * scaleY;
  const labW = (C.COMPUTER_LAB.X_MAX - C.COMPUTER_LAB.X_MIN) * scaleX;
  const labH = (C.COMPUTER_LAB.Y_MAX - C.COMPUTER_LAB.Y_MIN) * scaleY;

  ctx.fillStyle = "rgba(0, 100, 255, 0.1)"; // Futuristic zone highlight
  ctx.fillRect(labX, labY, labW, labH);
  ctx.strokeStyle = "rgba(0, 100, 255, 0.5)";
  ctx.setLineDash([5, 5]);
  ctx.strokeRect(labX, labY, labW, labH);
  ctx.setLineDash([]);

  // Computer terminals (icons)
  for (let i = 0; i < 4; i++) {
    const tx = labX + (i * 25 + 5) * scaleX;
    const ty = labY + 10 * scaleY;
    ctx.fillStyle = "#333";
    ctx.fillRect(tx, ty, 15 * scaleX, 10 * scaleY);
    ctx.fillStyle = "#00FF00"; // Glowing screen
    ctx.fillRect(tx + 2, ty + 2, 11 * scaleX, 6 * scaleY);
    // Desk
    ctx.fillStyle = "#555";
    ctx.fillRect(tx - 2, ty + 10 * scaleY, 19 * scaleX, 2 * scaleY);
  }

  // 4. Lighting: Ceiling futuristic glow
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "rgba(135, 206, 250, 0.3)");
  grad.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
  grad.addColorStop(1, "rgba(135, 206, 250, 0.3)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 5. Door (Sliding, Rivited Steel/Brass with Windows)
  // Interior door placement: x1 from y105 to y125
  const doorYMin = C.DOOR.INTERIOR.Y_MIN * scaleY;
  const doorYMax = C.DOOR.INTERIOR.Y_MAX * scaleY;
  const doorH = doorYMax - doorYMin;
  
  ctx.fillStyle = "#808080"; // Steel base
  ctx.fillRect(0, doorYMin, 10, doorH);
  
  // Rivets/Brass details
  ctx.fillStyle = "#B8860B"; // Dark goldenrod
  for (let dy = doorYMin + 2; dy < doorYMax; dy += 8) {
    ctx.beginPath(); ctx.arc(2, dy, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(8, dy, 2, 0, Math.PI * 2); ctx.fill();
  }

  // Built-in Windows in doors
  ctx.fillStyle = "rgba(100, 200, 255, 0.4)";
  ctx.fillRect(3, doorYMin + 5, 4, doorH - 10);

  // Status Text
  ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
  ctx.font = "bold 24px 'Orbitron', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(C.NAME.toUpperCase(), width / 2, 50);
}
