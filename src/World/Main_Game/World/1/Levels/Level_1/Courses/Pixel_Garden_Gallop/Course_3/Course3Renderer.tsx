import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '../Objects/CourseRendererHelper';

/**
 * Draws Course 3 of Pixel Garden Gallop (Lavender Fields Route)
 */
export function drawPixelGardenCourse3(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  // Majestic purple landscape road theme
  drawPixelGardenTrackArea(ctx, width, height, state, time, 3, '#795548');
}
