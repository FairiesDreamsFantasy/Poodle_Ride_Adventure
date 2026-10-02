/**
 * Scientific Visuals Engine Basic 2D Drawing Interpreter Core Module
 * Deterministic 2D line drawing, circle rasterizer, and ASCII art renderer.
 */



export class VisualsBasicDrawing {

  public bresenhamLine(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
    const points: Array<[number, number]> = [];
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    let x = x0;
    let y = y0;
    while (true) {
      points.push([x, y]);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x += sx; }
      if (e2 < dx) { err += dx; y += sy; }
    }
    return points;
  }
        
}

export const VisualsBasicDrawingInstance = new VisualsBasicDrawing();
