import { GameState, GRID_SIZE } from '../../../../../System/AI/In-Game/Logic/GameLogic';

const RAINBOW_COLORS = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];

export function drawSimulatedGardenArea(ctx: CanvasRenderingContext2D, width: number, height: number, horizon: number, state: GameState, time: number) {
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';

  // Floor: Simulation grass (bright green with a slight neon glow)
  ctx.fillStyle = "#32CD32"; // Lime Green
  ctx.fillRect(0, horizon, width, height - horizon);

  // Neon glow effect for grass
  ctx.save();
  ctx.globalAlpha = 0.2;
  const pulse = Math.sin(time * 0.002) * 0.1 + 0.1;
  ctx.fillStyle = "#ADFF2F"; // GreenYellow
  for (let i = 0; i < 50; i++) {
    const gx = (Math.sin(i * 123.45) * 0.5 + 0.5) * width;
    const gy = horizon + (Math.cos(i * 678.90) * 0.5 + 0.5) * (height - horizon);
    ctx.beginPath();
    ctx.arc(gx, gy, 10 + pulse * 20, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Walls
  ctx.fillStyle = "#87CEEB"; // Sky Blue (Simulated sky)
  ctx.fillRect(0, 0, width, horizon);

  // West Wall: Glossy wall (previously had windows)
  if (state.direction === 'West') {
    const dist = state.gridX;
    
    // Glossy sky-blue wall
    ctx.fillStyle = "#87CEEB"; 
    ctx.fillRect(0, 0, width, horizon);
  }

  // East Wall: 100 circular windows (10ft diameter, 9ft high, brass trim)
  if (state.direction === 'East') {
    const dist = Math.abs(2000 - state.gridX);
    const scale = 400 / (dist + 50);
    const winRadius = 50 * scale; 
    const winY = horizon - 90 * scale; 

    // Base Glossy blue wall
    const grad = ctx.createLinearGradient(0, 0, width, horizon);
    grad.addColorStop(0, "#00008B");
    grad.addColorStop(0.5, "#0000FF");
    grad.addColorStop(1, "#00008B");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, horizon);

    for (let i = 0; i < 100; i++) {
      const winX = (width / 2) + (i - 50) * 200 * scale;
      
      // Brass trim
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.arc(winX, winY, winRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Glass
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();
    }
  }

  // North Wall: Painted pink horizon with flowers
  if (state.direction === 'North') {
    const dist = Math.abs(2000 - state.gridY);
    const scale = 400 / (dist + 50);
    
    // Pink horizon
    ctx.fillStyle = "#FFC0CB";
    ctx.fillRect(0, 0, width, horizon);

    // Flowers (Roses, Daisies, Sunflowers)
    for (let i = 0; i < 20; i++) {
        const fx = (width / 2) + (i - 10) * 150 * scale;
        const fy = horizon - 50 * scale;
        
        // Sunflower
        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();
        ctx.arc(fx, fy, 20 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#8B4513";
        ctx.beginPath();
        ctx.arc(fx, fy, 8 * scale, 0, Math.PI * 2);
        ctx.fill();
    }

    // Doorway to Rugged Play Field
    const doorW = 200 * scale;
    const doorH = 250 * scale;
    const doorX = width / 2 - doorW / 2;
    const doorY = horizon - doorH;

    ctx.fillStyle = "#000000";
    ctx.fillRect(doorX, doorY, doorW, doorH);

    // Horizontal pink and white striped archway
    ctx.save();
    ctx.lineWidth = 10 * scale;
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = i % 2 === 0 ? "#FFC0CB" : "#FFFFFF";
      ctx.beginPath();
      ctx.arc(width / 2, doorY, (doorW / 2) + i * 5 * scale, Math.PI, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  // South Wall: 990-foot wood segments, 20-foot archway
  if (state.direction === 'South') {
    const dist = state.gridY;
    const scale = 400 / (dist + 50);

    // Wood walls
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, 0, width, horizon); // Base wood

    // Garden scene painted on the wall (per description)
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#90EE90"; // LightGreen for painted garden
    ctx.fillRect(0, 0, width, horizon);
    ctx.restore();

    // Sliding Door to Meditation Hall
    const doorSize = 200 * scale; // 20 feet
    const doorW = doorSize;
    const doorH = doorSize;
    const doorX = width / 2 - doorW / 2;
    const doorY = horizon - doorH;

    // Draw the doorway tunnel
    ctx.fillStyle = "#000000";
    ctx.fillRect(doorX, doorY, doorW, doorH);

    // Archway frame (Original)
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 15 * scale;
    ctx.strokeRect(doorX, doorY, doorW, doorH);

    // Sliding Doors Implementation (Tarsis Effect: sliding + magic vanishing)
    const doorOpenProgress = state.simulatedGardenDoorProgress;
    const leftDoorOffset = -doorW / 2 * doorOpenProgress;
    const rightDoorOffset = doorW / 2 * doorOpenProgress;
    const doorOpacity = 1 - doorOpenProgress * 0.8; // Magical disappearance

    if (doorOpacity > 0.01) {
      ctx.save();
      ctx.globalAlpha = doorOpacity;

      // Left Door
      const lDoorX = doorX + leftDoorOffset;
      ctx.fillStyle = "#A9A9A9"; // Steel base
      ctx.fillRect(lDoorX, doorY, doorW / 2, doorH);
      ctx.strokeStyle = "#D4AF37"; // Brass trim
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(lDoorX, doorY, doorW / 2, doorH);

      // Left Window: Japanese House, Garden, Forest, Blue Sky, Kids in Onesies, Ship
      ctx.fillStyle = "#87CEEB"; // Blue sky
      const winMargin = 20 * scale;
      const winW = (doorW / 2) - winMargin * 2;
      const winH = (doorH / 2) - winMargin * 2;
      const lWinX = lDoorX + winMargin;
      const lWinY = doorY + winMargin;
      ctx.fillRect(lWinX, lWinY, winW, winH);

      // Draw Forest and Garden
      ctx.fillStyle = "#1E5945"; // Forest
      ctx.fillRect(lWinX, lWinY + winH * 0.5, winW, winH * 0.3);
      ctx.fillStyle = "#90EE90"; // Garden
      ctx.fillRect(lWinX, lWinY + winH * 0.8, winW, winH * 0.2);

      // Japanese House
      ctx.fillStyle = "#8B0000"; // Dark red house
      ctx.fillRect(lWinX + winW * 0.1, lWinY + winH * 0.6, winW * 0.3, winH * 0.25);
      ctx.fillStyle = "#000000"; // Pagoda roof
      ctx.beginPath();
      ctx.moveTo(lWinX + winW * 0.05, lWinY + winH * 0.6);
      ctx.lineTo(lWinX + winW * 0.45, lWinY + winH * 0.6);
      ctx.lineTo(lWinX + winW * 0.25, lWinY + winH * 0.5);
      ctx.closePath();
      ctx.fill();

      // Ship on right
      ctx.fillStyle = "#CD7F32"; // Wood ship
      ctx.beginPath();
      ctx.moveTo(lWinX + winW * 0.7, lWinY + winH * 0.7);
      ctx.lineTo(lWinX + winW * 0.95, lWinY + winH * 0.7);
      ctx.lineTo(lWinX + winW * 0.85, lWinY + winH * 0.8);
      ctx.lineTo(lWinX + winW * 0.75, lWinY + winH * 0.8);
      ctx.closePath();
      ctx.fill();

      // Kids in onesies (Babylon-free)
      const colors = ['#FF69B4', '#00FFFF', '#FFFF00'];
      for(let k=0; k<3; k++) {
        ctx.fillStyle = colors[k];
        ctx.beginPath();
        ctx.arc(lWinX + winW * (0.2 + k * 0.1), lWinY + winH * 0.82, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Right Door
      const rDoorX = doorX + doorW / 2 + rightDoorOffset;
      ctx.fillStyle = "#A9A9A9"; // Steel base
      ctx.fillRect(rDoorX, doorY, doorW / 2, doorH);
      ctx.strokeStyle = "#D4AF37"; // Brass trim
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(rDoorX, doorY, doorW / 2, doorH);

      // Right Window: Ethiopia Landscape
      ctx.fillStyle = "#FFD700"; // Gold sky (Savannah feel)
      const rWinX = rDoorX + winMargin;
      ctx.fillRect(rWinX, lWinY, winW, winH);
      
      // Mountains and Lions (simplified)
      ctx.fillStyle = "#8B4513";
      ctx.beginPath();
      ctx.moveTo(rWinX, lWinY + winH * 0.8);
      ctx.lineTo(rWinX + winW * 0.3, lWinY + winH * 0.5);
      ctx.lineTo(rWinX + winW * 0.6, lWinY + winH * 0.8);
      ctx.fill();
      
      ctx.fillStyle = "#DAA520"; // Lion of Judah simplified
      ctx.fillRect(rWinX + winW * 0.7, lWinY + winH * 0.75, 10 * scale, 10 * scale);

      ctx.restore();
    }
  }
}
