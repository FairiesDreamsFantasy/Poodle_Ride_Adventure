/**
 * Scientific Sound Engine Assembly CSharp Audio Event Dispatcher Core Module
 * Audio bus delegates, volume property bindings, and ducking event channels.
 */



export class SoundAssemblyCSharpEvents {

  private volumeBindings: Map<string, number> = new Map();

  public setBusVolume(bus: string, volume: number): void {
    this.volumeBindings.set(bus, Math.max(0.0, Math.min(1.0, volume)));
  }

  public getBusVolume(bus: string): number {
    return this.volumeBindings.get(bus) ?? 1.0;
  }
        
}

export const SoundAssemblyCSharpEventsInstance = new SoundAssemblyCSharpEvents();
