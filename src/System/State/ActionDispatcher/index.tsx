import { GameState } from '../../InputTypes';
import { Area } from '../../Engine/Core/Types/Areas';

/**
 * ActionDispatcher handles standardized state transitions.
 * This prevents fragmented logic across the UI components.
 */
export class ActionDispatcher {
  
  /**
   * Safe area transition logic.
   */
  static transitionToArea(
    setGameState: (updater: (prev: GameState) => GameState) => void,
    newArea: Area,
    originX: number,
    originY: number
  ) {
    setGameState(prev => ({
      ...prev,
      area: newArea,
      gridX: originX,
      gridY: originY,
      targetSpeed: 0,
      isTransitioning: true
    }));

    // Reset transition flag after a delay
    setTimeout(() => {
      setGameState(prev => ({ ...prev, isTransitioning: false }));
    }, 500);
  }

  /**
   * Updates player rotation with safe bounds.
   */
  static updateRotation(
    setGameState: (updater: (prev: GameState) => GameState) => void,
    newRotation: number
  ) {
    const normalized = (newRotation + 360) % 360;
    setGameState(prev => ({ ...prev, rotation: normalized }));
  }
}

export * from './General';
