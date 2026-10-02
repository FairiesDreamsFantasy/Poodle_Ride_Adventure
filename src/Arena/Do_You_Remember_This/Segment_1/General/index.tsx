import { GameState } from '../../../../System/Engine/Core/Types';
import { drawArenaStart } from '../Start';
import { drawArenaPath } from '../Path';
import { drawArenaGoal } from '../Goal';

export interface Segment1Props {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export function drawSegment1(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  const x = (state as any).x ?? state.poodleX ?? state.gridX ?? 0;

  if (x < 750) {
    drawArenaStart(ctx, width, height, state, time);
  } else if (x >= 14250) {
    drawArenaGoal(ctx, width, height, state, time);
  } else {
    drawArenaPath(ctx, width, height, state, time);
  }
}
