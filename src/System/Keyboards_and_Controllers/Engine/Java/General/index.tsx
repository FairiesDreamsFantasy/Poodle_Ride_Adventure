/**
 * Scientific Keyboards & Controllers Java Listener Queue Core Module
 * Synchronized key listener event queue and atomic input state tracker.
 */



export class ControllerJavaListenerQueue {

  private listeners: Set<(event: KeyboardEvent) => void> = new Set();

  public addListener(listener: (event: KeyboardEvent) => void): void {
    this.listeners.add(listener);
  }

  public removeListener(listener: (event: KeyboardEvent) => void): void {
    this.listeners.delete(listener);
  }
        
}

export const ControllerJavaListenerQueueInstance = new ControllerJavaListenerQueue();
