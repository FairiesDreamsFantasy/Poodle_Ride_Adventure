import { GameState, AREA_DIMENSIONS } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { drawKitchenCook, drawKitchenStaff } from '../../../../../Characters/Kitchen_Staff/KitchenStaff';

export function drawKitchen(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  
  // Floor (Non-slip ceramic tiles)
  ctx.fillStyle = isNight ? '#444444' : '#888888';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Grid lines for tiles
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 50) {
    ctx.beginPath(); ctx.moveTo(i, horizon); ctx.lineTo(i, height); ctx.stroke();
  }
  for (let i = horizon; i < height; i += 50) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
  }

  // Walls (Fire-resistant)
  ctx.fillStyle = isNight ? '#333333' : '#666666';
  ctx.fillRect(0, 0, width, horizon);

  // Equipment: Electric wall ovens
  ctx.fillStyle = "#222222";
  ctx.fillRect(width * 0.1, horizon - 150, 100, 120);
  ctx.fillStyle = "#444444";
  ctx.fillRect(width * 0.1 + 10, horizon - 140, 80, 40); // Oven window

  // Japanese cooking range
  ctx.fillStyle = "#333333";
  ctx.fillRect(width * 0.4, horizon - 100, 200, 100);
  ctx.fillStyle = "#ff4500"; // Burners
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(width * 0.4 + 40 + i * 40, horizon - 90, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Commercial Sinks
  ctx.fillStyle = "#aaaaaa";
  ctx.fillRect(width * 0.7, horizon - 80, 150, 60);
  ctx.fillStyle = "#888888";
  ctx.fillRect(width * 0.7 + 10, horizon - 70, 60, 40);
  ctx.fillRect(width * 0.7 + 80, horizon - 70, 60, 40);

  // Walk-in Freezer
  ctx.fillStyle = "#dddddd";
  ctx.fillRect(width * 0.05, horizon - 200, 80, 200);
  ctx.strokeStyle = "#999999";
  ctx.strokeRect(width * 0.05, horizon - 200, 80, 200);

  // Food Carts
  ctx.fillStyle = "#555555";
  ctx.fillRect(width * 0.3, height - 100, 60, 80);
  ctx.fillStyle = "#000000";
  ctx.beginPath(); ctx.arc(width * 0.3 + 10, height - 15, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(width * 0.3 + 50, height - 15, 5, 0, Math.PI * 2); ctx.fill();

  // --- Render Kitchen Staff ---
  
  // 8 Cooks (Female, White, Rastafarian, Vintage dresses)
  // Positioned near ovens and range (North side of floor)
  const cookPositions = [
    { x: 150, y: 520 }, { x: 250, y: 540 },
    { x: 400, y: 560 }, { x: 500, y: 580 }, { x: 600, y: 530 },
    { x: 450, y: 550 }, { x: 550, y: 570 }, { x: 200, y: 590 }
  ];
  
  cookPositions.forEach((pos, i) => {
    drawKitchenCook(ctx, pos.x, pos.y, 0.8, time + i * 100);
  });

  // 14 Other Staff Members
  // Scattered near sinks, freezer, and carts
  const staffPositions = [
    { x: 750, y: 550 }, { x: 800, y: 600 }, { x: 850, y: 580 }, // Near sinks
    { x: 100, y: 550 }, { x: 150, y: 530 }, // Near freezer
    { x: 320, y: 850 }, { x: 380, y: 880 }, // Near food cart
    { x: 700, y: 800 }, { x: 200, y: 820 }, { x: 500, y: 750 }, // Middle
    { x: 900, y: 900 }, { x: 100, y: 920 }, { x: 600, y: 910 }, { x: 800, y: 850 } // South
  ];

  staffPositions.forEach((pos, i) => {
    drawKitchenStaff(ctx, pos.x, pos.y, 0.7, time + i * 200);
  });

  ctx.restore();
}
