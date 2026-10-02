import { GameState, AREA_DIMENSIONS } from '../../../../System/AI/In-Game/Logic/GameLogic';

export function drawCommunalStore(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';

  ctx.save();

  // Draw 400% fire-resistant tiled walls in the background (above horizon)
  ctx.fillStyle = isNight ? '#2a2015' : '#4a3b2b'; // Dark wood-paneled top or ceramic
  ctx.fillRect(0, 0, width, horizon);

  // Stacked ceramic tiles wall pattern on the background wall
  ctx.strokeStyle = isNight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  const tileH = 20;
  const tileW = 40;
  for (let y = 0; y < horizon; y += tileH) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
    
    // staggered vertical grout lines
    const offset = (Math.floor(y / tileH) % 2) * (tileW / 2);
    for (let x = offset; x < width; x += tileW) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + tileH);
      ctx.stroke();
    }
  }

  // Draw Fire-Resistant Stamp / Label subtly on the tiles
  ctx.font = '10px monospace';
  ctx.fillStyle = isNight ? 'rgba(255,50,50,0.15)' : 'rgba(255,50,50,0.3)';
  ctx.fillText("FIRE-RESISTANT 400% STANDARD", 20, 25);
  ctx.fillText("HEIGHT LIMIT: 45FT (1ST FLOOR: 25FT / 2ND FLOOR: 20FT)", 20, 40);

  // Polished solid hardwood floor under the horizon with ceramic gloss coat
  // Draw base wood color
  ctx.fillStyle = isNight ? '#3a2212' : '#734829';
  ctx.fillRect(0, horizon, width, height - horizon);

  // Draw hardwood floor planks
  ctx.strokeStyle = isNight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 2;
  const plankWidth = 50;
  const numPlanks = Math.ceil(width / plankWidth);
  for (let i = 0; i <= numPlanks; i++) {
    const x = i * plankWidth;
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw horizontal seams under perspective matching 1-2-3 gallop rhythms
  ctx.strokeStyle = isNight ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1;
  for (let y = horizon; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Add the majestic gloss/mirror shine of the ceramic protective coating
  const glossGradient = ctx.createLinearGradient(0, horizon, width, height);
  glowEffects();
  function glowEffects() {
    glossGradient.addColorStop(0, 'rgba(255,255,255,0.0)');
    glossGradient.addColorStop(0.3, 'rgba(255,255,255,0.04)');
    glossGradient.addColorStop(0.35, 'rgba(255,255,255,0.08)');
    glossGradient.addColorStop(0.4, 'rgba(255,255,255,0.0)');
    glossGradient.addColorStop(0.7, 'rgba(255,255,255,0.05)');
    glossGradient.addColorStop(1, 'rgba(255,255,255,0.0)');
    ctx.fillStyle = glossGradient;
    ctx.fillRect(0, horizon, width, height - horizon);
  }

  // Draw arbitrary double-paned windows on the North/West/South walls (represented around the room borders)
  drawScenicWindows();

  function drawScenicWindows() {
    // Left Window (West side window representation)
    ctx.fillStyle = isNight ? '#0b1626' : '#aaccff';
    ctx.fillRect(30, horizon - 120, 80, 80);
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, horizon - 120, 80, 80);
    // Grid lines
    ctx.beginPath();
    ctx.moveTo(70, horizon - 120); ctx.lineTo(70, horizon - 40);
    ctx.moveTo(30, horizon - 80); ctx.lineTo(110, horizon - 80);
    ctx.stroke();

    // Right Window (Representing another window)
    ctx.fillStyle = isNight ? '#0b1626' : '#aaccff';
    ctx.fillRect(width - 110, horizon - 120, 80, 80);
    ctx.strokeRect(width - 110, horizon - 120, 80, 80);
    ctx.beginPath();
    ctx.moveTo(width - 70, horizon - 120); ctx.lineTo(width - 70, horizon - 40);
    ctx.moveTo(width - 110, horizon - 80); ctx.lineTo(width - 30, horizon - 80);
    ctx.stroke();

    // Draw scenic silhouette background inside windows (at night, small stars and moon)
    if (isNight) {
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(50, horizon - 100, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(90, horizon - 110, 1.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(width - 90, horizon - 105, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Draw 6 Special Pillars strategically arranged to hold the 20ft height upper level
  const pillarXCoords = [width * 0.15, width * 0.35, width * 0.55, width * 0.75];
  pillarXCoords.forEach(px => {
    // Draw pillar shaft
    const grad = ctx.createLinearGradient(px - 15, 0, px + 15, 0);
    grad.addColorStop(0, isNight ? '#1a1a1a' : '#555555');
    grad.addColorStop(0.3, isNight ? '#333333' : '#888888');
    grad.addColorStop(0.7, isNight ? '#444444' : '#aaaaaa');
    grad.addColorStop(1, isNight ? '#1a1a1a' : '#444444');
    ctx.fillStyle = grad;
    // Pillars start in background wall and land on the floor (behind booths or as columns)
    ctx.fillRect(px - 15, 0, 30, horizon + 50);

    // Pillar caps & bases
    ctx.fillStyle = isNight ? '#111111' : '#2d2d2d';
    ctx.fillRect(px - 22, horizon + 45, 44, 10);
    ctx.fillRect(px - 20, 0, 40, 12);
    
    // Brass support bands on pillars for high aesthetics
    ctx.fillStyle = '#d4af37'; // gold/brass
    ctx.fillRect(px - 16, horizon - 60, 32, 6);
    ctx.fillRect(px - 16, 50, 32, 6);
  });

  // Roll-Up Delivery Gate (at North end, from 20 to 60 feet markers from West wall)
  // Let's render it on the left wall of the canvas dynamically
  drawRollupGate();

  function drawRollupGate() {
    const rX = 20;
    const rY = horizon - 140;
    const rWidth = 120;
    const rHeight = 140;

    // Outer frame with golden trimming
    ctx.fillStyle = '#8b6508'; // Dark metallic gold
    ctx.fillRect(rX - 5, rY - 5, rWidth + 10, rHeight + 5);

    // Roll-up slats (brass slats)
    for (let sy = rY; sy < rY + rHeight; sy += 8) {
      const slatGrad = ctx.createLinearGradient(rX, sy, rX + rWidth, sy);
      slatGrad.addColorStop(0, '#cd7f32'); // bronze
      slatGrad.addColorStop(0.5, '#ffd700'); // shiny gold brass
      slatGrad.addColorStop(1, '#cd7f32');
      ctx.fillStyle = slatGrad;
      ctx.fillRect(rX, sy, rWidth, 6);
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(rX, sy + 6, rWidth, 2); // Dark separator line
    }

    // Welcoming rainbow pattern on the roll-up gate
    ctx.save();
    ctx.globalAlpha = 0.25;
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
    const bandW = rWidth / colors.length;
    colors.forEach((c, idx) => {
      ctx.fillStyle = c;
      ctx.fillRect(rX + idx * bandW, rY, bandW, rHeight);
    });
    ctx.restore();

    // High Clearance text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText("WARN: 18FT CLEARANCE", rX + 10, rY - 10);
  }

  // Cellar component: Goods Delivery Shutter/trapdoor on the floor with matching roll-up gate
  drawCellarShutter();

  function drawCellarShutter() {
    const sX = width * 0.45;
    const sY = height - 90;
    const sW = 140;
    const sH = 70;

    // Floor outline for the shutter trapdoor
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(sX, sY, sW, sH);

    // Slats representing the matching roll-up gate trapdoor
    ctx.fillStyle = 'rgba(100, 80, 50, 0.4)';
    ctx.fillRect(sX, sY, sW, sH);
    for (let sy = sY + 4; sy < sY + sH; sy += 8) {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(sX, sy); ctx.lineTo(sX + sW, sy); ctx.stroke();
    }

    // Heavy locking handle in brass
    ctx.fillStyle = '#ffd700'; // shiny brass
    ctx.beginPath();
    ctx.arc(sX + sW / 2, sY + sH / 2, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.stroke();

    // Small label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 7px monospace';
    ctx.fillText("CELLAR GOODS SHUTTER", sX + 15, sY + sH - 10);
  }

  // Draw Spacious Communal Booths/Shops with 30ft strategic spacing for Poodle Galloping
  drawShops();

  function drawShops() {
    // Shop 1: Rasta-Manor Crafted Souvenirs
    drawSingleShop(width * 0.2, horizon - 20, 160, "RASTA CRAFTS", '#2e5a1c', '#ffd700');
    // Shop 2: Empress Abigay's Tea & Herbals
    drawSingleShop(width * 0.55, horizon - 20, 180, "EMPRESS HERBALS & TEA", '#8a3324', '#ffffff');
    // Shop 3: Poodle Luxury Accessories
    drawSingleShop(width * 0.78, horizon - 20, 160, "POODLE ACCESSORIES", '#4b0082', '#ffc0cb');
  }

  function drawSingleShop(
    x: number,
    y: number,
    w: number,
    title: string,
    primaryColor: string,
    accentColor: string
  ) {
    // Shop Booth structures
    ctx.fillStyle = primaryColor;
    ctx.fillRect(x, y - 60, w, 60); // Back board of booth

    // Counter table
    ctx.fillStyle = '#bc8f8f'; // rosy brown wood count table
    ctx.fillRect(x - 10, y, w + 20, 15);
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x - 10, y, w + 20, 15);

    // Decorative pillars support the awning of the booth
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x + 5, y - 60, 8, 60);
    ctx.fillRect(x + w - 13, y - 60, 8, 60);

    // Awning stripes
    const numStripes = 6;
    const stripeW = w / numStripes;
    for (let s = 0; s < numStripes; s++) {
      ctx.fillStyle = s % 2 === 0 ? primaryColor : accentColor;
      ctx.fillRect(x + s * stripeW, y - 80, stripeW, 20);
    }
    // Awning scallops
    ctx.beginPath();
    for (let s = 0; s <= numStripes; s++) {
      ctx.arc(x + s * stripeW, y - 60, 4, 0, Math.PI);
    }
    ctx.fillStyle = primaryColor;
    ctx.fill();

    // Title of the booth
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, x + w / 2, y - 65);
    ctx.textAlign = 'start'; // Reset alignment

    // Draw little items on the shelves!
    ctx.fillStyle = '#00f';
    ctx.fillRect(x + 20, y - 20, 10, 15);
    ctx.fillStyle = '#cd7f32';
    ctx.beginPath(); ctx.arc(x + 50, y - 15, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f0';
    ctx.fillRect(x + 80, y - 25, 8, 20);
    ctx.fillStyle = '#f00';
    ctx.beginPath(); ctx.arc(x + 110, y - 10, 5, 0, Math.PI * 2); ctx.fill();

    // Friendly clerk behind each counter (White, Rasta dreadlocks, elegant vintage dresses)
    drawShopClerk(x + w / 2, y + 15);
  }

  function drawShopClerk(cx: number, cy: number) {
    // Render head
    ctx.fillStyle = '#ffe0bd'; // pale/peach skin tone
    ctx.beginPath();
    ctx.arc(cx, cy - 25, 7, 0, Math.PI * 2);
    ctx.fill();

    // Draw long detailed Rasta dreadlocks
    ctx.strokeStyle = '#2b1a0a'; // dark brown locks
    ctx.lineWidth = 2.5;
    for (let lock = -5; lock <= 5; lock += 2) {
      ctx.beginPath();
      ctx.moveTo(cx + lock, cy - 23);
      ctx.bezierCurveTo(cx + lock * 1.5, cy - 10, cx + lock * 0.5, cy - 5, cx + lock * 1.2, cy + 2);
      ctx.stroke();
    }

    // Vintage yellow/green high collar dress
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy);
    ctx.lineTo(cx + 10, cy);
    ctx.lineTo(cx + 13, cy + 25);
    ctx.lineTo(cx - 13, cy + 25);
    ctx.closePath();
    ctx.fill();

    // Collar
    ctx.fillStyle = '#1e5a1c';
    ctx.beginPath();
    ctx.moveTo(cx - 5, cy);
    ctx.lineTo(cx, cy + 5);
    ctx.lineTo(cx + 5, cy);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx - 2.5, cy - 26, 1, 0, Math.PI * 2);
    ctx.arc(cx + 2.5, cy - 26, 1, 0, Math.PI * 2);
    ctx.fill();

    // Friendly smile
    ctx.strokeStyle = '#f33';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy - 23, 3, 0.1, Math.PI - 0.1);
    ctx.stroke();
  }

  // Draw 3 Welcoming Glass Sliding Doors
  // East Door: x = width - 15, y in the center (represented as vertical glass frames)
  // West Door: x = 15, y in the center
  // North Door: x = width * 0.49, y = horizon - 150 (represented in background)
  drawSlidingGlassDoors();

  function drawSlidingGlassDoors() {
    // East Wall Door Representation
    ctx.strokeStyle = 'rgba(100,200,255,0.8)';
    ctx.lineWidth = 4;
    ctx.strokeRect(width - 40, horizon - 100, 30, 200);
    // Draw sliding seam & panels
    ctx.fillStyle = 'rgba(200,240,255,0.15)';
    ctx.fillRect(width - 40, horizon - 100, 30, 200);
    ctx.beginPath();
    ctx.moveTo(width - 25, horizon - 100); ctx.lineTo(width - 25, horizon + 100);
    ctx.stroke();

    // West Wall Door Representation (Glass sliding)
    ctx.strokeRect(10, horizon - 100, 30, 200);
    ctx.fillRect(10, horizon - 100, 30, 200);
    ctx.beginPath();
    ctx.moveTo(25, horizon - 100); ctx.lineTo(25, horizon + 100);
    ctx.stroke();

    // North Wall Door Representation (centered in background)
    const nX = width * 0.49;
    const nY = horizon - 140;
    const nW = 75;
    const nH = 140;

    // Outer door frame in gold trimming
    ctx.strokeStyle = '#ffd700'; // shiny gold/brass
    ctx.lineWidth = 3;
    ctx.strokeRect(nX, nY, nW, nH);

    // Glass panel tinted blue
    ctx.fillStyle = 'rgba(180, 230, 255, 0.25)';
    ctx.fillRect(nX, nY, nW, nH);

    // Center seam showing splitting sliding glass panels
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(nX + nW / 2, nY);
    ctx.lineTo(nX + nW / 2, nY + nH);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText("EAST WING", width - 60, horizon - 110);
    ctx.fillText("WEST WING", 15, horizon - 110);
    ctx.fillText("Poodle Ride Welcoming Glass Doors", nX - 45, nY - 15);
  }

  ctx.restore();
}
