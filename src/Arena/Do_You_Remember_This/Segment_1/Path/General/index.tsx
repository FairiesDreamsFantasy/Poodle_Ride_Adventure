import { GameState } from '../../../../../System/Engine/Core/Types';

export interface ArenaPathProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export const CERAMIC_TILE_COLORS_28 = [
  '#FFFFFF', // 1. White
  '#2196F3', // 2. Blue
  '#4CAF50', // 3. Green
  '#FFD700', // 4. Gold
  '#C0C0C0', // 5. Silver
  '#FF69B4', // 6. Pink
  '#2E7D32', // 7. Dark Green
  '#F44336', // 8. Red
  '#FFEB3B', // 9. Yellow
  '#8E24AA', // 10. Violet
  '#FF9800', // 11. Orange
  '#3F51B5', // 12. Indigo
  '#E6E6FA', // 13. Lavender
  '#FFFDD0', // 14. Cream
  '#F4C430', // 15. Saffron
  '#808080', // 16. Gray
  '#111111', // 17. Black
  '#CD7F32', // 18. Bronze
  '#FFBF00', // 19. Amber
  '#008080', // 20. Teal
  '#C71585', // 21. Red-Violet
  '#8A2BE2', // 22. Blue-Violet
  '#9ACD32', // 23. Yellow-Green
  '#FFA500', // 24. Yellow-Orange
  '#FF4500', // 25. Red-Orange
  '#FFB6C1', // 26. Light-Pink
  '#B5A642', // 27. Brass
  '#D4AF37'  // 28. Dark-Yellow
];

export function drawArenaPath(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  const scaleX = width / 1000;
  const scaleY = height / 400;

  // Background: Sky and open wild green fields
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 140 * scaleY);
  skyGrad.addColorStop(0, '#87CEEB');
  skyGrad.addColorStop(1, '#E0F7FA');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, 140 * scaleY);

  // Natural wild green fields
  ctx.fillStyle = '#2E7D32';
  ctx.fillRect(0, 140 * scaleY, width, 260 * scaleY);

  // Background Conical Pine Trees
  ctx.fillStyle = '#1B5E20';
  for (let x = 15; x < width; x += 50 * scaleX) {
    ctx.beginPath();
    ctx.moveTo(x, 140 * scaleY);
    ctx.lineTo(x - 12 * scaleX, 168 * scaleY);
    ctx.lineTo(x + 12 * scaleX, 168 * scaleY);
    ctx.closePath();
    ctx.fill();
  }

  // SCIENTIFIC 8-LANE PATH NARROWING:
  // An 8-lane track is 50 ft wide (6.25 ft / lane).
  // In the 400px canvas height, the path spans Y = 210 to 310 (100px = 50 ft path height).
  const pathTopY = 210 * scaleY;
  const pathHeight = 100 * scaleY;
  const pathBottomY = pathTopY + pathHeight;

  // Smooth Brown Path Body
  ctx.fillStyle = '#6D4C41'; // Smooth brown dirt/clay track
  ctx.fillRect(0, pathTopY, width, pathHeight);

  // 8 Lanes Divider Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1;
  const laneHeight = pathHeight / 8;
  for (let i = 1; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, pathTopY + i * laneHeight);
    ctx.lineTo(width, pathTopY + i * laneHeight);
    ctx.stroke();
  }

  // 12-inch Ceramic Border Tiles in 28 Distinct Colors along path edges
  const tileCount = 28;
  const tileWidth = width / tileCount;
  const borderHeight = 6 * scaleY;

  for (let i = 0; i < tileCount; i++) {
    ctx.fillStyle = CERAMIC_TILE_COLORS_28[i % CERAMIC_TILE_COLORS_28.length];
    // Top border ceramic tiles
    ctx.fillRect(i * tileWidth, pathTopY - borderHeight, tileWidth, borderHeight);
    // Bottom border ceramic tiles
    ctx.fillRect(i * tileWidth, pathBottomY, tileWidth, borderHeight);
  }

  // Childhood Scenery Along Course:
  // 1. 2-Story Brown House with shutters & asphalt roof
  const h1X = 140 * scaleX;
  const h1Y = 70 * scaleY;
  ctx.fillStyle = '#5D4037';
  ctx.fillRect(h1X, h1Y, 75 * scaleX, 55 * scaleY);
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.moveTo(h1X - 5 * scaleX, h1Y);
  ctx.lineTo(h1X + 37.5 * scaleX, h1Y - 18 * scaleY);
  ctx.lineTo(h1X + 80 * scaleX, h1Y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#3E2723';
  ctx.fillRect(h1X + 12 * scaleX, h1Y + 12 * scaleY, 12 * scaleX, 14 * scaleY);
  ctx.fillRect(h1X + 48 * scaleX, h1Y + 12 * scaleY, 12 * scaleX, 14 * scaleY);

  // 2. 1-Story Green House with black roof, PTAC unit, & brown dog
  const h2X = 520 * scaleX;
  const h2Y = 85 * scaleY;
  ctx.fillStyle = '#2E7D32';
  ctx.fillRect(h2X, h2Y, 85 * scaleX, 42 * scaleY);
  ctx.fillStyle = '#111111';
  ctx.fillRect(h2X - 4 * scaleX, h2Y - 7 * scaleY, 93 * scaleX, 9 * scaleY);
  ctx.fillStyle = '#B0BEC5'; // PTAC Unit on West window
  ctx.fillRect(h2X - 4 * scaleX, h2Y + 18 * scaleY, 8 * scaleX, 8 * scaleY);
  ctx.fillStyle = '#8D6E63'; // Brown Dog on Back Porch
  ctx.fillRect(h2X + 75 * scaleX, h2Y + 26 * scaleY, 6 * scaleX, 5 * scaleY);

  // 3. 7-Story NYC Bronx-style Brick Building
  const bX = 810 * scaleX;
  const bY = 15 * scaleY;
  ctx.fillStyle = '#8B0000';
  ctx.fillRect(bX, bY, 120 * scaleX, 115 * scaleY);
  ctx.fillStyle = '#FFF9C4';
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 5; c++) {
      ctx.fillRect(bX + (10 + c * 20) * scaleX, bY + (6 + r * 15) * scaleY, 10 * scaleX, 8 * scaleY);
    }
  }

  // Active Lane Indicator
  const currentLane = (state as unknown as { currentLane?: number }).currentLane || 1;
  const activeLaneY = pathTopY + (currentLane - 0.5) * laneHeight;
  ctx.fillStyle = '#FFEA00';
  ctx.beginPath();
  ctx.arc(80 * scaleX, activeLaneY, 5 * scaleX, 0, Math.PI * 2);
  ctx.fill();

  // Information Banner
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${Math.max(10, Math.floor(11 * scaleX))}px sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText(`ARENA COURSE - SEGMENT 1: HONORS YOUR CHILDHOOD | 50FT NARROWED PATH | LANE ${currentLane} OF 8`, 20 * scaleX, 385 * scaleY);
}
