/**
 * Scientific Engine Python Sci-Py Numerical Optimization & Interpolation Core Module
 * Spline interpolation, continuous optimization, Newton-Raphson root finding, Runge-Kutta 4th Order (RK4) ODE numerical solver, and Golden-Section search.
 */

export class EngineSciPyOptimizer {
  /**
   * 1D Cubic Interpolation between y1 and y2 given adjacent points y0 and y3.
   */
  public cubicInterpolation(y0: number, y1: number, y2: number, y3: number, mu: number): number {
    const mu2 = mu * mu;
    const a0 = y3 - y2 - y0 + y1;
    const a1 = y0 - y1 - a0;
    const a2 = y2 - y0;
    const a3 = y1;
    return a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;
  }

  /**
   * Catmull-Rom Spline Interpolation with C1 continuous velocity tangents.
   * Parameter t is normalized in [0, 1] between p1 and p2.
   */
  public catmullRomInterpolation(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (
      (2 * p1) +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    );
  }

  /**
   * Newton-Raphson Numerical Root Finding:
   * Solves f(x) = 0 starting from initial guess x0.
   * x_{n+1} = x_n - f(x_n) / f'(x_n)
   */
  public newtonRaphson(
    f: (x: number) => number,
    fPrime: (x: number) => number,
    x0: number,
    tolerance: number = 1e-7,
    maxIterations: number = 50
  ): number {
    let x = x0;
    for (let i = 0; i < maxIterations; i++) {
      const y = f(x);
      const dy = fPrime(x);
      if (Math.abs(dy) < 1e-12) break; // Avoid division by zero at inflection
      const nextX = x - y / dy;
      if (Math.abs(nextX - x) < tolerance) {
        return nextX;
      }
      x = nextX;
    }
    return x;
  }

  /**
   * Classical Runge-Kutta 4th Order (RK4) Numerical ODE Solver:
   * Solves dy/dt = f(t, y) from t0 to t0 + h.
   */
  public rk4Step(
    f: (t: number, y: number) => number,
    t: number,
    y: number,
    h: number
  ): number {
    const k1 = f(t, y);
    const k2 = f(t + 0.5 * h, y + 0.5 * h * k1);
    const k3 = f(t + 0.5 * h, y + 0.5 * h * k2);
    const k4 = f(t + h, y + h * k3);

    return y + (h / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4);
  }

  /**
   * Golden-Section Search for unimodal minimum optimization in [a, b].
   */
  public goldenSectionSearchMin(
    f: (x: number) => number,
    a: number,
    b: number,
    tolerance: number = 1e-5
  ): number {
    const phi = (Math.sqrt(5) - 1) / 2; // ~0.6180339887
    let x1 = b - phi * (b - a);
    let x2 = a + phi * (b - a);
    let f1 = f(x1);
    let f2 = f(x2);

    while (Math.abs(b - a) > tolerance) {
      if (f1 < f2) {
        b = x2;
        x2 = x1;
        f2 = f1;
        x1 = b - phi * (b - a);
        f1 = f(x1);
      } else {
        a = x1;
        x1 = x2;
        f1 = f2;
        x2 = a + phi * (b - a);
        f2 = f(x2);
      }
    }
    return (a + b) / 2;
  }
}

export const EngineSciPyOptimizerInstance = new EngineSciPyOptimizer();

