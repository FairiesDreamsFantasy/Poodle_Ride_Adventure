import { BuildingBlock } from '../../../../Building_Blocks/BlocksConstants';

/**
 * Graphical Renderer General Systems.
 */

export function drawBuildingBlock(
  ctx: CanvasRenderingContext2D,
  block: BuildingBlock,
  x: number,
  y: number,
  scale: number = 1
) {
  const { width, height } = block.dimensions;
  const drawWidth = width * scale;
  const drawHeight = height * scale;

  ctx.save();
  ctx.translate(x, y);

  if (block.color) {
    ctx.fillStyle = block.color;
  } else {
    // Default fallback colors by type
    switch (block.type) {
      case 'Brick': ctx.fillStyle = '#b35d4d'; break;
      case 'Glass': ctx.fillStyle = 'rgba(200, 230, 255, 0.4)'; break;
      case 'Metal': ctx.fillStyle = '#888888'; break;
      case 'Panel': ctx.fillStyle = '#4a2c2a'; break;
      case 'Tile': ctx.fillStyle = '#ffffff'; break;
    }
  }

  // Draw the main shape
  ctx.fillRect(-drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

  // Add detail based on type
  if (block.type === 'Brick') {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  } else if (block.type === 'Tile') {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  } else if (block.type === 'Glass') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-drawWidth / 2 + 5, -drawHeight / 2 + 5);
    ctx.lineTo(-drawWidth / 2 + 15, -drawHeight / 2 + 15);
    ctx.stroke();
  } else if (block.type === 'Metal') {
    const gradient = ctx.createLinearGradient(-drawWidth / 2, 0, drawWidth / 2, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.2)');
    ctx.fillStyle = gradient;
    ctx.fillRect(-drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  }

  ctx.restore();
}

/**
 * Draws a grid of tiles for flooring
 */
export function drawFloorTiling(
  ctx: CanvasRenderingContext2D,
  tileBlock: BuildingBlock,
  canvasWidth: number,
  canvasHeight: number,
  scrollX: number = 0,
  scrollY: number = 0,
  scale: number = 20
) {
  const { width, height } = tileBlock.dimensions;
  const tilePixelWidth = width * scale;
  const tilePixelHeight = height * scale;

  const startX = (scrollX % tilePixelWidth) - tilePixelWidth;
  const startY = (scrollY % tilePixelHeight) - tilePixelHeight;

  for (let x = startX; x < canvasWidth + tilePixelWidth; x += tilePixelWidth) {
    for (let y = startY; y < canvasHeight + tilePixelHeight; y += tilePixelHeight) {
      drawBuildingBlock(ctx, tileBlock, x + tilePixelWidth / 2, y + tilePixelHeight / 2, scale);
    }
  }
}
