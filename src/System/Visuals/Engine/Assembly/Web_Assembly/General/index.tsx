/**
 * Scientific Visuals Engine Assembly Web_Assembly Transform Matrix Core Module
 * Native 2D affine matrix point transformation, matrix multiplication,
 * 2x2 determinant & inversion, and perspective vanishing-point projection.
 */

export type AffineMatrix2D = [number, number, number, number, number, number]; // [a, b, c, d, tx, ty]

export class VisualsAssemblyWasmTransform {
  public transformPoint2D(
    x: number,
    y: number,
    a: number,
    b: number,
    c: number,
    d: number,
    tx: number,
    ty: number
  ): [number, number] {
    return [a * x + c * y + tx, b * x + d * y + ty];
  }

  public createRotationTranslation(angleRad: number, tx: number, ty: number, scale: number = 1): AffineMatrix2D {
    const cos = Math.cos(angleRad) * scale;
    const sin = Math.sin(angleRad) * scale;
    return [cos, sin, -sin, cos, tx, ty];
  }

  public multiplyAffine(m1: AffineMatrix2D, m2: AffineMatrix2D): AffineMatrix2D {
    const [a1, b1, c1, d1, tx1, ty1] = m1;
    const [a2, b2, c2, d2, tx2, ty2] = m2;
    return [
      a1 * a2 + c1 * b2,
      b1 * a2 + d1 * b2,
      a1 * c2 + c1 * d2,
      b1 * c2 + d1 * d2,
      a1 * tx2 + c1 * ty2 + tx1,
      b1 * tx2 + d1 * ty2 + ty1,
    ];
  }

  public determinant2x2(a: number, b: number, c: number, d: number): number {
    return a * d - b * c;
  }

  public invertAffine(m: AffineMatrix2D): AffineMatrix2D | null {
    const [a, b, c, d, tx, ty] = m;
    const det = this.determinant2x2(a, b, c, d);
    if (Math.abs(det) < 1e-12) return null;
    const invDet = 1.0 / det;
    const ia = d * invDet;
    const ib = -b * invDet;
    const ic = -c * invDet;
    const id = a * invDet;
    return [ia, ib, ic, id, -(ia * tx + ic * ty), -(ib * tx + id * ty)];
  }

  public projectPerspective3D(
    x: number,
    y: number,
    z: number,
    focalLength: number = 500,
    centerX: number = 0,
    centerY: number = 0
  ): { screenX: number; screenY: number; scale: number } {
    const depth = Math.max(1e-3, focalLength + z);
    const scale = focalLength / depth;
    return {
      screenX: centerX + x * scale,
      screenY: centerY + y * scale,
      scale,
    };
  }
}

export const VisualsAssemblyWasmTransformInstance = new VisualsAssemblyWasmTransform();
