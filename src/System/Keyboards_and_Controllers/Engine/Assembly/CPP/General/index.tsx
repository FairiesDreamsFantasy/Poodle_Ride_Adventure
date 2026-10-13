/**
 * Scientific Keyboards & Controllers Assembly CPP Gamepad Deadzone Core Module
 * Gamepad axis deadzone templates and circular clamp mathematical filters.
 */



export class ControllerAssemblyCPPDeadzone {

  public applyCircularDeadzone(x: number, y: number, deadzone: number = 0.15): [number, number] {
    const mag = Math.sqrt(x*x + y*y);
    if (mag < deadzone) return [0, 0];
    const norm = (mag - deadzone) / (1 - deadzone);
    return [(x / mag) * norm, (y / mag) * norm];
  }
        
}

export const ControllerAssemblyCPPDeadzoneInstance = new ControllerAssemblyCPPDeadzone();
