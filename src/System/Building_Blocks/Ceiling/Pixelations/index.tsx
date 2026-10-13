import React from 'react';

export interface CeilingPixelationProps {
  color: string;
  gridLineColor: string;
  width: number;
  height: number;
  pixelSize?: number;
}

/**
 * Renders a pixelated dithered pattern representing a retro-shaded ceiling surface.
 */
export const CeilingPixelation: React.FC<CeilingPixelationProps> = ({
  color,
  gridLineColor,
  width,
  height,
  pixelSize = 4
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and fill with base color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // Apply retro dithering pixels
    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Deterministic checkerboard pseudorandom dithering
        if ((c + r) % 2 === 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
        } else if ((c * r) % 3 === 0) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
          ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    // Draw pixelated grid line borders
    ctx.strokeStyle = gridLineColor;
    ctx.lineWidth = pixelSize;
    ctx.strokeRect(0, 0, width, height);
  }, [color, gridLineColor, width, height, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="image-render-pixelated border border-white/10"
      id="ceiling-pixelation-canvas"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
