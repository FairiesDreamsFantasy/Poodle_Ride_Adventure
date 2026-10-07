import { 
  Point2D, 
  BarycentricWeights,
  UNIT_TRIANGLE_VERTICES,
  UNIT_QUAD_VERTICES
} from '../../../../../../../Registry/AI/Visuals/Animations/Polygons/General/index.tsx';

/**
 * Calculates the Signed Area of a Polygon using the Shoelace Formula (Green's Theorem)
 */
export function calculatePolygonArea(vertices: ReadonlyArray<Point2D>): number {
  const n = vertices.length;
  if (n < 3) return 0;

  let area = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
  }
  return area / 2.0;
}

/**
 * Calculates the Center of Mass (Centroid) of a 2D Polygon
 */
export function calculatePolygonCentroid(vertices: ReadonlyArray<Point2D>): Point2D {
  const n = vertices.length;
  if (n === 0) return { x: 0, y: 0 };
  if (n === 1) return { ...vertices[0] };
  if (n === 2) return { x: (vertices[0].x + vertices[1].x) / 2, y: (vertices[0].y + vertices[1].y) / 2 };

  const area = calculatePolygonArea(vertices);
  if (Math.abs(area) < 1e-7) {
    // Degenerate polygon, average vertices
    const sumX = vertices.reduce((acc, v) => acc + v.x, 0);
    const sumY = vertices.reduce((acc, v) => acc + v.y, 0);
    return { x: sumX / n, y: sumY / n };
  }

  let cx = 0;
  let cy = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const factor = vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y;
    cx += (vertices[i].x + vertices[j].x) * factor;
    cy += (vertices[i].y + vertices[j].y) * factor;
  }

  const denominator = 6.0 * area;
  return { x: cx / denominator, y: cy / denominator };
}

/**
 * Calculates Barycentric Weights for point P inside Triangle (A, B, C)
 */
export function calculateBarycentricWeights(
  p: Point2D,
  a: Point2D,
  b: Point2D,
  c: Point2D
): BarycentricWeights {
  const detT = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
  if (Math.abs(detT) < 1e-7) {
    return { w1: 1 / 3, w2: 1 / 3, w3: 1 / 3 };
  }

  const w1 = ((b.y - c.y) * (p.x - c.x) + (c.x - b.x) * (p.y - c.y)) / detT;
  const w2 = ((c.y - a.y) * (p.x - c.x) + (a.x - c.x) * (p.y - c.y)) / detT;
  const w3 = 1.0 - w1 - w2;

  return { w1, w2, w3 };
}

/**
 * Jordan Curve Theorem / Ray-Casting algorithm for Point-in-Polygon containment
 */
export function isPointInsidePolygon(point: Point2D, vertices: ReadonlyArray<Point2D>): boolean {
  let inside = false;
  const n = vertices.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect = ((yi > point.y) !== (yj > point.y)) &&
      (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);

    if (intersect) inside = !inside;
  }

  return inside;
}

export { UNIT_TRIANGLE_VERTICES, UNIT_QUAD_VERTICES };
