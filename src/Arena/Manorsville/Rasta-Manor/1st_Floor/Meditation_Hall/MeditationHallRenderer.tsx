import { GameState, GRID_SIZE } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { renderRainbowSlidingDoors } from '../../../../../System/Building_Blocks/Doors/Crafted/Rainbow_Sliding_Doors';
import { renderSimulatedGardenDoors } from '../../../../../System/Building_Blocks/Doors/Crafted/Simulated_Garden_Sliding_Doors';

const RAINBOW_COLORS = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];

export function drawMeditationHall(ctx: CanvasRenderingContext2D, width: number, height: number, horizon: number, state: GameState) {
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';

  // Japanese theme floor (Tatami mats)
  ctx.fillStyle = "#D2B48C"; // Tan/Tatami color
  ctx.fillRect(0, horizon, width, height - horizon);

  // Draw tatami mat lines
  ctx.save();
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 200) {
    ctx.beginPath();
    ctx.moveTo(i, horizon);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
  for (let j = horizon; j < height; j += 100) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(width, j);
    ctx.stroke();
  }
  ctx.restore();

  // Walls (Consistent 45-foot ceiling height)
  ctx.fillStyle = "#F5F5DC"; // Beige walls
  ctx.fillRect(0, 0, width, horizon);

  // Rainbow Stripes on Walls (Consistency with Foyer)
  ctx.save();
  ctx.globalAlpha = isNight ? 0.2 : (isEvening ? 0.5 : 0.8);
  const stripeLimit = state.pixelRatio < 1 ? 3 : RAINBOW_COLORS.length;
  const stripeWidth = (width * 0.1) / stripeLimit;
  for (let i = 0; i < stripeLimit; i++) {
    const color = RAINBOW_COLORS[i % RAINBOW_COLORS.length];
    // Left Wall
    ctx.fillStyle = color;
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, height);
    // Right Wall
    ctx.fillStyle = color;
    ctx.fillRect(width - (i + 1) * stripeWidth, 0, stripeWidth, height);
  }
  ctx.restore();

  // Perimeter Walkway (Upper level feel)
  ctx.save();
  ctx.fillStyle = "rgba(255, 204, 224, 0.4)"; // Soft pink walkway
  const walkwayWidth = width * 0.1;
  ctx.fillRect(0, horizon - 50, width, 50); // North walkway
  ctx.fillRect(0, horizon - 50, walkwayWidth, height - horizon + 50); // West walkway
  ctx.fillRect(width - walkwayWidth, horizon - 50, walkwayWidth, height - horizon + 50); // East walkway
  ctx.restore();

  // Southwest Corner Ramp (Meditation Hall's Sky Ramp)
  if (state.gridX <= 200 && state.gridY <= 200) {
    ctx.save();
    const rampX = width * 0.05;
    const rampY = horizon - 100;
    const rampW = width * 0.2;
    const rampH = 200;
    
    ctx.fillStyle = "#0000ff"; // Blue ramp
    ctx.fillRect(rampX, rampY, rampW, rampH);
    
    // Railing
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(rampX, rampY);
    ctx.lineTo(rampX + rampW, rampY + 30);
    ctx.stroke();
    ctx.restore();
  }

  // North Doorway (to Simulated Garden Area - 20ft sliding format with Ethiopian & Japanese windows)
  if (state.direction === 'North') {
    const dist = Math.abs(state.gridY - 1000);
    const scale = 400 / (dist + 50);
    const doorW = 20 * scale * 10; // Scaled 20-foot wide sliding door
    const doorH = 150 * scale; 
    const doorX = width / 2 - doorW / 2;
    const doorY = horizon - doorH;

    // Draw the 990-foot wood segments flanking the 20-foot door
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, horizon - 200 * scale, doorX, 200 * scale);
    ctx.fillRect(doorX + doorW, horizon - 200 * scale, width - (doorX + doorW), 200 * scale);

    // State-based progress (Resolving Pseudoscience)
    const proximityOpen = state.simulatedGardenDoorProgress;
    renderSimulatedGardenDoors(ctx, {
      x: doorX,
      y: doorY,
      width: doorW,
      height: doorH,
      openProgress: proximityOpen,
    });
  }

  // South Wall (Grand Windows & 20-foot Rainbow Sliding Glass Doors to Garden/Back Porch)
  if (state.direction === 'South') {
    const dist = state.gridY;
    const scale = 400 / (dist + 50);
    
    // Original Windows (Consistency)
    const winW = 150 * scale;
    const winH = 100 * scale;
    const winY = horizon - 250 * scale;
    
    // 20-foot door format (each panel 10ft) flanked by 990-foot solid wood wall segments
    const doorW = 20 * scale * 10;
    const doorX = width / 2 - doorW / 2;
    const doorH = 150 * scale;
    const doorY = horizon - doorH;

    // 990-foot solid wood wall segments flanking the central 20-foot doorway
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, horizon - 200 * scale, doorX, 200 * scale);
    ctx.fillRect(doorX + doorW, horizon - 200 * scale, width - (doorX + doorW), 200 * scale);

    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue; // Skip center for door
      const winX = width / 2 + i * 200 * scale - winW / 2;
      ctx.fillStyle = "rgba(173, 216, 230, 0.6)";
      ctx.fillRect(winX, winY, winW, winH);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(winX, winY, winW, winH);
    }

    // State-based progress (Resolving Pseudoscience)
    const proximityOpen = state.rainbowSlidingDoorProgress;
    renderRainbowSlidingDoors(ctx, {
      x: doorX,
      y: doorY,
      width: doorW,
      height: doorH,
      openProgress: proximityOpen,
      frameColor: '#ff00ff',
      alpha: 0.6,
    });
  }
}
