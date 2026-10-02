import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

/**
 * Draws the PixelGardenGallopDecisionZone area (100 feet wide x 100 feet deep)
 * Features:
 * - Jade-green slate floor tiles with simulated 3-D shadows.
 * - Sparse layout with lush pixel flowerbeds on East and West sides.
 * - Centered 4 lanes, each wide as 72 inches (6 feet), from X = 38 to X = 62.
 * - Simulated 20-feet high ceiling using perspective side walls and columns.
 * - Centered 17-foot wide gate at the North wall (Y = 100), leading to Course 1.
 * - Centered 17-foot wide portal at the South wall (Y = 0), returning to the Square House.
 */
export function drawPixelGardenGallopDecisionZone(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / 100;
  const scaleY = height / 100;

  // 1. Jade-green slate floor tiles
  ctx.fillStyle = '#1e3321'; // Dark forest grout
  ctx.fillRect(0, 0, width, height);

  const tileW = 5 * scaleX;
  const tileH = 5 * scaleY;
  ctx.strokeStyle = '#2e4c32'; // Moss/Jade mortar
  ctx.lineWidth = 1;

  for (let y = 0; y < 100; y += 5) {
    const shift = (Math.floor(y / 5) % 2) * (tileW / 2);
    for (let x = -5; x < 105; x += 5) {
      const tx = x * scaleX + shift;
      const ty = y * scaleY;
      ctx.fillStyle = (Math.floor(x / 5) + Math.floor(y / 5)) % 2 === 0 ? '#27442b' : '#2d4e32'; // Elegant dual jade green
      ctx.fillRect(tx, ty, tileW - 0.5, tileH - 0.5);
      ctx.strokeRect(tx, ty, tileW, tileH);
    }
  }

  // 2. Centered Path with 4 lanes (each lane 72 in = 6 ft, total 24 ft wide, X = 38 to 62)
  const pathX = 38 * scaleX;
  const pathW = 24 * scaleX;

  // Track Base (Smooth light-brown gravel dirt track)
  ctx.fillStyle = '#8d6e63';
  ctx.fillRect(pathX, 0, pathW, height);

  // Borders of the running track
  ctx.strokeStyle = '#ffd700'; // Luxurious gold track borders
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pathX, 0);
  ctx.lineTo(pathX, height);
  ctx.moveTo(pathX + pathW, 0);
  ctx.lineTo(pathX + pathW, height);
  ctx.stroke();

  // Lane dividers: 4 lanes mean 3 divider lines (each lane is 6 feet wide)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 12]); // Dashed lane lines
  for (let l = 1; l <= 3; l++) {
    const lx = (38 + l * 6) * scaleX;
    ctx.beginPath();
    ctx.moveTo(lx, 0);
    ctx.lineTo(lx, height);
    ctx.stroke();
  }
  ctx.setLineDash([]); // Reset line dash

  // Draw lane numbers in JetBrains Mono style (for lane identifying charm)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = `bold ${10 * scaleX}px monospace`;
  ctx.textAlign = 'center';
  for (let l = 0; l < 4; l++) {
    const numX = (38 + l * 6 + 3) * scaleX;
    ctx.fillText(`${l + 1}`, numX, 85 * scaleY);
    ctx.fillText(`${l + 1}`, numX, 15 * scaleY);
  }

  // 3. Simulated 20-feet high ceiling and perspective side borders/pillars
  // Left wall shadow (X = 0 to 10)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, 8 * scaleX, height);
  
  // Right wall shadow (X = 92 to 100)
  ctx.fillRect(92 * scaleX, 0, 8 * scaleX, height);

  // Pillars along the sides (X = 5, and X = 95) every 20 feet (Y = 10, 30, 50, 70, 90)
  ctx.fillStyle = '#b0bec5'; // Stone pillar top face
  ctx.strokeStyle = '#37474f';
  ctx.lineWidth = 1.5;
  const pillarYCoords = [10, 30, 50, 70, 90];
  pillarYCoords.forEach((pY) => {
    // Left side pillars
    ctx.fillRect(3 * scaleX, (pY - 2) * scaleY, 2 * scaleX, 4 * scaleY);
    ctx.strokeRect(3 * scaleX, (pY - 2) * scaleY, 2 * scaleX, 4 * scaleY);
    
    // Right side pillars
    ctx.fillRect(95 * scaleX, (pY - 2) * scaleY, 2 * scaleX, 4 * scaleY);
    ctx.strokeRect(95 * scaleX, (pY - 2) * scaleY, 2 * scaleX, 4 * scaleY);
  });

  // 4. Sparse decoration: Lush pixelated flowerbeds on East and West sides (X < 38 and X > 62)
  for (let fY = 15; fY < 90; fY += 20) {
    // Left flowerbed
    ctx.fillStyle = '#3e2723'; // Dark rich soil
    ctx.fillRect(12 * scaleX, fY * scaleY, 15 * scaleX, 6 * scaleY);
    ctx.strokeStyle = '#5d4037';
    ctx.strokeRect(12 * scaleX, fY * scaleY, 15 * scaleX, 6 * scaleY);
    // Draw pixelated flower blobs
    ctx.fillStyle = '#ff1744'; // Red flowers
    ctx.fillRect(15 * scaleX, (fY + 1) * scaleY, 2 * scaleX, 2 * scaleY);
    ctx.fillStyle = '#ffd600'; // Yellow flowers
    ctx.fillRect(22 * scaleX, (fY + 3) * scaleY, 2 * scaleX, 2 * scaleY);

    // Right flowerbed
    ctx.fillStyle = '#3e2723'; // Dark rich soil
    ctx.fillRect(73 * scaleX, fY * scaleY, 15 * scaleX, 6 * scaleY);
    ctx.strokeStyle = '#5d4037';
    ctx.strokeRect(73 * scaleX, fY * scaleY, 15 * scaleX, 6 * scaleY);
    // Draw pixelated flower blobs
    ctx.fillStyle = '#00e5ff'; // Cyan flowers
    ctx.fillRect(76 * scaleX, (fY + 2) * scaleY, 2 * scaleX, 2 * scaleY);
    ctx.fillStyle = '#d500f9'; // Purple flowers
    ctx.fillRect(82 * scaleX, (fY + 1) * scaleY, 2 * scaleX, 2 * scaleY);
  }

  // 5. SOUTH WALL CENTRED PORTAL: 17ft wide, centered (X = 41.5 to 58.5, Y = 0)
  // Leads back to the Square House
  const sPortalX = 41.5 * scaleX;
  const sPortalW = 17 * scaleX;
  const sPortalH = 4 * scaleY;

  // Pulsing blue/pink starfield portal back
  const pulseScale = 1 + Math.sin(time * 4) * 0.15;
  ctx.save();
  ctx.translate(sPortalX + sPortalW / 2, 2 * scaleY);
  ctx.scale(pulseScale, 1);
  const portalGrad = ctx.createLinearGradient(-sPortalW / 2, 0, sPortalW / 2, 0);
  portalGrad.addColorStop(0, '#e91e63');
  portalGrad.addColorStop(0.5, '#2196f3');
  portalGrad.addColorStop(1, '#e91e63');
  ctx.fillStyle = portalGrad;
  ctx.fillRect(-sPortalW / 2, -2 * scaleY, sPortalW, sPortalH);
  ctx.restore();

  // South Gate Posts (Stone posts surrounding the portal)
  ctx.fillStyle = '#78909c';
  ctx.fillRect(sPortalX - 1.5 * scaleX, 0, 1.5 * scaleX, 3 * scaleY);
  ctx.fillRect(sPortalX + sPortalW, 0, 1.5 * scaleX, 3 * scaleY);
  ctx.strokeStyle = '#37474f';
  ctx.strokeRect(sPortalX - 1.5 * scaleX, 0, 1.5 * scaleX, 3 * scaleY);
  ctx.strokeRect(sPortalX + sPortalW, 0, 1.5 * scaleX, 3 * scaleY);

  // 6. NORTH WALL CENTRED GATE: 17ft wide, centered (X = 41.5 to 58.5, Y = 100)
  // Leads northwards into Pixel Garden Gallop Goal/Courses
  const nGateX = 41.5 * scaleX;
  const nGateW = 17 * scaleX;
  const nGateH = 4 * scaleY;

  const nGateY = 96 * scaleY;

  // Beautiful green-gold active shimmer effect inside the gate
  const nGrad = ctx.createLinearGradient(nGateX, nGateY, nGateX + nGateW, nGateY);
  nGrad.addColorStop(0, '#4caf50'); // Vibrant green
  nGrad.addColorStop(0.5, '#ffd700'); // Shiny gold sparkles
  nGrad.addColorStop(1, '#4caf50');
  ctx.fillStyle = nGrad;
  ctx.fillRect(nGateX, nGateY, nGateW, nGateH);

  // Golden majestic gate pillars on North corner
  ctx.fillStyle = '#ffd700'; // Gold pillars
  ctx.fillRect(nGateX - 1.5 * scaleX, 95 * scaleY, 1.5 * scaleX, 5 * scaleY);
  ctx.fillRect(nGateX + nGateW, 95 * scaleY, 1.5 * scaleX, 5 * scaleY);
  ctx.strokeStyle = '#b5a642';
  ctx.strokeRect(nGateX - 1.5 * scaleX, 95 * scaleY, 1.5 * scaleX, 5 * scaleY);
  ctx.strokeRect(nGateX + nGateW, 95 * scaleY, 1.5 * scaleX, 5 * scaleY);

  // Draw active neon arrows moving upwards on the 4 lanes to indicate flow
  ctx.fillStyle = 'rgba(0, 230, 118, 0.4)';
  for (let l = 0; l < 4; l++) {
    const arrowX = (38 + l * 6 + 3) * scaleX;
    const arrowY = ((time * 30 + l * 25) % 60 + 20) * scaleY;
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - 1 * scaleX, arrowY + 2 * scaleY);
    ctx.lineTo(arrowX + 1 * scaleX, arrowY + 2 * scaleY);
    ctx.closePath();
    ctx.fill();
  }
}
