import { GameState } from '../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../System/Engine/Core/Constants';

export function drawManorPath(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number, side: 'East' | 'West') {
  const horizon = height / 2;
  const isNight = state.lightingMode === 'Night';
  const isEvening = state.lightingMode === 'Evening';

  ctx.save();

  // Floor: 50ft wide red brick path
  const pathWidth = 50;
  const pathHeight = 6500;
  const currentDims = AREA_DIMENSIONS[state.area] || { width: 50, height: pathHeight };
  const viewScale = width / currentDims.width;
  
  // Horizon to bottom rendering for long path
  const zLimit = state.pixelRatio < 1 ? 10 : 20;
  for (let z = zLimit; z > 0; z--) {
    const y1 = horizon + (1 / z) * 1000;
    const y2 = z === 1 ? height : horizon + (1 / (z - 1)) * 1000;
    const h = y2 - y1;
    
    // Brick pattern
    const isAlt = z % 2 === 0;
    ctx.fillStyle = isAlt ? (isNight ? '#441111' : '#8B0000') : (isNight ? '#330000' : '#A52A2A');
    ctx.fillRect(0, y1, width, h);
    
    // Brick lines
    ctx.strokeStyle = isNight ? '#220000' : '#5C4033';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, y1, width, h);
  }

  // Walls (Manor on one side, empty space on the other)
  ctx.fillStyle = isNight ? '#000000' : (isEvening ? '#111111' : '#87CEEB'); // Sky
  ctx.fillRect(0, 0, width, horizon);

  // Drawing the Manor Wall on the appropriate side
  const manorSide = side === 'West' ? 'right' : 'left';
  const wallWidth = width * 0.4;
  ctx.fillStyle = isNight ? '#222222' : '#ffffff';
  if (manorSide === 'right') {
    ctx.fillRect(width - wallWidth, 0, wallWidth, horizon);
    
    // Windows/Doors on manor wall
    ctx.fillStyle = "rgba(173, 216, 230, 0.4)";
    for (let i = 0; i < 5; i++) {
        ctx.fillRect(width - wallWidth + 20, horizon - 300 + (i * -100), 100, 80);
    }
  } else {
    ctx.fillRect(0, 0, wallWidth, horizon);
    
     // Windows/Doors on manor wall
    ctx.fillStyle = "rgba(173, 216, 230, 0.4)";
    for (let i = 0; i < 5; i++) {
        ctx.fillRect(20, horizon - 300 + (i * -100), 100, 80);
    }
  }

  // Ceiling/Night Sky
  if (isNight) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * width, Math.random() * horizon, 1, 0, Math.PI * 2);
          ctx.fill();
      }
  }

  // TARDIS EFFECT: Barrier becomes short at high Y values
  if (state.gridY > 5000) {
      const shortBarrierHeight = 8 * viewScale; // 8 feet
      ctx.fillStyle = "#ffffff";
      if (side === 'East') {
          ctx.fillRect(width - 5, horizon - shortBarrierHeight, 5, shortBarrierHeight);
      } else {
          ctx.fillRect(0, horizon - shortBarrierHeight, 5, shortBarrierHeight);
      }
  }

  ctx.restore();
}
