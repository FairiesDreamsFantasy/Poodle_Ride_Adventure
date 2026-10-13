import { GameState } from '../InputTypes';

/**
 * AutomationManager handles scripted sequences, cutscenes, and automated agent behaviors.
 * This system allows for "Director" style control over the game world.
 */
export class AutomationManager {
  private activeCutscene: string | null = null;
  private timeline: NodeJS.Timeout[] = [];

  /**
   * Starts a scripted sequence.
   * @param name The identifier for the cutscene.
   * @param actions A list of functions representing the sequence steps.
   */
  public startSequence(name: string, actions: { delay: number; run: () => void }[]) {
    this.stopAll();
    this.activeCutscene = name;

    actions.forEach(action => {
      const timer = setTimeout(() => {
        action.run();
      }, action.delay);
      this.timeline.push(timer);
    });
  }

  /**
   * Stops all running automations and clears the timeline.
   */
  public stopAll() {
    this.timeline.forEach(clearTimeout);
    this.timeline = [];
    this.activeCutscene = null;
  }

  /**
   * Returns whether a cutscene is currently playing.
   */
  public isPlaying(): boolean {
    return this.activeCutscene !== null;
  }

  /**
   * Helper to perform an automated move over duration.
   * (Placeholder for future physics-based interpolation)
   */
  public autoMove(
    setGameState: (updater: (prev: GameState) => GameState) => void,
    targetX: number,
    targetY: number,
    durationMs: number
  ) {
    // Basic linear interpolation logic would go here
    // For now, we'll just snap to target for the structure
    setGameState(prev => ({
      ...prev,
      gridX: targetX,
      gridY: targetY
    }));
  }
}
