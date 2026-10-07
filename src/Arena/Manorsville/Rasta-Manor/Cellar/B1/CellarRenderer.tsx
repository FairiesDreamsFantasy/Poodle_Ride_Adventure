import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';

const RAINBOW_COLORS = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];

export function drawCellarRamp(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  ctx.save();
  
  // Ceiling (Hexagonal pattern with golden hue)
  ctx.fillStyle = "#d4af37"; // Golden
  ctx.fillRect(0, 0, width, horizon);
  ctx.globalAlpha = 0.3;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      ctx.beginPath();
      const x = i * 100;
      const y = j * 50;
      ctx.moveTo(x + 25, y);
      ctx.lineTo(x + 75, y);
      ctx.lineTo(x + 100, y + 25);
      ctx.lineTo(x + 75, y + 50);
      ctx.lineTo(x + 25, y + 50);
      ctx.lineTo(x, y + 25);
      ctx.closePath();
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1.0;

  // Floor (Non-slip ceramic tiles, landing has indigo checked pattern)
  const isLanding = state.gridY < 20;
  ctx.fillStyle = isLanding ? "#4b0082" : "#ffffff"; // Indigo for landing, white for rest
  ctx.fillRect(0, horizon, width, height - horizon);
  
  if (isLanding) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, horizon);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
  }

  // Brass Railings
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(width * 0.02, height);
  ctx.lineTo(width * 0.02, horizon);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width * 0.98, height);
  ctx.lineTo(width * 0.98, horizon);
  ctx.stroke();

  // Green shade with flowers beneath railing
  ctx.fillStyle = "#006400";
  ctx.fillRect(0, height - 40, width, 40);
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = RAINBOW_COLORS[i % RAINBOW_COLORS.length];
    ctx.beginPath();
    ctx.arc(i * (width / 10) + 20, height - 20, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Exit Sign
  ctx.fillStyle = "#ff4500"; // Red-Orange
  ctx.fillRect(width / 2 - 50, horizon - 100, 100, 50);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("EXIT", width / 2 - 25, horizon - 70);

  ctx.restore();
}

export function drawCellar(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  ctx.save();

  // Floor (Ceramic tile with blue borders and white squares)
  const isLanding = state.gridY >= 1830; // Landing Square area
  ctx.fillStyle = isLanding ? "#4b0082" : "#ffffff"; // Indigo for landing, white for rest
  ctx.fillRect(0, horizon, width, height - horizon);
  
  if (!isLanding) {
    ctx.strokeStyle = "#0000ff";
    ctx.lineWidth = 2;
    for (let i = 0; i < width; i += 100) {
      for (let j = horizon; j < height; j += 100) {
        ctx.strokeRect(i, j, 100, 100);
      }
    }
  } else {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, horizon);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
  }

  // Walls (White up to 11 feet, then indigo above)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, horizon - 150, width, 150);
  ctx.fillStyle = "#4b0082";
  ctx.fillRect(0, 0, width, horizon - 150);

  // Pillars (Rounded indigo, spaced 50 feet apart)
  ctx.fillStyle = "#4b0082";
  for (let i = 0; i < 5; i++) {
    const x = (i + 1) * (width / 6);
    ctx.beginPath();
    ctx.ellipse(x, horizon, 20, 100, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rug Path
  ctx.fillStyle = "#8b4513"; // Brown rug
  ctx.fillRect(width / 2 - 50, horizon, 100, height - horizon);

  // LED Lights on ceiling
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(i * (width / 10) + 50, 50, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
