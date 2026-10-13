import React, { useEffect, useRef } from 'react';

/**
 * System/Theme/Interstitial_Ad_Specific/Pixelated_Garden/General/index.tsx
 * Canvas renderer for the Pixelated Flower Garden interstitial ad background.
 */

export const PixelatedGardenCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Blue Sky
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, w, h * 0.6);

    // Green Grass
    ctx.fillStyle = '#32cd32';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Yellow House with Blue Roof
    const houseX = w * 0.6;
    const houseY = h * 0.45;
    const houseW = 120;
    const houseH = 100;

    // Body
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(houseX, houseY, houseW, houseH);

    // Roof (Blue)
    ctx.fillStyle = '#0000ff';
    ctx.beginPath();
    ctx.moveTo(houseX - 10, houseY);
    ctx.lineTo(houseX + houseW / 2, houseY - 50);
    ctx.lineTo(houseX + houseW + 10, houseY);
    ctx.closePath();
    ctx.fill();

    // Flowers (Pixelated dots)
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#ff69b4' : '#ffffff';
      ctx.fillRect(Math.random() * w, h * 0.65 + Math.random() * (h * 0.3), 8, 8);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40 pixelated pointer-events-none"
    />
  );
};
