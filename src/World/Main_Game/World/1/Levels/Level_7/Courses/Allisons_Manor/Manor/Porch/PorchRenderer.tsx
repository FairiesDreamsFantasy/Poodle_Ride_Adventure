import { GameState, AREA_DIMENSIONS } from '../../../../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * ALLISON'S MANOR PORCH RENDERER
 * 1000 feet long, 300 feet deep (horizontally), 5 feet high.
 * Overhang: 25 feet high.
 * White with ceramic tiles, pillars, and skylights.
 */
export function drawAllisonsPorch(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const isNight = state.lightingMode === 'Night';
  const horizon = height * 0.4; // Horizon for the overhang view

  ctx.save();

  // Floor (White ceramic tiles)
  ctx.fillStyle = isNight ? '#333333' : '#FFFFFF';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Tile grid
  ctx.strokeStyle = isNight ? '#1a1a1a' : '#E0E0E0';
  ctx.lineWidth = 1;
  const tileSize = 40;
  for (let x = 0; x < width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = horizon; y < height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Overhang (25 feet high)
  ctx.fillStyle = isNight ? '#1a1a1a' : '#F0F0F0';
  ctx.fillRect(0, 0, width, horizon);

  // Skylights in the overhang
  ctx.fillStyle = isNight ? '#001133' : '#87CEEB';
  const skylightWidth = 80;
  const skylightHeight = 40;
  const skylightSpacing = 200;
  for (let x = 100; x < width; x += skylightSpacing) {
    ctx.fillRect(x, horizon * 0.2, skylightWidth, skylightHeight);
    // Glass sheen
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(x + 5, horizon * 0.2 + 5);
    ctx.lineTo(x + skylightWidth - 5, horizon * 0.2 + skylightHeight - 5);
    ctx.stroke();
  }

  // Pillars supporting the overhang
  ctx.fillStyle = isNight ? '#222222' : '#FFFFFF';
  const pillarWidth = 30;
  const pillarSpacing = 250;
  for (let x = 0; x <= width; x += pillarSpacing) {
    // Pillars go from floor to overhang
    ctx.fillRect(x - pillarWidth / 2, 0, pillarWidth, height);
    // Pillar detail
    ctx.strokeStyle = isNight ? '#111111' : '#DDDDDD';
    ctx.strokeRect(x - pillarWidth / 2, 0, pillarWidth, height);
  }

  // Ramp at the center (15 feet wide)
  const centerX = width / 2;
  const rampWidth = 60; // Visual width
  ctx.fillStyle = isNight ? '#111111' : '#D0D0D0';
  ctx.fillRect(centerX - rampWidth / 2, height - 20, rampWidth, 20);
  
  // Label
  ctx.fillStyle = isNight ? '#FFFFFF' : '#000000';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Allison's Manor Porch", centerX, horizon - 20);

  ctx.restore();
}
