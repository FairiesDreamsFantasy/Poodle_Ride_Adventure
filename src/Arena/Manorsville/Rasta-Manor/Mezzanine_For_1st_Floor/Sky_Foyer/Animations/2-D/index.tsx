import { SKY_FOYER_COLORS } from '../Color_Palette';
import { SKY_FOYER_DIMENSIONS } from '../../Description/Dimensions';

/**
 * Sky Foyer 2-D Rendering Logic (Standardized Mezzanine)
 */
export function drawSkyFoyer2D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  viewScale: number,
  time: number
) {
  const walkwayWidth = SKY_FOYER_DIMENSIONS.walkwayWidth * viewScale;
  const rampWidth = SKY_FOYER_DIMENSIONS.rampWidth * viewScale;

  // 1. Perimeter Walkway
  ctx.fillStyle = SKY_FOYER_COLORS.walkway;
  ctx.fillRect(0, 0, width, walkwayWidth); // North
  ctx.fillRect(0, height - walkwayWidth, width, walkwayWidth); // South
  ctx.fillRect(0, 0, walkwayWidth, height); // West
  ctx.fillRect(width - walkwayWidth, 0, walkwayWidth, height); // East

  // 2. Sky Ramp (The Tarcist Zone - 19.5ft)
  ctx.fillStyle = SKY_FOYER_COLORS.ramp;
  const rampX = (width - rampWidth) / 2;
  ctx.fillRect(rampX, walkwayWidth, rampWidth, height - walkwayWidth * 2);

  // 3. Railing Detail (Artistic Craftsmanship)
  ctx.strokeStyle = SKY_FOYER_COLORS.railing;
  ctx.lineWidth = 4 * viewScale;
  ctx.strokeRect(walkwayWidth, walkwayWidth, width - walkwayWidth * 2, height - walkwayWidth * 2);
}
