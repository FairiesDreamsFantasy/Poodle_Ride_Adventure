import { GameState } from '@/src/System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '@/src/Courses/Pixel_Garden_Gallop/Objects/CourseRendererHelper';

/**
 * Draws Course 7 of Pixel Garden Gallop (Tarsian Sandways)
 */
export function drawPixelGardenCourse7(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  drawPixelGardenTrackArea(ctx, width, height, state, time, 7, '#bcaaa4');
}
