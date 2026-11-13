import { GameState } from '@/src/System/Engine/Core/Types';
import { drawSegment1 } from '@/src/Arena/Do_You_Remember_This/Segment_1';

export interface DoYouRememberThisProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export function drawDoYouRememberThis(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  drawSegment1(ctx, width, height, state, time);
}
