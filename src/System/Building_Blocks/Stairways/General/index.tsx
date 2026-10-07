/**
 * Stairways Building Block Systems.
 * Optimized performance structures.
 */
export interface StairwayBlock {
  id: string;
  name: string;
  stepsCount: number;
  direction: 'up' | 'down';
}

export const STAIRWAY_BLOCKS: StairwayBlock[] = [
  {
    id: 'foyer-stairs',
    name: 'Foyer Grand Stairway',
    stepsCount: 16,
    direction: 'up'
  }
];

export function renderStairway(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, steps: number) {
  ctx.save();
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 2;
  const stepWidth = width / steps;
  const stepHeight = height / steps;
  
  for (let i = 0; i < steps; i++) {
    ctx.strokeRect(x + (i * stepWidth), y + height - ((i + 1) * stepHeight), stepWidth, (i + 1) * stepHeight);
  }
  ctx.restore();
}
