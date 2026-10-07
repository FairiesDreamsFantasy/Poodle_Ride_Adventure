/**
 * Scientific Keyboards & Controllers Cotlin Reactive Flows Core Module
 * Reactive input flow channels and button gesture finite state machine.
 */



export class ControllerCotlinFlows {

  private isNumpadActive: boolean = true;

  public setNumpadJoystickMode(enabled: boolean): void {
    this.isNumpadActive = enabled;
  }

  public isNumpadJoystickEnabled(): boolean {
    return this.isNumpadActive;
  }
        
}

export const ControllerCotlinFlowsInstance = new ControllerCotlinFlows();
