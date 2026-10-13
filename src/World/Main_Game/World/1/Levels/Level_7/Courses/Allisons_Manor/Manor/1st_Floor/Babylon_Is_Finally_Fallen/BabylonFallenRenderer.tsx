import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';
import { BABYLON_FALLEN_CONSTANTS as C } from './BabylonFallenConstants';

/**
 * Renders the "Babylon" Is Finally Fallen Room.
 * Dimensions: 200x250 feet
 */
export function renderBabylonFallen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / C.WIDTH;
  const scaleY = height / C.HEIGHT;

  // 1. Floor: Ceramic tile designed like African vegetation with a golden hue
  const gradFloor = ctx.createLinearGradient(0, 0, width, height);
  gradFloor.addColorStop(0, "#DAA520"); // Goldenrod
  gradFloor.addColorStop(1, "#8B4513"); // SaddleBrown
  ctx.fillStyle = gradFloor;
  ctx.fillRect(0, 0, width, height);

  // Vegetation patterns on tiles
  ctx.strokeStyle = "rgba(0, 100, 0, 0.2)";
  for (let i = 0; i < 15; i++) {
    const px = (i * 53) % width;
    const py = (i * 37) % height;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px + 10, py - 10, px + 20, py);
    ctx.stroke();
  }

  // 2. Rug (10% smaller than room -> 0.9 scale)
  const rugPaddingX = (width * 0.1) / 2;
  const rugPaddingY = (height * 0.1) / 2;
  const rugW = width * 0.9;
  const rugH = height * 0.9;
  
  ctx.fillStyle = "#A0522D"; // Sienna base for rug
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.fillRect(rugPaddingX, rugPaddingY, rugW, rugH);
  ctx.shadowBlur = 0;

  // Rug pattern: African vegetation
  ctx.fillStyle = "#228B22"; // Forest Green
  for (let i = 0; i < 30; i++) {
    const rx = rugPaddingX + (i * 29) % rugW;
    const ry = rugPaddingY + (i * 41) % rugH;
    ctx.beginPath();
    ctx.ellipse(rx, ry, 5 * scaleX, 10 * scaleY, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Walls: African worlds paintings, Babylon-Free design
  const borderSize = 15 * scaleX;
  
  // Mural borders showing African landscapes and future tech
  ctx.fillStyle = "#FFD700"; // Golden border
  ctx.fillRect(0, 0, width, borderSize); // North
  ctx.fillRect(0, height - borderSize, width, borderSize); // South
  ctx.fillRect(0, 0, borderSize, height); // West
  ctx.fillRect(width - borderSize, 0, borderSize, height); // East

  // Decorative patterns on the gold borders (Kente inspired)
  ctx.fillStyle = "#B22222"; // Firebrick
  for (let x = 0; x < width; x += 40) {
    ctx.fillRect(x, 2, 10, borderSize - 4);
  }

  // 4. Lighting: Gentle glow, "Babylon-Free" design
  const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
  glow.addColorStop(0, "rgba(255, 255, 100, 0.15)");
  glow.addColorStop(1, "rgba(255, 165, 0, 0.05)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // 5. Door (Sliding, African/Rainbow theme, Ghana/Ethiopia tech)
  // Interior door placement: x1 from y105 to y115
  const doorYMin = C.DOOR.INTERIOR.Y_MIN * scaleY;
  const doorYMax = C.DOOR.INTERIOR.Y_MAX * scaleY;
  const doorH = doorYMax - doorYMin;

  // Door with Rainbow/Africa theme
  const doorGrad = ctx.createLinearGradient(0, doorYMin, 0, doorYMax);
  doorGrad.addColorStop(0, "red");
  doorGrad.addColorStop(0.2, "orange");
  doorGrad.addColorStop(0.4, "yellow");
  doorGrad.addColorStop(0.6, "green");
  doorGrad.addColorStop(0.8, "blue");
  doorGrad.addColorStop(1, "purple");
  
  ctx.fillStyle = doorGrad;
  ctx.fillRect(0, doorYMin, 12, doorH);

  // Futuristic tech symbols on door
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(2, doorYMin + 2);
  ctx.lineTo(10, doorYMin + 10);
  ctx.moveTo(10, doorYMin + 2);
  ctx.lineTo(2, doorYMin + 10);
  ctx.stroke();

  // Status Text
  ctx.fillStyle = "white";
  ctx.shadowBlur = 5;
  ctx.shadowColor = "black";
  ctx.font = "bold 20px serif";
  ctx.textAlign = "center";
  ctx.fillText(C.NAME, width / 2, 40);
  ctx.shadowBlur = 0;
}
