import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

export function drawGoalZone(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = height / 50;
  
  // 1. Garden Surface
  ctx.fillStyle = '#2e8b57';
  ctx.fillRect(0, 0, width, height);
  
  // 2. Goal Zone Structure (50x50 container look)
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 4;
  ctx.strokeRect(2 * scale, 2 * scale, width - 4 * scale, height - 4 * scale);
  
  // 3. Large Open Windows with breezes
  ctx.fillStyle = '#add8e6';
  // West window
  ctx.fillRect(5 * scale, 10 * scale, 2 * scale, 30 * scale);
  // East window
  ctx.fillRect(width - 7 * scale, 10 * scale, 2 * scale, 30 * scale);
  
  // Breeze lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  const breezeOffset = (time / 10) % (20 * scale);
  ctx.beginPath();
  ctx.moveTo(5 * scale, 15 * scale);
  ctx.bezierCurveTo(15 * scale, 15 * scale + breezeOffset, 25 * scale, 15 * scale - breezeOffset, 45 * scale, 15 * scale);
  ctx.stroke();
  
  // 4. Set of Flowers
  for (let i = 0; i < 10; i++) {
    const fx = (10 + i * 4) * scale;
    const fy = (45) * scale;
    ctx.fillStyle = i % 2 === 0 ? '#ff69b4' : '#ffffff';
    ctx.beginPath();
    ctx.arc(fx, fy, 1.5 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 5. Large White Flower at the North (Goal Point)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(25 * scale, 8 * scale, 5 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffff00';
  ctx.beginPath();
  ctx.arc(25 * scale, 8 * scale, 2 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // 6. Portal Gate (Locked until star earned)
  const isLocked = (state.score < 1000); // Placeholder star logic
  ctx.fillStyle = isLocked ? '#444' : '#4b0082';
  ctx.fillRect(20 * scale, 15 * scale, 10 * scale, 2 * scale);
  
  if (isLocked) {
     ctx.fillStyle = '#fff';
     ctx.font = `${1 * scale}px Arial`;
     ctx.fillText("LOCKED", 22 * scale, 14 * scale);
  }
}
