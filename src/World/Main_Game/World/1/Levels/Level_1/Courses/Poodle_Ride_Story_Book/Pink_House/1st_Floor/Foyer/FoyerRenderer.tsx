/**
 * Pink House Foyer Logic and Renderer
 * [PRESERVED ARTISTIC CRAFT]
 */
import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';

export function drawPinkHouseFoyer(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / 500; // Based on 500x500 dimensions
  
  // 1. Optimized Ceramic Tiles: Blue and Light-Yellow Checkerboard (Adjusted size for performance)
  // [CRAFTSMANSHIP]: Special 2-D rendering to reduce CPU usage.
  const tileSize = 50 * scale; // Increased from 2px to 50px (Scientific optimization)
  const rows = Math.ceil(height / tileSize);
  const cols = Math.ceil(width / tileSize);
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * tileSize;
      const y = r * tileSize;
      ctx.fillStyle = (r + c) % 2 === 0 ? '#add8e6' : '#fffacd';
      ctx.fillRect(x, y, tileSize, tileSize);
      
      // Magenta Border (Subtle)
      ctx.strokeStyle = '#ff00ff';
      ctx.lineWidth = 0.5 * scale;
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }

  // 2. Walls: Light blue sky with yellow horizon and white pyramids
  // [TARSIS EFFECT]: Distant wall rendering with depth.
  ctx.save();
  // North Wall Tarsis Effect (Fade out distant parts to save processing/visual clutter)
  const distantFade = ctx.createLinearGradient(0, 0, 0, height * 0.15);
  distantFade.addColorStop(0, 'rgba(255, 0, 255, 0.2)'); // Tarsis Magenta Fog
  distantFade.addColorStop(0.8, 'transparent');
  ctx.fillStyle = distantFade;
  ctx.fillRect(0, 0, width, height * 0.15);

  ctx.globalAlpha = 0.4;
  ctx.fillStyle = '#87ceeb';
  ctx.fillRect(0, 0, width, height * 0.1); 
  
  // Horizon Line
  ctx.fillStyle = '#ffff00';
  ctx.fillRect(0, height * 0.1, width, 3 * scale);
  
  // Pyramids (Optimized count)
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 3; i++) {
    const px = (i * 180 + 50) * scale;
    ctx.beginPath();
    ctx.moveTo(px, height * 0.1);
    ctx.lineTo(px + 40 * scale, height * 0.04);
    ctx.lineTo(px + 80 * scale, height * 0.1);
    ctx.fill();
  }
  ctx.restore();

  // 3. Realistic Tarsis Depth Effect (Forward towards Tea Room)
  // This resembles a real-world depth effect to ensure immersion without RAM spikes.
  const depthGrad = ctx.createLinearGradient(0, 0, 0, height * 0.3);
  depthGrad.addColorStop(0, 'rgba(173, 216, 230, 0.5)'); // Light blue mist
  depthGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = depthGrad;
  ctx.fillRect(0, 0, width, height * 0.3);

  // 4. Mirror Finish and LED Glow
  const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
  glow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}
