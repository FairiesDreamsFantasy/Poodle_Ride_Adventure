import { GameState } from '../../../../../../../../../System/Engine/Core/Types';
import { drawPixelGardenTrackArea } from '../Objects/CourseRendererHelper';

/**
 * Draws Course 2 of Pixel Garden Gallop (Crimson Lane)
 */
export function drawPixelGardenCourse2(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GameState,
  time: number
) {
  // Deep clay brick clay red path theme
  drawPixelGardenTrackArea(ctx, width, height, state, time, 2, '#a1887f');
}
