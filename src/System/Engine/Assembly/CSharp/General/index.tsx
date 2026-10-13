/**
 * Scientific Engine Assembly CSharp LINQ & Multicast Delegates Core Module
 * LINQ declarative entity querying and multicast event pipelines.
 */



export class EngineAssemblyCSharpManager {

  private delegates: Map<string, Array<(...args: any[]) => void>> = new Map();

  public subscribe(event: string, handler: (...args: any[]) => void): void {
    const list = this.delegates.get(event) || [];
    list.push(handler);
    this.delegates.set(event, list);
  }

  public invoke(event: string, ...args: any[]): void {
    (this.delegates.get(event) || []).forEach(fn => fn(...args));
  }
        
}

export const EngineAssemblyCSharpManagerInstance = new EngineAssemblyCSharpManager();
