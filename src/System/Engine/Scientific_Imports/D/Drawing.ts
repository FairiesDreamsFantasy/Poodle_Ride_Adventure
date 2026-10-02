import { GameState, AREA_DIMENSIONS } from '../../../AI/In-Game/Logic/GameLogic';

/**
 * 2D Canvas rendering utilities.
 * Part of the "D" section of the modular Imports library.
 */

export function draw2DView(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState) {
  ctx.save();
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);

  const currentDims = AREA_DIMENSIONS[state.area] || { width: 2000, height: 2000 };
  const scaleX = width / currentDims.width;
  const scaleY = height / currentDims.height;

  // Draw Grid
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  for (let x = 0; x <= currentDims.width; x += 200) {
    ctx.beginPath();
    ctx.moveTo(x * scaleX, 0);
    ctx.lineTo(x * scaleX, height);
    ctx.stroke();
  }
  for (let y = 0; y <= currentDims.height; y += 200) {
    ctx.beginPath();
    ctx.moveTo(0, y * scaleY);
    ctx.lineTo(width, y * scaleY);
    ctx.stroke();
  }

  // Draw Poodle as a dot
  ctx.fillStyle = '#ff69b4';
  ctx.beginPath();
  ctx.arc(state.gridX * scaleX, state.gridY * scaleY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Draw direction indicator
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(state.gridX * scaleX, state.gridY * scaleY);
  const dirX = state.direction === 'East' ? 20 : (state.direction === 'West' ? -20 : 0);
  const dirY = state.direction === 'South' ? 20 : (state.direction === 'North' ? -20 : 0);
  ctx.lineTo(state.gridX * scaleX + dirX, state.gridY * scaleY + dirY);
  ctx.stroke();

  // Label
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(`2D MODE: ${state.area} (${Math.floor(state.gridX)}, ${Math.floor(state.gridY)})`, 20, 30);
  
  ctx.restore();
}
