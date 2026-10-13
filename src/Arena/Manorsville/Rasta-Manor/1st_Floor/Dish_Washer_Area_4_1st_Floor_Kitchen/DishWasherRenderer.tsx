import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';

export function drawDishWasher(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  
  // Floor
  ctx.fillStyle = isNight ? '#333333' : '#666666';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Walls
  ctx.fillStyle = isNight ? '#222222' : '#444444';
  ctx.fillRect(0, 0, width, horizon);

  // Insulated Pipes (North wall)
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#dddddd"; // Light gray insulation
  for (let i = 0; i < 3; i++) {
    const py = 40 + i * 40;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }
  
  // Red Valve
  const valveX = width * 0.7;
  const valveY = 80;
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(valveX, valveY, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#aa0000";
  ctx.lineWidth = 3;
  ctx.stroke();
  // Handle
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 8px Arial";
  ctx.textAlign = "center";
  ctx.fillText("ON", valveX, valveY + 3);

  // Dishwashing Machines
  for (let i = 0; i < 4; i++) {
    const dx = width * 0.1 + i * (width * 0.2);
    ctx.fillStyle = "#888888";
    ctx.fillRect(dx, horizon - 100, 100, 100);
    ctx.strokeStyle = "#aaaaaa";
    ctx.strokeRect(dx, horizon - 100, 100, 100);
    
    // Steam Venting
    if (state.pixelRatio >= 0.5) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      for (let j = 0; j < 3; j++) {
        const sx = dx + 20 + j * 20;
        const sy = horizon - 120 - (Math.sin(time / 500 + i + j) * 20);
        ctx.beginPath();
        ctx.arc(sx, sy, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Large Sinks
  ctx.fillStyle = "#aaaaaa";
  ctx.fillRect(width * 0.1, height - 120, width * 0.8, 80);
  ctx.strokeStyle = "#cccccc";
  ctx.strokeRect(width * 0.1, height - 120, width * 0.8, 80);

  ctx.restore();
}
