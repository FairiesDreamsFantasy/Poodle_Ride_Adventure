import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '../Objects/CourseRendererHelper';

/**
 * Draws Course 1 of Pixel Garden Gallop (Emerald Roadway)
 */
export function drawPixelGardenCourse1(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  // Beautiful golden/brown track theme
  drawPixelGardenTrackArea(ctx, width, height, state, time, 1, '#8d6e63');
}
