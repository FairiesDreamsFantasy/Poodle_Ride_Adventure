import { GameState } from '../../../../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * ALLISON'S MANOR 2ND FLOOR RENDERER
 */
export function drawSecondFloor(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const isNight = state.lightingMode === 'Night';
  const horizon = height * 0.3;

  ctx.save();

  // Floor (Carpeted)
  ctx.fillStyle = isNight ? '#2a1a1a' : '#8B4513';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Walls and Ceiling
  ctx.fillStyle = isNight ? '#1a0a0a' : '#FFF8DC';
  ctx.fillRect(0, 0, width, horizon);

  // Decorative paintings on walls
  for (let x = 100; x < width; x += 300) {
    ctx.fillStyle = '#4B0082';
    ctx.fillRect(x, 50, 60, 80);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, 50, 60, 80);
  }

  // --- TARSIS Teleportation Area (Northwest Corner) ---
  const rampBoundaryX = 30 * (width / 1000);
  
  // Draw the West boundary wall with openings
  ctx.strokeStyle = isNight ? '#333' : '#AAA';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(rampBoundaryX, horizon + (520 / 700) * (height - horizon));
  ctx.moveTo(rampBoundaryX, horizon + (635 / 700) * (height - horizon));
  ctx.lineTo(rampBoundaryX, horizon + (685 / 700) * (height - horizon));
  ctx.stroke();

  // TARSIS Teleport Pads
  const padWidth = 15 * (width / 1000);
  const pad1Y = horizon + (525 / 700) * (height - horizon); // DOWN to 1st
  const pad2Y = horizon + (670 / 700) * (height - horizon); // UP to 3rd
  const padHeight = 15 * ((height - horizon) / 700);

  // Pad 1 (DOWN to 1st)
  const grad1 = ctx.createRadialGradient(rampBoundaryX - padWidth/2, pad1Y + padHeight/2, 0, rampBoundaryX - padWidth/2, pad1Y + padHeight/2, padWidth);
  grad1.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
  grad1.addColorStop(1, 'rgba(100, 50, 0, 0)');
  ctx.fillStyle = grad1;
  ctx.fillRect(rampBoundaryX - padWidth, pad1Y, padWidth, padHeight);

  // Pad 2 (UP to 3rd)
  const grad2 = ctx.createRadialGradient(rampBoundaryX - padWidth/2, pad2Y + padHeight/2, 0, rampBoundaryX - padWidth/2, pad2Y + padHeight/2, padWidth);
  grad2.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
  grad2.addColorStop(1, 'rgba(0, 100, 0, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(rampBoundaryX - padWidth, pad2Y, padWidth, padHeight);

  ctx.fillStyle = isNight ? '#FF8800' : '#AA5500';
  ctx.font = '10px sans-serif';
  ctx.fillText("TARSIS DOWN", rampBoundaryX - padWidth - 5, pad1Y + 10);
  ctx.fillStyle = isNight ? '#00FF00' : '#008800';
  ctx.fillText("TARSIS UP", rampBoundaryX - padWidth - 5, pad2Y + 10);
  
  // Label
  ctx.fillStyle = isNight ? '#FFFFFF' : '#000000';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Allison's Manor - 2nd Floor", width / 2, horizon - 20);

  ctx.restore();
}
