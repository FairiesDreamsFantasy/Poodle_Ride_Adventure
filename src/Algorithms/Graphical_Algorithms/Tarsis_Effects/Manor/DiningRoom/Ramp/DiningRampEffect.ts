import { GameState } from "../../../../../../System/AI/In-Game/Logic/GameLogic";

/**
 * Draws the Tarsis Effect for the Grand Dining Room ramp: 45-degree angle ramp slope with protective glass.
 * Includes an "illusion" shift during the 40-step Gallop transition.
 */
export function drawDiningRampEffect(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  horizon: number,
  state: GameState,
  isSky: boolean
) {
  const isFloorWarp = !isSky && state.gridY >= 1330 && state.gridY <= 1370;
  const isSkyWarp = isSky && state.gridY >= 1950 && state.gridY <= 1990;
  const isTransitioning = state.doorwayStep > 0 && state.area === 'GrandDiningRoom';
  
  if (!isFloorWarp && !isSkyWarp && !isTransitioning) return;

  const rampW = (20 / 2000) * width; // 20 feet wide
  const rampX = 0;

  ctx.save();
  
  // Tarsis Shadow Effect
  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(0, 0, 0, 0.6)";

  // 45-degree angle ramp slope visually
  ctx.fillStyle = "#3e2723"; // Dark wood/bark color to match dining room theme
  ctx.beginPath();
  
  // Draw the ramp based on whether we are ascending or descending
  const effectiveIsFloor = isFloorWarp || (isTransitioning && !state.isDescending);
  const effectiveIsSky = isSkyWarp || (isTransitioning && state.isDescending);

  if (effectiveIsFloor) {
    // Floor-to-Sky: Ascending North
    ctx.moveTo(rampX, horizon + 150);
    ctx.lineTo(rampX + rampW, horizon + 50); // Slope up
    ctx.lineTo(rampX + rampW, horizon + 100);
    ctx.lineTo(rampX, horizon + 200);
  } else if (effectiveIsSky) {
    // Sky-to-Floor: Descending South
    ctx.moveTo(rampX, horizon - 150);
    ctx.lineTo(rampX + rampW, horizon - 50); // Slope down
    ctx.lineTo(rampX + rampW, horizon - 100);
    ctx.lineTo(rampX, horizon - 200);
  }
  
  ctx.closePath();
  ctx.fill();

  // Glass barrier
  ctx.strokeStyle = "rgba(173, 216, 230, 0.8)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rampX + rampW, horizon - 80);
  ctx.lineTo(rampX + rampW, horizon + 80);
  ctx.stroke();

  // LED Lights on the ramp edge (Green for ascent, Gold for descent)
  ctx.fillStyle = effectiveIsFloor ? "#00FF00" : "#FFD700";
  for (let i = 0; i < 5; i++) {
    const yOffset = (i - 2) * 20;
    ctx.beginPath();
    ctx.arc(rampX + rampW - 5, horizon + yOffset, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
