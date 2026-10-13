import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '../Objects/CourseRendererHelper';

/**
 * Draws Course 8 of Pixel Garden Gallop (The Golden Finish)
 */
export function drawPixelGardenCourse8(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  drawPixelGardenTrackArea(ctx, width, height, state, time, 8, '#5d4037');
}
