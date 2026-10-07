import { GameState, AREA_DIMENSIONS } from '../../../../../../../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * ALLISON'S MANOR FOYER RENDERER
 * 1st Floor, 25-foot high ceilings, tiled floor, LED lights.
 * Ramps at Northwest corner (ascends South to North).
 */
export function drawAllisonsFoyer(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const isNight = state.lightingMode === 'Night';
  const horizon = height * 0.3;

  ctx.save();

  // Floor (Polished tiles)
  ctx.fillStyle = isNight ? '#1a1a1a' : '#F5F5F5';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Tile grid with reflection
  ctx.strokeStyle = isNight ? '#0d0d0d' : '#E8E8E8';
  ctx.lineWidth = 1;
  const tileSize = 60;
  for (let x = 0; x < width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = horizon; y < height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Walls and Ceiling (25-foot high)
  ctx.fillStyle = isNight ? '#0d0d0d' : '#FFFFFF';
  ctx.fillRect(0, 0, width, horizon);

  // LED Lights on the ceiling
  const lightSpacing = 150;
  for (let x = 75; x < width; x += lightSpacing) {
    for (let y = 30; y < horizon; y += 60) {
      ctx.fillStyle = isNight ? '#4444ff' : '#E0F0FF';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      // Glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
      gradient.addColorStop(0, isNight ? 'rgba(100, 100, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(x - 20, y - 20, 40, 40);
    }
  }

  // --- TARSIS Teleportation Area (Northwest Corner) ---
  // Rampway Area for 500x500: x: 1-30, y: 320-500
  const rampAreaScaleX = 30 / 500; 
  const rampBoundaryX = 30 * (width / 500);
  
  // Draw the West boundary wall with openings
  ctx.strokeStyle = isNight ? '#333' : '#AAA';
  ctx.lineWidth = 4;
  ctx.beginPath();
  // South opening (320-335)
  ctx.moveTo(rampBoundaryX, horizon + (0 / 500) * (height - horizon)); // placeholder
  // Draw the wall segments
  ctx.moveTo(rampBoundaryX, horizon + (335 / 500) * (height - horizon));
  ctx.lineTo(rampBoundaryX, horizon + (485 / 500) * (height - horizon));
  ctx.stroke();

  // TARSIS Teleport Pads
  const padWidth = 15 * (width / 500);
  const pad1Y = horizon + (325 / 500) * (height - horizon);
  const pad2Y = horizon + (470 / 500) * (height - horizon);
  const padHeight = 15 * ((height - horizon) / 500);

  // Pad 1 (To 2nd Floor)
  const grad1 = ctx.createRadialGradient(rampBoundaryX - padWidth/2, pad1Y + padHeight/2, 0, rampBoundaryX - padWidth/2, pad1Y + padHeight/2, padWidth);
  grad1.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
  grad1.addColorStop(1, 'rgba(0, 100, 0, 0)');
  ctx.fillStyle = grad1;
  ctx.fillRect(rampBoundaryX - padWidth, pad1Y, padWidth, padHeight);

  // Pad 2 (Warp South)
  const grad2 = ctx.createRadialGradient(rampBoundaryX - padWidth/2, pad2Y + padHeight/2, 0, rampBoundaryX - padWidth/2, pad2Y + padHeight/2, padWidth);
  grad2.addColorStop(0, 'rgba(0, 100, 255, 0.8)');
  grad2.addColorStop(1, 'rgba(0, 0, 100, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(rampBoundaryX - padWidth, pad2Y, padWidth, padHeight);

  ctx.fillStyle = isNight ? '#00FF00' : '#008800';
  ctx.font = '10px sans-serif';
  ctx.fillText("TARSIS UP", rampBoundaryX - padWidth - 5, pad1Y + 10);
  ctx.fillStyle = isNight ? '#00AAFF' : '#0044BB';
  ctx.fillText("WARP SOUTH", rampBoundaryX - padWidth - 5, pad2Y + 10);
  
  // label placeholder removed here to avoid double render 
  
  // --- Hallway Features ---
  ctx.fillStyle = isNight ? '#FFFFFF' : '#000000';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Allison's Manor Foyer", width / 2, horizon - 20);

  // East wall stairway visual
  const stairY = horizon + (400 / 500) * (height - horizon);
  ctx.fillStyle = "#5D4037"; 
  ctx.fillRect(width - 10, stairY, 10, 80);

  // --- Western Warp Room NEW Exterior Walls (Southwest Area) ---
  // Wall 1: x=125, y=0 to y=90
  // Wall 2: y=90, x=1 to x=125
  
  const drawBrickWallHorizontal = (x1: number, x2: number, y: number) => {
    const canvasY = horizon + (y / 500) * (height - horizon);
    const canvasX1 = (x1 / 500) * width;
    const canvasX2 = (x2 / 500) * width;
    
    // Wall Structure
    ctx.fillStyle = "#B22222"; // Bricks
    ctx.fillRect(canvasX1, canvasY - 5, canvasX2 - canvasX1, 10);
    
    // Design overlay (Sky and hills tiles)
    ctx.fillStyle = "rgba(135, 206, 235, 0.5)"; // Blue sky tile
    ctx.fillRect(canvasX1, canvasY - 15, canvasX2 - canvasX1, 10);
  };

  const drawBrickWallVertical = (x: number, y1: number, y2: number) => {
    const canvasX = (x / 500) * width;
    const canvasY1 = horizon + (y1 / 500) * (height - horizon);
    const canvasY2 = horizon + (y2 / 500) * (height - horizon);
    
    ctx.fillStyle = "#B22222";
    ctx.fillRect(canvasX - 5, canvasY1, 10, canvasY2 - canvasY1);
    
    ctx.fillStyle = "rgba(135, 206, 235, 0.5)";
    ctx.fillRect(canvasX - 15, canvasY1, 10, canvasY2 - canvasY1);
  };

  drawBrickWallVertical(125, 0, 90);
  drawBrickWallHorizontal(1, 125, 90);

  // --- Southeast Coast Warp Room Exterior Walls ---
  const drawCeramicWallHorizontal = (x1: number, x2: number, y: number) => {
    const canvasY = horizon + (y / 500) * (height - horizon);
    const canvasX1 = (x1 / 500) * width;
    const canvasX2 = (x2 / 500) * width;
    ctx.fillStyle = "#E0E0E0"; // Light grey/white ceramic look
    ctx.fillRect(canvasX1, canvasY - 5, canvasX2 - canvasX1, 10);
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeRect(canvasX1, canvasY - 5, canvasX2 - canvasX1, 10);
  };

  const drawCeramicWallVertical = (x: number, y1: number, y2: number) => {
    const canvasX = (x / 500) * width;
    const canvasY1 = horizon + (y1 / 500) * (height - horizon);
    const canvasY2 = horizon + (y2 / 500) * (height - horizon);
    ctx.fillStyle = "#E0E0E0";
    ctx.fillRect(canvasX - 5, canvasY1, 10, canvasY2 - canvasY1);
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeRect(canvasX - 5, canvasY1, 10, canvasY2 - canvasY1);
  };

  drawCeramicWallVertical(375, 0, 50);
  drawCeramicWallHorizontal(375, 500, 50);
  
  // --- Garden Specific Warp Room Exterior (Northeast) ---
  drawCeramicWallVertical(375, 400, 500);
  drawCeramicWallHorizontal(375, 500, 400);

  // Doors for Warp Rooms
  const drawWarpDoor = (x1: number, x2: number, y: number, color: string) => {
    const canvasY = horizon + (y / 500) * (height - horizon);
    const canvasX1 = (x1 / 500) * width;
    const canvasX2 = (x2 / 500) * width;
    ctx.fillStyle = color;
    ctx.fillRect(canvasX1, canvasY - 8, canvasX2 - canvasX1, 16);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(canvasX1, canvasY - 8, canvasX2 - canvasX1, 16);
    
    // Glass window in door
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(canvasX1 + 2, canvasY - 4, (canvasX2 - canvasX1) - 4, 8);
  };

  // Garden Door: Northeast (y400, x390-x410? relative? let's stick to 385-405)
  drawWarpDoor(385, 405, 400, "#C0C0C0"); // Silver/Ceramic brass hybrid

  // SE Coast Door: Southeast (y50, x385-x405)
  drawWarpDoor(385, 405, 50, "#DAA520"); // Brass

  // --- Main Front Door (South) ---
  // Artistic coordinates: x240 to x260 at y1
  const drawFrontDoor = (x1: number, x2: number, color: string) => {
    const canvasY = height - 10;
    const canvasX1 = (x1 / 500) * width;
    const canvasX2 = (x2 / 500) * width;
    
    // Door base
    ctx.fillStyle = color;
    ctx.fillRect(canvasX1, canvasY - 15, canvasX2 - canvasX1, 20);
    
    // Highlight/Detail
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(canvasX1, canvasY - 15, canvasX2 - canvasX1, 20);

    // Label
    ctx.fillStyle = "white";
    ctx.font = "bold 8px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("FRONT DOOR", (canvasX1 + canvasX2) / 2, canvasY + 8);
  };
  
  drawFrontDoor(240, 260, "#00008B"); // Massive High Blue Doors

  // --- Futuristic Frenzy and Babylon Is Finally Fallen Exterior ---
  const drawFuturisticWall = (x: number, y1: number, y2: number) => {
    const canvasX = (x / 500) * width;
    const canvasY1 = horizon + (y1 / 500) * (height - horizon);
    const canvasY2 = horizon + (y2 / 500) * (height - horizon);
    
    // Base wall
    ctx.fillStyle = "#333";
    ctx.fillRect(canvasX - 5, canvasY1, 10, canvasY2 - canvasY1);
    
    // Futuristic neon accents
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 1;
    for (let y = canvasY1; y < canvasY2; y += 20) {
      ctx.beginPath();
      ctx.moveTo(canvasX - 10, y);
      ctx.lineTo(canvasX + 10, y + 10);
      ctx.stroke();
    }
  };

  const drawBabylonWall = (x: number, y1: number, y2: number) => {
    const canvasX = (x / 500) * width;
    const canvasY1 = horizon + (y1 / 500) * (height - horizon);
    const canvasY2 = horizon + (y2 / 500) * (height - horizon);
    
    // Default Foyer Design (White wall)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(canvasX - 5, canvasY1, 10, canvasY2 - canvasY1);
    ctx.strokeStyle = "#E0E0E0";
    ctx.strokeRect(canvasX - 5, canvasY1, 10, canvasY2 - canvasY1);
  };

  const drawFoyerWallHorizontal = (x1: number, x2: number, y: number) => {
    const canvasY = horizon + (y / 500) * (height - horizon);
    const canvasX1 = (x1 / 500) * width;
    const canvasX2 = (x2 / 500) * width;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(canvasX1, canvasY - 5, canvasX2 - canvasX1, 10);
    ctx.strokeStyle = "#E0E0E0";
    ctx.strokeRect(canvasX1, canvasY - 5, canvasX2 - canvasX1, 10);
  };

  // Wall at x400 from y50 to y350 (previously x800)
  // Babylon: y50-y175
  drawBabylonWall(400, 50, 175);
  // Futuristic: y175-y300
  drawFuturisticWall(400, 175, 300);
  // Remainder white wall: y300-y500
  drawBabylonWall(400, 300, 500);

  // Horizontal wall endings
  drawFoyerWallHorizontal(400, 500, 50);
  drawFoyerWallHorizontal(400, 500, 175);
  drawFoyerWallHorizontal(400, 500, 300);

  // Door 1: Futuristic Frenzy (y230-y250 previously 465-485)
  const ffDoorY1 = horizon + (230 / 500) * (height - horizon);
  const ffDoorY2 = horizon + (250 / 500) * (height - horizon);
  const x400Canvas = (400 / 500) * width;
  ctx.fillStyle = "#DAA520"; // Brass-like sliding door
  ctx.fillRect(x400Canvas - 3, ffDoorY1, 6, ffDoorY2 - ffDoorY1);
  ctx.strokeStyle = "#00FFFF";
  ctx.strokeRect(x400Canvas - 3, ffDoorY1, 6, ffDoorY2 - ffDoorY1);

  // Door 2: Babylon Is Finally Fallen (y100-y125 previously 215-235)
  const bfDoorY1 = horizon + (100 / 500) * (height - horizon);
  const bfDoorY2 = horizon + (125 / 500) * (height - horizon);
  ctx.fillStyle = "#8B4513"; // Wood-like African door
  ctx.fillRect(x400Canvas - 3, bfDoorY1, 6, bfDoorY2 - bfDoorY1);

  // Sign near x400door
  ctx.fillStyle = "white";
  ctx.font = "bold 8px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("BABYLON FALLEN", x400Canvas - 10, bfDoorY1 - 5);
  ctx.fillText("FUTURISTIC FRENZY", x400Canvas - 10, ffDoorY1 - 5);

  // Sign near the new SW door (x2-x14)
  const signX = (8 / 500) * width;
  const signY = horizon + (100 / 500) * (height - horizon);
  ctx.fillStyle = "#0D47A1"; // Dark Blue
  ctx.fillRect(signX - 17, signY - 12, 35, 25);
  ctx.strokeStyle = "#FFD700"; // Gold border
  ctx.lineWidth = 1;
  ctx.strokeRect(signX - 17, signY - 12, 35, 25);
  ctx.fillStyle = "#FFD700"; // Gold text
  ctx.font = "bold 6px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("WESTERN", signX, signY - 2);
  ctx.fillText("WARP ROOM", signX, signY + 6);

  // Sign for Southeast Coast Warp Room (near door x385-x405 at y50)
  const seSignX = (395 / 500) * width;
  const seSignY = horizon + (70 / 500) * (height - horizon);
  ctx.fillStyle = "#2E7D32"; // Dark Green
  ctx.fillRect(seSignX - 25, seSignY - 12, 50, 25);
  ctx.strokeStyle = "#FFD700";
  ctx.strokeRect(seSignX - 25, seSignY - 12, 50, 25);
  ctx.fillStyle = "#FFD700";
  ctx.font = "bold 5px sans-serif";
  ctx.fillText("SOUTHEAST COAST", seSignX, seSignY - 2);
  ctx.fillText("WARP ROOM", seSignX, seSignY + 6);

  // Sign for Garden Specific Warp Room (near door x385-x405 at y400)
  const gSignX = (395 / 500) * width;
  const gSignY = horizon + (385 / 500) * (height - horizon);
  ctx.fillStyle = "#C2185B"; // Pinkish Red (Roses)
  ctx.fillRect(gSignX - 25, gSignY - 12, 50, 25);
  ctx.strokeStyle = "#FFD700";
  ctx.strokeRect(gSignX - 25, gSignY - 12, 50, 25);
  ctx.fillStyle = "#FFD700";
  ctx.font = "bold 5px sans-serif";
  ctx.fillText("GARDEN SPECIFIC", gSignX, gSignY - 2);
  ctx.fillText("WARP ROOM", gSignX, gSignY + 6);

  // --- Restaurant / Communal Dining Facility (y: 350-500, x: 125-375) ---
  const rectX1 = (125 / 500) * width;
  const rectX2 = (375 / 500) * width;
  const rectY1 = horizon + (350 / 500) * (height - horizon);
  const rectY2 = horizon + (500 / 500) * (height - horizon);
  
  // Building structure (Light wood / warm stone color)
  ctx.fillStyle = "#FDF5E6"; // Old Lace
  ctx.fillRect(rectX1, rectY1, rectX2 - rectX1, rectY2 - rectY1);
  
  // Border
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 2;
  ctx.strokeRect(rectX1, rectY1, rectX2 - rectX1, rectY2 - rectY1);

  // Sign on the Left (West)
  const signBoxX = rectX1 + 10;
  const signBoxY = rectY1 - 30;
  ctx.fillStyle = "#8B0000"; // Dark red sign
  ctx.fillRect(signBoxX, signBoxY, 80, 25);
  ctx.strokeStyle = "#DAA520";
  ctx.strokeRect(signBoxX, signBoxY, 80, 25);
  ctx.fillStyle = "white";
  ctx.font = "bold 6px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Allison's Dining", signBoxX + 40, signBoxY + 10);
  ctx.fillText("& Restaurant", signBoxX + 40, signBoxY + 20);
  
  // Restaurant Symbol (Fork & Spoon)
  ctx.font = "12px serif";
  ctx.fillText("🍴", signBoxX + 40, signBoxY + 35);
  
  // Entrance Door (x240-x260 at y350)
  const doorX1 = (240 / 500) * width;
  const doorX2 = (260 / 500) * width;
  ctx.fillStyle = "#333333"; // Dark gray door frame
  ctx.fillRect(doorX1, rectY1 - 2, doorX2 - doorX1, 8);

  // --- Mountains Specific Warp Room Exterior (x: 0-200, y: 0-480) ---
  const mRectX1 = 0;
  const mRectX2 = (100 / 500) * width; // was 200/1000
  const mRectY1 = horizon + (0 / 500) * (height - horizon);
  const mRectY2 = horizon + (240 / 500) * (height - horizon); // was 480/700

  // Building structure (Light stone with mountain motifs)
  ctx.fillStyle = "#DCDCDC"; // Gainsboro
  ctx.fillRect(mRectX1, mRectY1, mRectX2 - mRectX1, mRectY2 - mRectY1);
  
  // Decorative mountain band at matching "10 foot" height
  ctx.fillStyle = "#696969";
  const mBandY = mRectY1 + (mRectY2 - mRectY1) * 0.1; // roughly 10% down
  ctx.fillRect(mRectX1, mBandY, mRectX2 - mRectX1, 5);

  // Sign on the Right (East wall of the room)
  const mSignX = mRectX2 - 10;
  const mSignY = mRectY1 + 100;
  ctx.save();
  ctx.translate(mSignX, mSignY);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = "#1E90FF"; // DodgerBlue for sky/mountains
  ctx.fillRect(-60, 0, 120, 15);
  ctx.strokeStyle = "white";
  ctx.strokeRect(-60, 0, 120, 15);
  ctx.fillStyle = "white";
  ctx.font = "bold 6px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Mountains Specific Warp Room", 0, 10);
  ctx.restore();

  // Entrance Door (at x100 inside foyer, y115-135)
  const mDoorY1 = horizon + (230 / 500) * (height - horizon);
  const mDoorY2 = horizon + (250 / 500) * (height - horizon);
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(mRectX2 - 5, mDoorY1, 10, mDoorY2 - mDoorY1);

  // South Windows on Restaurant exterior
  ctx.fillStyle = "rgba(173, 216, 230, 0.6)"; // Glass
  for (let i = 0; i < 4; i++) {
    const wx = rectX1 + (i * 60) + 15;
    // Don't draw window over the door
    if (wx < doorX1 - 20 || wx > doorX2 + 20) {
      ctx.fillRect(wx, rectY1 - 10, 30, 15);
      ctx.strokeStyle = "#8B4513";
      ctx.lineWidth = 1;
      ctx.strokeRect(wx, rectY1 - 10, 30, 15);
    }
  }

  ctx.restore();
}
