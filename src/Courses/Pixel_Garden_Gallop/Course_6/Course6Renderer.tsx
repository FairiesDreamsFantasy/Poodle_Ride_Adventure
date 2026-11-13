import { GameState } from '@/src/System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '@/src/Courses/Pixel_Garden_Gallop/Objects/CourseRendererHelper';

/**
 * Draws Course 6 of Pixel Garden Gallop (Rich Mahogany Path)
 */
export function drawPixelGardenCourse6(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  drawPixelGardenTrackArea(ctx, width, height, state, time, 6, '#3e2723');
}
