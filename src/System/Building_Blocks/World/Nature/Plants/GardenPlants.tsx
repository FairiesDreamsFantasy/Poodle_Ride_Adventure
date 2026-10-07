import React from 'react';

/**
 * Draws a tree with proximity-based detail.
 * Far trees are blocky/pixelated, near trees are more advanced/smooth.
 */
export function drawTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  distance: number, // distance z (1 to 50)
  hasNestingBox: boolean,
  isNight: boolean = false
) {
  ctx.save();
  
  const isFar = distance > 25;
  const pixelSize = isFar ? Math.max(2, Math.floor(distance / 10)) : 1;

  // Night Glow Effect
  if (isNight) {
    ctx.save();
    ctx.shadowBlur = 15 * scale;
    ctx.shadowColor = 'rgba(100, 100, 255, 0.2)'; // Faint blueish glow
    // We draw an invisible shape to trigger the shadow if needed, 
    // or just let the main shapes have a shadow.
  }

  // Trunk
  ctx.fillStyle = isNight ? '#0a0502' : '#3b2219'; // Darker shadow trunk at night
  const trunkWidth = 10 * scale;
  const trunkHeight = 100 * scale;
  
  if (isFar) {
    // Pixelated trunk
    for (let py = 0; py < trunkHeight; py += pixelSize) {
      for (let px = 0; px < trunkWidth; px += pixelSize) {
        ctx.fillRect(x - trunkWidth / 2 + px, y - trunkHeight + py, pixelSize, pixelSize);
      }
    }
  } else {
    // Smooth trunk
    ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);
  }

  // Foliage
  ctx.fillStyle = isNight ? '#020a02' : '#003300'; // Shadow foliage at night
  const radius = 40 * scale;
  const foliageY = y - trunkHeight;

  if (isFar) {
    // Pixelated foliage (blocky circle approximation)
    for (let py = -radius; py < radius; py += pixelSize) {
      for (let px = -radius; px < radius; px += pixelSize) {
        if (px * px + py * py <= radius * radius) {
          ctx.fillRect(x + px, foliageY + py, pixelSize, pixelSize);
        }
      }
    }
  } else {
    // Smooth foliage
    ctx.beginPath();
    ctx.arc(x, foliageY, Math.max(0, radius), 0, Math.PI * 2);
    ctx.fill();
    
    // Advanced detail: highlights
    if (!isNight) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(x - radius * 0.3, foliageY - radius * 0.3, Math.max(0, radius * 0.4), 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Night glow highlight
      ctx.fillStyle = 'rgba(100, 100, 255, 0.05)';
      ctx.beginPath();
      ctx.arc(x, foliageY, Math.max(0, radius * 0.8), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (isNight) {
    ctx.restore(); // Restore from shadow settings
  }

  // Opossum Nesting Box
  if (hasNestingBox) {
    ctx.fillStyle = '#4b2e19';
    const boxSize = 20 * scale;
    const boxY = y - 80 * scale;
    ctx.fillRect(x - boxSize / 2, boxY, boxSize, boxSize);
    
    // Hole
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x, boxY + boxSize / 2, Math.max(0, boxSize / 4), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draws a berry bush.
 */
export function drawBerryBush(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number
) {
  ctx.save();
  
  // Foliage
  ctx.fillStyle = '#004400';
  const radius = 30 * scale;
  ctx.beginPath();
  ctx.arc(x, y - 20 * scale, Math.max(0, radius), 0, Math.PI * 2);
  ctx.fill();
  
  // Berries
  ctx.fillStyle = '#ff0000';
  const berrySize = 4 * scale;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const dist = radius * 0.6;
    ctx.fillRect(
      x + Math.cos(angle) * dist - berrySize / 2,
      y - 20 * scale + Math.sin(angle) * dist - berrySize / 2,
      berrySize,
      berrySize
    );
  }
  
  ctx.restore();
}
