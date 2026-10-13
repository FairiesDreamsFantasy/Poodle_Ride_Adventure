/**
 * Scientific Engine ASP Active Server Component Engine Core Module
 * Application state caching, component lifecycles, and view pipeline coordination.
 */



export class EngineASPPipeline {

  private appState: Map<string, any> = new Map();

  public setAppState(key: string, value: any): void {
    this.appState.set(key, value);
  }

  public getAppState(key: string): any {
    return this.appState.get(key);
  }
        
}

export const EngineASPPipelineInstance = new EngineASPPipeline();
