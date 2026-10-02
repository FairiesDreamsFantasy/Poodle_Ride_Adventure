/**
 * Polygon Mesh, Convex Hull & Vertex Topology Registry
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface PolygonTopology {
  vertexCount: number;
  isConvex: boolean;
  windingOrder: 'CW' | 'CCW';
}

export interface BarycentricWeights {
  w1: number;
  w2: number;
  w3: number;
}

export const UNIT_TRIANGLE_VERTICES: ReadonlyArray<Point2D> = Object.freeze([
  { x: 0.0, y: 0.0 },
  { x: 1.0, y: 0.0 },
  { x: 0.5, y: Math.sqrt(3) / 2 },
]);

export const UNIT_QUAD_VERTICES: ReadonlyArray<Point2D> = Object.freeze([
  { x: -0.5, y: -0.5 },
  { x: 0.5, y: -0.5 },
  { x: 0.5, y: 0.5 },
  { x: -0.5, y: 0.5 },
]);
