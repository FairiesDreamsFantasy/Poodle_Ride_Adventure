import { GameState } from '../../../../System/AI/In-Game/Logic/GameLogic';
import { drawArcadeStaff } from '../../../../Characters/Arcade_Staff/ArcadeStaff';

export function drawLivingQuarters(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  // Clear with cozy off-white/beige floor tiles
  ctx.fillStyle = '#fdfbf7';
  ctx.fillRect(0, 0, width, height);

  // 1. Draw floor tiling grid pattern
  ctx.strokeStyle = '#f2edd9';
  ctx.lineWidth = 1;
  const tileSize = 50;
  for (let x = 0; x < width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. Main Corridor Hallway (y: 450 to 550) - Polished red-oak wooden plank texture
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(0, 450, width, 100);
  ctx.fillStyle = '#a0522d';
  ctx.fillRect(0, 455, width, 90);

  // Wooden plank lines in corridor
  ctx.strokeStyle = '#5c2e0b';
  ctx.lineWidth = 1;
  for (let y = 460; y < 550; y += 15) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 3. Draw East Foyer (x = 1600 to 2000, y = 0 to 1000 full height)
  // Give it elegant marble floors
  ctx.fillStyle = '#f5f5f0';
  ctx.fillRect(1580, 0, 420, height);

  // Draw a grand Rasta-colored patterned medallion rug in the center of the foyer
  const fX = 1800;
  const fY = 500;
  ctx.save();
  ctx.beginPath();
  ctx.arc(fX, fY, 150, 0, Math.PI * 2);
  ctx.clip();
  // Concentric red / gold / green rings
  ctx.fillStyle = '#ff3333'; // Red
  ctx.beginPath();
  ctx.arc(fX, fY, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd700'; // Gold
  ctx.beginPath();
  ctx.arc(fX, fY, 100, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#228b22'; // Green
  ctx.beginPath();
  ctx.arc(fX, fY, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111'; // Center black star
  ctx.closePath();
  ctx.restore();

  // Draw Foyer Reception Desk
  ctx.fillStyle = '#5c2d15';
  ctx.fillRect(1740, 450, 120, 100);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffd700';
  ctx.strokeRect(1740, 450, 120, 100);
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px Courier';
  ctx.fillText("STAFF RECEPTION", 1745, 510);

  // 4. Large Foyer Windows (North & East sections) with golden sunlight streaming down
  // East Wall windows (x=2000, y=100-900)
  ctx.fillStyle = 'rgba(135, 206, 250, 0.4)';
  ctx.fillRect(1995, 100, 5, 200);
  ctx.fillRect(1995, 700, 5, 200);

  // North Wall windows (y=1000, x=1600-1950)
  ctx.fillRect(1620, 995, 150, 5);
  ctx.fillRect(1800, 995, 150, 5);

  // Draw Golden Sunlight Beams streaming from North and East
  ctx.save();
  const gradY = ctx.createLinearGradient(1700, 1000, 1750, 700);
  gradY.addColorStop(0, 'rgba(255, 223, 0, 0.35)');
  gradY.addColorStop(1, 'rgba(255, 223, 0, 0.0)');
  ctx.fillStyle = gradY;
  ctx.beginPath();
  ctx.moveTo(1600, 1000);
  ctx.lineTo(1950, 1000);
  ctx.lineTo(1850, 700);
  ctx.lineTo(1650, 700);
  ctx.closePath();
  ctx.fill();

  const gradX = ctx.createLinearGradient(2000, 300, 1700, 400);
  gradX.addColorStop(0, 'rgba(255, 223, 0, 0.3)');
  gradX.addColorStop(1, 'rgba(255, 223, 0, 0.0)');
  ctx.fillStyle = gradX;
  ctx.beginPath();
  ctx.moveTo(2000, 100);
  ctx.lineTo(2000, 900);
  ctx.lineTo(1700, 700);
  ctx.lineTo(1700, 300);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 5. Draw Solid Walls
  ctx.fillStyle = '#4e3629'; // Mahogany wood
  // North corridor wall (y = 550 to 560), openings at: x=380-420, x=930-970, x=1330-1370, Foyer x>=1580
  ctx.fillRect(0, 550, 380, 10);
  ctx.fillRect(420, 550, 510, 10);
  ctx.fillRect(970, 550, 360, 10);
  ctx.fillRect(1370, 550, 210, 10);

  // South corridor wall (y = 440 to 450), openings at: x=380-420, x=930-970, x=1330-1370, Foyer x>=1580
  ctx.fillRect(0, 440, 380, 10);
  ctx.fillRect(420, 440, 510, 10);
  ctx.fillRect(970, 440, 360, 10);
  ctx.fillRect(1370, 440, 210, 10);

  // Vertical room dividers (x=700-710, x=1100-1110, x=1500-1510) in both halves
  ctx.fillRect(700, 0, 10, 440);
  ctx.fillRect(700, 560, 10, 440);
  ctx.fillRect(1100, 0, 10, 440);
  ctx.fillRect(1100, 560, 10, 440);
  ctx.fillRect(1500, 0, 10, 440);
  ctx.fillRect(1500, 560, 10, 440);

  // 6. Draw Rooms Elements
  // --- North Row ---
  // A. Arcade Staff Recreation Lounge (x = 100 to 700, y = 560 to 1000)
  ctx.fillStyle = '#1e0f3d'; // Cool arcade neon purple room background
  ctx.fillRect(0, 560, 700, 440);

  // Cozy armchairs
  ctx.fillStyle = '#cc3366'; // Pinkish-red neon chairs
  ctx.fillRect(150, 700, 60, 60);
  ctx.fillRect(250, 700, 60, 60);

  // Glowing retro neon Arcade Cabinet (the iconic centerpiece of their entertainment!)
  ctx.fillStyle = '#111';
  ctx.fillRect(450, 850, 50, 40);
  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(450, 850, 50, 40);
  // Neon screen glow
  ctx.fillStyle = '#ff00ff';
  ctx.fillRect(455, 855, 40, 20);
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(465, 882, 20, 8); // Controls

  // B. Quiet Meditation Nook / Library segment (x = 800 to 1100, y = 560 to 1000)
  ctx.fillStyle = '#f0ebe1';
  ctx.fillRect(710, 560, 390, 440);
  // Warm wooden bookshelves
  ctx.fillStyle = '#7a421c';
  ctx.fillRect(720, 850, 15, 120);
  ctx.fillRect(1075, 850, 15, 120);
  // Round prayer/meditation rug on the floor
  ctx.fillStyle = '#228b22';
  ctx.beginPath();
  ctx.arc(910, 780, 45, 0, Math.PI * 2);
  ctx.fill();

  // C. Laundry & Utility Lobby (x = 1200 to 1500, y = 560 to 1000)
  // Contains the Elevator and Stairway!
  ctx.fillStyle = '#e8ecef';
  ctx.fillRect(1110, 560, 390, 440);

  // Rasta-Manor Lobby Elevator Doors (Steel)
  ctx.fillStyle = '#b0c4de';
  ctx.fillRect(1180, 820, 80, 80);
  ctx.strokeStyle = '#708090';
  ctx.lineWidth = 2;
  ctx.strokeRect(1180, 820, 80, 80);
  // Elevator middle line separation
  ctx.beginPath();
  ctx.moveTo(1220, 820);
  ctx.lineTo(1220, 900);
  ctx.stroke();
  // Floor indicators (Rastafarian colors)
  ctx.fillStyle = (Math.floor(time / 1000) % 2 === 0) ? '#00ff00' : '#444';
  ctx.beginPath();
  ctx.arc(1220, 810, 4, 0, Math.PI * 2);
  ctx.fill();

  // Grand wooden Stairway going up
  ctx.fillStyle = '#5c3a21';
  ctx.fillRect(1350, 820, 100, 80);
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 1;
  for (let sy = 820; sy < 900; sy += 10) {
    ctx.beginPath();
    ctx.moveTo(1350, sy);
    ctx.lineTo(1450, sy);
    ctx.stroke();
  }

  // --- South Row ---
  // A. Chef and Staff Dining Area + Kitchen (x = 100 to 700, y = 0 to 440)
  ctx.fillStyle = '#faf8f5';
  ctx.fillRect(0, 0, 700, 440);

  // Dining tables
  ctx.fillStyle = '#eadeca';
  ctx.fillRect(150, 200, 80, 50);
  ctx.fillRect(350, 200, 80, 50);
  ctx.fillRect(550, 200, 80, 50);

  // Dishwasher room insulated pipes and red valve (Dishwasher Room guidelines!)
  // Placed on North wall of this kitchen room
  ctx.strokeStyle = '#a6a6a6';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(100, 420);
  ctx.lineTo(600, 420);
  ctx.stroke();
  // Connected vertical insulated pipes
  ctx.lineWidth = 2.5;
  for (let px = 150; px <= 550; px += 200) {
    ctx.beginPath();
    ctx.moveTo(px, 420);
    ctx.lineTo(px, 390);
    ctx.stroke();
  }
  // Red Valve "Hot water supply On/Off" (ON)
  ctx.fillStyle = '#ff2222';
  ctx.beginPath();
  ctx.arc(300, 420, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '8px Arial';
  ctx.fillText("HOT WATER SUPPLY ON", 240, 435);

  // B. Supervisor Quarters (x = 800 to 1100, y = 0 to 440)
  ctx.fillStyle = '#f0ecd8';
  ctx.fillRect(710, 0, 390, 440);
  // Bed and Desk
  ctx.fillStyle = '#8b0000'; // Dark red blanket/bed
  ctx.fillRect(730, 20, 50, 90);
  ctx.fillStyle = '#fff'; // Pillow
  ctx.fillRect(730, 20, 50, 20);

  ctx.fillStyle = '#5c2d15'; // Writing desk
  ctx.fillRect(1000, 100, 70, 40);

  // C. Laundry & Linen Room (x = 1200 to 1500, y = 0 to 440)
  ctx.fillStyle = '#edf2f4';
  ctx.fillRect(1110, 0, 390, 440);

  // Front-loading washing machines
  for (let wx = 1150; wx <= 1450; wx += 60) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx, 50, 45, 45);
    ctx.strokeStyle = '#cccccc';
    ctx.strokeRect(wx, 50, 45, 45);
    // Door circles
    ctx.beginPath();
    ctx.arc(wx + 22.5, 72.5, 14, 0, Math.PI * 2);
    ctx.strokeStyle = '#57bbd0';
    ctx.stroke();
  }

  // 7. Render Arcade Employees sitting, standing or enjoying their quarters (using drawArcadeStaff)
  // Let's place a few arcade staff members lovingly around!
  // Althea Rose (Var 1) greeting guests in the East Foyer
  drawArcadeStaff(ctx, 1, 1680, 500, 1.3, time);

  // Nesta Shoshana (Var 3) and Kenzo Shinto (Var 6) hanging out at the arcade machine!
  drawArcadeStaff(ctx, 3, 410, 880, 1.2, time);
  drawArcadeStaff(ctx, 6, 510, 880, 1.2, time);

  // Marcus Jah-B (Var 5, very small) meditating on the rug in the Quiet Nook
  drawArcadeStaff(ctx, 5, 910, 780, 1.1, time);

  // Little Rahula (Var 8, extremely tiny 24 inches) doing chores in the Dining Area
  drawArcadeStaff(ctx, 8, 480, 240, 1.0, time);

  // 8. Draw West Sliding Wooden Doors with a Rastafari-theme design (x=0, y=490-510)
  // If player is close, they can animate or be opened
  ctx.save();
  ctx.fillStyle = '#5c2d15'; // Mahogany frame
  ctx.fillRect(0, 480, 8, 50);
  ctx.fillStyle = '#228b22'; // Rastafarian green, yellow, red panels
  ctx.fillRect(2, 490, 4, 15);
  ctx.fillStyle = '#ffd700';
  ctx.fillRect(2, 505, 4, 10);
  ctx.fillStyle = '#ff2222';
  ctx.fillRect(2, 515, 4, 15);
  ctx.restore();

  // 9. Draw East Double Sliding Glass Doors (x=2000, y=495 to 505)
  ctx.save();
  ctx.fillStyle = '#b0c4de';
  ctx.fillRect(1995, 490, 5, 50);
  ctx.strokeStyle = '#4682b4';
  ctx.beginPath();
  ctx.moveTo(1997, 490);
  ctx.lineTo(1997, 540);
  ctx.stroke();
  ctx.restore();
}
