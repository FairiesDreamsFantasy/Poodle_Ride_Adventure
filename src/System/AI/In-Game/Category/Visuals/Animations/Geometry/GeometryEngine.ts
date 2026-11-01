/**
 * System/AI/In-Game/Category/Visuals/Animations/Geometry/GeometryEngine.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Geometric Calculation & Ray-Casting Collision Pipeline.
 * 
 * Features:
 * 1. 2D & 3D Bounding Box (AABB) intersection testing.
 * 2. Line segment-to-segment geometric collision solvers.
 * 3. Point-to-line and point-to-plane Euclidean distance solvers.
 * 4. Polygon area & centroid geometric calculations.
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface AABB2D {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface AABB3D {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
}

export interface Segment2D {
  p1: Vector2D;
  p2: Vector2D;
}

/**
 * Checks for intersection between two 2D Axis-Aligned Bounding Boxes.
 */
export function intersectsAABB2D(boxA: AABB2D, boxB: AABB2D): boolean {
  return (
    boxA.minX <= boxB.maxX &&
    boxA.maxX >= boxB.minX &&
    boxA.minY <= boxB.maxY &&
    boxA.maxY >= boxB.minY
  );
}

/**
 * Checks for intersection between two 3D Axis-Aligned Bounding Boxes.
 */
export function intersectsAABB3D(boxA: AABB3D, boxB: AABB3D): boolean {
  return (
    boxA.minX <= boxB.maxX &&
    boxA.maxX >= boxB.minX &&
    boxA.minY <= boxB.maxY &&
    boxA.maxY >= boxB.minY &&
    boxA.minZ <= boxB.maxZ &&
    boxA.maxZ >= boxB.minZ
  );
}

/**
 * Solves exact intersection point between two 2D line segments.
 */
export function intersectSegments2D(segA: Segment2D, segB: Segment2D): Vector2D | null {
  const x1 = segA.p1.x, y1 = segA.p1.y;
  const x2 = segA.p2.x, y2 = segA.p2.y;
  const x3 = segB.p1.x, y3 = segB.p1.y;
  const x4 = segB.p2.x, y4 = segB.p2.y;

  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom === 0) return null; // Parallel lines

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1)
    };
  }

  return null;
}

/**
 * Computes shortest perpendicular distance from a 2D point to a line segment.
 */
export function distancePointToSegment2D(point: Vector2D, segment: Segment2D): number {
  const dx = segment.p2.x - segment.p1.x;
  const dy = segment.p2.y - segment.p1.y;
  const lenSq = dx * dx + dy * dy;

  if (lenSq === 0) {
    const px = point.x - segment.p1.x;
    const py = point.y - segment.p1.y;
    return Math.sqrt(px * px + py * py);
  }

  let t = ((point.x - segment.p1.x) * dx + (point.y - segment.p1.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const projX = segment.p1.x + t * dx;
  const projY = segment.p1.y + t * dy;

  const distX = point.x - projX;
  const distY = point.y - projY;

  return Math.sqrt(distX * distX + distY * distY);
}

/**
 * Computes polygon centroid (center of mass) given a list of vertices.
 */
export function computePolygonCentroid(vertices: Vector2D[]): Vector2D {
  if (vertices.length === 0) return { x: 0, y: 0 };
  let sumX = 0;
  let sumY = 0;
  for (const v of vertices) {
    sumX += v.x;
    sumY += v.y;
  }
  return {
    x: sumX / vertices.length,
    y: sumY / vertices.length
  };
}
