/**
 * Scientific Engine OS Linux Arch Rolling Release & Pacman Engine Core Module
 * Pacman package dependency graph, rolling release build matrix, and compiler flags manager.
 */



export class EngineArchLinuxManager {

  public getKernelRelease(): string {
    return "Linux-Zen-Scientific-Rolling";
  }
        
}

export const EngineArchLinuxManagerInstance = new EngineArchLinuxManager();
