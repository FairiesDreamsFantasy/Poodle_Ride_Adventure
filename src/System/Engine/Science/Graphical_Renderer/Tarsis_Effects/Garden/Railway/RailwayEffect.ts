import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * Draws the Tarsis Effect: Railway tracks and subway system below the garden south barrier.
 */
export function drawRailwayEffect(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  horizon: number,
  state: GameState,
  time: number,
  scale: number
) {
  if (state.gridY > 40) return;

  ctx.save();
  const trackY = horizon + 50;
  const trackW = width;
  const trackH = 100 * scale;

  // Trackbed
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, trackY, trackW, trackH);

  // Rails
  ctx.strokeStyle = "#888888";
  ctx.lineWidth = 4 * scale;
  ctx.beginPath();
  ctx.moveTo(0, trackY + 20 * scale);
  ctx.lineTo(width, trackY + 20 * scale);
  ctx.moveTo(0, trackY + 50 * scale);
  ctx.lineTo(width, trackY + 50 * scale);
  ctx.stroke();

  // Sleepers
  ctx.fillStyle = "#221100";
  for (let i = 0; i < width; i += 40 * scale) {
    ctx.fillRect(i, trackY + 15 * scale, 10 * scale, 45 * scale);
  }

  // Subway Train (Busy schedule)
  const trainPos = (time / 10) % (width + 1000) - 500;
  ctx.fillStyle = "#5555ff";
  ctx.fillRect(trainPos, trackY + 25 * scale, 400 * scale, 20 * scale);
  
  // Windows on train
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  for (let i = 0; i < 10; i++) {
    ctx.fillRect(
      trainPos + 10 * scale + i * 40 * scale,
      trackY + 28 * scale,
      20 * scale,
      10 * scale
    );
  }

  ctx.restore();
}
