import { GameState } from "../../../../Engine/Core/Types";
import { AREA_DIMENSIONS, GRID_SIZE } from "../../../../Engine/Core/Constants";
import { drawTable, drawBench, drawFence, drawDoors } from "./GardenObjects";

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

  // Ground (Grass)
  if (isNight) {
    ctx.fillStyle = '#1a3a1a'; // Brighter green for night visibility
  } else if (isEvening) {
    ctx.fillStyle = '#2a4a2a'; // Brighter green for evening visibility
  } else {
    ctx.fillStyle = '#2d5a27';
  }
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Subtle grass texture shimmer
  if (state.pixelRatio >= 1) {
    ctx.save();
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 20; i++) {
        const x = (Math.sin(i * 456.78) * 0.5 + 0.5) * width;
        const y = horizon + (Math.cos(i * 123.45) * 0.5 + 0.5) * (height - horizon);
        const shimmer = Math.sin(time / 1500 + i) * 0.5 + 0.5;
        if (shimmer > 0.7) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(x, y, 2, 2);
        }
    }
    ctx.restore();
  }

  // South Barrier and Subway
  if (state.gridY <= currentDims.height * 0.1) {
    ctx.save();
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, horizon - 50, width, 100);
    ctx.fillStyle = "#ffff00";
    ctx.fillRect(width * 0.4, horizon - 30, width * 0.2, 60);
    ctx.restore();
  }

  // East/West Fences and Details
  if (state.gridX <= currentDims.width * 0.1 || state.gridX >= currentDims.width * 0.9) {
    drawFence(ctx, horizon + 100, 80, width, isNight); // West/East fence
  }

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
