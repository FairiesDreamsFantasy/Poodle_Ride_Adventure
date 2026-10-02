import { GameState } from '../../../../../../../../../System/AI/In-Game/Logic/GameLogic';

export function drawSocaPath(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  // Rad Racer style pseudo-3D rendering on 2D canvas
  ctx.save();
  
  // Sky
  ctx.fillStyle = '#87CEEB'; // Pure blue sky
  ctx.fillRect(0, 0, width, height / 2);
  
  // Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(width * 0.2, height * 0.2, 30, 0, Math.PI * 2);
  ctx.arc(width * 0.25, height * 0.18, 40, 0, Math.PI * 2);
  ctx.arc(width * 0.3, height * 0.2, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(width * 0.7, height * 0.25, 40, 0, Math.PI * 2);
  ctx.arc(width * 0.78, height * 0.22, 50, 0, Math.PI * 2);
  ctx.arc(width * 0.85, height * 0.25, 40, 0, Math.PI * 2);
  ctx.fill();

  // Ground
  ctx.fillStyle = '#111111'; // Black brick path
  ctx.fillRect(0, height / 2, width, height / 2);

  // Pseudo-3D road lines
  const horizonY = height / 2;
  const roadWidthAtBottom = width * 0.8;
  const roadWidthAtHorizon = width * 0.1;
  const centerX = width / 2;
  
  // Draw road edges
  ctx.strokeStyle = '#888888';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - roadWidthAtHorizon / 2, horizonY);
  ctx.lineTo(centerX - roadWidthAtBottom / 2, height);
  ctx.moveTo(centerX + roadWidthAtHorizon / 2, horizonY);
  ctx.lineTo(centerX + roadWidthAtBottom / 2, height);
  ctx.stroke();

  // Draw lane dividers
  ctx.strokeStyle = '#FFFFFF';
  ctx.setLineDash([20, 20]);
  
  // Left lane divider
  ctx.beginPath();
  ctx.moveTo(centerX - roadWidthAtHorizon / 6, horizonY);
  ctx.lineTo(centerX - roadWidthAtBottom / 6, height);
  ctx.stroke();

  // Right lane divider
  ctx.beginPath();
  ctx.moveTo(centerX + roadWidthAtHorizon / 6, horizonY);
  ctx.lineTo(centerX + roadWidthAtBottom / 6, height);
  ctx.stroke();
  
  ctx.setLineDash([]);

  // Draw side barriers (chain-linked fences)
  ctx.fillStyle = '#555555';
  for (let i = 0; i < 10; i++) {
    const y = horizonY + (height - horizonY) * Math.pow(i / 10, 2);
    const scale = Math.pow(i / 10, 2);
    const fenceHeight = 50 * scale;
    
    // Left fence
    const leftX = centerX - (roadWidthAtHorizon / 2 + (roadWidthAtBottom / 2 - roadWidthAtHorizon / 2) * scale) - 20 * scale;
    ctx.fillRect(leftX, y - fenceHeight, 5 * scale, fenceHeight);
    
    // Right fence
    const rightX = centerX + (roadWidthAtHorizon / 2 + (roadWidthAtBottom / 2 - roadWidthAtHorizon / 2) * scale) + 20 * scale;
    ctx.fillRect(rightX, y - fenceHeight, 5 * scale, fenceHeight);
  }

  // Draw distant houses (start and end)
  if (state.gridY < 400) {
    // Start houses
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(width * 0.1, horizonY - 20, 30, 20);
    ctx.fillStyle = '#4682B4';
    ctx.fillRect(width * 0.85, horizonY - 30, 40, 30);
  } else if (state.gridY > 9600) {
    // End houses (Allison's Manor approach)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(width * 0.4, horizonY - 50, 100, 50);
  }

  ctx.restore();
}
