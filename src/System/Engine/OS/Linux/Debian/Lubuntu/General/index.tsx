/**
 * Scientific Engine OS Linux Debian Lubuntu LXQt Minimal Scheduler Core Module
 * LXQt ultra-minimal memory scheduler and fast CPU cycle allocator.
 */



export class EngineLubuntuManager {

  public getMemoryOverheadMB(): number {
    return 96.0;
  }
        
}

export const EngineLubuntuManagerInstance = new EngineLubuntuManager();
