import { GameState } from '../../../../../../../../../../../System/Engine/Core/Types';

/**
 * Renders the Tarsis Effect transition sequence.
 * 20ft wide path, 1100ft long.
 */
export function drawWesternTarsis(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const dist = 1100 - state.gridX; // Progress from Manor (East) to Farm (West)
  const horizon = height * 0.4;
  
  // 1. Sky & Hills Background
  ctx.fillStyle = "#87CEEB"; // Blue sky
  ctx.fillRect(0, 0, width, horizon);
  
  // Hills in the distance
  ctx.fillStyle = "#556B2F"; // Dark Olive Green
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.quadraticCurveTo(width * 0.25, horizon - 50, width * 0.5, horizon);
  ctx.quadraticCurveTo(width * 0.75, horizon - 30, width, horizon);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();

  // 2. Wide Brick Path (20ft wide conceptually)
  ctx.fillStyle = "#333333"; // Base ground
  ctx.fillRect(0, horizon, width, height - horizon);
  
  const pathWidth = width * 0.6;
  const pathX = (width - pathWidth) / 2;
  
  // Draw bricks with perspective
  ctx.fillStyle = "#D7CCC8"; // Light brick/stone color
  ctx.fillRect(pathX, horizon, pathWidth, height - horizon);
  
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 20; i++) {
    const yPos = horizon + (i / 20) * (height - horizon);
    ctx.beginPath();
    ctx.moveTo(pathX, yPos);
    ctx.lineTo(pathX + pathWidth, yPos);
    ctx.stroke();
  }

  // 3. Progressive Farm visuals
  let barnScale = 0;
  let barnAlpha = 0;
  let farmMsg = "";

  if (dist <= 100) {
    barnScale = 0.05;
    barnAlpha = 0.3;
    farmMsg = "Steering West... a tiny shadow of a red barn appears.";
  } else if (dist <= 200) {
    barnScale = 0.1;
    barnAlpha = 0.5;
    farmMsg = "The farm horizon appears as you speed Westward.";
  } else if (dist <= 700) {
    barnScale = 0.4;
    barnAlpha = 0.9;
    farmMsg = "The red barn is coming into focus.";
  } else if (dist <= 1000) {
    barnScale = 0.9;
    barnAlpha = 1.0;
    farmMsg = "Approaching the red barn gate on the East side of the farm.";
  } else {
    barnScale = 1.0;
    barnAlpha = 1.0;
    farmMsg = "Entering the red barn. Welcome to Pablo's Farm.";
  }

  // Draw the red barn
  ctx.save();
  ctx.translate(width / 2, horizon);
  ctx.scale(barnScale, barnScale);
  ctx.globalAlpha = barnAlpha;
  
  ctx.fillStyle = "red";
  ctx.fillRect(-50, -60, 100, 60);
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(-50, -60);
  ctx.lineTo(0, -90);
  ctx.lineTo(50, -60);
  ctx.fill();
  
  ctx.fillStyle = "#5D4037"; // Dark wood door
  ctx.fillRect(-15, -30, 30, 30);
  ctx.restore();

  // Text status
  ctx.fillStyle = "white";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(farmMsg, width / 2, height - 50);
}
