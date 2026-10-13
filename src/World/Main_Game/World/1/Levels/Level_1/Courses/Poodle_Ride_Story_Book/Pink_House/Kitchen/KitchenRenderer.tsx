/**
 * Pink House Kitchen Renderer
 * [PRESERVED ARTISTIC CRAFT]
 */
import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

export function drawPinkHouseKitchen(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / 400; // Based on 400x200 dimensions
  
  // 1. Stainless Steel Look (Tile)
  ctx.fillStyle = '#e5e4e2';
  ctx.fillRect(0, 0, width, height);

  // 2. Kitchen Equipment (Counters, Stoves)
  ctx.fillStyle = '#71797e';
  // North counters
  ctx.fillRect(0, 0, width, 30 * scale);
  // Central island
  ctx.fillRect(100 * scale, 80 * scale, 200 * scale, 40 * scale);

  // 3. Roll-up Gate (South wall, delivery area)
  // Logic: "located at 350 to 750 feet markers from the west wall of the kitchen"
  // If kitchen is at 1100-1500 in the house, 350ft from its west wall is 1450 in the house.
  // Within the kitchen's relative space (0-400), 350 is near the east end.
  ctx.fillStyle = '#444';
  const gateWidth = 20 * scale;
  const gateX = 350 * scale; // Near the east end of the kitchen
  ctx.fillRect(gateX, height - 5 * scale, gateWidth, 5 * scale);
  
  // 4. Staff Door (South center, 10ft tall - No poodles)
  ctx.fillStyle = '#8b4513';
  ctx.fillRect(200 * scale - 5 * scale, height - 2 * scale, 10 * scale, 2 * scale);
}
