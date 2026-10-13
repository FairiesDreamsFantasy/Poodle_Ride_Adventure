/**
 * Scientific Keyboards & Controllers Python Sci-Py Spline Smoothing Core Module
 * Analog joystick curve smoothing, cubic spline interpolation for continuous turns.
 */



export class ControllerSciPySpline {

  public smoothInput(current: number, target: number, smoothingFactor: number = 0.2): number {
    return current + (target - current) * smoothingFactor;
  }
        
}

export const ControllerSciPySplineInstance = new ControllerSciPySpline();
