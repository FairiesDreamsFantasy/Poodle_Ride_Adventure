import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { SPECTATOR_WIDTH, SPECTATOR_HEIGHT, WALKWAY_WIDTH, BENCH_WIDTH } from './SpectatorAreaConstants';

export function drawSpectatorArea(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const viewScale = Math.min(width / SPECTATOR_WIDTH, height / SPECTATOR_HEIGHT) * 0.95;
  const offsetX = (width - SPECTATOR_WIDTH * viewScale) / 2;
  const offsetY = (height - SPECTATOR_HEIGHT * viewScale) / 2;

  // Background - The "void" or "arena below"
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(offsetX, offsetY, SPECTATOR_WIDTH * viewScale, SPECTATOR_HEIGHT * viewScale);

  // Draw the glass-floored perimeter walkway
  ctx.strokeStyle = 'rgba(200, 230, 255, 0.4)';
  ctx.lineWidth = 2;
  
  // Outer walkway area
  ctx.fillStyle = 'rgba(100, 150, 200, 0.15)'; // Glassy tint
  
  // North Walkway
  ctx.fillRect(offsetX, offsetY, SPECTATOR_WIDTH * viewScale, WALKWAY_WIDTH * viewScale);
  // South Walkway
  ctx.fillRect(offsetX, offsetY + (SPECTATOR_HEIGHT - WALKWAY_WIDTH) * viewScale, SPECTATOR_WIDTH * viewScale, WALKWAY_WIDTH * viewScale);
  // West Walkway
  ctx.fillRect(offsetX, offsetY, WALKWAY_WIDTH * viewScale, SPECTATOR_HEIGHT * viewScale);
  // East Walkway
  ctx.fillRect(offsetX + (SPECTATOR_WIDTH - WALKWAY_WIDTH) * viewScale, offsetY, WALKWAY_WIDTH * viewScale, SPECTATOR_HEIGHT * viewScale);

  // Grid lines on glass
  ctx.beginPath();
  for (let x = 0; x <= SPECTATOR_WIDTH; x += 50) {
    if (x <= WALKWAY_WIDTH || x >= SPECTATOR_WIDTH - WALKWAY_WIDTH) {
       ctx.moveTo(offsetX + x * viewScale, offsetY);
       ctx.lineTo(offsetX + x * viewScale, offsetY + SPECTATOR_HEIGHT * viewScale);
    } else {
       // Only North and South parts
       ctx.moveTo(offsetX + x * viewScale, offsetY);
       ctx.lineTo(offsetX + x * viewScale, offsetY + WALKWAY_WIDTH * viewScale);
       ctx.moveTo(offsetX + x * viewScale, offsetY + (SPECTATOR_HEIGHT - WALKWAY_WIDTH) * viewScale);
       ctx.lineTo(offsetX + x * viewScale, offsetY + SPECTATOR_HEIGHT * viewScale);
    }
  }
  for (let y = 0; y <= SPECTATOR_HEIGHT; y += 50) {
    if (y <= WALKWAY_WIDTH || y >= SPECTATOR_HEIGHT - WALKWAY_WIDTH) {
       ctx.moveTo(offsetX, offsetY + y * viewScale);
       ctx.lineTo(offsetX + SPECTATOR_WIDTH * viewScale, offsetY + y * viewScale);
    } else {
       // Only West and East parts
       ctx.moveTo(offsetX, offsetY + y * viewScale);
       ctx.lineTo(offsetX + WALKWAY_WIDTH * viewScale, offsetY + y * viewScale);
       ctx.moveTo(offsetX + (SPECTATOR_WIDTH - WALKWAY_WIDTH) * viewScale, offsetY + y * viewScale);
       ctx.lineTo(offsetX + SPECTATOR_WIDTH * viewScale, offsetY + y * viewScale);
    }
  }
  ctx.stroke();

  // Benches (10 feet wide along outer edge)
  ctx.fillStyle = '#1e3a5f'; // Deep Blue
  // North Bench
  ctx.fillRect(offsetX + 5 * viewScale, offsetY + 2 * viewScale, (SPECTATOR_WIDTH - 10) * viewScale, BENCH_WIDTH * viewScale);
  // South Bench
  ctx.fillRect(offsetX + 5 * viewScale, offsetY + (SPECTATOR_HEIGHT - BENCH_WIDTH - 2) * viewScale, (SPECTATOR_WIDTH - 10) * viewScale, BENCH_WIDTH * viewScale);

  // Barrier (Fencing)
  ctx.strokeStyle = '#c0c0c0';
  ctx.lineWidth = 3;
  // Inner perimeter line (The Safety Barrier)
  ctx.strokeRect(
    offsetX + WALKWAY_WIDTH * viewScale,
    offsetY + WALKWAY_WIDTH * viewScale,
    (SPECTATOR_WIDTH - 2 * WALKWAY_WIDTH) * viewScale,
    (SPECTATOR_HEIGHT - 2 * WALKWAY_WIDTH) * viewScale
  );

  // Player Marker
  const playerX = offsetX + state.gridX * viewScale;
  const playerY = offsetY + (SPECTATOR_HEIGHT - state.gridY) * viewScale;

  ctx.fillStyle = '#ffcc00';
  ctx.beginPath();
  ctx.arc(playerX, playerY, 8 * viewScale, 0, Math.PI * 2);
  ctx.fill();
  
  // Area Name
  ctx.fillStyle = 'white';
  ctx.font = `${24 * viewScale}px "Inter"`;
  ctx.textAlign = 'center';
  ctx.fillText("SPECTATOR PERIMETER WALKWAY", width / 2, offsetY + 60 * viewScale);
}
