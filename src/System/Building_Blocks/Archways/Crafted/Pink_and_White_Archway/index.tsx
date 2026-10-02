// Crafted Pink and White Archway Building Block
// Found at the doorway to the Rugged Play Field / Simulated Garden Area

export interface PinkAndWhiteArchwayProps {
  x: number;
  y: number;
  width: number;
  height: number;
  stripeCount?: number;
}

export const renderPinkAndWhiteArchway = (
  ctx: CanvasRenderingContext2D,
  props: PinkAndWhiteArchwayProps
) => {
  const { x, y, width, height, stripeCount = 10 } = props;
  ctx.save();

  const postW = Math.max(10, width * 0.08);
  const stripeH = height / stripeCount;

  // Left & Right Striped Posts
  for (let i = 0; i < stripeCount; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#ff69b4' : '#ffffff';
    ctx.fillRect(x, y + i * stripeH, postW, stripeH);
    ctx.fillRect(x + width - postW, y + i * stripeH, postW, stripeH);
  }

  // Header Arch with Concentric Rings
  const centerX = x + width / 2;
  const radius = width / 2 - postW / 2;
  for (let r = 0; r < 5; r++) {
    ctx.strokeStyle = r % 2 === 0 ? '#ff69b4' : '#ffffff';
    ctx.lineWidth = postW / 5;
    ctx.beginPath();
    ctx.arc(centerX, y, radius + r * (postW / 5), Math.PI, 0);
    ctx.stroke();
  }

  ctx.restore();
};

export const PinkAndWhiteArchway = {
  name: 'Pink and White Archway',
  primaryColor: '#ff69b4',
  secondaryColor: '#ffffff',
  render: renderPinkAndWhiteArchway,
};

export default PinkAndWhiteArchway;
