/**
 * Pink House Central Renderer
 * [PRESERVED ARTISTIC CRAFT]
 */
import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { drawPinkHouseFoyer } from './1st_Floor/Foyer/FoyerRenderer';
import { drawPinkHouseTeaRoom } from './1st_Floor/Tea_Room/TeaRoomRenderer';
import { drawPinkHouseDiningRoom } from './1st_Floor/Dining_Room/DiningRoomRenderer';
import { drawPinkHouseKitchen } from './Kitchen/KitchenRenderer';

export function renderPinkHouse(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  switch (state.area) {
    case 'PinkHouseFoyer':
      drawPinkHouseFoyer(ctx, width, height, state, time);
      break;
    case 'PinkHouseTeaRoom':
      drawPinkHouseTeaRoom(ctx, width, height, state, time);
      break;
    case 'PinkHouseDiningRoom':
      drawPinkHouseDiningRoom(ctx, width, height, state, time);
      break;
    case 'PinkHouseKitchen':
      drawPinkHouseKitchen(ctx, width, height, state, time);
      break;
  }
}

export function drawPinkHouseExterior(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / 50;
  
  // Pink House with Square Windows (Blue)
  ctx.fillStyle = '#ff69b4';
  ctx.fillRect(5 * scale, 5 * scale, 40 * scale, 30 * scale);
  
  // Windows
  ctx.fillStyle = '#87ceeb';
  ctx.fillRect(10 * scale, 10 * scale, 5 * scale, 5 * scale);
  ctx.fillRect(35 * scale, 10 * scale, 5 * scale, 5 * scale);
  
  // White Roof
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(0, 5 * scale);
  ctx.lineTo(width / 2, 0);
  ctx.lineTo(width, 5 * scale);
  ctx.fill();
  
  // Windmill
  ctx.save();
  ctx.translate(width / 2, 0);
  ctx.rotate(time / 1000);
  ctx.fillStyle = '#ddd';
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.fillRect(-2 * scale, 0, 4 * scale, 20 * scale);
  }
  ctx.restore();
}
