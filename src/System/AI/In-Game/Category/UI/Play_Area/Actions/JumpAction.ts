/**
 * System/AI/In-Game/Category/UI/Play_Area/Actions/JumpAction.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Dedicated Jump Maneuver Pipeline for Crafted Poodles and Special Environments.
 * 
 * Enforces:
 * 1. Diagnostic tracking.
 * 2. Elevator button interaction logic when situated inside Northeast Lobby Elevator.
 * 3. Strict Babylonian block: Olga-Olivia, Chloe, and Priscilla CANNOT use crafted jump maneuvers.
 * 4. Running jump vs standing jump distance calculation (35ft) using rotation angles for Cedella and Arden Denis layouts.
 * 5. Obstacle clearance detection (+10 points) and land thumps.
 * 6. Vaulted ceiling audio-description announcements in Rasta-Manor Foyer.
 */

import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { GameState } from '../../../../Logic/GameLogic';
import { checkObstacleCollision } from '../../../../../../Building_Blocks/Obstacles/ObstacleManager';
import { DiagnosticManager } from '../../../../../../Diagnostics/DiagnosticManager';

export interface JumpActionContext {
  gameStateRef: MutableRefObject<GameState>;
  keysPressed: MutableRefObject<Set<string>>;
  setGameState: Dispatch<SetStateAction<GameState>>;
  audio: any;
  speak: (text: string, locale?: string) => void;
  announceToScreenReader: (msg: string) => void;
  checkCollision: any;
  bark: (msg?: string, isCore?: boolean, count?: number, area?: string) => void;
  mt: (text: string) => string;
}

export function executePoodleJump(context: JumpActionContext): void {
  const {
    gameStateRef,
    keysPressed,
    setGameState,
    audio,
    speak,
    announceToScreenReader,
    checkCollision,
    bark,
    mt
  } = context;

  const state = gameStateRef.current;
  if (state.showDiagnostics) {
    DiagnosticManager.logInteraction('Jump');
  }

  if (state.isJumping) return;

  const isRunning =
    keysPressed.current.has('ArrowUp') ||
    (state.keyboardLayout === 'Arden Denis' && keysPressed.current.has('KeyW')) ||
    state.targetSpeed > 0;

  const { area, level, direction, gridX, gridY, rotation } = state;

  // 1. Elevator Logic: Jump to move elevator / trigger button click
  const isInsideElevator =
    (area === 'LobbyStairwayAndRamps' ||
      area === 'SouthwestMezzanineStairwayAndRamps' ||
      area === 'RastaManor2ndFloor' ||
      area === 'Cellar') &&
    gridX >= 980 &&
    gridX <= 1000 &&
    gridY >= 980 &&
    gridY <= 1000;

  if (isInsideElevator) {
    audio.playElevatorButtonIntersection(gridX, gridY);
    speak('Elevator button clicked.', 'EN_US');
    setGameState(prev => ({ ...prev, isJumping: true }));
    setTimeout(() => {
      setGameState(prev => ({ ...prev, isJumping: false }));
    }, 500);
    return;
  }

  // 2. SCIENTIFIC MANDATE: Olga-Olivia and other Babylonian characters MUST NOT use the crafted jump system.
  if (
    state.ridingAnimal === 'Olga-Olivia' ||
    state.ridingAnimal === 'Chloe Joseph Gray-Michaels' ||
    state.ridingAnimal === 'Priscilla'
  ) {
    speak('Babylonian characters cannot use elegant jump maneuvers.', 'EN_US');
    audio.playNoInteractionSound();
    return;
  }

  const jumpingStateProps = { isJumping: true, isRunningJump: isRunning };

  if (isRunning) {
    audio.playRunningJumpSound(area, 0, 0, 0, state.ridingAnimal);

    // Forward translation during jump using rotation for continuous angle travel
    const jumpDistance = 35; // Calibrated to ensure 10ft range obstacles are fully cleared
    let nextX = gridX;
    let nextY = gridY;

    const is3D =
      state.visualPrefs === '3D' ||
      state.visualPrefs === '3DPlus' ||
      state.visualPrefs === 'Super3D';

    if (is3D || state.keyboardLayout === 'Arden Denis' || state.keyboardLayout === 'Cedella') {
      const moveAngle = (rotation * Math.PI) / 180;
      nextX += jumpDistance * Math.sin(moveAngle);
      nextY += jumpDistance * Math.cos(moveAngle);
    } else {
      switch (direction) {
        case 'North':
          nextY += jumpDistance;
          break;
        case 'South':
          nextY -= jumpDistance;
          break;
        case 'East':
          nextX += jumpDistance;
          break;
        case 'West':
          nextX -= jumpDistance;
          break;
      }
    }

    const collision = checkCollision(
      gridX,
      gridY,
      nextX,
      nextY,
      level,
      area,
      direction,
      state.doorwayStep,
      state
    );

    // Check for obstacle collision during the jump to mark it as cleared
    const jumpObstacleResult = checkObstacleCollision(
      { ...state, gridX: collision.nextX, gridY: collision.nextY, isJumping: true },
      state.obstacles
    );

    if (collision.shouldBark) {
      bark(collision.barkMsg, true, collision.barkCount);
    }

    setGameState(prev => {
      let nextObstacles = prev.obstacles;
      if (jumpObstacleResult.obstacle) {
        audio.playPointEarned();
        nextObstacles = prev.obstacles.map(o =>
          o.id === jumpObstacleResult.obstacle!.id ? { ...o, isJumped: true } : o
        );
        speak(`You jumped over a ${jumpObstacleResult.obstacle.type}! +10 points.`, 'EN_US');
      }

      return {
        ...prev,
        ...jumpingStateProps,
        gridX: collision.nextX,
        gridY: collision.nextY,
        area: collision.nextArea as any,
        level: collision.nextLevel as any,
        doorwayStep: collision.nextDoorwayStep,
        isLevelComplete: collision.isLevelComplete || false,
        score: jumpObstacleResult.obstacle ? prev.score + 10 : prev.score,
        obstaclesJumped: jumpObstacleResult.obstacle
          ? prev.obstaclesJumped + 1
          : prev.obstaclesJumped,
        obstacles: nextObstacles
      };
    });

    if (collision.isBlocked && collision.wallDesc) {
      speak(mt(collision.wallDesc), 'EN_US');
      announceToScreenReader(mt(collision.wallDesc));
      audio.playWallHit(area);
    }
  } else {
    setGameState(prev => ({ ...prev, ...jumpingStateProps }));
    audio.playJumpSound(area, 0, 0, 0, state.ridingAnimal);
    if (state.notifications.jump) {
      announceToScreenReader('Jump Notification');
    }
  }

  if (area === 'Foyer') {
    const ceilingMsg =
      level === 'Sky'
        ? mt('You jump high into the 20-foot space above the walkway.')
        : mt('You jump high towards the 45-foot vaulted ceiling.');
    announceToScreenReader(ceilingMsg);
  }

  const jumpDuration = isRunning ? 800 : 500;

  setTimeout(() => {
    audio.playPoodleThump(area); // Land thump
    setGameState(prev => ({ ...prev, isJumping: false, isRunningJump: false }));
  }, jumpDuration);
}
