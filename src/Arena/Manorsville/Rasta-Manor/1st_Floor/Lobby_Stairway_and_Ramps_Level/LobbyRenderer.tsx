import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { LOBBY_WIDTH, LOBBY_HEIGHT, ELEVATOR_X_MIN, ELEVATOR_Y_MIN, RAMP_ENCLOSURE_X_MAX, RAMP_ENCLOSURE_Y_MIN, EAST_ARCH_Y_MIN, EAST_ARCH_Y_MAX, WEST_DOOR_Y_MIN, WEST_DOOR_Y_MAX } from './LobbyConstants';

export function drawLobbyStairwayAndRamps(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';

  ctx.save();

  // Floor: white ceramic tiles
  const floorZLimit = state.pixelRatio < 1 ? 10 : 20;
  for (let z = floorZLimit; z > 0; z--) {
    const y1 = horizon + (1 / z) * 500;
    const y2 = z === 1 ? height : horizon + (1 / (z - 1)) * 500;
    const h = y2 - y1;
    
    for (let x = 0; x < 10; x++) {
      const x1 = (x / 10) * width;
      const x2 = ((x + 1) / 10) * width;
      const w = x2 - x1;
      
      const isAlt = (z + x) % 2 === 0;
      ctx.fillStyle = isAlt ? (isNight ? '#cccccc' : '#ffffff') : (isNight ? '#bbbbbb' : '#f0f0f0');
      ctx.fillRect(x1, y1, w, h);
      
      // Tile grout
      ctx.strokeStyle = '#dddddd';
      ctx.lineWidth = 1;
      ctx.strokeRect(x1, y1, w, h);
    }
  }

  // Walls: White with ceramic tiles look
  ctx.fillStyle = isNight ? '#333333' : (isEvening ? '#555555' : '#ffffff');
  ctx.fillRect(0, 0, width, horizon);

  // Ceiling
  const ceilingGrad = ctx.createLinearGradient(0, 0, 0, horizon);
  ceilingGrad.addColorStop(0, isNight ? '#000000' : '#222222');
  ceilingGrad.addColorStop(1, isNight ? '#111111' : '#444444');
  ctx.fillStyle = ceilingGrad;
  ctx.fillRect(0, 0, width, horizon * 0.4);

  // North Wall (with Elevator and Ramps)
  if (state.direction === 'North') {
    const dist = Math.abs(state.gridY - 1000);
    if (dist <= 150 || state.isRampStep) {
      const scale = 400 / (dist + 50);
      
      // Draw Ramps Enclosure (NW - x1 to x220)
      if (state.gridX <= 300 || state.isRampStep) {
        const enclosureX = (width / 2) - (LOBBY_WIDTH / 2 - 110) * scale;
        const enclosureW = 220 * scale;
        const enclosureH = 200 * scale;
        
        ctx.save();
        if (state.isRampStep) {
          ctx.translate(width / 2, height / 2);
          ctx.rotate(Math.PI / 4);
          ctx.translate(-width / 2, -height / 2);
        }

        // Enclosure background
        ctx.fillStyle = "#606060";
        ctx.fillRect(enclosureX, horizon - enclosureH, enclosureW, enclosureH);
        
        // West Wing (X 1-110)
        const wwX = enclosureX;
        const wwW = 110 * scale;
        
        // Ramp 1 (Mezzanine): X 1-55
        ctx.fillStyle = "#8B0000"; // Deep Red
        ctx.fillRect(wwX + 2*scale, horizon - 50*scale, 53*scale, 45*scale);
        
        // Ramp 2 (Cellar): X 56-110
        ctx.fillStyle = "#556B2F"; // Dark Olive Green for Cellar
        ctx.fillRect(wwX + 56*scale, horizon - 50*scale, 53*scale, 45*scale);

        // East Wing (X 111-220)
        const ewX = enclosureX + 111 * scale;
        const ewW = 110 * scale;

        // Ramp 1 (Mezzanine): X 166-220
        ctx.fillStyle = "#8B0000";
        ctx.fillRect(enclosureX + 166*scale, horizon - 50*scale, 53*scale, 45*scale);

        // Ramp 2 (Cellar): X 111-165
        ctx.fillStyle = "#556B2F";
        ctx.fillRect(enclosureX + 111*scale, horizon - 50*scale, 53*scale, 45*scale);

        // Railing logic for Lobby: Southern barrier except at X=220 side
        ctx.strokeStyle = "#silver";
        ctx.lineWidth = 3 * scale;
        ctx.beginPath();
        ctx.moveTo(enclosureX, horizon - 5 * scale);
        ctx.lineTo(enclosureX + 220 * scale, horizon - 5 * scale); // Southern railing
        ctx.stroke();

        // Marker at 220 (The Side Entrance)
        ctx.fillStyle = "#FFFF00"; // Yellow marker
        ctx.beginPath();
        ctx.arc(enclosureX + 220*scale, horizon - 25*scale, 5*scale, 0, Math.PI*2);
        ctx.fill();

        ctx.restore();
      }

      // Draw Elevator (NE - x985 to x1000)
      if (state.gridX >= 800) {
        const elevatorX = (width / 2) + (LOBBY_WIDTH / 2 - 7.5) * scale;
        const elevatorW = 15 * scale;
        const elevatorH = 150 * scale;
        ctx.fillStyle = "#c0c0c0"; // Metallic
        ctx.fillRect(elevatorX - elevatorW / 2, horizon - elevatorH, elevatorW, elevatorH);
      }
    }
  }

  // Ceiling Lights: Pink
  const lightX = [0.2, 0.5, 0.8];
  lightX.forEach(lx => {
    const lxPos = lx * width;
    const lyPos = horizon * 0.2;
    const grad = ctx.createRadialGradient(lxPos, lyPos, 0, lxPos, lyPos, 50);
    grad.addColorStop(0, "rgba(255, 192, 203, 0.8)"); // Pink
    grad.addColorStop(1, "rgba(255, 192, 203, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(lxPos, lyPos, 50, 0, Math.PI * 2);
    ctx.fill();
  });

  // East Wall (Archway to Library)
  if (state.direction === 'East') {
    const dist = Math.abs(state.gridX - 1000);
    if (dist <= 150) {
      const scale = 400 / (dist + 50);
      const archW = 300 * scale;
      const archH = 450 * scale;
      const archX = width / 2 - archW / 2;
      const archY = horizon - archH;

      // Simple Archway opening
      ctx.fillStyle = isNight ? "#111111" : "#222222";
      ctx.fillRect(archX, archY, archW, archH);
      
      // Decorative trim
      ctx.strokeStyle = "#silver";
      ctx.lineWidth = 10 * scale;
      ctx.strokeRect(archX, archY, archW, archH);
    }
  }

  // West Wall (Windows, Stairway, and Glass Door)
  if (state.direction === 'West') {
    const dist = Math.abs(state.gridX - 0);
    if (dist <= 250) {
      const scale = 400 / (dist + 50);
      
      // Large windows
      ctx.fillStyle = "rgba(173, 216, 230, 0.4)";
      for (let i = 0; i < 3; i++) {
        const winX = 20 + i * 300 * scale;
        if (winX < width) {
            ctx.fillRect(winX, horizon - 300 * scale, 200 * scale, 200 * scale);
        }
      }

      // West Glass Door (y490-510)
      if (state.gridY >= 400 && state.gridY <= 600) {
          const doorW = 300 * scale;
          const doorH = 450 * scale;
          const doorX = width / 2 - doorW / 2;
          const doorY = horizon - doorH;

          // Glass Door Frame
          ctx.strokeStyle = "#444444";
          ctx.lineWidth = 15 * scale;
          ctx.strokeRect(doorX, doorY, doorW, doorH);

          // Glass Panel
          ctx.fillStyle = "rgba(135, 206, 235, 0.5)";
          ctx.fillRect(doorX + 5*scale, doorY + 5*scale, doorW - 10*scale, doorH - 10*scale);
          
          // Reflections
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.beginPath();
          ctx.moveTo(doorX + 50*scale, doorY + 50*scale);
          ctx.lineTo(doorX + doorW - 50*scale, doorY + doorH - 50*scale);
          ctx.stroke();

          // Door Handle
          ctx.fillStyle = "#silver";
          ctx.fillRect(doorX + doorW - 40 * scale, doorY + doorH * 0.5, 15 * scale, 40 * scale);
      }

      // Southwest Stairway (optimized width)
      if (state.gridY <= 300) {
        const stairX = width / 2 - 200 * scale;
        const stairW = 400 * scale;
        ctx.fillStyle = "#a52a2a"; // Reddish-brown steps
        for(let i=0; i<10; i++) {
          ctx.fillRect(stairX + i * 20 * scale, horizon - (i+1) * 20 * scale, stairW - i*40*scale, 20 * scale);
        }
      }
    }
  }

  // Pillars (Spaced 50 feet apart)
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  for (let px = 50; px < LOBBY_WIDTH; px += 50) {
    for (let py = 50; py < LOBBY_HEIGHT; py += 50) {
      // Avoid blocking areas
      const inElevator = px >= 980 && py >= 980;
      const inRamps = px <= 230 && py >= 940;
      const inDoor = px >= 980 && py >= 480 && py <= 520;
      const inStairs = px <= 100 && py <= 100;
      
      if (!inElevator && !inRamps && !inDoor && !inStairs) {
         // Perspective rendering of pillars would go here
         // For now, simplified representation
      }
    }
  }
  ctx.restore();

  ctx.restore();
}
