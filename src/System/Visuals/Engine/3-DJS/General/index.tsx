/**
 * Scientific Visuals Engine 3-DJS Mesh Transformation Core Module
 * 3D mesh vertex transformation, normal vector calculations, perspective camera projections, and spline trajectories.
 */

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface AABB3D {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
}

export class Visuals3DJSMeshEngine {
  /**
   * Planar rotation around Y axis.
   */
  public rotateY(x: number, z: number, angleRad: number): [number, number] {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return [x * cos + z * sin, -x * sin + z * cos];
  }

  /**
   * Planar rotation around X axis (pitch).
   */
  public rotateX(y: number, z: number, angleRad: number): [number, number] {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return [y * cos - z * sin, y * sin + z * cos];
  }

  /**
   * Planar rotation around Z axis (roll).
   */
  public rotateZ(x: number, y: number, angleRad: number): [number, number] {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return [x * cos - y * sin, x * sin + y * cos];
  }

  /**
   * Complete 3-Axis Euler Rotation in (Yaw, Pitch, Roll) sequence.
   */
  public rotateEuler3D(p: Point3D, yawRad: number, pitchRad: number, rollRad: number): Point3D {
    // 1. Rotate Y (Yaw)
    const [x1, z1] = this.rotateY(p.x, p.z, yawRad);
    // 2. Rotate X (Pitch)
    const [y2, z2] = this.rotateX(p.y, z1, pitchRad);
    // 3. Rotate Z (Roll)
    const [x3, y3] = this.rotateZ(x1, y2, rollRad);
    return { x: x3, y: y3, z: z2 };
  }

  /**
   * True Perspective Vanishing-Point Projection from 3D world space to 2D screen space:
   * x_screen = (x * focalLength) / (z + focalLength) + centerX
   * y_screen = (y * focalLength) / (z + focalLength) + centerY
   */
  public projectPerspective(
    point: Point3D,
    focalLength: number,
    centerX: number,
    centerY: number
  ): Point2D | null {
    const depth = point.z + focalLength;
    if (depth <= 0.1) {
      // Point is behind camera or at clipping plane
      return null;
    }
    const scale = focalLength / depth;
    return {
      x: point.x * scale + centerX,
      y: point.y * scale + centerY,
    };
  }

  /**
   * Evaluates a 3D Cubic Bézier Spline trajectory at parameter t in [0, 1].
   * B(t) = (1-t)^3 * P0 + 3(1-t)^2 * t * P1 + 3(1-t) * t^2 * P2 + t^3 * P3
   */
  public evaluateCubicBezier(p0: Point3D, p1: Point3D, p2: Point3D, p3: Point3D, t: number): Point3D {
    const clampedT = Math.max(0, Math.min(1, t));
    const oneMinusT = 1.0 - clampedT;
    const t2 = clampedT * clampedT;
    const t3 = t2 * clampedT;
    const oneMinusT2 = oneMinusT * oneMinusT;
    const oneMinusT3 = oneMinusT2 * oneMinusT;

    const c0 = oneMinusT3;
    const c1 = 3 * oneMinusT2 * clampedT;
    const c2 = 3 * oneMinusT * t2;
    const c3 = t3;

    return {
      x: c0 * p0.x + c1 * p1.x + c2 * p2.x + c3 * p3.x,
      y: c0 * p0.y + c1 * p1.y + c2 * p2.y + c3 * p3.y,
      z: c0 * p0.z + c1 * p1.z + c2 * p2.z + c3 * p3.z,
    };
  }

  /**
   * Axis-Aligned Bounding Box (AABB) View Frustum Culling Test.
   * Returns true if bounding box intersects camera view depth bounds.
   */
  public isAABBInFrustum(box: AABB3D, nearZ: number, farZ: number): boolean {
    if (box.maxZ < nearZ) return false;
    if (box.minZ > farZ) return false;
    return true;
  }
}

export const Visuals3DJSMeshEngineInstance = new Visuals3DJSMeshEngine();

