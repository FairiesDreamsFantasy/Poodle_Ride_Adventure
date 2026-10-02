import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { loadDefaultCourseObstacles, CourseObstacle } from './CourseObstacles';

/**
 * Shared renderer for Pixel Garden Gallop track levels (Course 1 through Course 8).
 * Features:
 * - Fluid 8 centered lanes (6.25 feet wide each).
 * - Multi-layered scrolling backdrop simulating speed (parallax mountain ridges, pixel trees).
 * - Renders lucky interactive golden horseshoes and glowing speed-boosting flower petals.
 * - Draw finish line banner at Y = 980 - 1000.
 */
export function drawPixelGardenTrackArea(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number,
  courseNumber: number,
  themeColor: string = '#8d6e63' // Base track dirt color
) {
  const scaleX = width / 100;
  const scaleY = height / 1000; // Height is 1000 feet deep

  // 1. Layered Background (Top parallax zone)
  const skyHeight = 60 * scaleY;
  ctx.fillStyle = '#80deea'; // Bright airy cyan sky
  ctx.fillRect(0, 0, width, skyHeight);

  // Billowing clouds
  ctx.fillStyle = '#ffffff';
  for (let c = 0; c < 3; c++) {
    const cx = ((time * 8 + c * 35) % 120 - 10) * scaleX;
    const cy = (15 + c * 10) * scaleY;
    ctx.beginPath();
    ctx.arc(cx, cy, 3 * scaleX, 0, Math.PI * 2);
    ctx.arc(cx + 2 * scaleX, cy - 1 * scaleY, 2.5 * scaleX, 0, Math.PI * 2);
    ctx.arc(cx + 4 * scaleX, cy, 2 * scaleX, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  // Parallax Green Hills
  ctx.fillStyle = '#4caf50'; // Mid green hill
  ctx.beginPath();
  ctx.moveTo(0, skyHeight);
  ctx.quadraticCurveTo(25 * scaleX, skyHeight - 12 * scaleY, 50 * scaleX, skyHeight - 4 * scaleY);
  ctx.quadraticCurveTo(75 * scaleX, skyHeight - 16 * scaleY, width, skyHeight);
  ctx.closePath();
  ctx.fill();

  // 2. Main Floor & Mossy Grass Margins
  ctx.fillStyle = '#1b5e20'; // Dark forest lawn background
  ctx.fillRect(0, skyHeight, width, height - skyHeight);

  // 3. Track with 8 lanes (centered at X = 25 to 75, 50ft total width)
  const pathX = 25 * scaleX;
  const pathW = 50 * scaleX;
  ctx.fillStyle = themeColor;
  ctx.fillRect(pathX, skyHeight, pathW, height - skyHeight);

  // Gold Rails along the side of the 8-lane course
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(pathX, skyHeight);
  ctx.lineTo(pathX, height);
  ctx.moveTo(pathX + pathW, skyHeight);
  ctx.lineTo(pathX + pathW, height);
  ctx.stroke();

  // Lane Dividers (Dashed white stripes)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 2;
  ctx.setLineDash([15, 20]);
  for (let l = 1; l <= 7; l++) {
    const lx = (25 + l * 6.25) * scaleX;
    ctx.beginPath();
    ctx.moveTo(lx, skyHeight);
    ctx.lineTo(lx, height);
    ctx.stroke();
  }
  ctx.setLineDash([]); // Reset dash

  // Conifer trees lining the outer grass areas
  ctx.fillStyle = '#0f3d13'; // Conifer green
  for (let ty = skyHeight + 20 * scaleY; ty < height; ty += 120 * scaleY) {
    // Left side tree
    ctx.beginPath();
    ctx.moveTo(15 * scaleX, ty);
    ctx.lineTo(20 * scaleX, ty - 15 * scaleY);
    ctx.lineTo(25 * scaleX, ty);
    ctx.closePath();
    ctx.fill();

    // Right side tree
    ctx.beginPath();
    ctx.moveTo(75 * scaleX, ty);
    ctx.lineTo(80 * scaleX, ty - 15 * scaleY);
    ctx.lineTo(85 * scaleX, ty);
    ctx.closePath();
    ctx.fill();
  }

  // 4. Renders interactive layout items/obstacles
  const items: CourseObstacle[] = loadDefaultCourseObstacles(courseNumber);
  items.forEach((item) => {
    const itemX = item.x * scaleX;
    const itemY = item.y * scaleY;

    if (item.type === 'horseshoe') {
      // Golden lucky Horseshoe
      ctx.save();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffd700'; // Bright Gold
      ctx.shadowColor = '#ffff8d';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      // Curved shape looking like horseshoe
      ctx.arc(itemX, itemY, 1.5 * scaleX, 0.2 * Math.PI, 0.8 * Math.PI, true);
      ctx.stroke();
      ctx.restore();
    } else if (item.type === 'petal_boost') {
      // Shimmering pink booster flower petals
      ctx.save();
      ctx.fillStyle = '#ff4081'; // Brilliant pink petal
      ctx.shadowColor = '#ff80ab';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(itemX, itemY, 1.2 * scaleX, 1.8 * scaleY, Math.sin(time * 2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (item.type === 'finish_banner') {
      // Giant finish banner at the top (Y = 990)
      ctx.fillStyle = '#f44336'; // Red banner
      ctx.fillRect(pathX, itemY - 4 * scaleY, pathW, 8 * scaleY);
      
      // Checkerboard patterns on the banner
      ctx.fillStyle = '#ffffff';
      for (let cb = 25; cb < 75; cb += 2.5) {
        ctx.fillRect(cb * scaleX, itemY - 4 * scaleY, 1.25 * scaleX, 4 * scaleY);
        ctx.fillRect((cb + 1.25) * scaleX, itemY, 1.25 * scaleX, 4 * scaleY);
      }

      ctx.strokeStyle = '#212121';
      ctx.lineWidth = 2;
      ctx.strokeRect(pathX, itemY - 4 * scaleY, pathW, 8 * scaleY);

      // Label "FINISH"
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${11 * scaleX}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('FINISH', 50 * scaleX, itemY + 3 * scaleY);
    }
  });

  // 5. HUD Display for Course Info at top right of the viewport
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(76 * scaleX, 15 * scaleY, 23 * scaleX, 45 * scaleY);

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${6 * scaleX}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText(`COURSE: 0${courseNumber}`, 78 * scaleX, 28 * scaleY);
  ctx.fillText(`SOIL: REF_SOLID`, 78 * scaleX, 40 * scaleY);
  ctx.fillStyle = '#e91e63';
  ctx.fillText(`HEARTS: ♥`, 78 * scaleX, 52 * scaleY);
}
