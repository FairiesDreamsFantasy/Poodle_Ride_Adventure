import { GameState, AREA_DIMENSIONS } from '../../../../../System/AI/In-Game/Logic/GameLogic';

function drawTarcistPlaygroundRamp(ctx: CanvasRenderingContext2D, width: number, height: number, horizon: number, state: GameState, time: number) {
  const isWarpZone = state.gridX >= 1900;
  if (!isWarpZone) return;

  const rampW = width * 0.15;
  const rampX = width - rampW;
  
  ctx.save();
  
  // 45-degree angle ramp visual
  ctx.fillStyle = "#444444";
  ctx.beginPath();
  if (state.level === 'Floor') {
    ctx.moveTo(rampX, height);
    ctx.lineTo(width, height - 200); // 45-degree slope
    ctx.lineTo(width, height);
  } else {
    ctx.moveTo(rampX, horizon + 100);
    ctx.lineTo(width, horizon);
    ctx.lineTo(width, horizon + 200);
  }
  ctx.closePath();
  ctx.fill();

  // Glass barrier on the left (viewing from East wall)
  ctx.strokeStyle = "rgba(173, 216, 230, 0.7)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(rampX - 5, height);
  ctx.lineTo(rampX - 5, horizon);
  ctx.stroke();

  // 2nd Floor Archway Visual (if at North end of Sky level)
  if (state.level === 'Sky' && state.gridY <= 1400) {
    const archW = 150;
    const archH = 200;
    const archX = width * 0.7;
    const archY = horizon - archH - 20;

    // Violet sky with pink horizon theme for 2nd floor
    const archGrad = ctx.createLinearGradient(archX, archY, archX, archY + archH);
    archGrad.addColorStop(0, "#4B0082"); // Violet
    archGrad.addColorStop(1, "#FFC0CB"); // Pink horizon

    ctx.fillStyle = archGrad;
    ctx.fillRect(archX, archY, archW, archH);
    
    // Gentle Glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#FF69B4";
    ctx.strokeStyle = "#FF1493";
    ctx.lineWidth = 4;
    ctx.strokeRect(archX, archY, archW, archH);
    
    // City theme hint (tiny rectangles relative to arch)
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    for (let i = 0; i < 5; i++) {
       ctx.fillRect(archX + 10 + i * 25, archY + archH - 40, 15, 40);
    }
  }

  ctx.restore();
}

/**
 * GRAND INDOOR PLAYGROUND RENDERER
 * A spacious playground with floral rugs and spiral pillars.
 */
export function drawGrandPlayground(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const currentDims = AREA_DIMENSIONS.TheGrandPlayground;

  ctx.save();

  // Floor (White ceramic tile with green floral rugs)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Tiles
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  const tileSize = 40;
  for (let x = 0; x < width; x += tileSize) {
    ctx.beginPath(); ctx.moveTo(x, horizon); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = horizon; y < height; y += tileSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Rug (Green with flowers, leaving 20ft border)
  const borderWidth = (20 / currentDims.width) * width;
  ctx.fillStyle = '#228B22'; // Forest Green
  ctx.fillRect(borderWidth, horizon + borderWidth, width - 2 * borderWidth, height - horizon - 2 * borderWidth);

  // Flower patterns on rug
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (let x = borderWidth + 50; x < width - borderWidth; x += 150) {
    for (let y = horizon + borderWidth + 50; y < height - borderWidth; y += 150) {
      // Simple flower
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5;
        ctx.beginPath();
        ctx.arc(x + Math.cos(angle) * 15, y + Math.sin(angle) * 15, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Walls (Blue sky with rainbow stars, green horizon)
  const skyGradient = ctx.createLinearGradient(0, 0, 0, horizon);
  skyGradient.addColorStop(0, '#87CEEB'); // Sky Blue
  skyGradient.addColorStop(1, '#E0F6FF');
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, horizon);

  // Rainbow Stars
  const colors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];
  for (let i = 0; i < 50; i++) {
    const sx = Math.random() * width;
    const sy = Math.random() * horizon;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(sx, sy, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Green Horizon
  ctx.fillStyle = '#32CD32'; // Lime Green
  ctx.fillRect(0, horizon - 20, width, 20);

  // Pillars (5ft thick, 100ft apart, spiral gold/red/green)
  const pillarWidth = (5 / currentDims.width) * width;
  const pillarSpacing = (100 / currentDims.width) * width;
  for (let x = 0; x < width; x += pillarSpacing) {
    // Pillar body
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(x, 0, pillarWidth, height);
    
    // Spiral pattern
    for (let y = 0; y < height; y += 20) {
      const offset = (y + time / 10) % 60;
      if (offset < 20) ctx.fillStyle = '#d4af37'; // Gold
      else if (offset < 40) ctx.fillStyle = '#ff0000'; // Red
      else ctx.fillStyle = '#008000'; // Green
      ctx.fillRect(x, y, pillarWidth, 10);
    }
  }

  // Perimeter Walkway (50ft wide)
  const walkwayWidth = (50 / currentDims.width) * width;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, height - walkwayWidth, width, walkwayWidth);

  // Brass Barrier Fence (10ft high)
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  const fenceY = height - walkwayWidth - 10;
  ctx.beginPath();
  ctx.moveTo(0, fenceY);
  ctx.lineTo(width, fenceY);
  ctx.stroke();
  for (let x = 0; x < width; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, fenceY); ctx.lineTo(x, height - walkwayWidth); ctx.stroke();
  }

  // Draw Tarcist visuals
  drawTarcistPlaygroundRamp(ctx, width, height, horizon, state, time);

  ctx.restore();
}
