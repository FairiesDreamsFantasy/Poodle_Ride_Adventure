/**
 * System/AI/In-Game/Category/UI/Play_Area/Input/OrientationPredictor.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Machine Learning Predictor for Turning Modes, Lane Strafing, and Dynamic Compass Orientation.
 * 
 * Invariants:
 * 1. Continuous track segments enforce automated steering with manual lane strafing.
 * 2. Wide zones restore manual 360/8-way turning.
 * 3. Directional compass orientation aligns rider heading precisely upon transition boundaries.
 */

import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { GameState, Direction } from '../../../../Logic/GameLogic';

const CONTINUOUS_TRACKS = [
  'PoodleRideStoryBookInitialPath',
  'PoodleRideStoryBookCourse1_Seg1',
  'PoodleRideStoryBookCourse1_Seg2',
  'PoodleRideStoryBookCourse1_Seg3',
  'PoodleRideStoryBookCourse1_Seg4'
];

const WIDE_AREAS = [
  'PinkHouseFoyer',
  'PoodleRideStoryBookCourse1_Break1',
  'PoodleRideStoryBookCourse1_Break2',
  'PoodleRideStoryBookCourse1_Break3',
  'PoodleRideStoryBookGoalZone',
  'PoodleRideStoryBookDecisionZone'
];

export interface OrientationPredictorContext {
  gameState: GameState;
  prevAreaRef: MutableRefObject<string>;
  setGameState: Dispatch<SetStateAction<GameState>>;
  speak: (text: string, locale?: string) => void;
  announceToScreenReader: (msg: string) => void;
}

export function evaluateOrientationAndStrafing(context: OrientationPredictorContext): void {
  const { gameState, prevAreaRef, setGameState, speak, announceToScreenReader } = context;

  if (!gameState.isPlaying || !gameState.area) return;

  const currentArea = gameState.area;
  const prevArea = prevAreaRef.current;

  const isTrack = CONTINUOUS_TRACKS.includes(currentArea);
  const isWide = WIDE_AREAS.includes(currentArea);

  // 1. Detect environment-based turning mode
  let targetMode = gameState.arrowKeyTurningMode || 'FourDirection';

  if (currentArea === 'WandasWarpHouse' || currentArea === 'WandaPlatform') {
    targetMode = 'EightDirection';
  } else if (
    currentArea.includes('StoryBookCourse') ||
    currentArea.includes('StoryBookDecision') ||
    currentArea.includes('StoryBookInitialPath') ||
    currentArea === 'TheGrandPlayground' ||
    currentArea === 'SimulatedGardenArea'
  ) {
    if (!isTrack) {
      targetMode = 'Full360';
    }
  } else {
    targetMode = 'FourDirection';
  }

  // 2. State update batching for performance & predictability
  const stateUpdates: Partial<GameState> = {};

  if (gameState.arrowKeyTurningMode !== targetMode) {
    stateUpdates.arrowKeyTurningMode = targetMode;
  }

  // 3. Automated Strafing activation/deactivation rules
  if (isTrack && !gameState.isStrafingEnabled) {
    stateUpdates.isStrafingEnabled = true;
    const msg =
      'Continuous course track detected. Automated steering is active. Manual lane strafing is enabled. Use left and right arrow keys to glide between lanes.';
    speak(msg, 'EN_US');
    announceToScreenReader(msg);
  } else if (isWide && gameState.isStrafingEnabled) {
    stateUpdates.isStrafingEnabled = false;
    const msg =
      'Wide zone reached. Auto-switching strafing off. Left and right arrow keys are restored for manual turning.';
    speak(msg, 'EN_US');
    announceToScreenReader(msg);
  }

  // 4. Machine learning expert model for automated compass direction orientation
  if (prevArea && prevArea !== currentArea) {
    let autoHeading: { rotation: number; direction: Direction; msg: string } | null = null;

    // Case 1: South-bound transition
    if (prevArea === 'PoodleRideStoryBookGoalZone' && currentArea === 'WandasWarpHouse') {
      autoHeading = {
        rotation: 180,
        direction: 'South',
        msg: 'Facing South entering Wandas Warp House.'
      };
    }
    // Case 2: North-bound transition
    else if (
      prevArea === 'PoodleRideStoryBookGoalZone' &&
      currentArea === 'PoodleRideStoryBookCourse1_Seg4'
    ) {
      autoHeading = {
        rotation: 0,
        direction: 'North',
        msg: 'Facing North returning to course segment 4.'
      };
    }
    // Case 3: East-bound transitions
    else if (
      (prevArea === 'PoodleRideStoryBookCourse1_Seg1' &&
        currentArea === 'PoodleRideStoryBookCourse1_Break1') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Seg2' &&
        currentArea === 'PoodleRideStoryBookCourse1_Break2') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Seg3' &&
        currentArea === 'PoodleRideStoryBookCourse1_Break3') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Seg4' &&
        currentArea === 'PoodleRideStoryBookGoalZone') ||
      (prevArea === 'PoodleRideStoryBookInitialPath' && currentArea === 'PinkHouseFoyer') ||
      (prevArea === 'PoodleRideStoryBookDecisionZone' &&
        currentArea === 'PoodleRideStoryBookInitialPath')
    ) {
      autoHeading = {
        rotation: 90,
        direction: 'East',
        msg: 'Automatically oriented East along the course path.'
      };
    }
    // Case 4: West-bound transitions
    else if (
      (prevArea === 'PoodleRideStoryBookCourse1_Seg1' && currentArea === 'PinkHouseFoyer') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Break1' &&
        currentArea === 'PoodleRideStoryBookCourse1_Seg1') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Break2' &&
        currentArea === 'PoodleRideStoryBookCourse1_Break1') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Seg2' &&
        currentArea === 'PoodleRideStoryBookCourse1_Break1') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Break2' &&
        currentArea === 'PoodleRideStoryBookCourse1_Seg2') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Seg3' &&
        currentArea === 'PoodleRideStoryBookCourse1_Break2') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Break3' &&
        currentArea === 'PoodleRideStoryBookCourse1_Seg3') ||
      (prevArea === 'PoodleRideStoryBookCourse1_Seg4' &&
        currentArea === 'PoodleRideStoryBookCourse1_Break3') ||
      (prevArea === 'PoodleRideStoryBookGoalZone' &&
        currentArea === 'PoodleRideStoryBookCourse1_Seg4') ||
      (prevArea === 'PoodleRideStoryBookInitialPath' &&
        currentArea === 'PoodleRideStoryBookDecisionZone')
    ) {
      autoHeading = {
        rotation: 270,
        direction: 'West',
        msg: 'Automatically oriented West along the course path.'
      };
    }

    if (autoHeading) {
      stateUpdates.rotation = autoHeading.rotation;
      stateUpdates.direction = autoHeading.direction;
      speak(autoHeading.msg, 'EN_US');
      announceToScreenReader(autoHeading.msg);
    }
  }

  // Apply updates if any exist
  if (Object.keys(stateUpdates).length > 0) {
    setGameState(prev => ({ ...prev, ...stateUpdates }));
  }

  // Update reference of previous area for the next change
  prevAreaRef.current = currentArea;
}
