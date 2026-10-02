import { SIMULATED_GARDEN_AREA_COLORS } from '../Color_Palette';
import { SIMULATED_GARDEN_AREA_DIMENSIONS } from '../../Description/Dimensions';

/**
 * Simulated Garden Area 2-D Rendering Logic (Masterpiece Preservation)
 */
export function drawSimulatedGardenArea2D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  viewScale: number,
  time: number
) {
  // 1. Base Floor (Pink)
  ctx.fillStyle = SIMULATED_GARDEN_AREA_COLORS.floor;
  ctx.fillRect(0, 0, width, height);

  // 2. Central Rug (Forest Green)
  const rugRadius = SIMULATED_GARDEN_AREA_DIMENSIONS.rugRadius * viewScale;
  ctx.fillStyle = SIMULATED_GARDEN_AREA_COLORS.rug;
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, rugRadius, 0, Math.PI * 2);
  ctx.fill();

  // 3. Horizon Mural (Pink Paintings)
  ctx.strokeStyle = SIMULATED_GARDEN_AREA_COLORS.horizon;
  ctx.lineWidth = 5 * viewScale;
  ctx.strokeRect(10 * viewScale, 10 * viewScale, width - 20 * viewScale, height - 20 * viewScale);

  // 4. Simulated Flowers (Masterpiece - Static / Artisanal)
  const drawFlower = (fx: number, fy: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(fx, fy, 5 * viewScale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFEE58'; // Yellow center
    ctx.beginPath();
    ctx.arc(fx, fy, 2 * viewScale, 0, Math.PI * 2);
    ctx.fill();
  };

  // Artisanal placements (Fixed as part of the masterpiece)
  drawFlower(width * 0.25, height * 0.25, SIMULATED_GARDEN_AREA_COLORS.flowers.pink);
  drawFlower(width * 0.75, height * 0.25, SIMULATED_GARDEN_AREA_COLORS.flowers.white);
  drawFlower(width * 0.25, height * 0.75, SIMULATED_GARDEN_AREA_COLORS.flowers.yellow);
}
