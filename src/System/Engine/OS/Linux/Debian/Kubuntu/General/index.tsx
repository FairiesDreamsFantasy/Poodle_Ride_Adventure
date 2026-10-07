/**
 * Scientific Engine OS Linux Debian Kubuntu KDE Plasma Compositor Core Module
 * KDE Plasma graphical compositing, hardware accelerated effects, and Qt signal-slot pipelines.
 */



export class EngineKubuntuManager {

  public isHardwareCompositingEnabled(): boolean {
    return true;
  }
        
}

export const EngineKubuntuManagerInstance = new EngineKubuntuManager();
