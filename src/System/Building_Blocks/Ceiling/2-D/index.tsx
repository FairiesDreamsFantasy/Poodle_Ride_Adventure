import { CeilingGeometryConfig, generateCofferedPanels } from '../Geometry';
import { CeilingPattern } from '../Color_Palette/Pattern_Palette';

export interface Ceiling2DProps {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  config: CeilingGeometryConfig;
  pattern: CeilingPattern;
  color: string;
}

/**
 * Draws the 2D architectural ceiling representation on an HTML5 canvas context.
 */
export function drawCeiling2D({
  ctx,
  x,
  y,
  width,
  height,
  config,
  pattern,
  color
}: Ceiling2DProps) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();

  // Draw solid base color
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

  // Apply pattern designs
  if (pattern.type === 'coffered') {
    const panels = generateCofferedPanels(config);
    ctx.strokeStyle = pattern.gridLineColor;
    ctx.lineWidth = 2;
    panels.forEach(p => {
      ctx.strokeRect(x + p.x1, y + p.y1, p.x2 - p.x1, p.y2 - p.y1);
      // Double inner frame for depth
      ctx.strokeRect(x + p.x1 + 3, y + p.y1 + 3, p.x2 - p.x1 - 6, p.y2 - p.y1 - 6);
    });
  } else if (pattern.type === 'beams') {
    const spacing = 40;
    ctx.fillStyle = 'rgba(139, 69, 19, 0.35)'; // Dark wood tint
    for (let currentX = x + spacing; currentX < x + width; currentX += spacing) {
      ctx.fillRect(currentX - 5, y, 10, height);
    }
  } else if (pattern.type === 'stars') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    // Draw deterministic decorative celestial star pixels
    for (let i = 0; i < 40; i++) {
      const starX = x + ((Math.sin(i * 927) + 1) / 2) * width;
      const starY = y + ((Math.cos(i * 382) + 1) / 2) * height;
      const size = (i % 3 === 0) ? 2 : 1;
      ctx.fillRect(starX, starY, size, size);
    }
  }

  // Draw trim/border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, width, height);

  ctx.restore();
}
