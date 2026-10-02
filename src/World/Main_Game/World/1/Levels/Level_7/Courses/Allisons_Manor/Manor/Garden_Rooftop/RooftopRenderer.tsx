import { GameState } from '../../../../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * ALLISON'S MANOR ROOFTOP GARDEN RENDERER
 * Perimeter fence 25ft high, biodiversity, house-like structure, benches, tables, windmill.
 */
export function drawRooftop(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const isNight = state.lightingMode === 'Night';
  const horizon = height * 0.4;

  ctx.save();

  // Sky
  ctx.fillStyle = isNight ? '#000011' : '#87CEEB';
  ctx.fillRect(0, 0, width, horizon);

  // Ground (Grass and soil)
  ctx.fillStyle = isNight ? '#002200' : '#228B22';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Perimeter Fence (25ft high)
  ctx.strokeStyle = '#888888';
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, horizon - 50);
    ctx.lineTo(x, horizon);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(0, horizon - 50);
  ctx.lineTo(width, horizon - 50);
  ctx.stroke();

  // Biodiversity: Flowers and Plants
  const flowerColors = ['#FF0000', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];
  for (let i = 0; i < 50; i++) {
    const fx = (Math.sin(i * 123.45) * 0.5 + 0.5) * width;
    const fy = horizon + (Math.cos(i * 678.9) * 0.5 + 0.5) * (height - horizon);
    ctx.fillStyle = flowerColors[i % flowerColors.length];
    ctx.beginPath();
    ctx.arc(fx, fy, 3, 0, Math.PI * 2);
    ctx.fill();
    // Stem
    ctx.strokeStyle = '#006400';
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx, fy + 5);
    ctx.stroke();
  }

  // Benches and Tables for tea parties
  ctx.fillStyle = '#8B4513';
  // Table
  ctx.fillRect(width * 0.6, horizon + 100, 80, 40);
  // Benches
  ctx.fillRect(width * 0.6 - 40, horizon + 110, 30, 20);
  ctx.fillRect(width * 0.6 + 90, horizon + 110, 30, 20);

  // Windmill for generating energy
  ctx.save();
  ctx.translate(width * 0.8, horizon + 50);
  // Tower
  ctx.fillStyle = '#AAAAAA';
  ctx.fillRect(-5, 0, 10, 100);
  // Blades
  ctx.rotate(time * 0.002);
  ctx.fillStyle = '#EEEEEE';
  for (let i = 0; i < 3; i++) {
    ctx.rotate((Math.PI * 2) / 3);
    ctx.fillRect(0, -2, 40, 4);
  }
  ctx.restore();

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
  const pad2Y = horizon + (670 / 700) * (height - horizon); // DOWN to 3rd
  const padHeight = 15 * ((height - horizon) / 700);

  // Pad 2 (DOWN to 3rd)
  const grad2 = ctx.createRadialGradient(rampBoundaryX - padWidth/2, pad2Y + padHeight/2, 0, rampBoundaryX - padWidth/2, pad2Y + padHeight/2, padWidth);
  grad2.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
  grad2.addColorStop(1, 'rgba(100, 50, 0, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(rampBoundaryX - padWidth, pad2Y, padWidth, padHeight);

  ctx.fillStyle = isNight ? '#FF8800' : '#AA5500';
  ctx.font = '10px sans-serif';
  ctx.fillText("TARSIS DOWN", rampBoundaryX - padWidth - 5, pad2Y + 10);
  
  // Label
  ctx.fillStyle = isNight ? '#FFFFFF' : '#000000';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Allison's Manor Rooftop Garden", width / 2, horizon - 150);

  ctx.restore();
}
