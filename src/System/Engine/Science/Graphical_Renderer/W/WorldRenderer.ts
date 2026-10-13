import { GameState } from '../G/GameLogic';
import { Opponent } from '../../../Opponents';
import { renderCoins } from '../../../../Items/Coins';

interface WorldObject {
  x: number;
  y: number;
  type: 'fountain' | 'statue' | 'bench' | 'bush' | 'rock' | 'trench' | 'opponent' | 'coin';
  name?: string;
  opponent?: Opponent;
  value?: number;
}

export function drawWorldObjects(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const objects: WorldObject[] = [];
  
  if (state.area === 'Foyer') {
    objects.push({ x: 200, y: 300, type: 'fountain' });
    objects.push({ x: 600, y: 500, type: 'statue' });
  } else if (state.area === 'HedgePath') {
    for (let i = 0; i < 10; i++) {
      objects.push({ x: 10, y: i * 100 + 50, type: 'bush' });
    }
  } else if (state.area === 'Suburb') {
    for (let i = 0; i < 5; i++) {
      objects.push({ x: 20, y: i * 400 + 100, type: 'rock' });
    }
  } else if (state.area === 'OpenTrench') {
    for (let i = 0; i < 5; i++) {
      objects.push({ x: 20, y: i * 1000 + 500, type: 'trench' });
    }
  }

  // Add currently alive coins
  if (state.coins) {
    state.coins.forEach(c => {
      if (!c.isCollected && c.area === state.area) {
        objects.push({ x: c.x, y: c.y, type: 'coin', value: c.value });
      }
    });
  }

  // Add opponents based on area
  if (state.opponents && state.opponents.length > 0) {
    const adventureAreas = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench'];
    if (adventureAreas.includes(state.area)) {
      // Distribute opponents along the path
      const areaIndex = adventureAreas.indexOf(state.area);
      const opponentsInArea = state.opponents.slice(areaIndex * 20, (areaIndex + 1) * 20);
      
      opponentsInArea.forEach((opp, idx) => {
        objects.push({
          x: 20 + (idx % 3) * 10, // Staggered x positions
          y: (idx + 1) * 100,     // Spaced out along y
          type: 'opponent',
          opponent: opp
        });
      });
    }
  }

  const horizonY = height / 2;

  objects.forEach(obj => {
    // 1. Proximity Math
    const dx = obj.x - state.gridX;
    const dy = obj.y - state.gridY;
    
    // Rotate coordinates relative to poodle
    const angle = (state.rotation * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // Only draw if in front (simple culling)
    if (localY < 10) return; 

    const scale = 400 / (localY + 100); // Perspective scale
    const screenX = width / 2 + (localX * scale);
    const screenY = horizonY + (100 * scale);

    if (screenX < -200 || screenX > width + 200) return;

    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.scale(scale, scale);

    if (obj.type === 'fountain') {
      drawFountain(ctx, dy);
    } else if (obj.type === 'bush') {
      drawBush(ctx, dy);
    } else if (obj.type === 'rock') {
      drawRock(ctx, dy);
    } else if (obj.type === 'trench') {
      drawTrench(ctx, dy);
    } else if (obj.type === 'opponent' && obj.opponent) {
      drawOpponent(ctx, dy, obj.opponent);
    } else if (obj.type === 'coin') {
      drawWorldCoin(ctx, time);
    }

    ctx.restore();
  });
}

function drawWorldCoin(ctx: CanvasRenderingContext2D, time: number) {
  const spin = Math.sin(time / 200) * 0.5 + 0.5;
  ctx.fillStyle = '#ffd700';
  ctx.strokeStyle = '#daa520';
  ctx.beginPath();
  ctx.ellipse(0, -10, 8 * spin, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawOpponent(ctx: CanvasRenderingContext2D, distance: number, opponent: Opponent) {
  // Simple representation of an opponent on a poodle
  
  // Poodle Body
  ctx.fillStyle = opponent.poodleColor.toLowerCase().includes('spotted') ? '#e0e0e0' : opponent.poodleColor.toLowerCase();
  ctx.beginPath();
  ctx.ellipse(0, -10, 20, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spots if spotted
  if (opponent.poodleColor.toLowerCase().includes('spotted')) {
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-10, -10, 3, 0, Math.PI * 2);
    ctx.arc(5, -12, 4, 0, Math.PI * 2);
    ctx.arc(12, -8, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rider
  ctx.fillStyle = opponent.outfit.toLowerCase().includes('pink') ? '#ff69b4' : 
                  opponent.outfit.toLowerCase().includes('green') ? '#4caf50' : 
                  opponent.outfit.toLowerCase().includes('navy') ? '#000080' : '#888';
  ctx.beginPath();
  ctx.arc(0, -25, 8, 0, Math.PI * 2); // Head
  ctx.fill();
  
  ctx.fillRect(-5, -20, 10, 15); // Body
}

function drawBush(ctx: CanvasRenderingContext2D, distance: number) {
  ctx.fillStyle = '#2d5a27';
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#3e7c36';
  ctx.beginPath();
  ctx.arc(-10, -10, 20, 0, Math.PI * 2);
  ctx.fill();
}

function drawRock(ctx: CanvasRenderingContext2D, distance: number) {
  ctx.fillStyle = '#7f8c8d';
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(-20, -20);
  ctx.lineTo(20, -25);
  ctx.lineTo(35, 0);
  ctx.closePath();
  ctx.fill();
}

function drawTrench(ctx: CanvasRenderingContext2D, distance: number) {
  ctx.fillStyle = '#34495e';
  ctx.fillRect(-100, -10, 200, 20);
  ctx.fillStyle = '#2980b9';
  ctx.fillRect(-100, -5, 200, 10);
}

function drawFountain(ctx: CanvasRenderingContext2D, distance: number) {
  // EVOLUTION LOGIC
  if (distance > 400) {
    // PHASE 1: 2D Flat (Far away)
    ctx.fillStyle = '#4a90e2';
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI, true);
    ctx.fill();
  } else if (distance > 150) {
    // PHASE 2: Simulated 3D (Mid-range)
    ctx.fillStyle = '#357abd';
    ctx.beginPath();
    ctx.ellipse(0, 0, 40, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-40, -20, 80, 20);
  } else {
    // PHASE 3: Vintage 3D (Proximity - High Craftsmanship)
    // Base Basin (Shaded)
    const basinGrad = ctx.createLinearGradient(-40, 0, 40, 0);
    basinGrad.addColorStop(0, '#2c3e50');
    basinGrad.addColorStop(0.5, '#34495e');
    basinGrad.addColorStop(1, '#2c3e50');
    ctx.fillStyle = basinGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 40, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Water (Shiny & Animated)
    const waterGrad = ctx.createRadialGradient(0, -5, 2, 0, 0, 35);
    waterGrad.addColorStop(0, '#ffffff');
    waterGrad.addColorStop(0.4, '#4fc3f7');
    waterGrad.addColorStop(1, '#0288d1');
    ctx.fillStyle = waterGrad;
    ctx.beginPath();
    ctx.ellipse(0, -2, 35, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Water Shine
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -2, 30, -Math.PI/4, -Math.PI/2, true);
    ctx.stroke();
  }
}
