import { GameState } from "../../../../Engine/Core/Types";
import { AREA_DIMENSIONS, GRID_SIZE } from "../../../../Engine/Core/Constants";

export function drawPorch(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const currentDims = AREA_DIMENSIONS['Porch'];

  ctx.save();
  // Floor (Stone tiles)
  ctx.fillStyle = isNight ? '#1a1a1a' : '#555555';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Ceiling (Wood beams)
  ctx.fillStyle = isNight ? '#0d0d0d' : '#3d2b1f';
  ctx.fillRect(0, 0, width, horizon);

  // Railing (East)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(width * 0.9, horizon);
  ctx.lineTo(width * 0.9, height);
  ctx.stroke();

  ctx.restore();
}

export function drawSidewalk(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  // Red brick sidewalk
  ctx.fillStyle = isNight ? '#331111' : '#8b4513';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Sky
  ctx.fillStyle = isNight ? '#000011' : '#87ceeb';
  ctx.fillRect(0, 0, width, horizon);

  ctx.restore();
}

export function drawStreet(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  // Asphalt street
  ctx.fillStyle = isNight ? '#0a0a0a' : '#333333';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Sky
  ctx.fillStyle = isNight ? '#000011' : '#87ceeb';
  ctx.fillRect(0, 0, width, horizon);

  // Yellow lines
  ctx.strokeStyle = '#ffff00';
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(width / 2, horizon);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  ctx.restore();
}

export function drawAdventureHouse(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();
  // Interior floor
  ctx.fillStyle = isNight ? '#1a1a1a' : '#4a4a4a';
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Ceiling
  ctx.fillStyle = isNight ? '#0d0d0d' : '#2a2a2a';
  ctx.fillRect(0, 0, width, horizon);

  ctx.restore();
}
