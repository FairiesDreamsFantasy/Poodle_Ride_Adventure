import { checkForGameUpdates, VersionCheckResult } from '../Updates/Version_Check';

export interface MaintenanceEngineState {
  isChecking: boolean;
  lastCheckResult: VersionCheckResult | null;
  autoCheckEnabled: boolean;
}

class MaintenanceEngineClass {
  private state: MaintenanceEngineState = {
    isChecking: false,
    lastCheckResult: null,
    autoCheckEnabled: true,
  };

  public async checkUpdates(): Promise<VersionCheckResult> {
    this.state.isChecking = true;
    try {
      const result = await checkForGameUpdates();
      this.state.lastCheckResult = result;
      return result;
    } finally {
      this.state.isChecking = false;
    }
  }

  public getState(): MaintenanceEngineState {
    return { ...this.state };
  }
}

export const MaintenanceEngine = new MaintenanceEngineClass();
export default MaintenanceEngine;
