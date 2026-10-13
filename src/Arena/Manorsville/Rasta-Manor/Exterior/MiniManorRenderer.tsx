import { GameState } from '../../../../System/Engine/Core/Types';

export function drawMiniManor(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, time: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Pixel Art Style (using integer coordinates and sharp rectangles)
  const drawRect = (rx: number, ry: number, rw: number, rh: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(rx), Math.floor(ry), Math.floor(rw), Math.floor(rh));
  };

  // 3-story manor with metal roof
  // Body (White walls)
  drawRect(-87.5, -150, 175, 150, "#ffffff");
  
  // Floors (visual separators)
  drawRect(-87.5, -50, 175, 2, "#cccccc");
  drawRect(-87.5, -100, 175, 2, "#cccccc");

  // Metal Roof (Grey)
  ctx.beginPath();
  ctx.moveTo(-100, -150);
  ctx.lineTo(100, -150);
  ctx.lineTo(0, -200);
  ctx.closePath();
  ctx.fillStyle = "#808080";
  ctx.fill();

  // Solar Panels (Blue)
  drawRect(-40, -180, 30, 20, "#0000ff");
  drawRect(10, -180, 30, 20, "#0000ff");

  // Skylights (Light Blue)
  drawRect(-20, -165, 10, 10, "#add8e6");
  drawRect(10, -165, 10, 10, "#add8e6");

  // Front Porch (Mini: 175 x 62.5 - rendered partially in front)
  drawRect(-87.5, -10, 175, 10, "#8b4513"); // Side view of porch floor

  ctx.restore();
}

export function drawEastHouse(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Red House, 2 stories + top floor
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(-50, -100, 100, 100); // 2 stories
  
  // Top floor (3rd)
  ctx.fillRect(-30, -130, 60, 30);

  // Green Roofing
  ctx.beginPath();
  ctx.moveTo(-60, -130);
  ctx.lineTo(60, -130);
  ctx.lineTo(0, -160);
  ctx.closePath();
  ctx.fillStyle = "#008000";
  ctx.fill();

  // Front Porch (North side)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-50, -20, 100, 20); // Porch body
  
  // Porch Floor: Wood, white with black horizontal lines (E-W)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-50, -5, 100, 5);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(-50, -5 + i);
    ctx.lineTo(50, -5 + i);
    ctx.stroke();
  }

  // Ramp at West side
  ctx.fillStyle = "#cccccc";
  ctx.fillRect(-65, -10, 15, 10);

  // Overhang
  ctx.fillStyle = "#008000";
  ctx.fillRect(-55, -25, 110, 5);

  ctx.restore();
}

export function drawWestHouse(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // House 2 stories high
  ctx.fillStyle = "#deb887"; // BurlyWood
  ctx.fillRect(-50, -100, 100, 100);

  // Front Porch with overhang
  ctx.fillStyle = "#8b4513";
  ctx.fillRect(-50, -20, 100, 5); // Wood floor
  ctx.fillStyle = "#a0522d";
  ctx.fillRect(-55, -25, 110, 5); // Overhang

  // Ramp at West side (at North end)
  ctx.fillStyle = "#8b4513";
  ctx.fillRect(-65, -10, 15, 5);

  // Barrier overlooking subway (shared style)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(-60, -5, 120, 5);

  ctx.restore();
}
