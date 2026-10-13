import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '../Objects/CourseRendererHelper';

/**
 * Draws Course 4 of Pixel Garden Gallop (Autumn Oak Pass)
 */
export function drawPixelGardenCourse4(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  drawPixelGardenTrackArea(ctx, width, height, state, time, 4, '#6d4c41');
}
