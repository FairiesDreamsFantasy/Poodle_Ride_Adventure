/**
 * Scientific Keyboards & Controllers Assembly CSharp Action Mapping Core Module
 * Input action mapping delegates and button binding event routers.
 */



export class ControllerAssemblyCSharpActions {

  private actionBindings: Map<string, Array<() => void>> = new Map();

  public bindAction(action: string, callback: () => void): void {
    const list = this.actionBindings.get(action) || [];
    list.push(callback);
    this.actionBindings.set(action, list);
  }

  public triggerAction(action: string): void {
    (this.actionBindings.get(action) || []).forEach(cb => cb());
  }
        
}

export const ControllerAssemblyCSharpActionsInstance = new ControllerAssemblyCSharpActions();
