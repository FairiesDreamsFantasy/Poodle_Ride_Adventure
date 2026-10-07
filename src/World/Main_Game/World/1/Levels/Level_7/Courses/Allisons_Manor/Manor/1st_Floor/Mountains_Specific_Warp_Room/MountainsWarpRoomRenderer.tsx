
import React from 'react';
import { AREA_DIMENSIONS } from '../../../../../../../../../../../System/Engine/Core/Constants/Dimensions';

interface MountainsWarpRoomRendererProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  gameState: any;
}

export function drawMountainsWarpRoom(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: any,
  time: number
) {
  const dims = AREA_DIMENSIONS.AllisonsMountainsWarpRoom;
  const scaleX = width / dims.width;
  const scaleY = height / dims.height;
  const scale = Math.min(scaleX, scaleY);

  // Background - Blue Sky
  ctx.fillStyle = "#87CEEB"; // Sky Blue
  ctx.fillRect(0, 0, width, height);

  // Floor - Solid ceramic with mountains theme
  ctx.fillStyle = "#e0e0e0"; // Light Grey Ceramic
  ctx.fillRect(0, 0, width, height);
  
  // Ceramic grid
  ctx.strokeStyle = "#bcbcbc";
  ctx.lineWidth = 1;
  const gridSize = 40 * scale;
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Mountains on the floor (decorative pattern)
  ctx.fillStyle = "#808080";
  for (let i = 0; i < 5; i++) {
    const mx = (width / 5) * i + 20 * scale;
    const my = (height / 8) * i + 30 * scale;
    ctx.beginPath();
    ctx.moveTo(mx, my + 40 * scale);
    ctx.lineTo(mx + 20 * scale, my);
    ctx.lineTo(mx + 40 * scale, my + 40 * scale);
    ctx.fill();
  }

  // Draw Walls with Mountain Theme
  const drawMountainWall = (x: number, y: number, w: number, h: number, isVertical: boolean) => {
    ctx.save();
    ctx.fillStyle = "#87CEEB"; // Sky
    ctx.fillRect(x, y, w, h);
    
    // Simple mountains
    ctx.fillStyle = "#A9A9A9"; // Dark Grey
    if (isVertical) {
        for (let i = 0; i < h; i += 60 * scale) {
            ctx.beginPath();
            ctx.moveTo(x, y + i + 60 * scale);
            ctx.lineTo(x + w, y + i + 30 * scale);
            ctx.lineTo(x, y + i);
            ctx.fill();
        }
    } else {
        for (let i = 0; i < w; i += 60 * scale) {
            ctx.beginPath();
            ctx.moveTo(x + i, y + h);
            ctx.lineTo(x + i + 30 * scale, y);
            ctx.lineTo(x + i + 60 * scale, y + h);
            ctx.fill();
        }
    }
    ctx.restore();
  };

  const wallThick = 10 * scale;
  drawMountainWall(0, 0, width, wallThick, false); // North
  drawMountainWall(0, height - wallThick, width, wallThick, false); // South
  drawMountainWall(0, 0, wallThick, height, true); // West
  drawMountainWall(width - wallThick, 0, wallThick, height, true); // East

  // West End Windows
  // Windows are 10 feet wide, 10 feet high, 10 feet above the 10 feet high marker (total 20ft high?)
  // We render 2D top-down, so windows are slots in the wall.
  const winW = 10 * scale;
  const winH = 20 * scale; // Visual thickness
  ctx.fillStyle = "#add8e6"; // Light Blue glass
  for (let y = 50 * scale; y < height; y += 100 * scale) {
    ctx.fillRect(0, y, 5 * scale, 30 * scale);
    ctx.strokeStyle = "white";
    ctx.strokeRect(0, y, 5 * scale, 30 * scale);
  }

  // Entrance Door on East wall (x=200)
  // Placement: x200, from y230 to y250 (exterior); x200 at y230 to y250 (interior)
  ctx.fillStyle = "#00008b"; // Dark Blue
  ctx.fillRect(width - 10 * scale, 230 * scale, 10 * scale, 20 * scale);

  // --- NEW INTERACTIVE ELEMENTS ---

  // 1. The Mountain Pass Picture (North Wall)
  // Position: between x4 and x20 markers. Width 16ft. y480.
  // Room is height = 480. In this renderer, North is at y=0.
  
  // Rock Frame
  ctx.fillStyle = "#555555"; // Grey Rock
  ctx.fillRect(4 * scale, 0, 16 * scale, 5 * scale); // Frame on North Wall
  // Simple rock texture
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 1;
  for(let rx=4*scale; rx<20*scale; rx+=4*scale) {
    ctx.strokeRect(rx, 0, 4*scale, 5*scale);
  }

  // Picture Content (Mountain Pass)
  ctx.fillStyle = "#87CEEB"; // Sky
  ctx.fillRect(4.5 * scale, 0.5 * scale, 15 * scale, 4 * scale);
  
  // Sun
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(6 * scale, 1.5 * scale, 1 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Moose (Abstract)
  ctx.fillStyle = "#8B4513"; // Brown
  ctx.fillRect(12 * scale, 2 * scale, 2 * scale, 1 * scale);
  
  // Crows
  ctx.fillStyle = "black";
  ctx.fillRect(10 * scale, 1.2 * scale, 0.5 * scale, 0.2 * scale);
  ctx.fillRect(11 * scale, 1.5 * scale, 0.5 * scale, 0.2 * scale);

  // 2. Table (Northwest corner)
  // x1 to x4, y476 to y480 (top edge)
  ctx.fillStyle = "#deb887"; // BurlyWood
  ctx.fillRect(1 * scale, 0, 3 * scale, 4 * scale); // Tables are 4x4
  ctx.strokeStyle = "#8b4513";
  ctx.strokeRect(1 * scale, 0, 3 * scale, 4 * scale);
  
  // 3. Separator (Mountain Theme)
  // x4 to x5, y476 to y480
  ctx.fillStyle = "#708090"; // SlateGrey
  ctx.fillRect(4 * scale, 0, 1 * scale, 4 * scale);
  // Mountain pattern on separator
  ctx.fillStyle = "#ffffff"; // Snow caps
  ctx.beginPath();
  ctx.moveTo(4 * scale, 2 * scale);
  ctx.lineTo(4.5 * scale, 0);
  ctx.lineTo(5 * scale, 2 * scale);
  ctx.fill();

  // Room Label
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.font = `bold ${14 * scale}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("Mountains Specific Warp Room", 0, 0);
  ctx.restore();
}
