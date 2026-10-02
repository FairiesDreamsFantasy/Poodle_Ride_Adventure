import { GameState } from '../../../../../../../../System/AI/In-Game/Logic/GameLogic';
import { drawFloorTiling, drawBuildingBlock } from '../../../../../../../../System/Engine/Science/Graphical_Renderer/General';

export function drawStoryBookDecisionZone(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / 50;

  // 1. Hardwood Floor (Vertical planks)
  ctx.fillStyle = '#8b4513'; // Saddle Brown
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#5d2906';
  for (let x = 0; x < 50; x += 5) {
    ctx.beginPath();
    ctx.moveTo(x * scale, 0);
    ctx.lineTo(x * scale, height);
    ctx.stroke();
  }

  // 2. Center Rug (37.5 ft radius, white with blue border)
  // Wait, 37.5ft radius on a 50x50 surface? Area will be mostly rug.
  ctx.beginPath();
  ctx.arc(25 * scale, 25 * scale, 18.75 * scale, 0, Math.PI * 2); 
  ctx.fillStyle = '#0000ff'; // Blue border
  ctx.fill();
  ctx.beginPath();
  ctx.arc(25 * scale, 25 * scale, 17 * scale, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; // White center
  ctx.fill();

  // 3. East Wall: Double Wooden Gate
  // 15ft wide (centered), 10ft high. Welcome sign: rainbow text on silver.
  // PoodleRideStoryBookDecisionZone height is 50, center is 25. Range [17.5, 32.5]
  ctx.fillStyle = '#deb887';
  ctx.fillRect(48 * scale, 17.5 * scale, 2 * scale, 15 * scale);
  ctx.strokeStyle = '#8b4513';
  ctx.strokeRect(48 * scale, 17.5 * scale, 2 * scale, 15 * scale);
  
  ctx.fillStyle = 'silver';
  ctx.fillRect(48 * scale, 18.5 * scale, 1 * scale, 13 * scale);
  ctx.fillStyle = 'red'; // Placeholder for rainbow welcome
  ctx.font = 'bold 8px Arial';
  ctx.fillText("Welcome", 48.2 * scale, 25 * scale);

  // 4. West Wall: Portal back
  ctx.fillStyle = '#9370db';
  ctx.fillRect(0, 20 * scale, 2 * scale, 10 * scale);
  ctx.strokeStyle = '#4b0082';
  ctx.strokeRect(0, 20 * scale, 2 * scale, 10 * scale);

  // 5. Ride-on Pink Poodle Rocker (Refined Placement)
  // [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
  const rockerX = 9 * scale; // Center of 5-13 range
  const rockerY = 49.0 * scale; 
  
  // Rocking rotation if rocking
  const rockingAngle = state.isToyRocking ? Math.sin(time / 100) * 0.1 : 0;
  
  ctx.save();
  ctx.translate(rockerX, rockerY);
  ctx.rotate(rockingAngle);
  
  // Rocking Base (Pedestal representation)
  ctx.fillStyle = '#444';
  ctx.fillRect(-4 * scale, 0.5 * scale, 8 * scale, 0.2 * scale); // 8ft long pedestal
  
  // Pink Poodle Body (Head East, Tail West)
  ctx.fillStyle = '#ff69b4';
  // Body (6.95 ft long)
  ctx.beginPath();
  ctx.ellipse(0, 0, 3.475 * scale, 1.5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Head (East)
  ctx.beginPath();
  ctx.arc(3.475 * scale, -1.5 * scale, 1.2 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Tail (West)
  ctx.beginPath();
  ctx.moveTo(-3.475 * scale, 0);
  ctx.lineTo(-5.0 * scale, -2.0 * scale); // 40 inches tail
  ctx.lineWidth = 0.5 * scale;
  ctx.strokeStyle = '#ff69b4';
  ctx.stroke();
  
  ctx.restore();

  // 6. Slideshow Book (Refined Placement)
  // at 25 feet marker, 6 inches (0.5 foot) from north wall. (Y=50-0.5=49.5)
  // positioned affront of a ride-on toy.
  const bookX = 25 * scale;
  const bookY = 49.5 * scale;
  
  // Book Stand/Screen
  ctx.fillStyle = '#fff';
  ctx.fillRect(bookX - 2 * scale, bookY, 4 * scale, 0.2 * scale); // Thin screen
  ctx.strokeStyle = '#000';
  ctx.strokeRect(bookX - 2 * scale, bookY, 4 * scale, 0.2 * scale);
  
  // The "Ride-on Toy" at 25ft (Book is affront of it)
  const toy2X = 25 * scale;
  const toy2Y = 2.0 * scale; // Positioned behind the book
  ctx.fillStyle = '#ffb6c1'; // Lighter pink
  ctx.beginPath();
  ctx.arc(toy2X, toy2Y, 1 * scale, 0, Math.PI * 2);
  ctx.fill();
}

import { STORY_BOOK_PAGES } from './StoryBookLogic';

export function drawStoryBookCourse(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = height / 50; // Reference height is 50ft
  
  // 1. Lush Green Grass (Garden sides)
  ctx.fillStyle = '#2d5a27'; // Darker green for garden
  ctx.fillRect(0, 0, width, height);
  
  // 2. Dirt Path (centered vertically, 20ft wide - from 15 to 35 in height)
  ctx.fillStyle = '#9b7653'; // Warm dirt color
  ctx.fillRect(0, 15 * scale, width, 20 * scale);
  
  // 3. Tall Flowers and Sky representation on North/South sides
  // Sky Gradient (North Edge)
  const skyN = ctx.createLinearGradient(0, 0, 0, 5 * scale);
  skyN.addColorStop(0, '#87ceeb');
  skyN.addColorStop(1, 'rgba(135, 206, 235, 0)');
  ctx.fillStyle = skyN;
  ctx.fillRect(0, 0, width, 5 * scale);

  // Sky Gradient (South Edge)
  const skyS = ctx.createLinearGradient(0, height, 0, height - 5 * scale);
  skyS.addColorStop(0, '#87ceeb');
  skyS.addColorStop(1, 'rgba(135, 206, 235, 0)');
  ctx.fillStyle = skyS;
  ctx.fillRect(0, height - 5 * scale, width, 5 * scale);

  // Tall Flowers in the garden
  for (let i = 0; i < 20; i++) {
    // Scroll flowers with X position
    const fx = ((i * 50 - state.gridX * 0.1) % (width * 2) + width * 2) % (width * 2) - width; 
    const fyN = (5 + Math.sin(i + time/1000) * 3) * scale;
    const fyS = (45 - Math.sin(i + time/1000) * 3) * scale;
    
    // Stems
    ctx.strokeStyle = '#32cd32';
    ctx.lineWidth = 0.5 * scale;
    ctx.beginPath();
    ctx.moveTo(fx, fyN);
    ctx.lineTo(fx, fyN + 5 * scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(fx, fyS);
    ctx.lineTo(fx, fyS - 5 * scale);
    ctx.stroke();

    // Blooms
    ctx.fillStyle = i % 2 === 0 ? '#ff69b4' : '#add8e6';
    ctx.beginPath();
    ctx.arc(fx, fyN, 1.2 * scale, 0, Math.PI * 2);
    ctx.arc(fx, fyS, 1.2 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Milestone Markers
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${1.5 * scale}px Arial`;
  const dist = Math.floor(state.gridX);
  if (dist % 100 < 5) {
     ctx.fillText(`${dist} FEET`, 10 * scale, 45 * scale);
  }

  // 5. Pink House (at East end, roughly 400 feet)
  if (state.gridX > 100) {
    const houseAlpha = Math.min(1, (state.gridX - 100) / 300);
    ctx.save();
    ctx.globalAlpha = houseAlpha;
    
    // Relative position calculation
    const houseX = (400 - state.gridX) * (width / 400); 
    
    if (houseX < width) {
      // Pink House Silhouette at the east end
      ctx.fillStyle = '#ff1493';
      ctx.fillRect(houseX, 0, 100 * scale, height);
      
      // White Roof (Triangle facing West)
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(houseX, 0);
      ctx.lineTo(houseX - 20 * scale, height / 2);
      ctx.lineTo(houseX, height);
      ctx.fill();
      
      // Windmill on top of the house
      ctx.save();
      ctx.translate(houseX + 50 * scale, 5 * scale);
      ctx.rotate(time / 1000);
      ctx.fillStyle = '#ddd';
      for(let j=0; j<4; j++) {
        ctx.rotate(Math.PI / 2);
        ctx.fillRect(-1 * scale, 0, 2 * scale, 15 * scale);
      }
      ctx.restore();
    }
    ctx.restore();
  }
}

export function drawToyInterface(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const pageIndex = state.toyCurrentPage;
  const page = STORY_BOOK_PAGES[pageIndex] || STORY_BOOK_PAGES[0];
  const scale = width / 100;
  
  // 1. Dark Background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  // 2. Large White Book Screen (Interactive)
  ctx.fillStyle = '#fff';
  ctx.fillRect(10 * scale, 10 * scale, 80 * scale, 60 * scale);
  
  // 3. Page Content (Text)
  ctx.fillStyle = '#000';
  ctx.font = `bold ${3 * scale}px Arial`;
  const lines = wrapText(ctx, page.text, 70 * scale);
  lines.forEach((line, i) => {
    ctx.fillText(line, 15 * scale, 20 * scale + i * 5 * scale);
  });

  // 4. Page Content (Image Alt Text as representation)
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(15 * scale, 45 * scale, 70 * scale, 15 * scale);
  ctx.fillStyle = '#555';
  ctx.font = `${2.5 * scale}px Arial`;
  ctx.fillText(page.imageAlt, 18 * scale, 52 * scale);

  // 5. Instruction text
  ctx.fillStyle = '#ff69b4'; // Pink
  ctx.font = `bold ${2 * scale}px Arial`;
  ctx.fillText(`Page ${pageIndex + 1} of ${STORY_BOOK_PAGES.length}`, 15 * scale, 75 * scale);
  ctx.fillStyle = '#aaa';
  ctx.fillText("Controls: Up/Down to rock, Right to turn page, Left for prev, F or X to exit.", 15 * scale, 85 * scale);
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}
