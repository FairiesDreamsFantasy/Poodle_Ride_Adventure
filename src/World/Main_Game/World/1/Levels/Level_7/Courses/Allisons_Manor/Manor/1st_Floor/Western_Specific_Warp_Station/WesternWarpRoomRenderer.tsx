import React from 'react';
import { WESTERN_WARP_CONSTANTS } from './WesternWarpRoomConstants';
import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';

/**
 * Renders the Western Warp Room.
 * 250x185 feet, Southeast corner of Level 1 1st Floor.
 */
export function drawWesternWarpRoom(
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  state: GameState, 
  time: number
) {
  const scaleX = width / WESTERN_WARP_CONSTANTS.WIDTH;
  const scaleY = height / WESTERN_WARP_CONSTANTS.HEIGHT;

  // 1. Flooring: Farm Ground Theme
  ctx.fillStyle = "#A0522D"; // Sienna / Earthy brown
  ctx.fillRect(0, 0, width, height);

  // Draw tile grid pattern
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  const gridSize = 10 * scaleX;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. Walls: Painted Farm Murals
  // North Wall
  ctx.fillStyle = "#87CEEB"; // Blue sky
  ctx.fillRect(0, 0, width, 10 * scaleY);
  
  // East Wall: Sunrise
  const eastGradient = ctx.createLinearGradient(width - 50 * scaleX, 0, width, height);
  eastGradient.addColorStop(0, "#FFD700"); // Gold sun
  eastGradient.addColorStop(0.5, "#FF8C00"); // Orange
  eastGradient.addColorStop(1, "#87CEEB");
  ctx.fillStyle = eastGradient;
  ctx.fillRect(width - 5 * scaleX, 0, 5 * scaleX, height);

  // 3. Circular Rug: Center (125, 125)
  const rugPos = WESTERN_WARP_CONSTANTS.RUG;
  ctx.save();
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.fillStyle = rugPos.COLOR;
  ctx.beginPath();
  ctx.ellipse(rugPos.X * scaleX, rugPos.Y * scaleY, rugPos.RADIUS * scaleX, rugPos.RADIUS * scaleY * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Fur texture highlights
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.setLineDash([2, 2]);
  ctx.stroke();
  ctx.restore();

  // 4. Rocking Pony & Pedestal
  const pony = WESTERN_WARP_CONSTANTS.ROCKING_PONY;
  const px = pony.X * scaleX;
  const py = pony.Y * scaleY;
  
  // Pedestal
  ctx.fillStyle = "#5D4037"; // Dark wood
  const pedW = pony.PEDESTAL.WIDTH * scaleX;
  const pedL = pony.PEDESTAL.LENGTH * scaleY;
  ctx.fillRect(px - pedL/2, py - pedW/2, pedL, pedW);
  
  // Springs (simplified visual)
  ctx.strokeStyle = "#808080";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px - 10, py);
  ctx.lineTo(px + 10, py);
  ctx.stroke();

  // Pink Rocking Pony (Abstract 3D craft approach)
  ctx.fillStyle = "#FFC0CB"; // Pink
  ctx.beginPath();
  ctx.ellipse(px, py - 5, 20 * scaleX, 10 * scaleY, 0, 0, Math.PI * 2); // Body
  ctx.fill();
  
  // White Mane/Tail
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(px - 22 * scaleX, py - 8 * scaleY, 5 * scaleX, 5 * scaleY); // Tail
  ctx.fillRect(px + 15 * scaleX, py - 18 * scaleY, 8 * scaleX, 15 * scaleY); // Mane
  
  // Blue Eyes
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(px + 18 * scaleX, py - 12 * scaleY, 2, 0, Math.PI * 2);
  ctx.fill();

  // 5. Decorative Fence: y235
  const fence = WESTERN_WARP_CONSTANTS.FENCE;
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, fence.Y * scaleY, fence.X_MAX * scaleX, fence.THICKNESS * scaleY);
  
  // Fence posts / Rodeo cylinder
  for (let fx = 0; fx < fence.X_MAX; fx += 20) {
    ctx.fillStyle = "#D2B48C";
    ctx.fillRect(fx * scaleX, (fence.Y - 5) * scaleY, 4 * scaleX, 10 * scaleY);
  }

  // 6. Tables & Benches
  const table = WESTERN_WARP_CONSTANTS.TABLE_WEST;
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, table.Y * scaleY, table.WIDTH * scaleX, table.HEIGHT * scaleY);

  // 7. Interactive Picture: Pablo's Pony Ride Field (East Wall)
  const pic = WESTERN_WARP_CONSTANTS.PICTURE;
  const picYOffset = pic.Y_MIN * scaleY;
  const picYHeight = (pic.Y_MAX - pic.Y_MIN) * scaleY;
  
  // Decorative Barn Door Frame
  ctx.fillStyle = "#8B4513"; // Dark wood
  ctx.fillRect(pic.X * scaleX - 6, picYOffset - 2, 6, picYHeight + 4); 
  
  // Barn Door Details (X-cross pattern on frame edges)
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(pic.X * scaleX - 6, picYOffset - 2, 6, picYHeight + 4);
  
  // Picture Content
  ctx.fillStyle = "#87CEEB"; // Sky (Farm under blue sky)
  ctx.fillRect(pic.X * scaleX - 2, picYOffset + 2, 2, picYHeight - 4);
  
  // Alvita & Pablo (simplified representation)
  const picCenterY = (pic.Y_MIN + (pic.Y_MAX - pic.Y_MIN) / 2) * scaleY;
  
  ctx.fillStyle = "gold"; // Tiara
  ctx.fillRect(pic.X * scaleX - 2, picCenterY - picYHeight * 0.2, 2, picYHeight * 0.1);
  ctx.fillStyle = "red"; // Heart
  ctx.fillRect(pic.X * scaleX - 2, picCenterY - picYHeight * 0.1, 2, picYHeight * 0.05);
  
  // Horizon/Field
  ctx.fillStyle = "#228B22"; // Forest Green
  ctx.fillRect(pic.X * scaleX - 2, picCenterY + picYHeight * 0.1, 2, picYHeight * 0.4);

  // 8. Mirror (Right of picture)
  const mirror = WESTERN_WARP_CONSTANTS.MIRROR;
  ctx.fillStyle = "#ADD8E6"; // Glass
  ctx.fillRect(mirror.X * scaleX - 2, mirror.Y_MIN * scaleY, 2, (mirror.Y_MAX - mirror.Y_MIN) * scaleY);
  ctx.strokeStyle = "#808080";
  ctx.strokeRect(mirror.X * scaleX - 2, mirror.Y_MIN * scaleY, 2, (mirror.Y_MAX - mirror.Y_MIN) * scaleY);

  // 9. Barn Wall Separator (y20)
  const sep = WESTERN_WARP_CONSTANTS.SEPARATOR;
  ctx.fillStyle = "#B22222"; // Firebrick red
  ctx.fillRect(sep.X_MIN * scaleX, sep.Y_MIN * scaleY, (sep.X_MAX - sep.X_MIN) * scaleX, (sep.Y_MAX - sep.Y_MIN) * scaleY);
  
  // White trim for barn look
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.strokeRect(sep.X_MIN * scaleX, sep.Y_MIN * scaleY, (sep.X_MAX - sep.X_MIN) * scaleX, (sep.Y_MAX - sep.Y_MIN) * scaleY);

  // 10. North Door: Sliding Cowboy Door
  const door = WESTERN_WARP_CONSTANTS.DOOR;
  ctx.fillStyle = "#3E2723"; // Frame
  ctx.fillRect(door.X_MIN * scaleX - scaleX, door.Y * scaleY - 5, scaleX, 10); // Frame L
  ctx.fillRect(door.X_MAX * scaleX, door.Y * scaleY - 5, scaleX, 10); // Frame R
  
  // Door Panel (at y=185 edge)
  ctx.fillStyle = "#5D4037";
  ctx.fillRect(door.X_MIN * scaleX, door.Y * scaleY - 2, door.WIDTH * scaleX, 4);
}
