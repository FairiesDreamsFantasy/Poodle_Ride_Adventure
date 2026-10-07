import { GameState } from '../../../../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * ALLISON'S MANOR 3RD FLOOR RENDERER
 */
export function drawThirdFloor(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const isNight = state.lightingMode === 'Night';
  const horizon = height * 0.3;

  ctx.save();

  // Floor (Hardwood)
  ctx.fillStyle = isNight ? '#1a0d00' : '#8B4513';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Walls and Ceiling
  ctx.fillStyle = isNight ? '#0d0d0d' : '#F0E68C';
  ctx.fillRect(0, 0, width, horizon);

  // Large windows looking out
  for (let x = 150; x < width; x += 400) {
    ctx.fillStyle = isNight ? '#001133' : '#87CEEB';
    ctx.fillRect(x, 40, 150, 100);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, 40, 150, 100);
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
  const pad1Y = horizon + (525 / 700) * (height - horizon); // UP to Rooftop
  const pad2Y = horizon + (670 / 700) * (height - horizon); // DOWN to 2nd
  const padHeight = 15 * ((height - horizon) / 700);

  // Pad 1 (UP to Rooftop)
  const grad1 = ctx.createRadialGradient(rampBoundaryX - padWidth/2, pad1Y + padHeight/2, 0, rampBoundaryX - padWidth/2, pad1Y + padHeight/2, padWidth);
  grad1.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
  grad1.addColorStop(1, 'rgba(0, 100, 0, 0)');
  ctx.fillStyle = grad1;
  ctx.fillRect(rampBoundaryX - padWidth, pad1Y, padWidth, padHeight);

  // Pad 2 (DOWN to 2nd)
  const grad2 = ctx.createRadialGradient(rampBoundaryX - padWidth/2, pad2Y + padHeight/2, 0, rampBoundaryX - padWidth/2, pad2Y + padHeight/2, padWidth);
  grad2.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
  grad2.addColorStop(1, 'rgba(100, 50, 0, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(rampBoundaryX - padWidth, pad2Y, padWidth, padHeight);

  ctx.fillStyle = isNight ? '#00FF00' : '#008800';
  ctx.font = '10px sans-serif';
  ctx.fillText("TARSIS UP", rampBoundaryX - padWidth - 5, pad1Y + 10);
  ctx.fillStyle = isNight ? '#FF8800' : '#AA5500';
  ctx.fillText("TARSIS DOWN", rampBoundaryX - padWidth - 5, pad2Y + 10);
  
  // Label
  ctx.fillStyle = isNight ? '#FFFFFF' : '#000000';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Allison's Manor - 3rd Floor", width / 2, horizon - 20);

  ctx.restore();
}
