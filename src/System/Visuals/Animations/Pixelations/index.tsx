/**
 * Pixelation System
 * Logic for 8-bit and retro-style pixel rendering.
 */

export type PixelGrid = string[][];

export class PixelRenderer {
  static render(ctx: CanvasRenderingContext2D, grid: PixelGrid, x: number, y: number, size: number = 4) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const color = grid[row][col];
        if (color && color !== 'transparent') {
          ctx.fillStyle = color;
          ctx.fillRect(x + col * size, y + row * size, size, size);
        }
      }
    }
  }
}

export const Pixelations = {
  name: "Pixelations",
  description: "Retro-style and low-resolution pixel rendering logic.",
};
