/**
 * CPU Logic - Virtualization Support
 */
export class CPULogic {
  private static instance: CPULogic;

  public static getInstance(): CPULogic {
    if (!CPULogic.instance) {
      CPULogic.instance = new CPULogic();
    }
    return CPULogic.instance;
  }

  public getModelName(): string {
    return "Emulated Virtual Core";
  }

  public getClockSpeed(): string {
    return "3.2 GHz";
  }
}

export const cpu = CPULogic.getInstance();
