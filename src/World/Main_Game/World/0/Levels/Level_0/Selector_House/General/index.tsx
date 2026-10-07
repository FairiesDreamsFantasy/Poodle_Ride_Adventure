import { GameState } from '../../../../../../../../System/Engine/Core/Types';
import { drawAfricanLionDecor } from '../Decor';
import { drawPinkBrickRoadArt } from '../../../../../../../../System/Items/Art/Pink_Brick_Road';

export interface SelectorHouseProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export function drawSelectorHouse(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  const scaleX = width / 2000;
  const scaleY = height / 2000;

  // 1. Floor: 4-ft x 4-ft Green & Black Checked Tiles with Glass Finish and 1cm White Grid Lines
  ctx.fillStyle = '#050D08'; // Deep glass dark background
  ctx.fillRect(0, 0, width, height);

  const tileSize = 20 * scaleX; // 4ft scale representation
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      const isGreen = ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0);
      ctx.fillStyle = isGreen ? '#1B5E20' : '#111111'; // Glass green or dark black tile
      ctx.fillRect(x, y, tileSize - 1, tileSize - 1);

      // Glass sheen / shine reflection
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(x, y, tileSize - 1, (tileSize - 1) * 0.3);

      // 1cm White Grid Lines around tiles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }

  // 2. Wall Borders with Horizontal Green Horizon at bottom & Indigo Sky top
  ctx.lineWidth = 12 * scaleX;

  // North Wall
  const northGrad = ctx.createLinearGradient(0, 0, 0, 60 * scaleY);
  northGrad.addColorStop(0, '#1A237E'); // Indigo sky
  northGrad.addColorStop(1, '#2E7D32'); // Green horizon bottom
  ctx.strokeStyle = northGrad;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(width, 0); ctx.stroke();

  // South Wall
  const southGrad = ctx.createLinearGradient(0, height, 0, height - 60 * scaleY);
  southGrad.addColorStop(0, '#1A237E');
  southGrad.addColorStop(1, '#2E7D32');
  ctx.strokeStyle = southGrad;
  ctx.beginPath(); ctx.moveTo(0, height); ctx.lineTo(width, height); ctx.stroke();

  // East Wall
  const eastGrad = ctx.createLinearGradient(width, 0, width - 60 * scaleX, 0);
  eastGrad.addColorStop(0, '#1A237E');
  eastGrad.addColorStop(1, '#2E7D32');
  ctx.strokeStyle = eastGrad;
  ctx.beginPath(); ctx.moveTo(width, 0); ctx.lineTo(width, height); ctx.stroke();

  // West Wall
  const westGrad = ctx.createLinearGradient(0, 0, 60 * scaleX, 0);
  westGrad.addColorStop(0, '#1A237E');
  westGrad.addColorStop(1, '#2E7D32');
  ctx.strokeStyle = westGrad;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, height); ctx.stroke();

  // 3. West Wall Decor: Futuristic Rocket Ship between 520ft and 980ft from South wall (Y = 1020 to 1480), 21ft high
  ctx.fillStyle = '#ECEFF1'; // Metallic rocket hull
  const rocketY1 = (2000 - 980) * scaleY; // Y = 1020
  const rocketY2 = (2000 - 520) * scaleY; // Y = 1480
  const rocketH = rocketY2 - rocketY1;
  ctx.fillRect(10 * scaleX, rocketY1, 25 * scaleX, rocketH);
  // Rocket nose
  ctx.fillStyle = '#D32F2F'; // Red rocket nose cone
  ctx.beginPath();
  ctx.moveTo(10 * scaleX, rocketY1);
  ctx.lineTo(22.5 * scaleX, rocketY1 - 20 * scaleY);
  ctx.lineTo(35 * scaleX, rocketY1);
  ctx.closePath();
  ctx.fill();

  // 4. South Wall Decor: Flying Astronaut between 20ft to 35ft from East wall (X = 1965..1980)
  const astroX = (2000 - 27.5) * scaleX; // Center at 1972.5 ft
  const astroY = (2000 - 15) * scaleY;
  ctx.fillStyle = '#FFFFFF'; // White suit
  ctx.beginPath(); ctx.arc(astroX, astroY, 8 * scaleX, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#00BCD4'; // Cyan visor
  ctx.beginPath(); ctx.arc(astroX, astroY - 2 * scaleY, 4 * scaleX, 0, Math.PI * 2); ctx.fill();

  // 5. North Wall Decor: African Lion Circular Picture (10ft to 100ft from West wall, 8ft diameter)
  drawAfricanLionDecor(ctx, 55 * scaleX, 20 * scaleY, 20 * scaleX);

  // 6. East Wall Decor: Pink Brick Road Art (4ft x 3ft) between 983ft and 987ft from North wall (Y = 983..987)
  drawPinkBrickRoadArt(ctx, (2000 - 25) * scaleX, 985 * scaleY, 20 * scaleX, 15 * scaleY);

  // 7. GATES / DOORS
  // South Door (Locked after entering from Adventure Garden)
  ctx.fillStyle = '#8D6E63'; // Locked heavy oak door
  ctx.fillRect(970 * scaleX, (2000 - 15) * scaleY, 60 * scaleX, 15 * scaleY);
  ctx.fillStyle = '#FF5252'; // Red lock light
  ctx.beginPath(); ctx.arc(1000 * scaleX, (2000 - 7) * scaleY, 4 * scaleX, 0, Math.PI * 2); ctx.fill();

  // East Gate (to Do_You_Remember_This Arena at 1000ft from South wall -> Y = 1000)
  ctx.fillStyle = '#3F51B5'; // Sliding metallic gate
  ctx.fillRect((2000 - 15) * scaleX, 970 * scaleY, 15 * scaleX, 60 * scaleY);
  ctx.fillStyle = '#76FF03'; // Green unlocked light
  ctx.beginPath(); ctx.arc((2000 - 7) * scaleX, 1000 * scaleY, 4 * scaleX, 0, Math.PI * 2); ctx.fill();

  // North Gate (to Level 1 Staging / PortalTunnel at 1000ft from West wall -> X = 1000)
  ctx.fillStyle = '#00838F'; // Sliding teal gate
  ctx.fillRect(970 * scaleX, 0, 60 * scaleX, 15 * scaleY);

  // West Gate 1 (to Rasta-Manor Rugged Play Field at 500ft from South wall -> Y = 1500)
  ctx.fillStyle = '#7B1FA2'; // Purple portal door
  ctx.fillRect(0, 1470 * scaleY, 15 * scaleX, 60 * scaleY);

  // West Gate 2 (AI-Generated Level at 500ft from North wall -> Y = 500)
  const hasAIKey = !!(localStorage.getItem('GEMINI_API_KEY') || (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY);
  ctx.fillStyle = hasAIKey ? '#00E676' : '#FF1744'; // Green if unlocked, Red if locked
  ctx.fillRect(0, 470 * scaleY, 15 * scaleX, 60 * scaleY);

  // Labels for accessibility and visually clean feedback
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${Math.max(10, Math.floor(11 * scaleX))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText("EAST GATE: ARENA", (2000 - 60) * scaleX, 1000 * scaleY);
  ctx.fillText("NORTH GATE: STAGING", 1000 * scaleX, 40 * scaleY);
  ctx.fillText("WEST GATE 1: MANOR", 70 * scaleX, 1500 * scaleY);
  ctx.fillText(hasAIKey ? "WEST GATE 2: AI (UNLOCKED)" : "WEST GATE 2: AI (LOCKED)", 90 * scaleX, 500 * scaleY);
}
