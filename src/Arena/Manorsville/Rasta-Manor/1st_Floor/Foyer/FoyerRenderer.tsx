import { GameState, GRID_SIZE } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { renderRainbowSlidingDoors } from '../../../../../System/Building_Blocks/Doors/Crafted/Rainbow_Sliding_Doors';
import { TILES } from '../../../../../System/Building_Blocks/BlocksConstants';
import { drawSkyFoyerMezzanine } from '../../Mezzanine_For_1st_Floor/Sky_Foyer/SkyFoyerRenderer';
import { drawTarcistRamp } from '../../../../../System/Engine/Science/Graphical_Renderer/Tarsis_Effects/TarsisEffectsList';

const RAINBOW_COLORS = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];

export function drawFoyer(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';
  const isUpper = state.level === 'Sky';
  const isCellar = state.level === 'Cellar';

  const pinkTile = TILES.find(t => t.id === 'ceramic_tile_pink')!;
  const whiteTile = TILES.find(t => t.id === 'ceramic_tile_white')!;

  ctx.save();
  
  // Perspective Lines for floor and ceiling (Reduced for performance)
  ctx.strokeStyle = isNight ? '#111111' : '#333333';
  ctx.lineWidth = 2;
  const perspectiveLimit = state.pixelRatio < 1 ? 5 : 10;
  for (let i = -perspectiveLimit; i <= perspectiveLimit; i++) {
    const xOffset = i * (2000 / perspectiveLimit);
    // Floor lines
    ctx.beginPath();
    ctx.moveTo(width / 2, horizon);
    ctx.lineTo(width / 2 + xOffset, height);
    ctx.stroke();
    
    // Ceiling lines
    ctx.beginPath();
    ctx.moveTo(width / 2, horizon);
    ctx.lineTo(width / 2 + xOffset, 0);
    ctx.stroke();
  }

  // Floor (Pink and White Checked - Iconic 2000x2000 feet design)
  const floorPerspective = isUpper ? 300 : 500;
  const floorZLimit = state.pixelRatio < 1 ? 10 : 20;
  const xTiles = 10;
  for (let z = floorZLimit; z > 0; z--) {
    const y1 = horizon + (1 / z) * floorPerspective;
    const y2 = z === 1 ? height : horizon + (1 / (z - 1)) * floorPerspective;
    const h = y2 - y1;
    
    for (let x = 0; x < xTiles; x++) {
      const x1 = (x / xTiles) * width;
      const x2 = ((x + 1) / xTiles) * width;
      const w = x2 - x1;
      
      const isPink = (z + x) % 2 === 0;
      const baseColor = isPink ? pinkTile.color : whiteTile.color;
      
      if (isNight) {
        ctx.fillStyle = isPink ? (isUpper ? '#993366' : '#883344') : '#444444';
      } else if (isEvening) {
        ctx.fillStyle = isPink ? (isUpper ? '#aa3366' : '#993355') : '#555555';
      } else {
        ctx.fillStyle = isPink ? (isUpper ? '#ffcce0' : baseColor) : baseColor;
      }
      ctx.fillRect(x1, y1, w, h);
    }
  }

  // Ceiling (Polygons - High-quality craftsmanship with solid white and 75 skylights)
  for (let z = 20; z > 0; z--) {
    const y1 = horizon - (1 / z) * 500;
    const y2 = z === 1 ? 0 : horizon - (1 / (z - 1)) * 500;
    const h = y1 - y2;
    
    ctx.fillStyle = z % 2 === 0 ? (isNight ? '#222222' : '#111111') : (isNight ? '#333333' : '#1a1a1a');
    ctx.fillRect(0, y2, width, h);
  }

  // Gentle Glow Lighting
  ctx.save();
  ctx.globalAlpha = isNight ? 0.3 : 0.1;
  const glow = ctx.createRadialGradient(width/2, horizon, 0, width/2, horizon, 400);
  glow.addColorStop(0, isNight ? '#ffffcc' : '#ffffaa');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // Draw Tarcist Ramp visuals
  drawTarcistRamp(ctx, width, height, horizon, state, isUpper, isCellar);

  // Walls with Rainbow Stripes (Reduced for performance)
  ctx.save();
  ctx.globalAlpha = isNight ? 0.2 : (isEvening ? 0.5 : 0.8);
  const stripeLimit = state.pixelRatio < 1 ? 3 : RAINBOW_COLORS.length;
  const stripeWidth = (width * 0.2) / stripeLimit;
  for (let i = 0; i < stripeLimit; i++) {
    const color = RAINBOW_COLORS[i % RAINBOW_COLORS.length];
    
    // Left Wall
    ctx.fillStyle = color;
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, height);
    if (state.pixelRatio >= 1) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(i * stripeWidth, 0, stripeWidth / 2, height);
    }
    
    // Right Wall
    ctx.fillStyle = color;
    ctx.fillRect(width - (i + 1) * stripeWidth, 0, stripeWidth, height);
    if (state.pixelRatio >= 1) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(width - (i + 1) * stripeWidth, 0, stripeWidth / 2, height);
    }
  }
  ctx.restore();

  // Southwest Rectangle Area LED Lights
  if (state.gridX <= 8 && state.gridY <= 828) {
    ctx.save();
    for (let y = 0; y <= 828; y += 30) {
      const z = (GRID_SIZE - y) / 40;
      const screenY = horizon - (1 / z) * 200;
      if (screenY > 0 && screenY < horizon) {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(width * 0.05, screenY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();
  }

  // Wall, Doors and Windows at y760 (North) and y36 (South)
  const drawWallWithOpenings = (yPos: number, isNorth: boolean) => {
    const dist = Math.abs(state.gridY - yPos);
    if (dist > 100) return;

    ctx.save();
    const scale = 400 / (dist + 50);
    const wallY = horizon - 150 * scale;
    const wallH = 300 * scale;
    const wallW = width;
    
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, wallY, wallW, wallH);

    // Repeating Doors and Windows
    const numOpenings = 5;
    const openingW = (width / numOpenings) * 0.4;
    for (let i = 0; i < numOpenings; i++) {
      const centerX = (i + 0.5) * (width / numOpenings);
      const doorX = centerX - openingW / 2;
      const doorH = wallH * 0.6;
      const doorY = wallY + wallH - doorH;

      // Special Center Door (20-foot format)
      if (i === 2) {
        const centerDoorW = 200 * scale;
        const centerDoorX = width / 2 - centerDoorW / 2;
        
        if (isNorth) {
          // Stateful Blue Sliding Doors (Resolving Pseudoscience)
          renderRainbowSlidingDoors(ctx, {
            x: centerDoorX,
            y: doorY,
            width: centerDoorW,
            height: doorH,
            openProgress: state.blueDoorProgress,
            frameColor: '#00008b', // Deep Blue Frame
            glassColor: 'rgba(0, 0, 255, 0.4)' // Blue Glass
          });
        } else {
          ctx.fillStyle = "#ff00ff";
          ctx.fillRect(centerDoorX, doorY, centerDoorW, doorH);
        }
        
        // Artwork in Sky Foyer (North Wall)
        if (isUpper && isNorth) {
          const artX = width * 0.8;
          const artY = wallY + 50 * scale;
          const artW = 100 * scale;
          const artH = 80 * scale;
          
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(artX, artY, artW, artH);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2 * scale;
          ctx.strokeRect(artX, artY, artW, artH);
          ctx.fillStyle = "#000000";
          ctx.font = `${10 * scale}px sans-serif`;
          ctx.fillText("Lions & Rabbits", artX + 5 * scale, artY + 20 * scale);
        }
      } else {
        // Regular Doors
        ctx.fillStyle = isNorth ? "#0000ff" : "#ff00ff";
        ctx.fillRect(doorX, doorY, openingW, doorH);
      }
      
      // Window above door
      const winH = wallH * 0.3;
      const winY = wallY + 10 * scale;
      ctx.fillStyle = "rgba(173, 216, 230, 0.6)";
      ctx.fillRect(doorX, winY, openingW, winH);
      
      // Window frame
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(doorX, winY, openingW, winH);
    }
    ctx.restore();
  };

  if (state.direction === 'North' && state.gridY >= 1900) drawWallWithOpenings(2000, true);
  
  if (state.direction === 'South' && state.gridY <= 100) {
    const dist = Math.abs(state.gridY - 36);
    if (dist <= 100) {
      ctx.save();
      const scale = 400 / (dist + 50);
      const wallY = horizon - 150 * scale;
      const wallH = 300 * scale;
      
      // Ultra smooth green wall
      ctx.fillStyle = "#2E8B57"; // Sea Green
      ctx.fillRect(0, wallY, width, wallH);

      // Wide Archway
      const archCenterX = width / 2;
      const archW = 300 * scale;
      const archH = 200 * scale;
      
      ctx.fillStyle = "#000000"; // Inside archway
      ctx.beginPath();
      ctx.moveTo(archCenterX - archW / 2, wallY + wallH);
      ctx.lineTo(archCenterX - archW / 2, wallY + wallH - archH);
      ctx.arc(archCenterX, wallY + wallH - archH, archW / 2, Math.PI, 0);
      ctx.lineTo(archCenterX + archW / 2, wallY + wallH);
      ctx.fill();

      // Striped green and gold horizontal stripes on the archway frame
      ctx.lineWidth = 10 * scale;
      for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = i % 2 === 0 ? "#008000" : "#FFD700";
        ctx.beginPath();
        ctx.arc(archCenterX, wallY + wallH - archH, archW / 2 + i * 2 * scale, Math.PI, 0);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // East Wall Artwork (Grand Tapestry)
  if (state.direction === 'East') {
    const dist = Math.abs(state.gridX - 2000);
    if (dist <= 100) {
      const scale = 400 / (dist + 50);
      const artW = 400 * scale;
      const artH = 300 * scale;
      const artX = width / 2 - artW / 2;
      const artY = horizon - artH / 2;

      if (isUpper) {
        ctx.fillStyle = "#8b4513"; // Brown tapestry
        ctx.fillRect(artX, artY, artW, artH);
        ctx.strokeStyle = "#d4af37";
        ctx.lineWidth = 5 * scale;
        ctx.strokeRect(artX, artY, artW, artH);
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${20 * scale}px sans-serif`;
        ctx.fillText("Grand Tapestry", artX + 20 * scale, artY + 50 * scale);
      }
    }
  }

  // New Wall at x8, y1950-1992
  if (state.gridX <= 20 && state.gridY >= 1950 && state.gridY <= 2000) {
    ctx.save();
    const wallX = width * 0.2; 
    const wallY = horizon - 225;
    const wallW = 10;
    const wallH = 450;
    ctx.fillStyle = "#555555";
    ctx.fillRect(wallX, wallY, wallW, wallH);
    for (let i = 0; i < 22; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#add8e6" : "#000000";
      ctx.beginPath();
      ctx.moveTo(wallX, wallY + i * 20);
      ctx.lineTo(wallX + wallW, wallY + i * 20 + 10);
      ctx.lineTo(wallX, wallY + i * 20 + 20);
      ctx.fill();
    }
    ctx.restore();
  }

  // Upper Foyer Perimeter Walkway (Sky Level)
  if (isUpper) {
    drawSkyFoyerMezzanine(ctx, width, height, state, time, horizon, isNight, isEvening);
  }

  ctx.restore();
}
