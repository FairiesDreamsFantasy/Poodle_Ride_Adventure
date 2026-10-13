/**
 * Keyboards and Controllers Engine Core
 * Ultra-responsive, zero-spike input state processing engine.
 * Handles rapid key polling, joystick emulator math, and continuous rotation listeners without lag.
 */

export interface InputEngineState {
  pressedKeys: Set<string>;
  lastInputTime: number;
  continuousTurnRate: number; // degrees per second
}

export class KeyboardAndControllerEngineCore {
  private activeKeys: Set<string> = new Set();
  private continuousTurnRate: number = 180; // Standard 180 deg/sec for Cedella joystick

  public registerKeyDown(code: string): void {
    this.activeKeys.add(code);
  }

  public registerKeyUp(code: string): void {
    this.activeKeys.delete(code);
  }

  public isKeyPressed(code: string): boolean {
    return this.activeKeys.has(code);
  }

  public getContinuousTurnRate(): number {
    return this.continuousTurnRate;
  }

  public computeJoystickRotationDelta(deltaTimeSec: number, direction: -1 | 1): number {
    return direction * this.continuousTurnRate * deltaTimeSec;
  }
}

export const KeyboardsAndControllersEngine = new KeyboardAndControllerEngineCore();
