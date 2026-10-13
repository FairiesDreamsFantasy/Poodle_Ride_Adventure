/**
 * System/AI/In-Game/Category/UI/Play_Area/General/index.tsx
 * 
 * Dedicated Play Area AI Pipeline.
 * Coordinates Play Area runtime orchestration, gameplay lifecycle evaluation,
 * viewport spatial boundaries, and decoupled modal/overlay state management.
 * 
 * Features:
 * 1. Gameplay Activity Evaluation: Deterministic checking of active gameplay vs modal/overlay states.
 * 2. Canvas Spatial Constraints: Coordinate bounding, viewport aspect ratio enforcement, and area transitions.
 * 3. Decoupled UI State Management: Handles clean transitions between HUD, Landing, Inventory, Selection, and Storybook.
 * 4. Context-Aware Audio & Speech Coordination: Prevents audio clipping or overlap during viewport modal transitions.
 */

export interface PlayAreaGameplayState {
  showLanding: boolean;
  isGameOver: boolean;
  isLevelComplete: boolean;
  showAd: boolean;
  isInventoryOpen: boolean;
  isPoodleSelectionOpen: boolean;
  isPaused: boolean;
  isKeyboardModalOpen: boolean;
  isStorybookOpen: boolean;
}

export interface PlayAreaViewportDimensions {
  width: number;
  height: number;
  canvasAspect: number;
  gridSize: number;
}

export interface PlayAreaTransitionResult {
  canRenderWorld: boolean;
  activeOverlay: string | null;
  suppressWorldMovement: boolean;
  suppressWorldAudio: boolean;
}

/**
 * Standard Play Area Viewport Constants
 */
export const PLAY_AREA_DEFAULT_VIEWPORT: PlayAreaViewportDimensions = {
  width: 800,
  height: 600,
  canvasAspect: 4 / 3,
  gridSize: 20,
};

/**
 * Evaluates whether standard gameplay is active or if an overlay/modal takes precedence.
 */
export const evaluatePlayAreaActivity = (
  state: PlayAreaGameplayState
): PlayAreaTransitionResult => {
  if (state.showLanding) {
    return {
      canRenderWorld: false,
      activeOverlay: 'LandingPage',
      suppressWorldMovement: true,
      suppressWorldAudio: true,
    };
  }

  if (state.showAd) {
    return {
      canRenderWorld: false,
      activeOverlay: 'InterstitialAd',
      suppressWorldMovement: true,
      suppressWorldAudio: true,
    };
  }

  if (state.isGameOver) {
    return {
      canRenderWorld: false,
      activeOverlay: 'FinalScore',
      suppressWorldMovement: true,
      suppressWorldAudio: false,
    };
  }

  if (state.isLevelComplete) {
    return {
      canRenderWorld: false,
      activeOverlay: 'ThanksForPlaying',
      suppressWorldMovement: true,
      suppressWorldAudio: false,
    };
  }

  if (state.isPaused) {
    return {
      canRenderWorld: true,
      activeOverlay: 'PauseMenu',
      suppressWorldMovement: true,
      suppressWorldAudio: false,
    };
  }

  if (state.isStorybookOpen) {
    return {
      canRenderWorld: true,
      activeOverlay: 'Storybook',
      suppressWorldMovement: true,
      suppressWorldAudio: false,
    };
  }

  if (state.isPoodleSelectionOpen) {
    return {
      canRenderWorld: true,
      activeOverlay: 'PoodleSelection',
      suppressWorldMovement: true,
      suppressWorldAudio: false,
    };
  }

  if (state.isInventoryOpen) {
    return {
      canRenderWorld: true,
      activeOverlay: 'Inventory',
      suppressWorldMovement: true,
      suppressWorldAudio: false,
    };
  }

  if (state.isKeyboardModalOpen) {
    return {
      canRenderWorld: true,
      activeOverlay: 'KeyboardModal',
      suppressWorldMovement: true,
      suppressWorldAudio: false,
    };
  }

  return {
    canRenderWorld: true,
    activeOverlay: null,
    suppressWorldMovement: false,
    suppressWorldAudio: false,
  };
};

/**
 * Calculates clamped viewport coordinates to guarantee entity rendering remains inside canvas bounds.
 */
export const clampPlayAreaCoordinates = (
  x: number,
  y: number,
  maxX: number = PLAY_AREA_DEFAULT_VIEWPORT.width,
  maxY: number = PLAY_AREA_DEFAULT_VIEWPORT.height,
  margin: number = 0
): { x: number; y: number } => {
  return {
    x: Math.max(margin, Math.min(maxX - margin, x)),
    y: Math.max(margin, Math.min(maxY - margin, y)),
  };
};

/**
 * Dispatches targeted speech announcements for Play Area lifecycle state shifts.
 */
export const handlePlayAreaLifecycleAnnouncement = (
  event: 'PAUSE' | 'RESUME' | 'LEVEL_COMPLETE' | 'GAME_OVER' | 'LANDING_START',
  speak: (text: string, locale?: string) => void
): void => {
  switch (event) {
    case 'PAUSE':
      speak('Game Paused', 'EN_US');
      break;
    case 'RESUME':
      speak('Resuming Adventure', 'EN_US');
      break;
    case 'LEVEL_COMPLETE':
      speak('Level Complete! Fantastic Job!', 'EN_US');
      break;
    case 'GAME_OVER':
      speak('Game Over. Final Score Calculated.', 'EN_US');
      break;
    case 'LANDING_START':
      speak('Welcome to Poodle Ride Adventure', 'EN_US');
      break;
    default:
      break;
  }
};
