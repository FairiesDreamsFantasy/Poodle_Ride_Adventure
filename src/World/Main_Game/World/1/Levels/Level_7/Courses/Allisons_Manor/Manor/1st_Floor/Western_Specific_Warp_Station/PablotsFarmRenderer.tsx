import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';

/**
 * Renders Pablo's Farm (Exploration Area).
 * Featuring the Red Barn (Entry) and Yellow Barn (Course Portal).
 */
export function drawPablotsFarm(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / 2087;
  const scaleY = height / 2087;

  // Background: Grass field
  ctx.fillStyle = "#4CAF50"; // Grass
  ctx.fillRect(0, 0, width, height);

  // --- Trees along perimeter ---
  ctx.fillStyle = "#1B5E20"; // Deep forest green
  for (let x = 0; x <= 2087; x += 300) {
    // North edge
    ctx.beginPath(); ctx.arc(x * scaleX, 50 * scaleY, 60 * scaleX, 0, Math.PI * 2); ctx.fill();
    // South edge
    ctx.beginPath(); ctx.arc(x * scaleX, 2037 * scaleY, 60 * scaleX, 0, Math.PI * 2); ctx.fill();
  }
  for (let y = 0; y <= 2087; y += 300) {
    // West edge
    ctx.beginPath(); ctx.arc(50 * scaleX, y * scaleY, 60 * scaleX, 0, Math.PI * 2); ctx.fill();
    // East edge
    ctx.beginPath(); ctx.arc(2037 * scaleX, y * scaleY, 60 * scaleX, 0, Math.PI * 2); ctx.fill();
  }

  // --- Paths (Brick/Stone for thumping sound) ---
  ctx.fillStyle = "#D7CCC8"; // Light stone color
  // center y is approx 1043
  // Path from Red Barn (East) to center
  ctx.fillRect(1043 * scaleX, 990 * scaleY, 1044 * scaleX, 100 * scaleY);
  // Path from Yellow Barn (Southwest) to center
  // Yellow Barn is at 0, 1937 roughly
  ctx.fillRect(100 * scaleX, 1043 * scaleY, 100 * scaleX, 1044 * scaleY); 
  // Path to House (North)
  ctx.fillRect(990 * scaleX, 0, 100 * scaleX, 1043 * scaleY);

  // --- 2-Story Farmhouse (North End) ---
  const house = { x: 843, y: 150, w: 400, h: 300 };
  ctx.fillStyle = "#FAFAFA"; // Farmhouse white
  ctx.fillRect(house.x * scaleX, house.y * scaleY, house.w * scaleX, house.h * scaleY);
  // Roof
  ctx.fillStyle = "#37474F";
  ctx.beginPath();
  ctx.moveTo(house.x * scaleX, house.y * scaleY);
  ctx.lineTo((house.x + house.w / 2) * scaleX, (house.y - 120) * scaleY);
  ctx.lineTo((house.x + house.w) * scaleX, house.y * scaleY);
  ctx.fill();
  
  // Windows & Doors
  ctx.fillStyle = "white";
  ctx.strokeStyle = "#90A4AE";
  for (let s = 0; s < 2; s++) { 
    for (let wnd = 0; wnd < 4; wnd++) {
      ctx.fillRect((house.x + 40 + wnd * 90) * scaleX, (house.y + 40 + s * 140) * scaleY, 50 * scaleX, 60 * scaleY);
    }
  }
  ctx.fillStyle = "#5D4037";
  ctx.fillRect((house.x + 175) * scaleX, (house.y + 220) * scaleY, 50 * scaleX, 80 * scaleY);

  // --- Red Barn (East End - Entrance) ---
  // Size 100x75, Centered at East edge
  const redBarn = { x: 1987, y: 1043, w: 100, h: 75 };
  ctx.fillStyle = "red";
  ctx.fillRect((redBarn.x - 100) * scaleX, (redBarn.y - 37) * scaleY, 100 * scaleX, 75 * scaleY);
  ctx.fillStyle = "white"; // Roof
  ctx.beginPath();
  ctx.moveTo((redBarn.x - 100) * scaleX, (redBarn.y - 37) * scaleY);
  ctx.lineTo((redBarn.x - 50) * scaleX, (redBarn.y - 67) * scaleY);
  ctx.lineTo(redBarn.x * scaleX, (redBarn.y - 37) * scaleY);
  ctx.fill();
  ctx.fillStyle = "#3E2723"; // Door facing West
  ctx.fillRect((redBarn.x - 100) * scaleX, (redBarn.y - 15) * scaleY, 30 * scaleX, 40 * scaleY);

  // --- Yellow Barn (Southwest Corner - Course Portal) ---
  // Size 200x150
  const yellowBarn = { x: 0, y: 2087, w: 200, h: 150 };
  ctx.fillStyle = "#FBC02D"; // Yellow
  ctx.fillRect(yellowBarn.x * scaleX, (yellowBarn.y - 150) * scaleY, 200 * scaleX, 150 * scaleY);
  ctx.fillStyle = "#FFA000"; // Roof
  ctx.beginPath();
  ctx.moveTo(yellowBarn.x * scaleX, (yellowBarn.y - 150) * scaleY);
  ctx.lineTo((yellowBarn.x + 100) * scaleX, (yellowBarn.y - 220) * scaleY);
  ctx.lineTo((yellowBarn.x + 200) * scaleX, (yellowBarn.y - 150) * scaleY);
  ctx.fill();
  ctx.fillStyle = "#3E2723"; // Door facing North
  ctx.fillRect((yellowBarn.x + 70) * scaleX, (yellowBarn.y - 150) * scaleY, 60 * scaleX, 40 * scaleY);

  // Titles & Labels
  ctx.fillStyle = "black";
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Yellow Barn (Course Entrance)", (yellowBarn.x + 100) * scaleX, (yellowBarn.y - 230) * scaleY);
  ctx.fillText("Red Barn (Portal to Manor)", (redBarn.x - 50) * scaleX, (redBarn.y - 80) * scaleY);
  ctx.fillText("Farmhouse", (house.x + 200) * scaleX, (house.y + 330) * scaleY);

  ctx.fillStyle = "white";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText(`Pablo's 100-Acre Farm`, width / 2, 50);
}
