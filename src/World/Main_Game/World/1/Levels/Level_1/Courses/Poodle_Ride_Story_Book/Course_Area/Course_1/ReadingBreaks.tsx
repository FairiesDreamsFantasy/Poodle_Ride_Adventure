import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

/**
 * Reading Break Area
 * A calm, 50x50 intermediate space for taking a break between course segments.
 */
export function drawReadingBreak(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number, breakNumber: number) {
  const scale = height / 50;
  
  // 1. Soft Grass
  ctx.fillStyle = '#4f9146';
  ctx.fillRect(0, 0, width, height);
  
  // 2. Stone path continues through
  ctx.fillStyle = '#708090';
  ctx.fillRect(0, 15 * scale, width, 20 * scale);
  
  // 3. Resting Area (A small gazebo or bench area)
  ctx.fillStyle = '#f5f5dc'; // Beige
  ctx.fillRect(15 * scale, 5 * scale, 20 * scale, 8 * scale);
  ctx.strokeStyle = '#8b4513';
  ctx.strokeRect(15 * scale, 5 * scale, 20 * scale, 8 * scale);
  
  // 4. Floating Book Icon (Visual cue for reading break)
  const floatY = Math.sin(time / 500) * 2 * scale;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(22 * scale, (8 * scale) + floatY, 6 * scale, 4 * scale);
  ctx.strokeStyle = '#0000ff';
  ctx.strokeRect(22 * scale, (8 * scale) + floatY, 6 * scale, 4 * scale);
  
  // text
  ctx.fillStyle = '#000';
  ctx.font = `${1.5 * scale}px Arial`;
  ctx.fillText(`BREAK ${breakNumber}`, 18 * scale, 45 * scale);
}
