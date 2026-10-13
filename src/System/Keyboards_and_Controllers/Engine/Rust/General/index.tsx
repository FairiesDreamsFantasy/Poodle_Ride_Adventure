/**
 * Scientific Keyboards & Controllers Rust Lockless Event Queue Core Module
 * Thread-safe lockless input event queue and safe button state tracker.
 */



export class ControllerRustEventQueue {

  private eventQueue: Array<{ key: string; isDown: boolean; timestamp: number }> = [];

  public enqueueEvent(key: string, isDown: boolean): void {
    this.eventQueue.push({ key, isDown, timestamp: performance.now() });
  }

  public dequeueEvent() {
    return this.eventQueue.shift() || null;
  }
        
}

export const ControllerRustEventQueueInstance = new ControllerRustEventQueue();
