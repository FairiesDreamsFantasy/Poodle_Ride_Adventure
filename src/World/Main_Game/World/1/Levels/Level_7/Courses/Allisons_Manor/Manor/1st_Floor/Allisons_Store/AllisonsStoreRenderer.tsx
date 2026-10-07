import React from 'react';
import { AREA_DIMENSIONS } from '../../../../../../../../../../../System/Engine/Core/Constants/Dimensions';

interface AllisonsStoreRendererProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  gameState: any;
}

export function drawAllisonsStore(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: any,
  time: number
) {
  const area = 'AllisonsStore';
  const dims = AREA_DIMENSIONS[area];
  const scale = Math.min(width / dims.width, height / dims.height);

  // Background - Beige floor
  ctx.fillStyle = "#f5f5dc"; 
  ctx.fillRect(0, 0, width, height);

  // Walls
  const wallThick = 10 * scale;
  ctx.fillStyle = "#8b4513"; // Wooden walls
  ctx.fillRect(0, 0, width, wallThick); // North
  ctx.fillRect(0, height - wallThick, width, wallThick); // South
  ctx.fillRect(0, 0, wallThick, height); // West
  ctx.fillRect(width - wallThick, 0, wallThick, height); // East

  // Shelves (Generic Store Interior)
  ctx.fillStyle = "#cd853f"; // Peru wooden shelves
  // Top row
  for(let i=0; i<4; i++) {
    ctx.fillRect((30 + i*50) * scale, 30 * scale, 40 * scale, 15 * scale);
  }
  // Bottom row
  for(let i=0; i<4; i++) {
    ctx.fillRect((30 + i*50) * scale, 130 * scale, 40 * scale, 15 * scale);
  }

  // Checkout Counter (Southeast)
  ctx.fillStyle = "#556b2f"; // DarkOliveGreen counter
  ctx.fillRect(150 * scale, 160 * scale, 60 * scale, 20 * scale);
  
  // Staff (At counters)
  ctx.fillStyle = "#ffdbac"; // Skin tone
  ctx.beginPath();
  ctx.arc(180 * scale, 165 * scale, 5 * scale, 0, Math.PI * 2); // Staff 1
  ctx.fill();
  ctx.fillStyle = "blue";
  ctx.fillRect(175 * scale, 170 * scale, 10 * scale, 10 * scale); // Staff Shirt

  // Cash Register (Abstract)
  ctx.fillStyle = "black";
  ctx.fillRect(160 * scale, 165 * scale, 8 * scale, 5 * scale);

  // Glass Door with Tarsis Effect (South Wall)
  // Position: x215 to x235 (interior)
  const doorX = 215 * scale;
  const doorW = 20 * scale;
  const gradient = ctx.createLinearGradient(doorX, height - 10*scale, doorX + doorW, height);
  gradient.addColorStop(0, "rgba(135, 206, 250, 0.6)"); // SkyBlue
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(1, "rgba(135, 206, 250, 0.6)");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(doorX, height - wallThick, doorW, wallThick);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(doorX, height - wallThick, doorW, wallThick);

  // Room Label
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.font = `bold ${14 * scale}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("Allison's Store", 0, 0);
  ctx.restore();
}

export const AllisonsStoreRenderer: React.FC<{ scale: number }> = ({ scale }) => {
  const area = 'AllisonsStore';
  const dims = AREA_DIMENSIONS[area];
  const width = dims.width * scale;
  const height = dims.height * scale;

  return (
    <div style={{ width, height }} className="relative">
      <canvas
        width={width}
        height={height}
        ref={(canvas) => {
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) drawAllisonsStore(ctx, width, height, {}, 0);
          }
        }}
      />
    </div>
  );
};
