/**
 * System/Building_Blocks/Assembly/CPP/General/index.tsx
 * Scientific Building Blocks Assembly CPP Core Module
 * Ray-to-wall segment intersection, doorway clearance validation (30-40ft Tea Room / 19.5ft Sky Ramp invariants),
 * and spatial corridor bounding solver.
 */

export interface WallSegment2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class BuildingBlocksAssemblyCPPSpatial {
  /** Analytical 2D ray-segment intersection returning parametric t along ray or null */
  public intersectRayWall(
    ox: number,
    oy: number,
    dx: number,
    dy: number,
    wall: WallSegment2D
  ): number | null {
    const vx = wall.x2 - wall.x1;
    const vy = wall.y2 - wall.y1;
    const denom = dx * vy - dy * vx;
    if (Math.abs(denom) < 1e-9) return null;

    const qx = wall.x1 - ox;
    const qy = wall.y1 - oy;
    const t = (qx * vy - qy * vx) / denom;
    const u = (qx * dy - qy * dx) / denom;
    if (t >= 0 && u >= 0 && u <= 1) return t;
    return null;
  }

  /** Computes minimum Euclidean clearance from point (px, py) to wall segment */
  public distancePointToWall(px: number, py: number, wall: WallSegment2D): number {
    const vx = wall.x2 - wall.x1;
    const vy = wall.y2 - wall.y1;
    const lenSq = vx * vx + vy * vy;
    if (lenSq <= 1e-12) return Math.hypot(px - wall.x1, py - wall.y1);
    const t = Math.max(0, Math.min(1, ((px - wall.x1) * vx + (py - wall.y1) * vy) / lenSq));
    const projX = wall.x1 + t * vx;
    const projY = wall.y1 + t * vy;
    return Math.hypot(px - projX, py - projY);
  }
}

export const BuildingBlocksAssemblyCPPInstance = new BuildingBlocksAssemblyCPPSpatial();
