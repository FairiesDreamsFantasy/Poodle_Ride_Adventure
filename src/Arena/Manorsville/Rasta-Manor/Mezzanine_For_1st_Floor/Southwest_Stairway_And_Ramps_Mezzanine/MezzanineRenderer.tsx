import { GameState } from '../../../../../System/AI/In-Game/Logic/GameLogic';
import { MEZZANINE_WIDTH, MEZZANINE_HEIGHT, ELEVATOR_X_MIN, ELEVATOR_Y_MIN } from './MezzanineConstants';

export function drawMezzanineStairwayAndRamps(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';

  ctx.save();

  // Floor: Red tile carpet with pink micro dots (matching lobby/ramp theme)
  ctx.fillStyle = "#8B0000"; // Deep Red
  ctx.fillRect(0, horizon, width, height - horizon);
  
  // Pink dots on floor
  ctx.fillStyle = "#FFD1DC";
  for (let i = 0; i < 50; i++) {
     const seed = Math.sin(i * 123.45) * 1000;
     const dotX = (seed % 1) * width;
     const dotY = horizon + ((seed * 2) % 1) * (height - horizon);
     ctx.beginPath();
     ctx.arc(dotX, dotY, 1, 0, Math.PI * 2);
     ctx.fill();
  }

  // Walls
  ctx.fillStyle = isNight ? '#111111' : '#f0f0f0';
  ctx.fillRect(0, 0, width, horizon);

  // Ceiling Lights: Pink
  const lightX = [0.2, 0.5, 0.8];
  lightX.forEach(lx => {
    const lxPos = lx * width;
    const lyPos = horizon * 0.2;
    const grad = ctx.createRadialGradient(lxPos, lyPos, 0, lxPos, lyPos, 60);
    grad.addColorStop(0, "rgba(255, 192, 203, 0.8)"); // Pink
    grad.addColorStop(1, "rgba(255, 192, 203, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(lxPos, lyPos, 60, 0, Math.PI * 2);
    ctx.fill();
  });

  // West Wall (Window overlooking side of manor & Gym Door)
  if (state.direction === 'West') {
    // Window
    ctx.fillStyle = "rgba(135, 206, 235, 0.3)"; // Sky Blue window
    ctx.fillRect(width * 0.2, horizon * 0.2, width * 0.6, horizon * 0.5);
    ctx.strokeStyle = "#silver";
    ctx.lineWidth = 4;
    ctx.strokeRect(width * 0.2, horizon * 0.2, width * 0.6, horizon * 0.5);
    
    // Gym Door (at 495-505)
    const doorScale = 1.2;
    const doorW = 100 * doorScale;
    const doorH = 200 * doorScale;
    ctx.fillStyle = "#333";
    ctx.fillRect(width / 2 - doorW / 2, horizon - doorH, doorW, doorH);
  }

  // South Wall (Window overlooking Back Porch)
  if (state.direction === 'South') {
    ctx.fillStyle = "rgba(200, 200, 255, 0.4)";
    ctx.fillRect(width * 0.1, horizon * 0.1, width * 0.8, horizon * 0.6);
    ctx.strokeStyle = "#aaa";
    ctx.strokeRect(width * 0.1, horizon * 0.1, width * 0.8, horizon * 0.6);
  }

  // East Wall (Window overlooking meditation hall library)
  if (state.direction === 'East') {
      ctx.save();
      const scale = 300 / (Math.abs(state.gridX - 1000) + 50);
      const windowW = 600 * scale;
      const windowH = 400 * scale;
      ctx.fillStyle = "rgba(100, 255, 100, 0.1)"; // Garden view hinted
      ctx.fillRect(width / 2 - windowW / 2, horizon - windowH, windowW, windowH);
      ctx.restore();
  }

  // North Wall (Elevator NE and Ramps)
  if (state.direction === 'North') {
      const dist = Math.abs(state.gridY - 1000);
      const scale = 400 / (dist + 50);

      // Elevator at Northeast (large X)
      if (state.gridX >= 700) {
          const elevatorX = (width / 2) + (state.gridX - 990) * scale;
          const elevatorW = 50 * scale;
          const elevatorH = 150 * scale;
          ctx.fillStyle = "#c0c0c0";
          ctx.fillRect(elevatorX - elevatorW / 2, horizon - elevatorH, elevatorW, elevatorH);
      }

      // Ramps visuals (West and Central)
      if (state.gridX <= 300) {
          const enclosureX = (width / 2) - (state.gridX - 110) * scale;
          const enclosureW = 220 * scale;
          const enclosureH = 200 * scale;
          
          ctx.save();
          // Background
          ctx.fillStyle = "#404040";
          ctx.fillRect(enclosureX, horizon - enclosureH, enclosureW, enclosureH);

          // West Wing (1-110)
          const wwX = enclosureX;
          // Ramp 1 (2nd Floor): X 1-55
          ctx.fillStyle = "#4682B4"; // Steel Blue for 2nd Floor
          ctx.fillRect(wwX + 2*scale, horizon - 50*scale, 53*scale, 45*scale);
          // Ramp 2 (1st Floor): X 56-110
          ctx.fillStyle = "#8B0000"; // Deep Red for 1st Floor
          ctx.fillRect(wwX + 56*scale, horizon - 50*scale, 53*scale, 45*scale);

          // East Wing (111-220)
          const ewX = enclosureX + 111 * scale;
          // Ramp 1 (1st Floor): X 166-220
          ctx.fillStyle = "#8B0000"; 
          ctx.fillRect(enclosureX + 166*scale, horizon - 50*scale, 53*scale, 45*scale);
          // Ramp 2 (2nd Floor): X 111-165
          ctx.fillStyle = "#4682B4";
          ctx.fillRect(enclosureX + 111*scale, horizon - 50*scale, 53*scale, 45*scale);

          // Brass Railing Barrier (X=220, 30ft long from North wall Y=1000 to Y=970)
          // In this perspective,North is ahead.
          // Y=970 to Y=1000 is depth into the screen.
          ctx.strokeStyle = "#DAA520"; // Goldenrod for brass
          ctx.lineWidth = 4 * scale;
          ctx.beginPath();
          ctx.moveTo(enclosureX + 220*scale, horizon);
          ctx.lineTo(enclosureX + 220*scale, horizon - 150*scale);
          ctx.stroke();

          ctx.restore();
      }
  }

  // Tarsis Warp Animation
  if (state.isRampStep) {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.PI / 4); // 45 degrees
    ctx.translate(-width / 2, -height / 2);
    
    ctx.fillStyle = "rgba(255, 192, 203, 0.3)";
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = "#FFC0CB";
    for(let i=0; i<30; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
  }

  ctx.restore();
}
