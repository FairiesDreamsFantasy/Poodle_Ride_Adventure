/**
 * System/Visuals/Animations/Python/Num-Py/General/index.tsx
 * Motion trajectory vector buffers, 4x4 Bayer dithering matrix sampler, and kinematic velocity norms.
 */

export class VisualsAnimationsNumPyMotion {
  private static readonly BAYER_4X4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  public sampleBayer4x4Threshold(x: number, y: number): number {
    const row = ((Math.floor(y) % 4) + 4) % 4;
    const col = ((Math.floor(x) % 4) + 4) % 4;
    return (VisualsAnimationsNumPyMotion.BAYER_4X4[row][col] + 0.5) / 16.0;
  }

  public computeTrajectoryLength(points: ReadonlyArray<[number, number]>): number {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i][0] - points[i - 1][0];
      const dy = points[i][1] - points[i - 1][1];
      total += Math.hypot(dx, dy);
    }
    return total;
  }
}

export const VisualsAnimationsNumPyInstance = new VisualsAnimationsNumPyMotion();
