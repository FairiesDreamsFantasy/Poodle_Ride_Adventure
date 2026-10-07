import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

/**
 * Course Segment 1: Starting Square with Trees
 * Solid stone path (5 lanes).
 */
export function drawCourse1Segment1(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = height / 50;
  
  // 1. Grassy Background
  ctx.fillStyle = '#2d5a27';
  ctx.fillRect(0, 0, width, height);
  
  // 2. Wide Stone Path (5 lanes - full segment height for path)
  ctx.fillStyle = '#708090'; // Slate Grey
  ctx.fillRect(0, 5 * scale, width, 40 * scale);
  
  // Lane Dividers
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.setLineDash([10, 10]);
  for (let i = 1; i < 5; i++) {
     const ly = (5 + i * 8) * scale;
     ctx.beginPath();
     ctx.moveTo(0, ly);
     ctx.lineTo(width, ly);
     ctx.stroke();
  }
  ctx.setLineDash([]);
  
  // 3. Set of Trees (Starting Segment detail)
  for (let i = 0; i < 2; i++) {
    const tx = (15 + i * 20) * scale;
    // North side trees
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(tx, 1 * scale, 2 * scale, 4 * scale);
    ctx.fillStyle = '#006400';
    ctx.beginPath();
    ctx.arc(tx + 1 * scale, 1 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // South side trees
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(tx, 45 * scale, 2 * scale, 4 * scale);
    ctx.fillStyle = '#006400';
    ctx.beginPath();
    ctx.arc(tx + 1 * scale, 45 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
}
