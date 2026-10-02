import { GameState, AREA_DIMENSIONS } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { drawDiningRampEffect } from '../../../../../System/Engine/Science/Graphical_Renderer/Tarsis_Effects/TarsisEffectsList';

/**
 * GRAND DINING ROOM RENDERER
 * A forest-themed dining room with tree-trunk pillars.
 */
export function drawGrandDiningRoom(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const currentDims = AREA_DIMENSIONS.GrandDiningRoom;
  const isSky = state.level === 'Sky';

  // Apply vertical shift illusion for the 40-step transition
  let illusionOffset = 0;
  if (state.doorwayStep > 0 && state.area === 'GrandDiningRoom') {
    const progress = state.doorwayStep / 40;
    if (state.isDescending) {
      // Descending: graphics should shift UP as progress goes 40 -> 1
      // Start (step 40): shift is 0
      // End (step 1): shift is -200
      illusionOffset = (progress - 1) * 200;
    } else {
      // Ascending: graphics should shift DOWN as progress goes 0 -> 40
      // Start (step 0/1): shift is 0
      // End (step 40): shift is +200
      illusionOffset = progress * 200;
    }
  }

  ctx.save();
  ctx.translate(0, illusionOffset);
  
  // Floor (Black and white checked ceramic)
  const tileSize = 60;
  for (let x = 0; x < width; x += tileSize) {
    for (let y = horizon; y < height; y += tileSize) {
      ctx.fillStyle = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0 ? '#000000' : '#ffffff';
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }

  // Walls (Forest Theme)
  const forestGradient = ctx.createLinearGradient(0, 0, 0, horizon);
  forestGradient.addColorStop(0, '#004400'); // Deep Forest Green
  forestGradient.addColorStop(1, '#228B22');
  ctx.fillStyle = forestGradient;
  ctx.fillRect(0, 0, width, horizon);

  // Tree silhouettes on walls
  ctx.fillStyle = 'rgba(0, 20, 0, 0.5)';
  for (let i = 0; i < 15; i++) {
    const tx = (i * width) / 15;
    const tWidth = 40 + Math.random() * 60;
    const tHeight = 100 + Math.random() * 150;
    ctx.beginPath();
    ctx.moveTo(tx, horizon);
    ctx.lineTo(tx + tWidth / 2, horizon - tHeight);
    ctx.lineTo(tx + tWidth, horizon);
    ctx.fill();
  }

  // Pillars (5ft thick, 40ft apart, triangular brown tree trunk design)
  const pillarWidth = (5 / currentDims.width) * width;
  const pillarSpacing = (40 / currentDims.width) * width;
  ctx.fillStyle = '#5D4037'; // Brown
  for (let x = 0; x < width; x += pillarSpacing) {
    // Triangular trunk
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.lineTo(x + pillarWidth / 2, 0);
    ctx.lineTo(x + pillarWidth, height);
    ctx.fill();
    
    // Bark texture
    ctx.strokeStyle = '#3E2723';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(x + 5, y);
      ctx.lineTo(x + pillarWidth - 5, y + 20);
      ctx.stroke();
    }
  }

  // Tables (Specially arranged for navigation)
  ctx.fillStyle = '#8D6E63'; // Table wood
  const tableSize = (10 / currentDims.width) * width;
  for (let x = 200; x < width - 200; x += 300) {
    for (let y = horizon + 100; y < height - 100; y += 300) {
      ctx.fillRect(x, y, tableSize * 2, tableSize);
      // Chairs
      ctx.fillStyle = '#5D4037';
      ctx.fillRect(x - 10, y + 5, 10, 10);
      ctx.fillRect(x + tableSize * 2, y + 5, 10, 10);
      ctx.fillStyle = '#8D6E63';
    }
  }

  // Lights (Bright with gentle glow)
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgba(255, 255, 200, 0.8)';
  ctx.fillStyle = '#ffffcc';
  for (let x = 150; x < width; x += 300) {
    ctx.beginPath();
    ctx.arc(x, 50, 15, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  // Tarsis Sky Ramp (West Wall)
  drawDiningRampEffect(ctx, width, height, horizon, state, isSky);

  ctx.restore();
}
