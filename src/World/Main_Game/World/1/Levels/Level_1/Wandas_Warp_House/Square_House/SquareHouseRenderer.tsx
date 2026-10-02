import { GameState } from '../../../../../../../../System/Engine/Core/Types';

/**
 * Draws the WandaEastBrickHallway area (300 feet wide x 20 feet deep)
 * Features a brick floor, brass chain link fences, an underpass dirt road,
 * and background landscapes on North/South.
 */
export function drawWandaEastBrickHallway(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / 300;
  const scaleY = height / 20;

  // 1. Brick Floor (2-D Red bricks with light gray mortar lines)
  ctx.fillStyle = '#6d1b1b'; // Base mortar/dark brick color
  ctx.fillRect(0, 0, width, height);

  const brickW = 12 * scaleX;
  const brickH = 4 * scaleY;
  ctx.fillStyle = '#b71c1c'; // Bright brick red
  ctx.strokeStyle = '#d7ccc8'; // Light mortar line
  ctx.lineWidth = 1;

  for (let y = 0; y < 20; y += 4) {
    const shift = (Math.floor(y / 4) % 2) * (brickW / 2);
    for (let x = -10; x < 310; x += 12) {
      const bx = x * scaleX + shift;
      const by = y * scaleY;
      ctx.fillRect(bx, by, brickW - 1, brickH - 1);
      ctx.strokeRect(bx, by, brickW, brickH);
    }
  }

  // 2. Underpass Dirt Road (in the middle, e.g., X = 135 to 165 feet)
  // Rendering the underpass beneath the brick path
  const underpassStart = 135 * scaleX;
  const underpassW = 30 * scaleX;

  // Draw the stone bridge supports on left and right of the underpass
  ctx.fillStyle = '#9e9e9e'; // Gray stone
  ctx.fillRect(underpassStart - 4 * scaleX, 0, 4 * scaleX, height);
  ctx.fillRect(underpassStart + underpassW, 0, 4 * scaleX, height);
  ctx.strokeStyle = '#424242';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(underpassStart - 4 * scaleX, 0, 4 * scaleX, height);
  ctx.strokeRect(underpassStart + underpassW, 0, 4 * scaleX, height);

  // 3. Fences and Tarsis Environment on North/South walls
  // North Wall (Y = 0 to 5) has sky landscape + brass fence
  ctx.save();
  // Blue sky background
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(0, 0, width, 4 * scaleY);
  // Green horizon
  ctx.fillStyle = '#a8e05f';
  ctx.fillRect(0, 3 * scaleY, width, 1 * scaleY);

  // Conical trees & small houses in background
  ctx.fillStyle = '#1b5e20'; // Green trees
  for (let tx = 10; tx < 300; tx += 45) {
    // Tree
    ctx.beginPath();
    ctx.moveTo(tx * scaleX, 3 * scaleY);
    ctx.lineTo((tx + 5) * scaleX, 0.5 * scaleY);
    ctx.lineTo((tx + 10) * scaleX, 3 * scaleY);
    ctx.closePath();
    ctx.fill();

    // Little houses
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect((tx + 18) * scaleX, 1.8 * scaleY, 6 * scaleX, 1.2 * scaleY);
    ctx.fillStyle = '#e57373'; // Roof
    ctx.beginPath();
    ctx.moveTo((tx + 18) * scaleX, 1.8 * scaleY);
    ctx.lineTo((tx + 21) * scaleX, 0.8 * scaleY);
    ctx.lineTo((tx + 24) * scaleX, 1.8 * scaleY);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#1b5e20'; // revert
  }

  // Brass Chain link fence (climb-resistant with small squares, 7 feet tall)
  ctx.strokeStyle = '#b5a642'; // Brass gold color
  ctx.lineWidth = 1.5;
  // Top bar of fence
  ctx.beginPath();
  ctx.moveTo(0, 4 * scaleY);
  ctx.lineTo(width, 4 * scaleY);
  ctx.stroke();

  // Mesh pattern on fence (small squares)
  ctx.strokeStyle = 'rgba(181, 166, 66, 0.5)';
  ctx.lineWidth = 0.5;
  for (let fx = 0; fx < 300; fx += 3) {
    ctx.beginPath();
    ctx.moveTo(fx * scaleX, 0);
    ctx.lineTo((fx + 3) * scaleX, 4 * scaleY);
    ctx.moveTo((fx + 3) * scaleX, 0);
    ctx.lineTo(fx * scaleX, 4 * scaleY);
    ctx.stroke();
  }
  ctx.restore();

  // South Wall (Y = 15 to 20) has sky landscape + brass fence
  ctx.save();
  // Blue sky background
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(0, 16 * scaleY, width, 4 * scaleY);
  // Green horizon
  ctx.fillStyle = '#a8e05f';
  ctx.fillRect(0, 16 * scaleY, width, 1 * scaleY);

  // Brass Chain link fence on South boundary
  ctx.strokeStyle = '#b5a642'; // Brass gold
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 16 * scaleY);
  ctx.lineTo(width, 16 * scaleY);
  ctx.stroke();

  // Mesh pattern
  ctx.strokeStyle = 'rgba(181, 166, 66, 0.5)';
  ctx.lineWidth = 0.5;
  for (let fx = 0; fx < 300; fx += 3) {
    ctx.beginPath();
    ctx.moveTo(fx * scaleX, 16 * scaleY);
    ctx.lineTo((fx + 3) * scaleX, 20 * scaleY);
    ctx.moveTo((fx + 3) * scaleX, 16 * scaleY);
    ctx.lineTo(fx * scaleX, 20 * scaleY);
    ctx.stroke();
  }
  ctx.restore();

  // 4. WEST ENTRANCE DOUBLE DOORS (from Wanda's Warp House):
  // "Wooden gates that are blue, and yellow. Gates are 6 feet tall, doorway is 15 feet high, and 20 wide."
  // Occupy Y = 0 to 20 on West border
  ctx.fillStyle = '#0d47a1'; // Deep Blue frame
  ctx.fillRect(0, 0, 4 * scaleX, height);
  // Sliding door panels
  ctx.fillStyle = '#ffeb3b'; // Yellow panels
  ctx.fillRect(1 * scaleX, 1 * scaleY, 2 * scaleX, 8 * scaleY);
  ctx.fillRect(1 * scaleX, 11 * scaleY, 2 * scaleX, 8 * scaleY);
  // Blue braces/X on yellow gates
  ctx.strokeStyle = '#0d47a1';
  ctx.lineWidth = 2;
  ctx.strokeRect(1 * scaleX, 1 * scaleY, 2 * scaleX, 8 * scaleY);
  ctx.strokeRect(1 * scaleX, 11 * scaleY, 2 * scaleX, 8 * scaleY);
  ctx.beginPath();
  ctx.moveTo(1 * scaleX, 1 * scaleY); ctx.lineTo(3 * scaleX, 9 * scaleY);
  ctx.moveTo(1 * scaleX, 11 * scaleY); ctx.lineTo(3 * scaleX, 19 * scaleY);
  ctx.stroke();

  // 5. EAST ENTRANCE ARCHWAY AND SLIDING WOODEN GATE (to Square House):
  // "Wooden gate painted in white, yellow, blue, pink, green, red, silver, gold, and indigo. Gate is 20 wide, 15 high."
  // Occupy Y = 0 to 20 on East border X = 300
  const colorsList = ['#ffffff', '#ffeb3b', '#2196f3', '#e91e63', '#4caf50', '#f44336', '#e0e0e0', '#ffd700', '#4b0082'];
  const sliceH = (20 / colorsList.length) * scaleY;
  colorsList.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(width - 5 * scaleX, idx * sliceH, 5 * scaleX, sliceH);
  });
  ctx.strokeStyle = '#3e2723';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(width - 5 * scaleX, 0, 5 * scaleX, height);
}

/**
 * Draws the WandaEastSquareHouse area (800 feet wide x 800 feet deep)
 * Features ceramic checkerboard tiling, 30 feet ceiling height simulation,
 * and a decorated table / wall mounted story book warp on Northeast.
 */
export function drawWandaEastSquareHouse(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const scaleX = width / 800;
  const scaleY = height / 800;

  // 1. Ceramic floor: 24-inch (2 feet) blue and yellow squares checker pattern
  const squareSizeX = 2 * scaleX;
  const squareSizeY = 2 * scaleY;

  // Optimize checker rendering by clearing and drawing only the checked squares
  ctx.fillStyle = '#ffeb3b'; // Base yellow layout
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0d47a1'; // Blue squares
  for (let gridX = 0; gridX < 800; gridX += 4) {
    for (let gridY = 0; gridY < 800; gridY += 4) {
      // Offset grid pattern for checker
      ctx.fillRect(gridX * scaleX, gridY * scaleY, 2 * scaleX, 2 * scaleY);
      ctx.fillRect((gridX + 2) * scaleX, (gridY + 2) * scaleY, 2 * scaleX, 2 * scaleY);
    }
  }

  // Draw wall shadows/tile design for Simulated 3D
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, width, 15 * scaleY); // Top wall shadow
  ctx.fillRect(0, 0, 15 * scaleX, height); // West wall shadow
  ctx.fillRect(width - 15 * scaleX, 0, 15 * scaleX, height); // East wall shadow

  // 2. WEST GATE ENTRANCE DOOR (Y = 390 to 410 feet from South wall)
  // Decorated exactly like the wooden sliding gate (white, yellow, blue, pink, green, red, silver, gold, indigo)
  const gateStartY = 390 * scaleY;
  const gateH = 20 * scaleY;
  ctx.save();
  const colorsList = ['#ffffff', '#ffeb3b', '#2196f3', '#e91e63', '#4caf50', '#f44336', '#e0e0e0', '#ffd700', '#4b0082'];
  const sliceH = (20 / colorsList.length) * scaleY;
  colorsList.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(0, gateStartY + idx * sliceH, 6 * scaleX, sliceH);
  });
  ctx.strokeStyle = '#3e2723';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(0, gateStartY, 6 * scaleX, gateH);
  ctx.restore();

  // 2b. NORTHWEST CORNER CUSTOM SECTION (As requested):
  // Table: 3 by 3 feet occupying X = 0 to 3, Y = 797 to 800.
  const nwTableX = 0 * scaleX;
  const nwTableY = (800 - 3) * scaleY;
  const nwTableW = 3 * scaleX;
  const nwTableH = 3 * scaleY;

  // White decorative tablecloth with gold trim
  ctx.fillStyle = '#ffffff'; // White tablecloth
  ctx.fillRect(nwTableX, nwTableY, nwTableW, nwTableH);
  ctx.strokeStyle = '#ffd700'; // Gold lace/trim
  ctx.lineWidth = 1.5;
  ctx.strokeRect(nwTableX, nwTableY, nwTableW, nwTableH);

  // Tiny hand-drawn decorative daisies on the tablecloth
  ctx.fillStyle = '#ffeb3b'; // Daisy center
  ctx.fillRect(nwTableX + 1 * scaleX, nwTableY + 1.5 * scaleY, 0.1 * scaleX, 0.1 * scaleY);
  ctx.fillStyle = '#f48fb1'; // Daisy petal
  ctx.fillRect(nwTableX + 1 * scaleX, nwTableY + 1.2 * scaleY, 0.1 * scaleX, 0.1 * scaleY);
  ctx.fillRect(nwTableX + 1.3 * scaleX, nwTableY + 1.5 * scaleY, 0.1 * scaleX, 0.1 * scaleY);

  // Blank 30" x 30" (2.5ft x 2.5ft) picture on the North wall over the table, centered at X = 0.25 to 2.75, Y = 800
  const blankPicX = 0.25 * scaleX;
  const blankPicY = (800 - 2.5) * scaleY;
  const blankPicW = 2.5 * scaleX;
  const blankPicH = 2.5 * scaleY;

  // Elegant silver metal frame and off-white linen texture canvas
  ctx.fillStyle = '#cfd8dc'; // Silver frame border
  ctx.fillRect(blankPicX - 0.2 * scaleX, blankPicY - 0.2 * scaleY, blankPicW + 0.4 * scaleX, blankPicH + 0.4 * scaleY);
  ctx.fillStyle = '#faf9f6'; // Clean off-white canvas
  ctx.fillRect(blankPicX, blankPicY, blankPicW, blankPicH);
  // Cross-hatch linen textures
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 0.5;
  for (let lx = blankPicX; lx < blankPicX + blankPicW; lx += 0.4 * scaleX) {
    ctx.beginPath();
    ctx.moveTo(lx, blankPicY);
    ctx.lineTo(lx, blankPicY + blankPicH);
    ctx.stroke();
  }

  // 2c. SHIMMERING PIXEL GARDEN WARP PORTAL (X = 3 to 17 feet on North wall, Y = 795 to 800)
  const warpX = 3 * scaleX;
  const warpY = (800 - 5) * scaleY;
  const warpW = 14 * scaleX;
  const warpDepth = 5 * scaleY;

  // Emerald/Neon active portal gradient block with gold casing
  const warpGrad = ctx.createLinearGradient(warpX, warpY, warpX, warpY + warpDepth);
  warpGrad.addColorStop(0, '#00e676'); // Bright neon green/emerald
  warpGrad.addColorStop(0.5, '#1b5e20'); // Deep moss green
  warpGrad.addColorStop(1, '#00e676'); // Neon green edge
  
  ctx.fillStyle = warpGrad;
  ctx.fillRect(warpX, warpY, warpW, warpDepth);

  // Outer brass-golden protective framing
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.strokeRect(warpX, warpY, warpW, warpDepth);

  // Overlay neon matrix-style floral ripples or cascades in the warp gateway
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  for (let wpX = warpX + 1 * scaleX; wpX < warpX + warpW; wpX += 2 * scaleX) {
    const flOffset = Math.sin(time * 5 + wpX) * 1.5 * scaleY;
    ctx.fillRect(wpX, warpY + warpDepth / 2 + flOffset, 0.5 * scaleX, 0.5 * scaleY);
  }

  // 3. TABLE POSITION: X = 797 to 800, Y = 795 to 800 (Top-Right corner against the walls)
  // Table top occupies 3 by 5 feet, height is 4 feet.
  const tableX = 797 * scaleX;
  const tableY = (800 - 5) * scaleY; // Y goes down, so 795 to 800
  const tableW = 3 * scaleX;
  const tableDepth = 5 * scaleY;

  // Violet Table Cloth
  ctx.fillStyle = '#8e24aa'; // Rich Violet
  ctx.fillRect(tableX, tableY, tableW, tableDepth);
  ctx.strokeStyle = '#4a148c'; // Darker violet border
  ctx.lineWidth = 1.5;
  ctx.strokeRect(tableX, tableY, tableW, tableDepth);

  // Table accessories: Lamp with green shade and a picture of flowers, pink solid base
  // Positioned at: 3 feet from table's South edge (Y = 798) and 28 inches (2.33 feet, so X = 799.33) from West edge
  const lampX = 799.33 * scaleX;
  const lampY = 798 * scaleY;

  // Pink solid base
  ctx.fillStyle = '#f06292'; // Solid Pink
  ctx.beginPath();
  ctx.arc(lampX, lampY, 0.4 * scaleX, 0, Math.PI * 2);
  ctx.fill();
  // Lamp stem
  ctx.strokeStyle = '#ffd54f';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(lampX, lampY);
  ctx.lineTo(lampX, lampY - 1 * scaleY);
  ctx.stroke();
  // Green Shade with floral details
  ctx.fillStyle = '#2e7d32'; // Green shade
  ctx.beginPath();
  ctx.moveTo(lampX - 0.7 * scaleX, lampY - 1 * scaleY);
  ctx.lineTo(lampX + 0.7 * scaleX, lampY - 1 * scaleY);
  ctx.lineTo(lampX + 0.4 * scaleX, lampY - 1.8 * scaleY);
  ctx.lineTo(lampX - 0.4 * scaleX, lampY - 1.8 * scaleY);
  ctx.closePath();
  ctx.fill();
  // Flower details on shade
  ctx.fillStyle = '#ffeb3b'; // flower centers
  ctx.fillRect(lampX - 0.1 * scaleX, lampY - 1.4 * scaleY, 0.2 * scaleX, 0.2 * scaleY);

  // 4. THE WALL PORTAL PICTURE (Hanging above the table, 48 inches i.e. 4 ft wide, 40 inches i.e. 3.3 ft tall)
  // Picture depicts blue poodle with peach skins, shiny dark-blue nose, green eyes reading a yellow book.
  const picX = 794 * scaleX;
  const picY = 788 * scaleY;
  const picW = 4 * scaleX;
  const picH = 3.3 * scaleY;

  // Golden frame
  ctx.fillStyle = '#263238'; // Dark backdrop
  ctx.fillRect(picX - 0.3 * scaleX, picY - 0.3 * scaleY, picW + 0.6 * scaleX, picH + 0.6 * scaleY);
  ctx.strokeStyle = '#ffd700'; // Golden frame border
  ctx.lineWidth = 1;
  ctx.strokeRect(picX - 0.3 * scaleX, picY - 0.3 * scaleY, picW + 0.6 * scaleX, picH + 0.6 * scaleY);

  // Picture content: Sky & field
  ctx.fillStyle = '#29b6f6'; // Blue sky
  ctx.fillRect(picX, picY, picW, picH * 0.7);
  ctx.fillStyle = '#4caf50'; // Green field
  ctx.fillRect(picX, picY + picH * 0.7, picW, picH * 0.3);

  // Four idren playing ball in the field, two parents playing volleyball
  ctx.fillStyle = '#ff5722'; // Little orange parent dots
  ctx.fillRect(picX + 0.5 * scaleX, picY + picH * 0.6, 0.2 * scaleX, 0.4 * scaleY);
  ctx.fillRect(picX + 0.8 * scaleX, picY + picH * 0.6, 0.2 * scaleX, 0.4 * scaleY);
  ctx.strokeStyle = '#ffffff'; // Volleyball net
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(picX + 1.1 * scaleX, picY + picH * 0.5); ctx.lineTo(picX + 1.1 * scaleX, picY + picH * 0.8); ctx.stroke();
  // Idren dots
  ctx.fillStyle = '#e040fb';
  for (let idx = 0; idx < 4; idx++) {
    ctx.fillRect(picX + (1.5 + idx * 0.5) * scaleX, picY + picH * 0.7, 0.15 * scaleX, 0.3 * scaleY);
  }

  // Elegant blue poodle with peach skin reading a book
  ctx.fillStyle = '#ffe0b2'; // Peach skin body under the dress
  ctx.fillRect(picX + 1.8 * scaleX, picY + picH * 0.4, 0.8 * scaleX, 0.8 * scaleY);
  ctx.fillStyle = '#2196f3'; // Blue poodle hair / fur accents
  ctx.fillRect(picX + 1.7 * scaleX, picY + picH * 0.3, 1.0 * scaleX, 0.25 * scaleY);
  ctx.fillStyle = '#e91e63'; // Pink puff-sleeved dress with white apron
  ctx.fillRect(picX + 1.7 * scaleX, picY + picH * 0.45, 1.0 * scaleX, 0.45 * scaleY);
  ctx.fillStyle = '#ffffff'; // White apron
  ctx.fillRect(picX + 1.9 * scaleX, picY + picH * 0.55, 0.6 * scaleX, 0.3 * scaleY);
  // Shiny dark blue nose
  ctx.fillStyle = '#0d47a1';
  ctx.fillRect(picX + 1.75 * scaleX, picY + picH * 0.35, 0.15 * scaleX, 0.1 * scaleY);
  // Yellow book with pages
  ctx.fillStyle = '#ffeb3b';
  ctx.fillRect(picX + 1.5 * scaleX, picY + picH * 0.5, 0.4 * scaleX, 0.3 * scaleY);
  ctx.fillStyle = '#ffffff'; // White pages
  ctx.fillRect(picX + 1.55 * scaleX, picY + picH * 0.52, 0.3 * scaleX, 0.25 * scaleY);

  // 5. STORIES BOOK WARP COMPONENT (Occupies Y = 780 to 795, i.e. 5 to 20 feet from North wall, East wall X = 800)
  // Glow effect indicating it's an active gateway
  const warpStartY = (800 - 20) * scaleY;
  const warpEndY = (800 - 5) * scaleY;
  const warpWarpH = warpEndY - warpStartY;

  // Warp field backdrop
  const grad = ctx.createLinearGradient(width - 4 * scaleX, warpStartY, width, warpStartY);
  grad.addColorStop(0, 'rgba(233, 30, 99, 0.1)'); // light pink gate aura
  grad.addColorStop(1, '#e91e63'); // pink active warp portal
  ctx.fillStyle = grad;
  ctx.fillRect(width - 5 * scaleX, warpStartY, 5 * scaleX, warpWarpH);

  // Floating magic sparks over the warp
  ctx.fillStyle = '#ffd54f';
  const sparks = [3, 7, 11, 15];
  sparks.forEach((sp, sIdx) => {
    const sY = warpStartY + sp * scaleY + Math.sin(time * 3 + sIdx) * 2 * scaleY;
    ctx.fillRect(width - (2 + (sIdx % 2)) * scaleX, sY, 1.5 * scaleX, 1.5 * scaleY);
  });

  // 6. WOODEN BOOKSHELF DIVIDER:
  // "12 inch wide divider is 3 feet long, positioned at 20 to 21 feet from North wall (Y = 779 to 780),
  // implemented at 0 to 3 feet from east wall (X = 797 to 800), against the wall. Designed like wooden books shelf, 7 feet high."
  const divX = 797 * scaleX;
  const divY = (800 - 21) * scaleY; // 21 is Y=779, 20 is Y=780
  const divW = 3 * scaleX;
  const divH = 2 * scaleY; // Thicker visual representation

  // Divider wooden shelf
  ctx.fillStyle = '#a1887f'; // Wooden tan color
  ctx.fillRect(divX, divY, divW, divH);
  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth = 1;
  ctx.strokeRect(divX, divY, divW, divH);

  // Colorful books aligned on the shelf
  const bookColors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0'];
  for (let b = 0; b < 5; b++) {
    ctx.fillStyle = bookColors[b % bookColors.length];
    ctx.fillRect(divX + (b * 0.5 + 0.2) * scaleX, divY + 0.2 * scaleY, 0.4 * scaleX, divH - 0.4 * scaleY);
  }
}
