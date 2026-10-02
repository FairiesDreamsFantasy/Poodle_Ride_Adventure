import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

/**
 * Course Segment 3: Hedge path
 * Features tight and soft bends.
 */
export function drawCourse1Segment3(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = height / 50;
  
  // 1. Background
  ctx.fillStyle = '#3a8033';
  ctx.fillRect(0, 0, width, height);
  
  // 2. Hedge Walls
  ctx.fillStyle = '#006400';
  
  // 3. Winding Hedge Path
  const pathCenter = (25 + Math.sin((state.gridX * 10) / 50) * 15) * scale;
  const halfGap = 10 * scale;
  
  // Top Hedge
  ctx.fillRect(0, 0, width, pathCenter - halfGap);
  // Bottom Hedge
  ctx.fillRect(0, pathCenter + halfGap, width, height - (pathCenter + halfGap));
  
  // Path Surface
  ctx.fillStyle = '#708090';
  ctx.fillRect(0, pathCenter - halfGap, width, halfGap * 2);
  
  // 4. Flowers on hedges
  for (let i = 0; i < 20; i++) {
     const fx = ((i * 60 - state.gridX * 5) % width + width) % width;
     ctx.fillStyle = '#ff69b4';
     ctx.beginPath();
     ctx.arc(fx, pathCenter - halfGap - 2 * scale, 1 * scale, 0, Math.PI * 2);
     ctx.arc(fx + 10, pathCenter + halfGap + 2 * scale, 1 * scale, 0, Math.PI * 2);
     ctx.fill();
  }
}
