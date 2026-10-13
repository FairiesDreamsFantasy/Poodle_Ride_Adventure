import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

export function drawInitialShort400FeetPath(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = height / 50; 
  
  // 1. Blue Sky (Top portion)
  ctx.fillStyle = '#87ceeb';
  ctx.fillRect(0, 0, width, height * 0.3);
  
  // 2. Lush Green Grass / Garden Background
  ctx.fillStyle = '#3a8033';
  ctx.fillRect(0, height * 0.3, width, height * 0.7);
  
  // 3. Brick Path (centered vertically, 20ft wide -> from 15 to 35 in gridY)
  // Matching center point of house door
  const pathTop = 15 * scale;
  const pathHeight = 20 * scale;
  
  // Brick Texture (Solid surface)
  ctx.fillStyle = '#b22222'; // Firebrick
  ctx.fillRect(0, pathTop, width, pathHeight);
  
  // Brick Mortar lines
  ctx.strokeStyle = '#8b4513';
  ctx.lineWidth = 1;
  const brickWidth = 30; // pixels
  for (let x = 0; x < width; x += brickWidth) {
     ctx.beginPath();
     ctx.moveTo(x, pathTop);
     ctx.lineTo(x, pathTop + pathHeight);
     ctx.stroke();
  }
  for (let y = pathTop; y < pathTop + pathHeight; y += 4 * scale) {
     ctx.beginPath();
     ctx.moveTo(0, y);
     ctx.lineTo(width, y);
     ctx.stroke();
  }
  
  // 4. Garden Details (Flowers and Bushes)
  for (let i = 0; i < 15; i++) {
    const fx = ((i * 80 - state.gridX * 8) % (width + 200) + width + 200) % (width + 200) - 100;
    
    // North side garden
    ctx.fillStyle = '#228b22'; // Forest Green for bushes
    ctx.beginPath();
    ctx.arc(fx, 10 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Flowers on bushes
    ctx.fillStyle = i % 2 === 0 ? '#ff0000' : '#ffff00';
    ctx.beginPath();
    ctx.arc(fx - 2 * scale, 8 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.arc(fx + 2 * scale, 11 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.fill();

    // South side garden
    ctx.fillStyle = '#228b22';
    ctx.beginPath();
    ctx.arc(fx, 40 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = i % 2 === 0 ? '#ff00ff' : '#00ffff';
    ctx.beginPath();
    ctx.arc(fx + 1 * scale, 39 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.arc(fx - 1 * scale, 42 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Pink House at the end (X=400)
  if (state.gridX > 300) {
    const viewWidthFeet = 100; 
    const scaleX = width / viewWidthFeet;
    houseX = (400 - state.gridX) * scaleX; 
    
    if (houseX < width) {
      // House Face
      ctx.fillStyle = '#ff1493';
      ctx.fillRect(houseX, 2 * scale, width - houseX, 46 * scale);
      
      // Open Windows (Breezy)
      ctx.fillStyle = '#add8e6';
      ctx.fillRect(houseX + 15 * scale, 5 * scale, 8 * scale, 8 * scale);
      ctx.fillRect(houseX + 15 * scale, 37 * scale, 8 * scale, 8 * scale);
      
      // Window reflections/highlights
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(houseX + 16 * scale, 6 * scale);
      ctx.lineTo(houseX + 22 * scale, 12 * scale);
      ctx.stroke();
      
      // White door (Centered on path center Y=25)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(houseX, 15 * scale, 12 * scale, 20 * scale);
      
      // Door detail
      ctx.strokeStyle = '#ff69b4';
      ctx.lineWidth = 1;
      ctx.strokeRect(houseX + 1 * scale, 16 * scale, 10 * scale, 18 * scale);
      
      // Knob
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(houseX + 10 * scale, 26 * scale, 1 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

let houseX = 0; // Local helper for the scope below

