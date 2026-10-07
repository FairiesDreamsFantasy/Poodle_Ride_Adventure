import React from 'react';

export const drawTable = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  ctx.save();
  ctx.fillStyle = '#4b2e19';
  ctx.fillRect(x, y - 15 * scale, 40 * scale, 10 * scale);
  // Legs
  ctx.fillRect(x + 2 * scale, y - 5 * scale, 2 * scale, 5 * scale);
  ctx.fillRect(x + 36 * scale, y - 5 * scale, 2 * scale, 5 * scale);
  ctx.restore();
};

export const drawBench = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  ctx.save();
  ctx.fillStyle = '#4b2e19';
  ctx.fillRect(x, y - 15 * scale, 60 * scale, 10 * scale);
  // Legs
  ctx.fillRect(x + 5 * scale, y - 5 * scale, 4 * scale, 5 * scale);
  ctx.fillRect(x + 51 * scale, y - 5 * scale, 4 * scale, 5 * scale);
  ctx.restore();
};

export const drawFence = (ctx: CanvasRenderingContext2D, y: number, height: number, width: number, isNight: boolean) => {
  ctx.save();
  ctx.fillStyle = isNight ? '#222222' : '#555555';
  ctx.fillRect(0, y - height, width, height);
  
  // Fence posts
  ctx.strokeStyle = isNight ? '#111111' : '#333333';
  ctx.lineWidth = 2;
  for (let i = 0; i < width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, y);
    ctx.lineTo(i, y - height);
    ctx.stroke();
  }
  ctx.restore();
};

export const drawSouthBarrier = (ctx: CanvasRenderingContext2D, y: number, height: number, width: number, isNight: boolean) => {
  ctx.save();
  ctx.fillStyle = isNight ? '#1a1a1a' : '#333333';
  ctx.fillRect(0, y - height, width, height);
  
  // Texture/Lines
  ctx.strokeStyle = isNight ? '#000000' : '#222222';
  ctx.lineWidth = 1;
  for (let i = 0; i < height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y - i);
    ctx.lineTo(width, y - i);
    ctx.stroke();
  }
  ctx.restore();
};

export const drawSubwayTrain = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, width: number) => {
  ctx.save();
  ctx.translate(x, y);
  const carWidth = 300 * scale;
  const carHeight = 60 * scale;
  
  for (let i = 0; i < 4; i++) {
    const cx = i * (carWidth + 10 * scale);
    // Car Body
    ctx.fillStyle = '#880000'; // Upper red
    ctx.fillRect(cx, 0, carWidth, carHeight * 0.3);
    ctx.fillStyle = '#ffd700'; // Middle gold
    ctx.fillRect(cx, carHeight * 0.3, carWidth, carHeight * 0.1);
    ctx.fillStyle = '#006400'; // Lower green
    ctx.fillRect(cx, carHeight * 0.4, carWidth, carHeight * 0.6);
    
    // Solar Panels on top
    ctx.fillStyle = '#222222';
    ctx.fillRect(cx + 10 * scale, -5 * scale, carWidth - 20 * scale, 5 * scale);
    
    // Doors (NTT style)
    ctx.fillStyle = '#444444';
    ctx.fillRect(cx + 50 * scale, carHeight * 0.2, 40 * scale, carHeight * 0.7);
    ctx.fillRect(cx + 210 * scale, carHeight * 0.2, 40 * scale, carHeight * 0.7);
    
    // Windows & Passengers
    ctx.fillStyle = '#111111';
    ctx.fillRect(cx + 100 * scale, carHeight * 0.2, 100 * scale, carHeight * 0.4);
    
    // Line Number (Line 7)
    ctx.fillStyle = '#ffffff';
    ctx.font = `${10 * scale}px sans-serif`;
    ctx.fillText("Line 7", cx + 5 * scale, carHeight * 0.5);
  }
  ctx.restore();
};

export const drawRailwayTracks = (ctx: CanvasRenderingContext2D, y: number, scale: number, width: number) => {
  ctx.save();
  ctx.strokeStyle = '#555555';
  ctx.lineWidth = 2 * scale;
  for (let i = -10; i < 20; i++) {
    const tx = i * (width / 10);
    ctx.beginPath();
    ctx.moveTo(tx, y);
    ctx.lineTo(tx, y + 20 * scale);
    ctx.stroke();
  }
  ctx.restore();
};

export const drawDoors = (
  ctx: CanvasRenderingContext2D, 
  isNorth: boolean, 
  z: number, 
  GAME_WIDTH: number, 
  GAME_HEIGHT: number,
  horizon: number
) => {
  if (z <= 0) return;

  const scale = 20 / (z + 5); 
  // Doors are 6 feet wide and 25 inches (approx 2 feet) tall
  const doorWidth = 6 * 10 * scale; // 10px per foot approx at z=0
  const doorHeight = 2 * 10 * scale;
  const centerX = GAME_WIDTH / 2;
  const floorY = horizon + (1 / (z + 0.1)) * 500;
  const actualDoorY = floorY - doorHeight;

  ctx.save();
  
  const numDoors = 5;
  const spacing = GAME_WIDTH / numDoors;
  
  for (let i = 0; i < numDoors; i++) {
    const currentCenterX = (i + 0.5) * spacing;
    
    if (isNorth) {
      // High Blue Doors (Shut)
      ctx.fillStyle = "#00008b"; // Dark blue
      ctx.fillRect(currentCenterX - doorWidth/2, actualDoorY, doorWidth, doorHeight);
      
      // Windows on upper sections
      ctx.fillStyle = "rgba(173, 216, 230, 0.6)";
      ctx.fillRect(currentCenterX - doorWidth/2 + 10*scale, actualDoorY + 5*scale, doorWidth/2 - 20*scale, doorHeight/3);
      ctx.fillRect(currentCenterX + 10*scale, actualDoorY + 5*scale, doorWidth/2 - 20*scale, doorHeight/3);

      // Frame
      ctx.strokeStyle = '#aaaaaa';
      ctx.lineWidth = 4 * scale;
      ctx.strokeRect(currentCenterX - doorWidth/2, actualDoorY, doorWidth, doorHeight);
      
      // Middle line
      ctx.beginPath();
      ctx.moveTo(currentCenterX, actualDoorY);
      ctx.lineTo(currentCenterX, floorY);
      ctx.stroke();
    } else {
      // South Doors (Rainbow Glass)
      const gradient = ctx.createLinearGradient(currentCenterX - doorWidth/2, 0, currentCenterX + doorWidth/2, 0);
      gradient.addColorStop(0, '#ff0000');
      gradient.addColorStop(0.16, '#ff7f00');
      gradient.addColorStop(0.33, '#ffff00');
      gradient.addColorStop(0.5, '#00ff00');
      gradient.addColorStop(0.66, '#0000ff');
      gradient.addColorStop(0.83, '#4b0082');
      gradient.addColorStop(1, '#9400d3');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.6;
      
      // Open South Doors
      const openOffset = doorWidth * 0.4;
      // Left door
      ctx.fillRect(currentCenterX - doorWidth/2 - openOffset, actualDoorY, doorWidth/2, doorHeight);
      // Right door
      ctx.fillRect(currentCenterX + doorWidth/2 + openOffset - doorWidth/2, actualDoorY, doorWidth/2, doorHeight);
      
      ctx.strokeStyle = '#aaaaaa';
      ctx.lineWidth = 4 * scale;
      ctx.strokeRect(currentCenterX - doorWidth/2 - openOffset, actualDoorY, doorWidth/2, doorHeight);
      ctx.strokeRect(currentCenterX + doorWidth/2 + openOffset - doorWidth/2, actualDoorY, doorWidth/2, doorHeight);
    }
  }

  ctx.restore();
};

export const drawGoat = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  ctx.save();
  ctx.translate(x, y);
  
  // Body
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, 0, 20 * scale, 15 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Head
  ctx.beginPath();
  ctx.ellipse(15 * scale, -10 * scale, 10 * scale, 8 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Horns
  ctx.strokeStyle = '#8b4513';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(10 * scale, -15 * scale);
  ctx.lineTo(15 * scale, -25 * scale);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(20 * scale, -15 * scale);
  ctx.lineTo(25 * scale, -25 * scale);
  ctx.stroke();
  
  // Legs
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3 * scale;
  ctx.beginPath();
  ctx.moveTo(-10 * scale, 10 * scale);
  ctx.lineTo(-10 * scale, 25 * scale);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(10 * scale, 10 * scale);
  ctx.lineTo(10 * scale, 25 * scale);
  ctx.stroke();
  
  ctx.restore();
};

export const drawGirlRidingOpossum = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  ctx.save();
  ctx.translate(x, y);
  
  // Opossum Body
  ctx.fillStyle = '#888888';
  ctx.beginPath();
  ctx.ellipse(0, 0, 25 * scale, 12 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Tail
  ctx.strokeStyle = '#ffc0cb';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(-25 * scale, 0);
  ctx.quadraticCurveTo(-40 * scale, -10 * scale, -35 * scale, 10 * scale);
  ctx.stroke();
  
  // Girl (Simple representation)
  ctx.fillStyle = '#ff0000'; // Red dress
  ctx.beginPath();
  ctx.moveTo(-5 * scale, -10 * scale);
  ctx.lineTo(5 * scale, -10 * scale);
  ctx.lineTo(10 * scale, 10 * scale);
  ctx.lineTo(-10 * scale, 10 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Girl Head
  ctx.fillStyle = '#ffe4c4';
  ctx.beginPath();
  ctx.arc(0, -15 * scale, 6 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};
