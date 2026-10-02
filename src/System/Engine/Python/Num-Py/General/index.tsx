/**
 * Scientific Engine Python Num-Py Tensor Matrix Core Module
 * N-dimensional tensor operations, linear algebra, matrix multiplications, determinants, matrix inversion, and eigenvalue solvers.
 */

export class EngineNumPyMatrix {
  /**
   * Matrix dot product (multiplication): C = A * B.
   */
  public dot(a: number[][], b: number[][]): number[][] {
    const rowsA = a.length;
    const colsA = a[0].length;
    const colsB = b[0].length;
    const result: number[][] = Array.from({ length: rowsA }, () => new Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  }

  /**
   * Generates num evenly spaced numbers over [start, stop].
   */
  public linspace(start: number, stop: number, num: number): number[] {
    if (num <= 1) return [start];
    const step = (stop - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + step * i);
  }

  /**
   * Transposes a 2D matrix (M^T).
   */
  public transpose(m: number[][]): number[][] {
    const rows = m.length;
    const cols = m[0].length;
    const out: number[][] = Array.from({ length: cols }, () => new Array(rows).fill(0));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out[c][r] = m[r][c];
      }
    }
    return out;
  }

  /**
   * Calculates the determinant of a 2x2 or 3x3 square matrix.
   */
  public determinant(m: number[][]): number {
    const n = m.length;
    if (n === 1) return m[0][0];
    if (n === 2) {
      return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }
    if (n === 3) {
      return (
        m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
        m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
        m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
      );
    }
    return 0; // Fallback for unsupported dimensions
  }

  /**
   * Calculates the analytical inverse of a 3x3 matrix using the classical adjoint method.
   */
  public invert3x3(m: number[][]): number[][] | null {
    const det = this.determinant(m);
    if (Math.abs(det) < 1e-10) return null; // Singular matrix, non-invertible

    const invDet = 1.0 / det;
    const inv: number[][] = Array.from({ length: 3 }, () => new Array(3).fill(0));

    inv[0][0] = (m[1][1] * m[2][2] - m[1][2] * m[2][1]) * invDet;
    inv[0][1] = (m[0][2] * m[2][1] - m[0][1] * m[2][2]) * invDet;
    inv[0][2] = (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * invDet;

    inv[1][0] = (m[1][2] * m[2][0] - m[1][0] * m[2][2]) * invDet;
    inv[1][1] = (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * invDet;
    inv[1][2] = (m[0][2] * m[1][0] - m[0][0] * m[1][2]) * invDet;

    inv[2][0] = (m[1][0] * m[2][1] - m[1][1] * m[2][0]) * invDet;
    inv[2][1] = (m[0][1] * m[2][0] - m[0][0] * m[2][1]) * invDet;
    inv[2][2] = (m[0][0] * m[1][1] - m[0][1] * m[1][0]) * invDet;

    return inv;
  }

  /**
   * Approximates the dominant eigenvalue and eigenvector of a symmetric matrix
   * using Power Iteration.
   */
  public powerIteration(m: number[][], iterations: number = 20): { eigenvalue: number; eigenvector: number[] } {
    const n = m.length;
    let b: number[] = new Array(n).fill(1 / Math.sqrt(n));

    let eigenvalue = 0;

    for (let it = 0; it < iterations; it++) {
      // Calculate m * b
      const nextB = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          nextB[i] += m[i][j] * b[j];
        }
      }

      // Calculate Rayleigh quotient (eigenvalue estimate)
      let bDotNextB = 0;
      let bDotB = 0;
      for (let i = 0; i < n; i++) {
        bDotNextB += b[i] * nextB[i];
        bDotB += b[i] * b[i];
      }
      eigenvalue = bDotNextB / (bDotB || 1);

      // Normalize nextB to unit vector
      let norm = 0;
      for (let i = 0; i < n; i++) {
        norm += nextB[i] * nextB[i];
      }
      norm = Math.sqrt(norm);
      if (norm < 1e-12) break;

      for (let i = 0; i < n; i++) {
        b[i] = nextB[i] / norm;
      }
    }

    return { eigenvalue, eigenvector: b };
  }
}

export const EngineNumPyMatrixInstance = new EngineNumPyMatrix();

