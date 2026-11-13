/**
 * System/Visuals/Index/Assembly/CSharp/General/index.tsx
 * Centralized visual subsystem registration ledger and readiness diagnostics.
 */

export interface VisualSubsystemStatus {
  name: string;
  active: boolean;
  revision: number;
}

export class VisualsIndexAssemblyCSharpRegistry {
  private entries: Map<string, VisualSubsystemStatus> = new Map();

  public registerSubsystem(name: string, active: boolean = true, revision: number = 1): void {
    this.entries.set(name, { name, active, revision });
  }

  public getAllStatuses(): VisualSubsystemStatus[] {
    return Array.from(this.entries.values());
  }

  public isAllHealthy(): boolean {
    for (const item of this.entries.values()) {
      if (!item.active) return false;
    }
    return true;
  }
}

export const VisualsIndexAssemblyCSharpInstance = new VisualsIndexAssemblyCSharpRegistry();
