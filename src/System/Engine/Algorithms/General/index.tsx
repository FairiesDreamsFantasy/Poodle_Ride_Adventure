/**
 * Scientific Game Engine General Algorithms Core Module
 * Spatial partitioning quadtrees, Ray-AABB Slab method intersection tests, Bresenham line-of-sight rasterization, and distance metrics.
 */

export interface Rect2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Ray3D {
  origin: { x: number; y: number; z: number };
  direction: { x: number; y: number; z: number }; // normalized
}

export interface Box3D {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
}

export class EngineSpatialAlgorithms {
  /**
   * Euclidean 2D distance between two points:
   * d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
   */
  public euclideanDistance2D(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Manhattan distance (L1 norm):
   * d = |x2 - x1| + |y2 - y1|
   */
  public manhattanDistance2D(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
  }

  /**
   * Fast Axis-Aligned Bounding Box (AABB) 2D Intersection Test.
   */
  public intersectsAABB2D(a: Rect2D, b: Rect2D): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Ray-AABB 3D Intersection Test using the Kay-Kajiya Slab Method.
   * Returns distance t along ray to first hit point, or null if ray misses.
   */
  public intersectRayAABB3D(ray: Ray3D, box: Box3D): number | null {
    let tmin = -Infinity;
    let tmax = Infinity;

    const axes: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z'];

    for (const axis of axes) {
      const dir = ray.direction[axis];
      const orig = ray.origin[axis];
      const bMin = box.min[axis];
      const bMax = box.max[axis];

      if (Math.abs(dir) < 1e-8) {
        // Ray is parallel to slab
        if (orig < bMin || orig > bMax) return null;
      } else {
        const invDir = 1.0 / dir;
        let t1 = (bMin - orig) * invDir;
        let t2 = (bMax - orig) * invDir;

        if (t1 > t2) {
          const temp = t1;
          t1 = t2;
          t2 = temp;
        }

        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);

        if (tmin > tmax) return null;
      }
    }

    if (tmax < 0) return null; // Box is behind ray
    return tmin >= 0 ? tmin : tmax;
  }

  /**
   * Bresenham Line Rasterization Algorithm for discrete grid Line-of-Sight (LOS) queries.
   * Yields integer grid coordinate steps between (x0, y0) and (x1, y1).
   */
  public bresenhamLine(x0: number, y0: number, x1: number, y1: number): Array<{ x: number; y: number }> {
    const points: Array<{ x: number; y: number }> = [];
    let curX = Math.round(x0);
    let curY = Math.round(y0);
    const targetX = Math.round(x1);
    const targetY = Math.round(y1);

    const dx = Math.abs(targetX - curX);
    const dy = -Math.abs(targetY - curY);
    const sx = curX < targetX ? 1 : -1;
    const sy = curY < targetY ? 1 : -1;
    let err = dx + dy;

    while (true) {
      points.push({ x: curX, y: curY });
      if (curX === targetX && curY === targetY) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        curX += sx;
      }
      if (e2 <= dx) {
        err += dx;
        curY += sy;
      }
    }

    return points;
  }
}

export const EngineSpatialAlgorithmsInstance = new EngineSpatialAlgorithms();
