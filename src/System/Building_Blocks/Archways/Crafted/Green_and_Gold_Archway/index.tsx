// Crafted Green and Gold Archway Building Block
// Found in garden, foyer and grand hallway passages

export interface GreenAndGoldArchwayProps {
  x: number;
  y: number;
  width: number;
  height: number;
  archHeight?: number;
}

export const renderGreenAndGoldArchway = (
  ctx: CanvasRenderingContext2D,
  props: GreenAndGoldArchwayProps
) => {
  const { x, y, width, height, archHeight = 40 } = props;
  ctx.save();

  // Green Base Posts
  ctx.fillStyle = '#0f5132';
  const postW = Math.max(8, width * 0.08);
  ctx.fillRect(x, y + archHeight, postW, height - archHeight);
  ctx.fillRect(x + width - postW, y + archHeight, postW, height - archHeight);

  // Gold Arch Curve
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = postW;
  ctx.beginPath();
  ctx.arc(x + width / 2, y + archHeight, width / 2 - postW / 2, Math.PI, 0);
  ctx.stroke();

  // Ornate Gold Trim on Posts
  ctx.fillStyle = '#ffd700';
  ctx.fillRect(x - 2, y + archHeight - 4, postW + 4, 8);
  ctx.fillRect(x + width - postW - 2, y + archHeight - 4, postW + 4, 8);

  ctx.restore();
};

export const GreenAndGoldArchway = {
  name: 'Green and Gold Archway',
  primaryColor: '#0f5132',
  accentColor: '#ffd700',
  render: renderGreenAndGoldArchway,
};

export default GreenAndGoldArchway;
