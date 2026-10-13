
import React from 'react';
import { AREA_DIMENSIONS } from '../../../../../../../../../../../System/Engine/Core/Constants/Dimensions';

interface RestaurantOutdoorRendererProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  gameState: any;
}

export function drawRestaurantOutdoor(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: any,
  time: number
) {
  const dims = AREA_DIMENSIONS.AllisonsRestaurantOutdoor;
  const scaleX = width / dims.width;
  const scaleY = height / dims.height;
  const scale = Math.min(scaleX, scaleY);

  // Background - Grassy/Stone mix
  ctx.fillStyle = "#556b2f"; // DarkOliveGreen
  ctx.fillRect(0, 0, width, height);

  // Stone patio for cooking
  ctx.fillStyle = "#a9a9a9"; // DarkGray
  ctx.fillRect(50 * scale, 0, 400 * scale, 150 * scale);

  // Overhang - Large wooden structure
  ctx.fillStyle = "rgba(139, 69, 19, 0.4)"; // Shadow of overhang
  ctx.fillRect(0, 0, width, 100 * scale);
  
  ctx.strokeStyle = "#8b4513";
  ctx.lineWidth = 15 * scale;
  // Pillars for the overhang
  ctx.strokeRect(10 * scale, 10 * scale, 5 * scale, height - 20 * scale);
  ctx.strokeRect(width - 15 * scale, 10 * scale, 5 * scale, height - 20 * scale);

  // Cooking Equipment (Visuals)
  ctx.fillStyle = "#333333";
  // Large Grill
  ctx.fillRect(100 * scale, 40 * scale, 80 * scale, 40 * scale);
  ctx.fillStyle = "#cc5500"; // Orange glow
  ctx.fillRect(105 * scale, 45 * scale, 70 * scale, 5 * scale);

  // South Entrance Doors (Back into kitchen)
  ctx.fillStyle = "#555555";
  ctx.fillRect(90 * scale, height - 10 * scale, 20 * scale, 10 * scale);
  ctx.fillRect(390 * scale, height - 10 * scale, 20 * scale, 10 * scale);

  // Labels
  ctx.fillStyle = "white";
  ctx.font = `bold ${12 * scale}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("Outdoor Cooking Area", width / 2, 180 * scale);

  // Outdoor Kitchen Staff (Rastafarian Cook)
  const staffX = 220 * scale; // Near the grill
  const staffY = 60 * scale;
  
  ctx.save();
  ctx.translate(staffX, staffY);
  
  // Vintage white dress
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(-8 * scale, 15 * scale);
  ctx.lineTo(8 * scale, 15 * scale);
  ctx.lineTo(10 * scale, 35 * scale);
  ctx.lineTo(-10 * scale, 35 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Indigo apron
  ctx.fillStyle = "#4B0082"; // Indigo
  ctx.fillRect(-6 * scale, 20 * scale, 12 * scale, 10 * scale);
  
  // Head / Skin
  ctx.fillStyle = "#FFDAB9";
  ctx.beginPath();
  ctx.arc(0, 5 * scale, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Head covering
  ctx.fillStyle = "#333333";
  ctx.beginPath();
  ctx.arc(0, 0, 7 * scale, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
