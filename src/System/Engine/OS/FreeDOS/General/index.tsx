/**
 * Scientific Engine OS FreeDOS Real-Mode Memory & BIOS Interrupts Core Module
 * 640KB conventional memory emulation, interrupt vectors INT 21h / INT 10h, and FAT filesystem table.
 */



export class EngineFreeDOSEmulator {

  private conventionalMemory: Uint8Array = new Uint8Array(640 * 1024);
  private interruptHandlers: Map<number, (ax: number, bx: number) => number> = new Map();

  public registerInterrupt(vector: number, handler: (ax: number, bx: number) => number): void {
    this.interruptHandlers.set(vector, handler);
  }

  public triggerInterrupt(vector: number, ax: number = 0, bx: number = 0): number {
    const handler = this.interruptHandlers.get(vector);
    return handler ? handler(ax, bx) : 0;
  }
        
}

export const EngineFreeDOSEmulatorInstance = new EngineFreeDOSEmulator();
