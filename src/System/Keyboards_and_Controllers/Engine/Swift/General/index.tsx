/**
 * Scientific Keyboards & Controllers Swift GameController Protocol Core Module
 * Protocol wrapper for GCController and haptic feedback pattern dispatcher.
 */



export class ControllerSwiftGameController {

  public triggerHapticPattern(intensity: number = 1.0, durationMs: number = 100): boolean {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(durationMs);
      return true;
    }
    return false;
  }
        
}

export const ControllerSwiftGameControllerInstance = new ControllerSwiftGameController();
