import { drawClassicWindChime } from '../Classic';
import { drawPolyphonicWindChime } from '../Garden_Tea_Party_Themed';

/**
 * Wind Chimes Animation Registry
 */

export const drawWindChimes = (
  ctx: CanvasRenderingContext2D,
  type: 'Classic' | 'Polyphonic',
  x: number,
  y: number,
  time: number,
  flicker: number = 1.0,
  scale: number = 1.0
) => {
  if (type === 'Classic') {
    drawClassicWindChime(ctx, x, y, time, flicker, scale);
  } else {
    drawPolyphonicWindChime(ctx, x, y, time, flicker, scale);
  }
};
