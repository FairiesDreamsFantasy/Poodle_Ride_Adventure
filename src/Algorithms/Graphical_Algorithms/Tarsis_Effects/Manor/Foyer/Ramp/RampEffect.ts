import { GameState } from "../../../../../../System/AI/In-Game/Logic/GameLogic";

const RAINBOW_COLORS = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];

/**
 * Draws the Tarcist Ramp Tarsis effect: 45-degree ramp, landing, honey comb archway.
 */
export function drawTarcistRamp(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  horizon: number,
  state: GameState,
  isSky: boolean,
  isCellar: boolean
) {
  // Visual zones for Tarcist (Warp Zones)
  const isFloorSkyWarp = !isSky && !isCellar && state.gridY >= 1900;
  const isSkyFloorWarp = isSky && state.gridY <= 1450;
  const isFloorCellarWarp = !isSky && !isCellar && state.gridY >= 1300 && state.gridY <= 1400;
  const isCellarFloorWarp = isCellar && state.gridY >= 1900;
  
  if (!isFloorSkyWarp && !isSkyFloorWarp && !isFloorCellarWarp && !isCellarFloorWarp) return;

  const rampW = width * 0.2;
  const rampX = width * 0.05;

  ctx.save();
  
  // Tarcist Shadow Effect (slight darkness on the barrier)
  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  if (isFloorSkyWarp || isSkyFloorWarp || isCellarFloorWarp) {
    // 45-degree angle ramp slope visually
    ctx.fillStyle = "#333333"; // Darker surface for "tarsis" shadow
    ctx.beginPath();
    if (isFloorSkyWarp) {
      ctx.moveTo(rampX, horizon + 200);
      ctx.lineTo(rampX + rampW, horizon + 50); // 45-degree slope up
      ctx.lineTo(rampX + rampW, horizon + 150);
      ctx.lineTo(rampX, horizon + 300);
    } else if (isSkyFloorWarp) {
      ctx.moveTo(rampX, horizon - 200);
      ctx.lineTo(rampX + rampW, horizon - 50); // 45-degree slope down
      ctx.lineTo(rampX + rampW, horizon - 150);
      ctx.lineTo(rampX, horizon - 300);
    } else if (isCellarFloorWarp) {
      // Cellar-to-Floor: Ramp 45 deg, lights from above
      ctx.moveTo(rampX, horizon + 200);
      ctx.lineTo(rampX + rampW, horizon + 50); 
      ctx.lineTo(rampX + rampW, horizon + 150);
      ctx.lineTo(rampX, horizon + 300);
      
      ctx.closePath();
      ctx.fill();

      // Lights from above
      const lightGrad = ctx.createLinearGradient(rampX, horizon - 100, rampX, horizon + 100);
      lightGrad.addColorStop(0, "rgba(255, 255, 200, 0.4)");
      lightGrad.addColorStop(1, "transparent");
      ctx.fillStyle = lightGrad;
      ctx.fillRect(rampX, horizon - 200, rampW, 400);
    } else {
      ctx.closePath();
      ctx.fill();
    }
  }

  // Floor-to-Cellar Visuals
  if (isFloorCellarWarp) {
    // 45-degree ramp, landing below, right turn to cellar room
    ctx.fillStyle = "#222222";
    ctx.beginPath();
    ctx.moveTo(rampX, horizon + 50);
    ctx.lineTo(rampX + rampW, horizon + 150);
    ctx.lineTo(rampX + rampW, horizon + 250);
    ctx.lineTo(rampX, horizon + 150);
    ctx.fill();

    // Landing area below
    ctx.fillStyle = "#111111";
    ctx.fillRect(rampX, horizon + 150, rampW, 100);

    // Arched design with honey comb theme
    const archX = rampX + rampW + 20;
    ctx.fillStyle = "#f0e68c"; // Khaki/Honey color
    ctx.beginPath();
    // @ts-ignore - roundRect is available in modern browsers but maybe not in old types
    if (ctx.roundRect) {
      ctx.roundRect(archX, horizon + 20, 100, 150, [50, 50, 0, 0]);
    } else {
      ctx.rect(archX, horizon + 20, 100, 150);
    }
    ctx.fill();
    
    // Honey comb pattern
    ctx.strokeStyle = "#8b4513";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
       for (let j = 0; j < 5; j++) {
          ctx.strokeRect(archX + i * 20, horizon + 20 + j * 30, 20, 30);
       }
    }

    // Smaller visual archway
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    // @ts-ignore
    if (ctx.roundRect) {
      ctx.roundRect(archX + 20, horizon + 50, 60, 100, [30, 30, 0, 0]);
    } else {
      ctx.rect(archX + 20, horizon + 50, 60, 100);
    }
    ctx.fill();
  }

  // Glass barrier at the left (common for all)
  ctx.strokeStyle = "rgba(173, 216, 230, 0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(rampX, horizon - 100);
  ctx.lineTo(rampX, horizon + 100);
  ctx.stroke();

  // Rainbow colors visible via south wall (if Floor and looking south)
  if (isFloorSkyWarp && state.direction === 'South') {
      const rainbowGrad = ctx.createLinearGradient(0, height - 100, width, height);
      RAINBOW_COLORS.forEach((c, i) => rainbowGrad.addColorStop(i / (RAINBOW_COLORS.length - 1), c));
      ctx.fillStyle = rainbowGrad;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, height - 50, width, 50);
  }

  ctx.restore();
}
