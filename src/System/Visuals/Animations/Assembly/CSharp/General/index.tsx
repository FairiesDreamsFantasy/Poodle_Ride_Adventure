/**
 * System/Visuals/Animations/Assembly/CSharp/General/index.tsx
 * Animation timeline state machine, gait cadence lock (300ms / 400ms), and transition events.
 */

export type AnimTimelineState = 'idle' | 'walk' | 'slow_walk' | 'gallop' | 'jump';

export class VisualsAnimationsAssemblyCSharpTimeline {
  private currentState: AnimTimelineState = 'idle';

  public setState(state: AnimTimelineState): void {
    this.currentState = state;
  }

  public getState(): AnimTimelineState {
    return this.currentState;
  }

  /** Computes 1-2-3 gallop beat phase in [0, 1) preserving 300ms (Abigail) or 400ms (Abigay/Anninne) cadence */
  public evaluateGallopBeatPhase(elapsedMs: number, intervalMs: 300 | 400): { beatIndex: 0 | 1 | 2; phase: number } {
    const cycleMs = intervalMs * 3;
    const mod = ((elapsedMs % cycleMs) + cycleMs) % cycleMs;
    const beatIndex = Math.min(2, Math.floor(mod / intervalMs)) as 0 | 1 | 2;
    const phase = (mod % intervalMs) / intervalMs;
    return { beatIndex, phase };
  }
}

export const VisualsAnimationsAssemblyCSharpInstance = new VisualsAnimationsAssemblyCSharpTimeline();
