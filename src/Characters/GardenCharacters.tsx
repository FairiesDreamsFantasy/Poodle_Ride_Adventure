import React from 'react';

export const drawGoat = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  ctx.save();
  ctx.fillStyle = '#ffff00'; // Yellow goat
  ctx.fillRect(x, y - 30 * scale, 40 * scale, 20 * scale); // Body
  ctx.fillRect(x + 30 * scale, y - 45 * scale, 15 * scale, 15 * scale); // Head
  
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath(); // Horns
  ctx.moveTo(x + 35 * scale, y - 45 * scale);
  ctx.lineTo(x + 30 * scale, y - 60 * scale);
  ctx.stroke();
  
  // Legs
  ctx.fillStyle = '#cccc00';
  ctx.fillRect(x + 5 * scale, y - 10 * scale, 5 * scale, 10 * scale);
  ctx.fillRect(x + 30 * scale, y - 10 * scale, 5 * scale, 10 * scale);
  ctx.restore();
};

export const drawGirlRidingOpossum = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  ctx.save();
  // Opossum body
  ctx.fillStyle = '#888888';
  ctx.beginPath();
  ctx.ellipse(x, y - 15 * scale, Math.max(0, 25 * scale), Math.max(0, 15 * scale), 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Girl
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y - 35 * scale, Math.max(0, 10 * scale), 0, Math.PI * 2);
  ctx.fill();
  
  // Blue onesie
  ctx.fillStyle = '#0000ff';
  ctx.fillRect(x - 8 * scale, y - 25 * scale, 16 * scale, 15 * scale);
  ctx.restore();
};
