/**
 * Scientific Visuals Engine Python Num-Py Vertex Tensor Core Module
 * Vertex coordinate tensors, affine transforms, polygon normal calculations, and quaternion algebra.
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion {
  w: number;
  x: number;
  y: number;
  z: number;
}

export class VisualsNumPyVertexTensor {
  /**
   * Euclidean vector cross product (v1 x v2).
   */
  public crossProduct(v1: [number, number, number], v2: [number, number, number]): [number, number, number] {
    return [
      v1[1]*v2[2] - v1[2]*v2[1],
      v1[2]*v2[0] - v1[0]*v2[2],
      v1[0]*v2[1] - v1[1]*v2[0]
    ];
  }

  /**
   * Vector dot product (a . b).
   */
  public dotProduct(a: [number, number, number], b: [number, number, number]): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  /**
   * Euclidean norm (magnitude) of a 3D coordinate vector.
   */
  public norm(v: [number, number, number]): number {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  /**
   * Normalizes a 3D vector to unit length (magnitude = 1.0).
   */
  public normalize(v: [number, number, number]): [number, number, number] {
    const mag = this.norm(v);
    if (mag <= 0.0000001) return [0, 0, 0];
    return [v[0] / mag, v[1] / mag, v[2] / mag];
  }

  /**
   * Calculates the angle in radians between two 3D vectors.
   */
  public angleBetween(a: [number, number, number], b: [number, number, number]): number {
    const magA = this.norm(a);
    const magB = this.norm(b);
    if (magA <= 0.0000001 || magB <= 0.0000001) return 0;
    const dot = this.dotProduct(a, b) / (magA * magB);
    return Math.acos(Math.max(-1, Math.min(1, dot)));
  }

  /**
   * 4x4 matrix multiplication: C = A * B.
   */
  public multiplyMatrix4x4(a: number[][], b: number[][]): number[][] {
    const result: number[][] = Array.from({ length: 4 }, () => new Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  /**
   * Multiplies a 4x4 transformation matrix by a 3D vector using homogeneous coordinates.
   */
  public transformPoint(m: number[][], v: [number, number, number]): [number, number, number] {
    const x = v[0] * m[0][0] + v[1] * m[0][1] + v[2] * m[0][2] + m[0][3];
    const y = v[0] * m[1][0] + v[1] * m[1][1] + v[2] * m[1][2] + m[1][3];
    const z = v[0] * m[2][0] + v[1] * m[2][1] + v[2] * m[2][2] + m[2][3];
    const w = v[0] * m[3][0] + v[1] * m[3][1] + v[2] * m[3][2] + m[3][3];
    if (Math.abs(w) > 0.0000001 && w !== 1) {
      return [x / w, y / w, z / w];
    }
    return [x, y, z];
  }

  /**
   * Creates a 4x4 Translation Matrix.
   */
  public createTranslationMatrix(tx: number, ty: number, tz: number): number[][] {
    return [
      [1, 0, 0, tx],
      [0, 1, 0, ty],
      [0, 0, 1, tz],
      [0, 0, 0, 1],
    ];
  }

  /**
   * Creates a 4x4 Scale Matrix.
   */
  public createScaleMatrix(sx: number, sy: number, sz: number): number[][] {
    return [
      [sx, 0, 0, 0],
      [0, sy, 0, 0],
      [0, 0, sz, 0],
      [0, 0, 0, 1],
    ];
  }

  /**
   * Spherical Linear Interpolation (SLERP) between two orientation quaternions.
   */
  public slerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
    let cosHalfTheta = q1.w * q2.w + q1.x * q2.x + q1.y * q2.y + q1.z * q2.z;
    let targetQ2 = { ...q2 };

    if (cosHalfTheta < 0) {
      targetQ2 = { w: -q2.w, x: -q2.x, y: -q2.y, z: -q2.z };
      cosHalfTheta = -cosHalfTheta;
    }

    if (cosHalfTheta >= 1.0) {
      return { ...q1 };
    }

    const halfTheta = Math.acos(cosHalfTheta);
    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
      return {
        w: q1.w * 0.5 + targetQ2.w * 0.5,
        x: q1.x * 0.5 + targetQ2.x * 0.5,
        y: q1.y * 0.5 + targetQ2.y * 0.5,
        z: q1.z * 0.5 + targetQ2.z * 0.5,
      };
    }

    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    return {
      w: q1.w * ratioA + targetQ2.w * ratioB,
      x: q1.x * ratioA + targetQ2.x * ratioB,
      y: q1.y * ratioA + targetQ2.y * ratioB,
      z: q1.z * ratioA + targetQ2.z * ratioB,
    };
  }
}

export const VisualsNumPyVertexTensorInstance = new VisualsNumPyVertexTensor();

