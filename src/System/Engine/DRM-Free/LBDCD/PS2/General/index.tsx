/**
 * Scientific LBDCD PS2 Core Module
 * Legacy PS/2 port emulated interrupt lines.
 */



export class LBDCDPS2Manager {

  public triggerInterrupt(vector: number): void {}
        
}

export const LBDCDPS2ManagerInstance = new LBDCDPS2Manager();
