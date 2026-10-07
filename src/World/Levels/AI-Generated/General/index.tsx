import { GameState } from '../../../../System/Engine/Core/Types';

export interface AIGeneratedLevelProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export function drawAIGeneratedLevel(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  const scaleX = width / 2000;
  const scaleY = height / 2000;

  // Futuristic AI Realm Background
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
  bgGrad.addColorStop(0, '#0F0C20');
  bgGrad.addColorStop(1, '#05020A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Holographic Grid
  ctx.strokeStyle = 'rgba(0, 230, 230, 0.2)';
  ctx.lineWidth = 1;
  const gridSize = 40 * scaleX;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Floating AI Core Nodes
  const pulse = Math.sin(time * 0.003) * 10;
  ctx.fillStyle = 'rgba(0, 230, 230, 0.6)';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, (100 + pulse) * scaleX, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${Math.max(14, Math.floor(18 * scaleX))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText("AI GENERATED REALM (KEY ACTIVATED)", width / 2, height / 2);
  ctx.font = `${Math.max(11, Math.floor(13 * scaleX))}px sans-serif`;
  ctx.fillText("South Portal leads back to Selector House", width / 2, height / 2 + 30 * scaleY);

  // South Portal to Selector House
  ctx.fillStyle = '#00E676';
  ctx.fillRect((1000 - 30) * scaleX, (2000 - 20) * scaleY, 60 * scaleX, 20 * scaleY);
}
