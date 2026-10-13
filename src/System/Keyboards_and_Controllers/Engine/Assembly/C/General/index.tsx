/**
 * Scientific Keyboards & Controllers Assembly C Scancode Poller Core Module
 * Raw hardware scancode bitmask parser and non-blocking input ring polling.
 */



export class ControllerAssemblyCPoller {

  private keyBitmask: number = 0;

  public setKeyBit(bitIndex: number, pressed: boolean): void {
    if (pressed) {
      this.keyBitmask |= (1 << bitIndex);
    } else {
      this.keyBitmask &= ~(1 << bitIndex);
    }
  }

  public isBitSet(bitIndex: number): boolean {
    return (this.keyBitmask & (1 << bitIndex)) !== 0;
  }
        
}

export const ControllerAssemblyCPollerInstance = new ControllerAssemblyCPoller();
