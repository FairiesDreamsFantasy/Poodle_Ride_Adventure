// Modular Decor Element: African Lion Circular Picture (8ft diameter)
// Positioned on the North wall of Selector House (10 to 100 ft from west wall).

export interface AfricanLionDecorProps {
  centerX: number;
  centerY: number;
  radius: number;
}

export function drawAfricanLionDecor(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  ctx.save();

  // Circular Gold Frame
  ctx.beginPath();
  ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
  ctx.fillStyle = '#D4AF37'; // Metallic Gold
  ctx.fill();

  // Clip to inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  // African Savannah Golden Sunset Background
  const sunGrad = ctx.createRadialGradient(cx, cy - r * 0.2, 5, cx, cy, r);
  sunGrad.addColorStop(0, '#FFD700'); // Golden Sun
  sunGrad.addColorStop(0.5, '#FF8C00'); // Orange Sky
  sunGrad.addColorStop(1, '#8B0000'); // Sunset Horizon
  ctx.fillStyle = sunGrad;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  // Acacia Tree Silhouette
  ctx.fillStyle = '#1A0D00';
  ctx.fillRect(cx - r * 0.6, cy + r * 0.1, r * 0.1, r * 0.6);
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.55, cy + r * 0.1, r * 0.4, r * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Majestic African Lion Silhouette / Portrait
  ctx.fillStyle = '#110800'; // Dark silhouette against golden sun
  // Head
  ctx.beginPath();
  ctx.arc(cx + r * 0.1, cy + r * 0.05, r * 0.25, 0, Math.PI * 2); // Lion mane
  ctx.fill();

  ctx.fillStyle = '#2A1500';
  ctx.beginPath();
  ctx.arc(cx + r * 0.1, cy + r * 0.1, r * 0.15, 0, Math.PI * 2); // Face
  ctx.fill();

  ctx.restore();
}
