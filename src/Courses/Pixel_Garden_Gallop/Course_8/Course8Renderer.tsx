import { GameState } from '@/src/System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '@/src/Courses/Pixel_Garden_Gallop/Objects/CourseRendererHelper';

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
