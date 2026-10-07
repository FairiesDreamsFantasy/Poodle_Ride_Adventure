import { GameState, AREA_DIMENSIONS } from '../../../../../System/AI/In-Game/Logic/GameLogic';

/**
 * GRAND BALLROOM RENDERER
 * A reggae-themed ballroom with a city-at-night backdrop.
 */
export function drawGrandBallroom(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const horizon = height / 2;
  const currentDims = AREA_DIMENSIONS.GrandBallroom;

  ctx.save();

  // Floor (Dark green tiled)
  const tileSize = 50;
  ctx.fillStyle = '#004d00'; // Dark Green
  ctx.fillRect(0, horizon, width, height - horizon);
  
  ctx.strokeStyle = '#003300';
  ctx.lineWidth = 1;
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

  // Walls (City at Night)
  // Sky (Indigo)
  const skyGradient = ctx.createLinearGradient(0, 0, 0, horizon);
  skyGradient.addColorStop(0, '#000033'); // Deep Indigo
  skyGradient.addColorStop(1, '#000066');
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, horizon);

  // Horizon (Dark Green)
  ctx.fillStyle = '#002200';
  ctx.fillRect(0, horizon - 10, width, 10);

  // City Buildings (Black with Green Windows)
  ctx.fillStyle = '#000000';
  for (let i = 0; i < 10; i++) {
    const bWidth = 100 + Math.random() * 100;
    const bHeight = 150 + Math.random() * 200;
    const bX = i * 200;
    ctx.fillRect(bX, horizon - bHeight, bWidth, bHeight);

    // Windows (Green)
    ctx.fillStyle = '#00ff00';
    for (let wx = bX + 10; wx < bX + bWidth - 10; wx += 20) {
      for (let wy = horizon - bHeight + 10; wy < horizon - 10; wy += 30) {
        if (Math.random() > 0.3) {
          ctx.fillRect(wx, wy, 10, 15);
        }
      }
    }
    ctx.fillStyle = '#000000';
  }

  // Perimeter Walkway (90 feet wide)
  const walkwayWidth = (90 / currentDims.width) * width;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  // West
  ctx.fillRect(0, horizon, walkwayWidth, height - horizon);
  // East
  ctx.fillRect(width - walkwayWidth, horizon, walkwayWidth, height - horizon);
  // North
  ctx.fillRect(0, horizon, width, (90 / currentDims.height) * (height - horizon));
  // South
  ctx.fillRect(0, height - (90 / currentDims.height) * (height - horizon), width, (90 / currentDims.height) * (height - horizon));

  // Glass Barrier with Rainbow Designs
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 2;
  const barrierY = horizon + 50;
  ctx.beginPath();
  ctx.moveTo(walkwayWidth, barrierY);
  ctx.lineTo(width - walkwayWidth, barrierY);
  ctx.stroke();

  // Rainbow accents on barrier
  const colors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];
  for (let x = walkwayWidth; x < width - walkwayWidth; x += 100) {
    colors.forEach((color, idx) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(x + 50, barrierY, 10 + idx * 5, Math.PI, 0);
      ctx.stroke();
    });
  }

  // Brass Top
  ctx.strokeStyle = '#d4af37'; // Gold/Brass
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(walkwayWidth, barrierY - 5);
  ctx.lineTo(width - walkwayWidth, barrierY - 5);
  ctx.stroke();

  ctx.restore();
}
