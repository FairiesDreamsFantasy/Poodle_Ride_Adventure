/**
 * Scientific Keyboards & Controllers Assembly Web_Assembly Rotation Delta Core Module
 * Native WebAssembly continuous joystick rotation delta and projection calculation.
 */



export class ControllerAssemblyWasmDelta {

  public computeRotationDelta(turnRateDeg: number, dtSec: number, dir: -1 | 1): number {
    return dir * turnRateDeg * dtSec;
  }
        
}

export const ControllerAssemblyWasmDeltaInstance = new ControllerAssemblyWasmDelta();
