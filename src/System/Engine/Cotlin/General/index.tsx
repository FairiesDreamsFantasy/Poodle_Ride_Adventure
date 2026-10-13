/**
 * Scientific Engine Cotlin Coroutines & State Flow Core Module
 * Coroutines, reactive state flows, and sealed state machines for core game execution.
 */



export class EngineCotlinManager {

  private activeJobs: Map<string, boolean> = new Map();

  public launchCoroutine(jobId: string, task: () => void): void {
    this.activeJobs.set(jobId, true);
    Promise.resolve().then(() => {
      if (this.activeJobs.get(jobId)) {
        task();
      }
    });
  }

  public cancelCoroutine(jobId: string): void {
    this.activeJobs.set(jobId, false);
    this.activeJobs.delete(jobId);
  }

  public isJobActive(jobId: string): boolean {
    return this.activeJobs.get(jobId) ?? false;
  }
        
}

export const EngineCotlinManagerInstance = new EngineCotlinManager();
