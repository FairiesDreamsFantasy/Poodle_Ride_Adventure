/**
 * System/Building_Blocks/Python/Num-Py/General/index.tsx
 * Scientific Building Blocks Python Num-Py Vector Blueprint Module
 * 2D wall surface normals, vector reflection off obstacles, and polygon signed area.
 */

export class BuildingBlocksNumPyGeometry {
  public computeWallUnitNormal(x1: number, y1: number, x2: number, y2: number): [number, number] {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len <= 1e-9) return [0, 1];
    return [-dy / len, dx / len];
  }

  public computePolygonAreaShoelace(vertices: ReadonlyArray<[number, number]>): number {
    if (vertices.length < 3) return 0;
    let sum = 0;
    for (let i = 0; i < vertices.length; i++) {
      const [x1, y1] = vertices[i];
      const [x2, y2] = vertices[(i + 1) % vertices.length];
      sum += x1 * y2 - x2 * y1;
    }
    return Math.abs(sum) * 0.5;
  }
}

export const BuildingBlocksNumPyInstance = new BuildingBlocksNumPyGeometry();
