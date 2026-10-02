
import React from 'react';
import { AREA_DIMENSIONS } from '../../../../../../../../../../../System/Engine/Core/Constants/Dimensions';
import { drawGrandTapestry } from '../../../../../../../../../../../System/Building_Blocks/Obstacles/ObstacleRenderer';

interface RestaurantRendererProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  gameState: any;
}

export function drawRestaurant(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: any,
  time: number
) {
  const dims = AREA_DIMENSIONS.AllisonsRestaurant;
  const scaleX = width / dims.width;
  const scaleY = height / dims.height;
  const scale = Math.min(scaleX, scaleY);

  // Background - Warm communal feel
  ctx.fillStyle = "#fdf5e6"; // Old Lace - warm white
  ctx.fillRect(0, 0, width, height);

  // Floor pattern - Large tiles
  ctx.strokeStyle = "#deb887"; // BurlyWood
  ctx.lineWidth = 1;
  const gridSize = 50 * scale;
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

  // Draw Walls
  ctx.strokeStyle = "#8b4513"; // SaddleBrown
  ctx.lineWidth = 10 * scale;
  ctx.strokeRect(0, 0, width, height);

  // North Windows (Rear)
  const windowCount = 5;
  const windowWidth = (width / windowCount) * 0.6;
  const windowSpacing = (width / windowCount);
  ctx.fillStyle = "#add8e6"; // Light Blue
  for (let i = 0; i < windowCount; i++) {
    const wx = (i * windowSpacing) + (windowSpacing - windowWidth) / 2;
    ctx.fillRect(wx, 2, windowWidth, 10 * scale);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2 * scale;
    ctx.strokeRect(wx, 2, windowWidth, 10 * scale);
  }

  // South Windows (Front)
  for (let i = 0; i < windowCount; i++) {
    const wx = (i * windowSpacing) + (windowSpacing - windowWidth) / 2;
    ctx.fillRect(wx, height - 12 * scale, windowWidth, 10 * scale);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2 * scale;
    ctx.strokeRect(wx, height - 12 * scale, windowWidth, 10 * scale);
  }

  // Kitchen Area at the Rear (North end y=0 to 50)
  ctx.fillStyle = "#e0e0e0"; // Metallic grey for kitchen
  ctx.fillRect(5 * scale, 5 * scale, width - 10 * scale, 60 * scale);
  ctx.strokeStyle = "#bcbcbc";
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(5 * scale, 5 * scale, width - 10 * scale, 60 * scale);

  // Sign on the Left Wall (West Wall)
  ctx.save();
  ctx.translate(15 * scale, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#8b0000"; // Dark Red
  ctx.font = `bold ${16 * scale}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("Allison's Communal Dining & Restaurant", 0, 0);
  
  // Restaurant Symbol (Fork & Spoon)
  ctx.font = `${24 * scale}px serif`;
  ctx.fillText("🍴", 0, 30 * scale);
  ctx.restore();

  // Grand Tapestry on the West Wall
  // We'll draw it offset from the sign
  ctx.save();
  // Translate to the middle of the west wall
  const tapY = height / 2 + 50 * scale;
  const tapW = 80 * scale;
  const tapH = 100 * scale;
  ctx.fillStyle = "#4a2c2a";
  ctx.fillRect(5 * scale, tapY - tapH / 2, tapW, tapH);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(5 * scale, tapY - tapH / 2, tapW, tapH);
  ctx.fillStyle = "white";
  ctx.font = `${8 * scale}px serif`;
  ctx.fillText("Grand Tapestry", 10 * scale, tapY);
  ctx.restore();

  // South Entrance Door (x240-260 relative if center is 250)
  // Dimensions 500x200. Center is 250. Door is 490-510 in foyer.
  // In restaurant local coords, if we map foyer x490-510 to restaurant.
  // Wait, if restaurant is x250-750 in foyer, center is x500.
  // So the door is at restaurant x240-260? Correct.
  ctx.fillStyle = "#00008b"; // Dark Blue
  ctx.fillRect(240 * scale, height - 15 * scale, 20 * scale, 10 * scale);

  // Kitchen Exterior Doors at North wall (y=0)
  // stretches from x480 to x500 (interior); x730 to x750 (outside cooking)
  // Wait, let's map these to local. 
  // Foyer X 480 is Restaurant local X 480 - 250 = 230.
  // Foyer X 500 is Restaurant local X 500 - 250 = 250.
  // So door 1 is at x230-250.
  // Foyer X 730 is Restaurant local X 730 - 250 = 480.
  // Foyer X 750 is Restaurant local X 750 - 250 = 500.
  // So door 2 is at x480-500.
  ctx.fillStyle = "#555555";
  ctx.fillRect(230 * scale, 0, 20 * scale, 10 * scale); // Interior kitchen door
  ctx.fillRect(480 * scale, 0, 20 * scale, 10 * scale); // Exterior kitchen door

  // Outdoor cooking area with overhang (Visual hint)
  // This is technically outside the y=0 wall?
  // I'll draw a label or a hint at the top
  ctx.fillStyle = "rgba(139, 69, 19, 0.3)";
  ctx.fillRect(450 * scale, -20 * scale, 50 * scale, 20 * scale); // Overhang shadow

  // Kitchen Staff (Rastafarian Cooks)
  const drawStaff = (x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    
    // Vintage white dress
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(-10 * scale, 20 * scale);
    ctx.lineTo(10 * scale, 20 * scale);
    ctx.lineTo(12 * scale, 45 * scale);
    ctx.lineTo(-12 * scale, 45 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Indigo apron
    ctx.fillStyle = "#4B0082"; // Indigo
    ctx.fillRect(-8 * scale, 25 * scale, 16 * scale, 15 * scale);
    
    // Head / Skin (Peach hint)
    ctx.fillStyle = "#FFDAB9"; // PeachPuff
    ctx.beginPath();
    ctx.arc(0, 10 * scale, 10 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Head covering / Hair hint
    ctx.fillStyle = "#333333";
    ctx.beginPath();
    ctx.arc(0, 5 * scale, 8 * scale, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Multiple staff members
  drawStaff(150 * scale, 30 * scale);
  drawStaff(350 * scale, 35 * scale);
  drawStaff(250 * scale, 25 * scale);
}
