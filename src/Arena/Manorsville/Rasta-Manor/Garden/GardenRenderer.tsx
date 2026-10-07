import { GameState, AREA_DIMENSIONS, GRID_SIZE } from "../../../../System/AI/In-Game/Logic/GameLogic";
import { drawTable, drawBench, drawFence, drawDoors } from '../../../../System/AI/In-Game/Logic/Garden/GardenObjects';
import { drawRailwayEffect } from '../../../../System/Engine/Science/Graphical_Renderer/Tarsis_Effects/TarsisEffectsList';

export function drawGarden(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';
  const currentDims = AREA_DIMENSIONS[state.area] || { width: GRID_SIZE, height: GRID_SIZE };

  ctx.save();
  
  // Sky (Simplified 2D rendering for performance)
  if (isNight) {
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, width, horizon);
    
    // Stars (Reduced count for performance)
    const starCount = state.pixelRatio < 1 ? 30 : 100;
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < starCount; i++) {
      const x = (Math.sin(i * 123.45) * 0.5 + 0.5) * width;
      const y = (Math.cos(i * 678.90) * 0.5 + 0.5) * horizon;
      const size = state.pixelRatio < 1 ? 1 : (Math.sin(time / 1000 + i) * 1 + 1);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Moon
    ctx.save();
    ctx.translate(width * 0.8, horizon * 0.3);
    ctx.fillStyle = '#ffffcc';
    if (state.pixelRatio >= 1) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ffffcc';
    }
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (isEvening) {
    // Simple 2D gradient for sky
    const grad = ctx.createLinearGradient(0, 0, 0, horizon);
    grad.addColorStop(0, '#2c3e50');
    grad.addColorStop(1, '#fd746c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, horizon);
  } else {
    // Simple 2D gradient for sky
    const grad = ctx.createLinearGradient(0, 0, 0, horizon);
    grad.addColorStop(0, '#4facfe');
    grad.addColorStop(1, '#00f2fe');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, horizon);
    
    // Sun Rays (Reduced for performance)
    if (state.pixelRatio >= 0.5) {
      ctx.save();
      ctx.translate(width * 0.2, horizon * 0.2);
      ctx.rotate(time / 5000);
      ctx.strokeStyle = 'rgba(255, 255, 200, 0.3)';
      ctx.lineWidth = 2;
      const rayCount = state.pixelRatio < 1 ? 6 : 12;
      for (let i = 0; i < rayCount; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 100);
        ctx.stroke();
        ctx.rotate((Math.PI * 2) / rayCount);
      }
      ctx.restore();
    }
  }

  // Ground (Grass with centralized treatment - using ceramic tiles with grass overlay)
  const grassColor = isNight ? '#1a3a1a' : (isEvening ? '#2a4a2a' : '#2d5a27');
  ctx.fillStyle = grassColor;
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Grass Blades (Simple texture)
  ctx.save();
  ctx.strokeStyle = isNight ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)";
  for (let i = 0; i < width; i += 40) {
    for (let j = horizon; j < height; j += 40) {
      ctx.beginPath();
      ctx.moveTo(i, j);
      ctx.lineTo(i + Math.sin(time/500 + i)*5, j-10);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Wind Chimes (Visual renewal)
  // Positioned at the back porch area or near the corners
  const drawWindChime = (x: number, y: number, flicker: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    // Base string
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 50);
    ctx.stroke();
    // Chimes
    for (let i = -2; i <= 2; i++) {
        const h = 40 + Math.sin(time/200 + i) * 10 * flicker;
        ctx.fillStyle = "#silver";
        ctx.fillRect(i * 10 - 2, 50, 4, h);
    }
    ctx.restore();
  };

  if (state.gridY >= currentDims.height - 300) {
    drawWindChime(width * 0.2, horizon - 100, 1.0);
    drawWindChime(width * 0.8, horizon - 100, 0.8);
  }

  // South Barrier (8000 feet wide, 1 foot (12 inches) thick)
  if (state.gridY <= 150) { // Near south barrier
    const dist = state.gridY;
    const scale = 400 / (dist + 50);
    const barrierH = 40 * scale; // 40 feet high
    const barrierY = horizon - barrierH;

    // Draw Railway Tracks Below (Tarsis Effect)
    drawRailwayEffect(ctx, width, height, horizon, state, time, scale);
    
    ctx.fillStyle = "#444444"; // Dark grey barrier
    ctx.fillRect(0, barrierY, width, barrierH);
    
    // Add some brick detail to barrier using centralized building blocks if scale permits
    if (scale > 2) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20 * scale) {
        ctx.strokeRect(i, barrierY, 20 * scale, barrierH);
      }
    }
  }

  // East/West Side Barriers (12 inches (1 foot) thick)
  const drawSideBarrier = (isWest: boolean) => {
    const xPos = isWest ? 1 : currentDims.width - 1;
    const dist = Math.abs(state.gridX - xPos);
    if (dist > 500) return;
    
    const scale = 400 / (dist + 50);
    const barrierW = 50 * scale; 
    const barrierX = isWest ? 0 : width - barrierW;
    const barrierH = 150 * scale;
    
    ctx.fillStyle = "#333333"; // Dense dark grey material
    ctx.fillRect(barrierX, horizon - barrierH, barrierW, barrierH);
    
    // Top trim for barriers
    ctx.fillStyle = "#222222";
    ctx.fillRect(barrierX, horizon - barrierH - 5 * scale, barrierW, 5 * scale);
  };
  
  drawSideBarrier(true);
  drawSideBarrier(false);

  // Far Fence Trees
  if (state.gridY >= currentDims.height * 0.9) {
    for (let i = 0; i < 10; i++) {
      const x = (i / 10) * width;
      ctx.fillStyle = "#1a3a1a";
      ctx.beginPath();
      ctx.moveTo(x, horizon);
      ctx.lineTo(x - 20, horizon - 60);
      ctx.lineTo(x + 20, horizon - 60);
      ctx.fill();
    }
  }

  // Draw Doors
  const getDoorZ = (isNorth: boolean): number => {
    const { gridY, direction } = state;
    if (direction === 'North' && isNorth) return (currentDims.height + 1) - gridY;
    if (direction === 'South' && !isNorth) return gridY;
    return 0;
  };

  drawDoors(ctx, true, getDoorZ(true), width, height, horizon);
  drawDoors(ctx, false, getDoorZ(false), width, height, horizon);

  // Garden Objects
  if (state.gridX >= currentDims.width * 0.2 && state.gridX <= currentDims.width * 0.8 && state.gridY >= currentDims.height * 0.2 && state.gridY <= currentDims.height * 0.8) {
    drawTable(ctx, width * 0.7, horizon + 180, 0.8);
    drawBench(ctx, width * 0.2, horizon + 150, 1.0);
  }

  ctx.restore();
}
