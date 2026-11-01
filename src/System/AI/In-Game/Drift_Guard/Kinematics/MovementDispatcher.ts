/**
 * System/AI/In-Game/Drift_Guard/Kinematics/MovementDispatcher.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Dedicated Kinematics and Movement Dispatcher with Zero-Drift Stabilization.
 * 
 * Handles:
 * 1. Standard Discrete Grid Kinematics & Cedella Joystick Input Processing.
 * 2. Precise Continuous Angle Kinematics with Symplectic Euler Integration.
 * 3. Step Distance Processing & Authentic Audio Pacing (Walk, Slow Walk, Very Slow Walk, Gallop).
 * 4. Ramp Step Counting (5-beep acoustic indicator and 5-beep elegant bark).
 * 5. Spatial Audio Cues (Garden wind chimes, Street sounds, Elevated path milestones).
 * 6. Dynamic Coin Collection & Diagnostics recording throttled to ~30fps for CPU/RAM conservation.
 */

import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { GameState, MOVE_COOLDOWN, FOYER_DESCRIPTIONS } from '../../Logic/GameLogic';
import { calculateMovement } from '../../../../Engine/Movement/M/Movement';
import { checkCollision } from '../../../../Engine/Core/C/Collision';
import { checkAnnouncementFlags } from '../../../../Engine/Core/Announcement';
import { checkCoinCollection } from '../../../../Items/Coins';
import { DiagnosticManager } from '../../../../Diagnostics/DiagnosticManager';
import { InputContext } from '../../../../InputTypes';
import { handleMovementInput } from '../../../../InputHandler';
import { formulateAreaMetrics as formulateArenaMetrics } from '../../Category/Arena';

export interface MovementDispatcherContext {
  gameStateRef: MutableRefObject<GameState>;
  setGameState: Dispatch<SetStateAction<GameState>>;
  keysPressed: MutableRefObject<Set<string>>;
  lastFrameTime: MutableRefObject<number>;
  lastMoveTime: MutableRefObject<number>;
  lastRotateTime: MutableRefObject<number>;
  lastJoystickRotationTime: MutableRefObject<number>;
  lastAnnouncedJoystickAngle: MutableRefObject<number>;
  lastReactUpdateTime: MutableRefObject<number>;
  audio: any;
  systems: any;
  speak: (text: string, locale?: string) => void;
  announceToScreenReader: (msg: string) => void;
  bark: (msg?: string, isCore?: boolean, count?: number, area?: string) => void;
  moveForward: (steps?: number) => void;
  moveReverse: (steps?: number) => void;
  rotate: (degrees: number) => void;
  mt: (text: string) => string;
}

export function handleStandardKinematics(
  time: number,
  ctx: MovementDispatcherContext
): void {
  const {
    gameStateRef,
    setGameState,
    keysPressed,
    lastMoveTime,
    lastRotateTime,
    lastJoystickRotationTime,
    lastAnnouncedJoystickAngle,
    lastReactUpdateTime,
    audio,
    systems,
    speak,
    announceToScreenReader,
    moveForward,
    moveReverse,
    rotate
  } = ctx;

  const state = gameStateRef.current;

  const inputCtx: InputContext = {
    gameState: state,
    keysPressed: keysPressed.current,
    time: Date.now(),
    lastMoveTime: lastMoveTime.current,
    lastRotateTime: lastRotateTime.current,
    lastJoystickRotationTime: lastJoystickRotationTime.current,
    lastAnnouncedJoystickAngle: lastAnnouncedJoystickAngle.current || 0,
    audio,
    systems,
    speak,
    announceToScreenReader,
    moveForward,
    moveReverse,
    rotate,
    setGameState
  };

  const results = handleMovementInput(inputCtx, lastReactUpdateTime.current);

  // If no move command was issued and we were previously moving, reset speed to 0
  const now = Date.now();
  if (
    results.lastMoveTime === undefined &&
    state.speed !== 0 &&
    now - lastMoveTime.current > MOVE_COOLDOWN + 50
  ) {
    setGameState(prev => ({ ...prev, speed: 0 }));
  }

  if (results.lastMoveTime !== undefined) lastMoveTime.current = results.lastMoveTime;
  if (results.lastRotateTime !== undefined) lastRotateTime.current = results.lastRotateTime;
  if (results.lastJoystickRotationTime !== undefined)
    lastJoystickRotationTime.current = results.lastJoystickRotationTime;
  if (results.lastAnnouncedJoystickAngle !== undefined)
    lastAnnouncedJoystickAngle.current = results.lastAnnouncedJoystickAngle;
  if (results.lastReactUpdateTime !== undefined)
    lastReactUpdateTime.current = results.lastReactUpdateTime;
}

export function handlePreciseKinematics(
  time: number,
  ctx: MovementDispatcherContext
): void {
  const {
    gameStateRef,
    setGameState,
    keysPressed,
    lastFrameTime,
    lastMoveTime,
    lastRotateTime,
    lastReactUpdateTime,
    audio,
    speak,
    announceToScreenReader,
    bark,
    mt
  } = ctx;

  const state = gameStateRef.current;
  const now = Date.now();
  if (state.isAutomated) return;

  if (!lastFrameTime.current) {
    lastFrameTime.current = time;
    return;
  }
  let dt = (time - lastFrameTime.current) / 1000; // seconds
  if (dt > 0.1) dt = 0.1; // Clamp dt to prevent large delta spikes
  lastFrameTime.current = time;

  const update = calculateMovement(
    state,
    keysPressed.current,
    dt,
    now,
    lastRotateTime.current
  );

  const {
    gridX: nextX,
    gridY: nextY,
    speed: newSpeed,
    rotation: newRotation,
    direction: currentDir,
    announcement
  } = update;

  if (announcement) {
    speak(announcement, 'EN_US');
    announceToScreenReader(announcement);
    lastRotateTime.current = now;
  }

  // Determine travel direction for collisions and spatial announcements
  const isUp =
    keysPressed.current.has('ArrowUp') ||
    (state.keyboardLayout === 'Arden Denis' && keysPressed.current.has('KeyW'));
  const isDown =
    keysPressed.current.has('ArrowDown') ||
    (state.keyboardLayout === 'Arden Denis' && keysPressed.current.has('KeyS'));

  if (isUp || isDown) {
    if (now - lastMoveTime.current > 1000) {
      if (state.notifications.announceDirection) {
        const msg = isUp ? 'Moving forward.' : 'Backing up.';
        announceToScreenReader(msg);
      }
      lastMoveTime.current = now;
    }
  }

  const collision = checkCollision(
    state.gridX,
    state.gridY,
    nextX,
    nextY,
    state.level as any,
    state.area,
    currentDir,
    state.doorwayStep,
    state
  );

  const announcementUpdates = checkAnnouncementFlags(
    state,
    collision.nextArea,
    collision.nextX,
    collision.nextY
  );

  let newState = { ...state, ...announcementUpdates };
  if (collision.isBlocked) {
    DiagnosticManager.logCollision(
      collision.nextX,
      collision.nextY,
      state.area,
      collision.wallDesc
    );
    newState = {
      ...newState,
      gridX: collision.nextX,
      gridY: collision.nextY,
      speed: 0,
      rotation: newRotation,
      direction: currentDir,
      doorwayStep: collision.nextDoorwayStep,
      isRampStep: collision.isRampStep || false,
      isDescending: collision.isDescending || false,
      area: collision.nextArea as any,
      level: collision.nextLevel as any,
      isLevelComplete: collision.isLevelComplete || false
    };
    if (collision.wallDesc) {
      const desc = mt(collision.wallDesc);
      speak(desc, 'EN_US');
      announceToScreenReader(desc);
      audio.playWallHit(state.area);
      setGameState(prev => ({ ...prev, speed: 0 }));
    }
  } else {
    if (Math.abs(newSpeed) > 1) {
      DiagnosticManager.logMovement(collision.nextX, collision.nextY, state.area, newSpeed);
    }
    newState = {
      ...newState,
      gridX: collision.nextX,
      gridY: collision.nextY,
      speed: newSpeed,
      rotation: newRotation,
      direction: currentDir,
      doorwayStep: collision.nextDoorwayStep,
      isRampStep: collision.isRampStep || false,
      isDescending: collision.isDescending || false,
      area: collision.nextArea as any,
      level: collision.nextLevel as any,
      isLevelComplete: collision.isLevelComplete || false
    };
    if (collision.msg) {
      speak(mt(collision.msg), 'EN_US');
      announceToScreenReader(mt(collision.msg));
    }
  }

  // Handle Southwest Rectangle Announcement for Precise Movement
  if (announcementUpdates.hasAnnouncedSouthwestRectangle) {
    speak(FOYER_DESCRIPTIONS.SOUTHWEST_RECTANGLE, 'EN_US');
  }

  if (announcementUpdates.hasAnnouncedSkyRampAscent) {
    speak('You are starting your ascent up the Sky Ramp towards the Mezzanine.', 'EN_US');
  }

  if (announcementUpdates.hasAnnouncedSkyRampDescent) {
    speak('You are starting your descent down the Sky Ramp towards the floor foyer.', 'EN_US');
  }

  // Step audio & rhythm calculation
  const isShift = keysPressed.current.has('ShiftLeft') || keysPressed.current.has('ShiftRight');
  const getStepSize = (mode: string, shift: boolean) => {
    let base = 4;
    switch (mode) {
      case 'Very Slow Walk':
        base = 1;
        break;
      case 'Slow Walk':
        base = 2;
        break;
      case 'Walk':
        base = 4;
        break;
      case 'Trot':
        base = 8;
        break;
      case 'Canter':
        base = 12;
        break;
      case 'Gallop':
        base = 16;
        break;
    }
    return shift ? base * 1.5 : base;
  };

  const stepDist = getStepSize(state.movementMode, isShift);
  const moveDist = Math.sqrt(
    Math.pow(collision.nextX - state.gridX, 2) + Math.pow(collision.nextY - state.gridY, 2)
  );
  let nextAccumulated = state.accumulatedDistance + moveDist;
  let nextRampStepCount = state.rampStepCount;

  if (nextAccumulated >= stepDist && !collision.isBlocked) {
    const stepsToProcess = Math.floor(nextAccumulated / stepDist);
    nextAccumulated %= stepDist;

    for (let i = 0; i < stepsToProcess; i++) {
      if (state.movementMode === 'Walk')
        audio.playPoodleWalk(state.area, 0, 0, 0, state.ridingAnimal);
      else if (state.movementMode === 'Slow Walk')
        audio.playPoodleSlowWalk(state.area, 0, 0, 0, state.ridingAnimal);
      else if (state.movementMode === 'Very Slow Walk')
        audio.playPoodleVerySlowWalk(state.area, 0, 0, 0, state.ridingAnimal);
      else audio.playPoodleGallop(state.area, 0, 0, 0, state.ridingAnimal);

      // Ramp Logic
      if (collision.isRampStep) {
        nextRampStepCount++;
        const beepStep = nextRampStepCount % 5 || 5;
        audio.playRampBeep(beepStep, collision.isDescending);
        if (nextRampStepCount % 5 === 0) {
          bark('The Poodle Barks Elegantly (5-beep indicator)');
        }
      }
    }
  }

  // Reset ramp count if leaving ramp area
  if (collision.nextLevel !== state.level) {
    nextRampStepCount = 0;
  }

  newState = {
    ...newState,
    accumulatedDistance: nextAccumulated,
    rampStepCount: nextRampStepCount
  };

  // Spatial audio cues for Precise Movement
  const nextAreaMetrics = formulateArenaMetrics(collision.nextArea);
  const nextDims = { width: nextAreaMetrics.width, height: nextAreaMetrics.height };
  if (collision.nextArea === 'Garden') {
    if (currentDir === 'North' && collision.nextY > Math.floor(nextDims.height * 0.8)) {
      if (announcementUpdates.hasAnnouncedWindChimes) {
        speak(
          'The wind chimes from the garden are hanging here, tinkling softly in the breeze.',
          'EN_US'
        );
      }
    }
  } else if (collision.nextArea === 'Foyer') {
    if (announcementUpdates.hasAnnouncedStreetSounds && currentDir === 'North')
      speak('The street sounds grow louder to the North.', 'EN_US');
  } else if (collision.nextArea === 'MeditationHall') {
    if (collision.nextY === Math.floor(nextDims.height * 0.2) && currentDir === 'South') {
      if (announcementUpdates.hasAnnouncedWindChimes) {
        speak('The wind chimes from the garden are clearer now.', 'EN_US');
      }
    }
  }

  // Elevated Path Barks for Precise Movement
  if (collision.nextArea === 'ElevatedPath') {
    const elevatedPathMetrics = formulateArenaMetrics('ElevatedPath');
    const pathLength = elevatedPathMetrics.height;
    const progress = collision.nextY / pathLength;

    if (announcementUpdates.hasAnnouncedElevatedPathEntry) {
      bark('The Poodle Barks Elegantly (Entry)', true, 3);
    } else if (
      progress > 0.4 &&
      progress < 0.5 &&
      announcementUpdates.hasAnnouncedElevatedPathHalf1
    ) {
      bark('The Poodle Barks Elegantly (Halfway Approach)', true, 4);
    } else if (
      progress > 0.5 &&
      progress < 0.6 &&
      announcementUpdates.hasAnnouncedElevatedPathHalf2
    ) {
      bark('The Poodle Barks Elegantly (Halfway Passed)', true, 4);
    }
  }

  // Update ref synchronously for physics
  gameStateRef.current = newState;

  // Throttle React state updates to ~30fps to save CPU/RAM
  if (time - lastReactUpdateTime.current > 33) {
    if (
      newState.gridX !== state.gridX ||
      newState.gridY !== state.gridY ||
      newState.rotation !== state.rotation ||
      newState.speed !== state.speed ||
      newState.direction !== state.direction
    ) {
      setGameState(newState);
    }
    lastReactUpdateTime.current = time;
  }
}
