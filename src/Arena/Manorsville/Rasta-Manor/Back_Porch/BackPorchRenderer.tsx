import { GameState, AREA_DIMENSIONS } from '../../../../System/AI/In-Game/Logic/GameLogic';
import { TILES } from '../../../../System/Building_Blocks/BlocksConstants';
import { drawFloorTiling } from '../../../../System/Engine/Science/Graphical_Renderer/General';

/**
 * BACK PORCH RENDERER
 * Part of the Rasta-Manor powerhouse.
 */
export function drawBackPorch(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';
  const currentDims = AREA_DIMENSIONS[state.area];

  ctx.save();
  
  // Floor (Using centralized building blocks - White Ceramic Tiles)
  const whiteTile = TILES.find(t => t.id === 'ceramic_tile_white')!;
  const viewScale = width / currentDims.width;
  
  // Calculate scroll based on player position
  const scrollX = -state.gridX * viewScale;
  const scrollY = -state.gridY * viewScale;

  drawFloorTiling(ctx, whiteTile, width, height - horizon, scrollX, scrollY, viewScale * 50);

  // Floor overlay for lighting/color
  ctx.fillStyle = isNight ? 'rgba(200, 200, 200, 0.4)' : 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Overhang (White, 11-degree angle)
  // The overhang matches the height of the foyer's upper level or meditation hall's upper walkway.
  const overhangHeight = horizon * 0.8;
  ctx.fillStyle = isNight ? '#dddddd' : '#ffffff';
  
  // Draw angled overhang (11-degree angle)
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, overhangHeight);
  ctx.lineTo(0, overhangHeight - width * Math.tan(11 * Math.PI / 180)); // 11-degree angle
  ctx.closePath();
  ctx.fill();

  // Solar Panels (High-quality solar panels on top of the overhang)
  const numPanels = 15;
  const panelW = width / numPanels * 0.8;
  const panelH = 30;
  for (let i = 0; i < numPanels; i++) {
    const x = (i + 0.1) * (width / numPanels);
    ctx.fillStyle = "#1a1a1a"; // Dark solar panel
    ctx.fillRect(x, 5, panelW, panelH);
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, 5, panelW, panelH);
    // Panel grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    for (let j = 1; j < 4; j++) {
      ctx.beginPath();
      ctx.moveTo(x + (j * panelW) / 4, 5);
      ctx.lineTo(x + (j * panelW) / 4, 5 + panelH);
      ctx.stroke();
    }
  }

  // Skylights (20)
  const numSkylights = 20;
  const skylightW = width / numSkylights * 0.6;
  const skylightH = 40;
  for (let i = 0; i < numSkylights; i++) {
    const x = (i + 0.2) * (width / numSkylights);
    ctx.fillStyle = "rgba(173, 216, 230, 0.5)";
    ctx.fillRect(x, 40, skylightW, skylightH);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, 40, skylightW, skylightH);
  }

  // Large Lamps (10)
  const numLamps = 10;
  for (let i = 0; i < numLamps; i++) {
    const x = (i + 0.5) * (width / numLamps);
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffaa";
    ctx.fillStyle = "#ffffcc";
    ctx.beginPath();
    ctx.arc(x, overhangHeight - 10, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Pillars (200 supporting the overhang, adjusted for 8000 width)
  const numPillars = 200;
  const pillarW = 2;
  for (let i = 0; i < numPillars; i++) {
    const x = (i / numPillars) * width;
    // Don't block the 20-foot opening at the center
    const centerX = width / 2;
    const openingW = 20 * (width / currentDims.width); 
    if (Math.abs(x - centerX) > openingW / 2) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - pillarW / 2, 0, pillarW, height); 
    }
  }

  // Fences on East and West ends
  ctx.fillStyle = "#555555";
  ctx.fillRect(0, horizon, 10, height - horizon); // West fence
  ctx.fillRect(width - 10, horizon, 10, height - horizon); // East fence

  // Brass Railings (4 feet tall, adjusted for 4000x centered opening)
  const railingH = 40; 
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 4;
  const centerX_px = width / 2;
  const openingW_px = 20 * (width / currentDims.width);
  
  // Left Railing
  ctx.beginPath();
  ctx.moveTo(0, height - railingH);
  ctx.lineTo(centerX_px - openingW_px / 2, height - railingH);
  ctx.stroke();
  
  // Right Railing
  ctx.beginPath();
  ctx.moveTo(centerX_px + openingW_px / 2, height - railingH);
  ctx.lineTo(width, height - railingH);
  ctx.stroke();

  // Benches on left and right of opening
  const benchW = 60;
  const benchH = 30;
  ctx.fillStyle = "#8B4513"; // Brown wood
  // Left bench
  ctx.fillRect(centerX_px - openingW_px / 2 - benchW - 10, height - benchH - 5, benchW, benchH);
  // Right bench
  ctx.fillRect(centerX_px + openingW_px / 2 + 10, height - benchH - 5, benchW, benchH);

  // Picnic Table (East side)
  const picnicX = width * 0.8;
  const picnicY = height - 60;
  ctx.fillStyle = "#4b2e19";
  ctx.fillRect(picnicX, picnicY, 80, 40); // Table top
  ctx.fillRect(picnicX + 5, picnicY + 40, 5, 20); // Legs
  ctx.fillRect(picnicX + 70, picnicY + 40, 5, 20);

  // Additional Tables
  const tableX1 = width * 0.2;
  const tableY1 = height - 50;
  ctx.fillRect(tableX1, tableY1, 40, 30);
  
  const tableX2 = width * 0.65;
  const tableY2 = height - 50;
  ctx.fillRect(tableX2, tableY2, 40, 30);

  // Vending Machines (West side)
  const vendingX = width * 0.05;
  const vendingY = horizon + 20;
  for (let i = 0; i < 3; i++) {
    const vx = vendingX + i * 40;
    ctx.fillStyle = i === 0 ? "#ff0000" : i === 1 ? "#0000ff" : "#00ff00";
    ctx.fillRect(vx, vendingY, 30, 60);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(vx + 5, vendingY + 5, 20, 20); // Screen/Glass
  }

  // North Wall Features (Cut-out window and Connecting door)
  // These are on the North wall (horizon line area)
  const windowW = 100;
  const windowH = 60;
  const windowX = width * 0.4;
  ctx.fillStyle = "rgba(173, 216, 230, 0.4)";
  ctx.fillRect(windowX, horizon - windowH - 10, windowW, windowH);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(windowX, horizon - windowH - 10, windowW, windowH);

  const doorW = 40;
  const doorH = 80;
  const doorX = width * 0.55;
  ctx.fillStyle = "#4b2e19";
  ctx.fillRect(doorX, horizon - doorH, doorW, doorH);
  ctx.strokeStyle = "#ffd700";
  ctx.strokeRect(doorX, horizon - doorH, doorW, doorH);
  // Door handle
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.arc(doorX + doorW - 8, horizon - doorH / 2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
