// Pink Brick Road Art Piece (4ft wide x 3ft tall)
// Depicts a pink brick road leading to a town of dream with a grand palace at center.

export interface PinkBrickRoadArtProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function drawPinkBrickRoadArt(ctx: CanvasRenderingContext2D, px: number, py: number, pw: number, ph: number): void {
  // Frame
  ctx.fillStyle = '#8B5A2B'; // Gold-brown wooden frame
  ctx.fillRect(px - 4, py - 4, pw + 8, ph + 8);

  // Canvas / Background Sky
  const skyGrad = ctx.createLinearGradient(px, py, px, py + ph * 0.6);
  skyGrad.addColorStop(0, '#FFD1DC'); // Pastel pink sky
  skyGrad.addColorStop(1, '#E6E6FA'); // Lavender horizon
  ctx.fillStyle = skyGrad;
  ctx.fillRect(px, py, pw, ph);

  // Palace in distance at center
  const centerX = px + pw / 2;
  const horizonY = py + ph * 0.55;

  // Palace towers
  ctx.fillStyle = '#FFF8DC'; // Golden cream palace
  ctx.fillRect(centerX - 15, horizonY - 25, 30, 25);
  ctx.fillRect(centerX - 25, horizonY - 18, 10, 18);
  ctx.fillRect(centerX + 15, horizonY - 18, 10, 18);

  // Spires
  ctx.beginPath();
  ctx.moveTo(centerX, horizonY - 40);
  ctx.lineTo(centerX - 10, horizonY - 25);
  ctx.lineTo(centerX + 10, horizonY - 25);
  ctx.closePath();
  ctx.fillStyle = '#FF69B4'; // Hot pink spire roofs
  ctx.fill();

  // Pink Brick Road winding down
  ctx.beginPath();
  ctx.moveTo(centerX - 4, horizonY);
  ctx.lineTo(centerX + 4, horizonY);
  ctx.lineTo(px + pw * 0.8, py + ph);
  ctx.lineTo(px + pw * 0.2, py + ph);
  ctx.closePath();
  ctx.fillStyle = '#FFB6C1'; // Light pink road
  ctx.fill();

  // Brick lines on road
  ctx.strokeStyle = '#FF69B4';
  ctx.lineWidth = 1;
  for (let y = horizonY; y < py + ph; y += 6) {
    ctx.beginPath();
    ctx.moveTo(px + pw * 0.2, y);
    ctx.lineTo(px + pw * 0.8, y);
    ctx.stroke();
  }
}
