import { GameState } from '../../../../../System/Engine/Core/Types';

/**
 * Polygon-based Rendering for Dymond Daisy Qin-Reynolds
 * [PRESERVED ARTISTIC CRAFT]
 */
export function drawDymondPolygons(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = Math.min(width, height) / 100;
  ctx.save();
  ctx.translate(width / 2, height / 2 + 20 * scale);
  ctx.fillStyle = '#fffff0';

  // Simplified polygon representation of her fluffy body
  // Front sphere
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = 18 * scale;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r - 5 * scale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
