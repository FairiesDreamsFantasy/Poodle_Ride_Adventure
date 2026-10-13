import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '../Objects/CourseRendererHelper';

/**
 * Draws Course 5 of Pixel Garden Gallop (Red Soil Ride)
 */
export function drawPixelGardenCourse5(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  drawPixelGardenTrackArea(ctx, width, height, state, time, 5, '#4e342e');
}
