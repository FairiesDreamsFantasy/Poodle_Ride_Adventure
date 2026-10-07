import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

/**
 * Course Segment 2: Winding paths over trench
 * Features trains carting berries to a store.
 */
export function drawCourse1Segment2(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = height / 50;
  
  // 1. Garden Background
  ctx.fillStyle = '#3a8033';
  ctx.fillRect(0, 0, width, height);
  
  // 2. Trench (Center portion)
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 35 * scale, width, 15 * scale);
  
  // Subway/Train tracks in trench
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1;
  for (let y = 38 * scale; y < 48 * scale; y += 4 * scale) {
     ctx.beginPath();
     ctx.moveTo(0, y);
     ctx.lineTo(width, y);
     ctx.stroke();
  }
  
  // Trains carting berries
  const trainX = (time / 20) % (width + 200) - 100;
  ctx.fillStyle = '#8b0000'; // Train
  ctx.fillRect(trainX, 40 * scale, 30 * scale, 6 * scale);
  // Berries
  ctx.fillStyle = '#ff0000';
  for (let b = 0; b < 5; b++) {
     ctx.beginPath();
     ctx.arc(trainX + 5 * scale + b * 5 * scale, 39 * scale, 1.5 * scale, 0, Math.PI * 2);
     ctx.fill();
  }

  // 3. Winding Stone Path (Crosses over trench via bridges)
  // Logic for winding: Path center Y varies with X
  ctx.fillStyle = '#708090';
  const pathWidth = 20 * scale;
  
  // Using a sine wave for the winding effect
  for (let x = 0; x < width; x += 10) {
    const centerY = (20 + Math.sin((x + state.gridX * 10) / 100) * 10) * scale;
    ctx.fillRect(x, centerY - pathWidth / 2, 11, pathWidth);
    
    // Bridge rails when over trench
    if (centerY > 30 * scale) {
       ctx.fillStyle = '#ffffff';
       ctx.fillRect(x, centerY - pathWidth / 2, 11, 1 * scale);
       ctx.fillRect(x, centerY + pathWidth / 2 - 1*scale, 11, 1 * scale);
       ctx.fillStyle = '#708090';
    }
  }
}
