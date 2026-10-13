/**
 * Scientific Visuals Engine ASP Visual View State Core Module
 * Visual view state caching and dynamic layer compositor pipeline.
 */



export class VisualsASPViewState {

  private cachedState: Map<string, any> = new Map();

  public saveState(key: string, val: any): void {
    this.cachedState.set(key, val);
  }

  public loadState(key: string) {
    return this.cachedState.get(key);
  }
        
}

export const VisualsASPViewStateInstance = new VisualsASPViewState();
