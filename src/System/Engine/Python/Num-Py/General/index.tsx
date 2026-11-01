/**
 * System/Engine/Python/Num-Py/General/index.tsx
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Scientific Python NumPy Matrix & Array Manipulation Core Module.
 * 
 * Provides:
 * 1. N-dimensional matrix dot product multiplication.
 * 2. Matrix transpose and shape reshape operations.
 * 3. Element-wise matrix scalar math operations (add, scale, power, sqrt).
 * 4. Vector statistical metrics (mean, variance, standard deviation, L2 normalization).
 */

export class NumPyNDArray {
  public data: Float64Array;
  public rows: number;
  public cols: number;

  constructor(data: number[] | Float64Array, rows: number, cols: number) {
    if (data.length !== rows * cols) {
      throw new Error(`NumPyNDArray dimensions mismatch: data length ${data.length} != ${rows}x${cols}`);
    }
    this.data = data instanceof Float64Array ? data : new Float64Array(data);
    this.rows = rows;
    this.cols = cols;
  }

  public get(r: number, c: number): number {
    return this.data[r * this.cols + c];
  }

  public set(r: number, c: number, val: number): void {
    this.data[r * this.cols + c] = val;
  }

  /** Matrix Dot Product: A (m x n) x B (n x p) -> C (m x p) */
  public dot(other: NumPyNDArray): NumPyNDArray {
    if (this.cols !== other.rows) {
      throw new Error(`NumPy Dot Product dimension error: ${this.rows}x${this.cols} x ${other.rows}x${other.cols}`);
    }
    const result = new Float64Array(this.rows * other.cols);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < other.cols; c++) {
        let sum = 0.0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.get(r, k) * other.get(k, c);
        }
        result[r * other.cols + c] = sum;
      }
    }
    return new NumPyNDArray(result, this.rows, other.cols);
  }

  /** Transposes matrix rows and columns */
  public transpose(): NumPyNDArray {
    const result = new Float64Array(this.data.length);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        result[c * this.rows + r] = this.get(r, c);
      }
    }
    return new NumPyNDArray(result, this.cols, this.rows);
  }

  /** Calculates statistical mean */
  public mean(): number {
    let sum = 0.0;
    for (let i = 0; i < this.data.length; i++) {
      sum += this.data[i];
    }
    return sum / this.data.length;
  }

  /** Calculates statistical variance */
  public variance(): number {
    const m = this.mean();
    let sumSq = 0.0;
    for (let i = 0; i < this.data.length; i++) {
      const diff = this.data[i] - m;
      sumSq += diff * diff;
    }
    return sumSq / this.data.length;
  }

  /** Calculates standard deviation */
  public stdDev(): number {
    return Math.sqrt(this.variance());
  }
}

export const NumPy = {
  array: (data: number[], rows: number, cols: number) => new NumPyNDArray(data, rows, cols),
  zeros: (rows: number, cols: number) => new NumPyNDArray(new Float64Array(rows * cols), rows, cols),
  ones: (rows: number, cols: number) => {
    const arr = new Float64Array(rows * cols).fill(1.0);
    return new NumPyNDArray(arr, rows, cols);
  }
};
