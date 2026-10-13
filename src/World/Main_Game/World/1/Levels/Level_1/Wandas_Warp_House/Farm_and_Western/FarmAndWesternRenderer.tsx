import { GameState } from '../../../../../../../../System/Engine/Core/Types';

/**
 * Draws the WandaWestFarmHallway area (300 feet wide x 100 feet deep)
 * Designed like a farm ground with white fences, grazing cattle, tall corn (North),
 * and a duck pond with 4 swimming ducks (South).
 */
export function drawWandaWestFarmHallway(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / 300;
  const scaleY = height / 20;
  
  // 1. Emulated Farm Ground Floor (Warm sandy brown dirt with patches of grass)
  ctx.fillStyle = "#8d6e63"; // Base dirt color
  ctx.fillRect(0, 0, width, height);
  
  // Custom grassy spots/patches for a warm agricultural feel
  ctx.fillStyle = "#558b2f";
  for (let x = 15; x < 300; x += 40) {
    const gy = (x * 3) % 8 + 6;
    ctx.beginPath();
    ctx.ellipse(x * scaleX, gy * scaleY, 25 * scaleX, 2 * scaleY, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. NORTH SIDE (Y = 20): Pixelated Farmland, Tall Corn & Grazing Cattle
  // Draw the background sky & horizon on the top edge of the map
  ctx.save();
  const northSkyHeight = 5; // 5 feet high wall projection
  const skyGrad = ctx.createLinearGradient(0, 0, 0, northSkyHeight * scaleY);
  skyGrad.addColorStop(0, "#29b6f6"); // Bright light blue sky
  skyGrad.addColorStop(1, "#81d4fa");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, northSkyHeight * scaleY);

  // Green horizon line
  ctx.fillStyle = "#33691e";
  ctx.fillRect(0, (northSkyHeight - 1) * scaleY, width, 1 * scaleY);

  // Draw tall corn (high as an elephant's eye!) with pixelated blocks effect
  ctx.fillStyle = "#1b5e20"; // Dark jungle corn green
  const numStalks = 30;
  for (let i = 0; i < numStalks; i++) {
    const cx = (i * 10 + 5) * scaleX;
    const cy = (northSkyHeight - 1) * scaleY;
    // Main stalk
    ctx.fillRect(cx - 1 * scaleX, cy - 3 * scaleY, 2 * scaleX, 3 * scaleY);
    // Pixelated leaves
    ctx.fillStyle = "#cddc39"; // Bright yellow-green ears of corn
    ctx.fillRect(cx - 2 * scaleX, cy - 2 * scaleY, 1 * scaleX, 1 * scaleY);
    ctx.fillRect(cx + 1 * scaleX, cy - 1 * scaleY, 1 * scaleX, 1 * scaleY);
    ctx.fillStyle = "#1b5e20";
  }

  // Herd of Grazing Cattle (distinct white & black spots)
  ctx.save();
  // Cow 1
  drawCow(ctx, 40 * scaleX, 3 * scaleY, 10 * scaleX, 2.5 * scaleY);
  // Cow 2
  drawCow(ctx, 120 * scaleX, 2.5 * scaleY, 9 * scaleX, 2.2 * scaleY);
  // Cow 3
  drawCow(ctx, 210 * scaleX, 3.5 * scaleY, 11 * scaleX, 2.8 * scaleY);
  ctx.restore();

  // White Fence at North end (Y = 20 -> top of the navigable zone, below the wall artwork)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  // Rails
  ctx.beginPath();
  ctx.moveTo(0, 4.6 * scaleY);
  ctx.lineTo(width, 4.6 * scaleY);
  ctx.moveTo(0, 5.0 * scaleY);
  ctx.lineTo(width, 5.0 * scaleY);
  ctx.stroke();
  // Posts
  for (let px = 0; px <= 300; px += 25) {
    ctx.fillRect(px * scaleX - 1, 4.5 * scaleY, 2, 1.5 * scaleY);
  }
  ctx.restore();

  // 3. SOUTH SIDE (Y = 0): Duck Pond with 4 Swimming Ducks & Green Horizon
  ctx.save();
  // Draw the blue sky background near south edge
  const southSkyY = 15 * scaleY;
  ctx.fillStyle = "#4fc3f7"; // sky
  ctx.fillRect(0, southSkyY, width, height - southSkyY);
  // Green horizon line at the south
  ctx.fillStyle = "#a8e05f";
  ctx.fillRect(0, southSkyY, width, 0.6 * scaleY);

  // White fence at South boundary
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 14.4 * scaleY);
  ctx.lineTo(width, 14.4 * scaleY);
  ctx.moveTo(0, 15.0 * scaleY);
  ctx.lineTo(width, 15.0 * scaleY);
  ctx.stroke();
  for (let px = 0; px <= 300; px += 25) {
    ctx.fillRect(px * scaleX - 1, 14.2 * scaleY, 2, 1.6 * scaleY);
  }

  // The Duck Pond (beautiful oval with soft blue gradient)
  const pondX = 150 * scaleX;
  const pondY = 10 * scaleY;
  const pondRadX = 60 * scaleX;
  const pondRadY = 3.6 * scaleY;
  const pondGrad = ctx.createRadialGradient(pondX, pondY, 2, pondX, pondY, pondRadX);
  pondGrad.addColorStop(0, "#4dd0e1"); // Bright cyan
  pondGrad.addColorStop(1, "#00838f"); // Deep teal
  ctx.fillStyle = pondGrad;
  ctx.beginPath();
  ctx.ellipse(pondX, pondY, pondRadX, pondRadY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Gentle water ripples animating over time
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1;
  const rippleOffset = (time * 12) % 30;
  ctx.beginPath();
  ctx.ellipse(pondX, pondY, (30 + rippleOffset) * scaleX, (1.5 + rippleOffset * 0.05) * scaleY, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 4 Adorable Swimming Ducks moving gently
  const duckOffset = Math.sin(time * 2) * 8;
  drawDuck(ctx, pondX - 25 * scaleX + duckOffset, pondY - 0.8 * scaleY, scaleX);
  drawDuck(ctx, pondX + 15 * scaleX - duckOffset, pondY + 0.6 * scaleY, scaleX);
  drawDuck(ctx, pondX - 5 * scaleX + duckOffset, pondY + 1.0 * scaleY, scaleX * 0.9);
  drawDuck(ctx, pondX + 30 * scaleX + duckOffset * 0.5, pondY - 1.2 * scaleY, scaleX * 0.8);
  ctx.restore();

  // 4. EAST BOUNDARY: West Double Doors of Wanda's (visual connection)
  ctx.fillStyle = "#ad1457"; // Deep magenta-purple frame
  ctx.fillRect(width - 4 * scaleX, 0, 4 * scaleX, height);

  // 5. WEST BOUNDARY: Gate leading to the Red Barn Warp House
  ctx.fillStyle = "#c62828"; // Heavy barn red gate pillars
  ctx.fillRect(0, 0, 6 * scaleX, 3 * scaleY);
  ctx.fillRect(0, 17 * scaleY, 6 * scaleX, 3 * scaleY);
  // Barn wooden style gate door
  ctx.fillStyle = "#d32f2f";
  ctx.fillRect(0, 3 * scaleY, 3 * scaleX, 14 * scaleY);
  ctx.strokeStyle = "#ffeb3b"; // Bright yellow brace
  ctx.lineWidth = 1.5;
  ctx.strokeRect(0, 3 * scaleY, 3 * scaleX, 14 * scaleY);
  ctx.beginPath();
  ctx.moveTo(0, 3 * scaleY);
  ctx.lineTo(3 * scaleX, 17 * scaleY);
  ctx.stroke();
}

/**
 * Draws the new WandaWestBarnWarpHouse (400 feet wide x 250 feet deep)
 * Styled as a red barn interior with bare ground floor, high ceiling.
 * Features:
 * - Slotted table at X=0 to 10, Y=247-250 (North-West corner) decorated with cowboys/cowgirls and a yellow chicken picture
 * - Relocated Trinika's Riding Paths warp at X=10 to 30 on the North Wall, 15 feet high
 */
export function drawWandaWestBarnWarpHouse(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / 400;
  const scaleY = height / 250;

  // 1. Flooring: Bare ground of a barn (soft brown sandy soil with scattered golden straw)
  ctx.fillStyle = "#a1887f"; // Barn earth
  ctx.fillRect(0, 0, width, height);

  // Scattered straw particles for high craftsmanship
  ctx.strokeStyle = "#fff176"; // Yellow straw
  ctx.lineWidth = 1.2;
  const seed = 42; // static seed for deterministic placement
  for (let i = 0; i < 80; i++) {
    const sx = ((i * 37) % 400) * scaleX;
    const sy = ((i * 19) % 250) * scaleY;
    const len = 6 * scaleX;
    const angle = (i * 2.3);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
    ctx.stroke();
  }

  // 2. Barn Pillars and Structural Wood Beams
  ctx.fillStyle = "#4e342e"; // Dark wooden pillars
  // Vertical supporting timbers
  for (let bx = 80; bx < 400; bx += 80) {
    ctx.fillRect(bx * scaleX - 3, 0, 6 * scaleX, height);
  }

  // 3. NORTH END WARES AND OBJECTS:
  // (A) Relocated Trinika's Riding Path Warp (X = 10 to 30, North wall Y=250)
  // Height is 15 feet high (which we can render as a beautiful projection)
  const warpX_start = 10 * scaleX;
  const warpWidth = 20 * scaleX;
  const warpY = 0; // Top of the screen (North)
  
  // Warp Frame (Black and gold board)
  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(warpX_start - 2, 0, warpWidth + 4, 18 * scaleY);
  ctx.strokeStyle = "#ffd700"; // Golden glow
  ctx.lineWidth = 2.5;
  ctx.strokeRect(warpX_start - 2, 0, warpWidth + 4, 18 * scaleY);

  // Warp Picture: Princess Trinika's Path Preview (Sky, pony trail)
  ctx.fillStyle = "#e0f7fa"; // Sky backdrop
  ctx.fillRect(warpX_start, 0, warpWidth, 15 * scaleY);
  // Pink path & pony silhouette in background
  ctx.fillStyle = "#fba0e3";
  ctx.beginPath();
  ctx.moveTo(warpX_start, 15 * scaleY);
  ctx.quadraticCurveTo(warpX_start + warpWidth / 2, 6 * scaleY, warpX_start + warpWidth, 15 * scaleY);
  ctx.fill();
  // Mini Pony silhouette
  ctx.fillStyle = "#8d6e63";
  ctx.beginPath();
  ctx.arc(warpX_start + warpWidth / 2, 9 * scaleY, 2.5 * scaleX, 0, Math.PI * 2);
  ctx.fill();

  // Glowing portal waves
  ctx.strokeStyle = "rgba(255, 235, 59, 0.4)";
  ctx.lineWidth = 2;
  const waveRadius = (time * 15) % 30;
  ctx.strokeRect(warpX_start - 2 - waveRadius * 0.1, 0, warpWidth + 4 + waveRadius * 0.2, 18 * scaleY);

  // Text label: "PONY WARP" in JetBrains Mono style
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${8 * scaleX}px "JetBrains Mono", monospace`;
  ctx.textAlign = "center";
  ctx.fillText("PONY PATH", warpX_start + warpWidth / 2, 24 * scaleY);

  // (B) Placed Table Centerpiece (X = 0 to 10, Y = 247 to 250 -> Top-Left corner)
  // Ensures clipping is avoided
  const tableXVal = 0;
  const tableW = 10 * scaleX;
  const tableH = 10 * scaleY; // Visual drawing depth
  
  // Table wooden base
  ctx.fillStyle = "#5d4037"; // Dark brown table wood
  ctx.fillRect(0, 0, tableW, tableH);
  // Table trim / shadow
  ctx.fillStyle = "#3e2723";
  ctx.fillRect(0, tableH - 2, tableW, 2);

  // Cowboy & Cowgirl riding ponies figures on table
  ctx.fillStyle = "#ffeb3b"; // Yellow pony 1
  ctx.fillRect(tableW * 0.2, tableH * 0.4, 2 * scaleX, 2 * scaleY);
  ctx.fillStyle = "#e91e63"; // Cowboy/Cowgirl hat pink element
  ctx.fillRect(tableW * 0.2, tableH * 0.2, 2 * scaleX, 1.5 * scaleY);

  ctx.fillStyle = "#0288d1"; // Blue pony 2
  ctx.fillRect(tableW * 0.6, tableH * 0.5, 2 * scaleX, 2 * scaleY);
  ctx.fillStyle = "#f57c00"; // Cowboy hat orange
  ctx.fillRect(tableW * 0.6, tableH * 0.3, 2 * scaleX, 1.5 * scaleY);

  // Above the table (occupies X = 2 to 8), 12 inches high, 6 feet high picture:
  // "chicken is yellow with an orange beak... green horizon and blue sky"
  const picX = 2 * scaleX;
  const picW = 6 * scaleX;
  const picY = tableH + 4 * scaleY;
  
  // Drawing picture box
  ctx.save();
  ctx.fillStyle = "#0288d1"; // sky background of picture
  ctx.fillRect(picX, picY, picW, 10 * scaleY);
  // White border
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(picX, picY, picW, 10 * scaleY);
  // Green horizon
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(picX, picY + 7 * scaleY, picW, 3 * scaleY);
  // Large Yellow Chicken inside picture representation
  ctx.fillStyle = "#ffeb3b"; // Bright Yellow chicken body
  ctx.beginPath();
  ctx.arc(picX + picW / 2, picY + 5 * scaleY, 2.5 * scaleX, 0, Math.PI * 2);
  ctx.fill();
  // Orange beak
  ctx.fillStyle = "#ff9800";
  ctx.beginPath();
  ctx.moveTo(picX + picW / 2 + 1.5 * scaleX, picY + 5 * scaleY);
  ctx.lineTo(picX + picW / 2 + 3.5 * scaleX, picY + 4 * scaleY);
  ctx.lineTo(picX + picW / 2 + 2.5 * scaleX, picY + 6 * scaleY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 4. EAST ENTRANCE GATE (X = 400, Y = 100 to 150):
  // Beautiful wooden archway doors
  ctx.fillStyle = "#8d6e63";
  ctx.fillRect(width - 6 * scaleX, 110 * scaleY, 6 * scaleX, 30 * scaleY);
  ctx.strokeStyle = "#4e342e";
  ctx.strokeRect(width - 6 * scaleX, 110 * scaleY, 6 * scaleX, 30 * scaleY);

  // Double gate door outlines in center of East Wall
  ctx.fillStyle = "#d32f2f";
  ctx.fillRect(width - 3 * scaleX, 112 * scaleY, 3 * scaleX, 26 * scaleY);
}

/**
 * Helper to draw a cartoon cow
 */
function drawCow(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Cow body (white)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, w, h);
  
  // Black spots
  ctx.fillStyle = "#111111";
  ctx.fillRect(x + w * 0.1, y + h * 0.2, w * 0.2, h * 0.3);
  ctx.fillRect(x + w * 0.5, y + h * 0.4, w * 0.25, h * 0.35);
  ctx.fillRect(x + w * 0.3, y + h * 0.1, w * 0.15, h * 0.25);

  // Cow head
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x - w * 0.25, y - h * 0.2, w * 0.3, h * 0.6);
  ctx.fillStyle = "#111111"; // spot on face
  ctx.fillRect(x - w * 0.15, y - h * 0.1, w * 0.15, h * 0.3);

  // Legs (black)
  ctx.fillStyle = "#222222";
  ctx.fillRect(x + w * 0.1, y + h, w * 0.15, h * 0.4);
  ctx.fillRect(x + w * 0.3, y + h, w * 0.15, h * 0.4);
  ctx.fillRect(x + w * 0.6, y + h, w * 0.15, h * 0.4);
  ctx.fillRect(x + w * 0.8, y + h, w * 0.15, h * 0.4);
}

/**
 * Helper to draw a yellow swimming duck
 */
function drawDuck(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  // Duck Body
  ctx.fillStyle = "#ffeb3b"; // Bright duck yellow
  ctx.beginPath();
  ctx.ellipse(x, y, 7 * scale, 5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Duck Head
  ctx.beginPath();
  ctx.arc(x + 5 * scale, y - 4 * scale, 4 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Orange Beak
  ctx.fillStyle = "#ff9800"; // Orange
  ctx.beginPath();
  ctx.moveTo(x + 8 * scale, y - 5 * scale);
  ctx.lineTo(x + 13 * scale, y - 4 * scale);
  ctx.lineTo(x + 9 * scale, y - 2 * scale);
  ctx.closePath();
  ctx.fill();

  // Tiny eye
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x + 5.5 * scale, y - 5 * scale, 0.7 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
