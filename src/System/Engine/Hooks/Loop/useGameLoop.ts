import { useEffect, useRef } from 'react';
import { GameState, MOVE_COOLDOWN, Direction } from '../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../Sound/SoundManager';
import { checkCollision } from '../../Core/C/Collision';
import { AREA_DIMENSIONS } from '../../Core/Constants';
import { generateObstacles, checkObstacleCollision } from '../../../Building_Blocks/Obstacles/ObstacleManager';
import { DiagnosticManager } from '../../../Diagnostics/DiagnosticManager';

export function useGameLoop(
  gameState: GameState,
  gameStateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  keysPressed: React.MutableRefObject<Set<string>>,
  moveForward: () => void,
  moveReverse: () => void,
  rotate: (delta: number) => void,
  announceToScreenReader: (text: string) => void,
  speak: (text: string, lang?: string) => void,
  audio: SoundManager,
  lastRotateTime: React.MutableRefObject<number>,
  onStep?: () => void
) {
  const movementRequestRef = useRef<number>(0);
  const lastMoveTime = useRef<number>(0);
  const lastFrameTime = useRef<number>(0);
  const lastSoundTimeRef = useRef<number>(0);
  const lastReactUpdateTime = useRef<number>(0);

  const getStepSize = (mode: string, isShift: boolean) => {
    let base = 4;
    switch (mode) {
      case 'Very Slow Walk': base = 1; break;
      case 'Slow Walk': base = 2; break;
      case 'Walk': base = 4; break;
      case 'Trot': base = 8; break;
      case 'Canter': base = 12; break;
      case 'Gallop': base = 16; break;
    }
    return isShift ? base * 1.5 : base;
  };

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const loop = (time: number) => {
      const state = gameStateRef.current;
      
      if (state.isBetaEnabled) {
        handleBetaMovement(time);
      } else {
        handleStableMovement(time);
      }
      
      movementRequestRef.current = requestAnimationFrame(loop);
    };

    const handleStableMovement = (time: number) => {
      const state = gameStateRef.current;
      const cooldown = MOVE_COOLDOWN; 
      const isCedella = state.keyboardLayout === 'Cedella';

      if (time - lastMoveTime.current > cooldown) {
        // Disable manual movement during automation (cutscene mode)
        if (!state.isAutomated) {
          const isUp = keysPressed.current.has('ArrowUp') || (isCedella && keysPressed.current.has('Numpad8'));
          const isDown = keysPressed.current.has('ArrowDown') || (isCedella && keysPressed.current.has('Numpad2'));
          const isLeft = keysPressed.current.has('ArrowLeft') || (isCedella && keysPressed.current.has('Numpad4'));
          const isRight = keysPressed.current.has('ArrowRight') || (isCedella && keysPressed.current.has('Numpad6'));
          
          // Diagonal Numpad support for Stable mode (mapped to directions)
          const isUpLeft = isCedella && keysPressed.current.has('Numpad7');
          const isUpRight = isCedella && keysPressed.current.has('Numpad9');
          const isDownLeft = isCedella && keysPressed.current.has('Numpad1');
          const isDownRight = isCedella && keysPressed.current.has('Numpad3');

          if (isUpLeft) {
            setGameState(prev => ({ ...prev, direction: 'Northwest' }));
            moveForward();
            lastMoveTime.current = time;
          } else if (isUpRight) {
            setGameState(prev => ({ ...prev, direction: 'Northeast' }));
            moveForward();
            lastMoveTime.current = time;
          } else if (isDownLeft) {
            setGameState(prev => ({ ...prev, direction: 'Southwest' }));
            moveForward();
            lastMoveTime.current = time;
          } else if (isDownRight) {
            setGameState(prev => ({ ...prev, direction: 'Southeast' }));
            moveForward();
            lastMoveTime.current = time;
          } else if (isUp) {
            moveForward();
            lastMoveTime.current = time;
          } else if (isDown) {
            moveReverse();
            lastMoveTime.current = time;
          }

          const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench'].includes(state.area);
          const isOnCellarRamp = state.area === 'Foyer' && state.level === 'Cellar' && state.gridY >= 51 && state.gridY <= 1990 && state.gridX >= 1 && state.gridX <= 20;
          
          if (isAdventurePathArea || isOnCellarRamp) {
            if (isLeft || isRight || isUpLeft || isUpRight || isDownLeft || isDownRight) {
              if (time - lastRotateTime.current > 1000) {
                announceToScreenReader(isOnCellarRamp ? "Turning is disabled on the cellar ramp." : "Turning is disabled on the Adventure Path.");
                lastRotateTime.current = time;
              }
            }
          } else {
            if (isLeft || isUpLeft || isDownLeft) {
              rotate(-1);
              lastMoveTime.current = time;
            } else if (isRight || isUpRight || isDownRight) {
              rotate(1);
              lastMoveTime.current = time;
            }
          }
        }
      }
    };

    const handleBetaMovement = (time: number) => {
      const state = gameStateRef.current;
      const now = Date.now();
      if (state.isAutomated) return;

      if (!lastFrameTime.current) {
        lastFrameTime.current = time;
        return;
      }
      let dt = (time - lastFrameTime.current) / 1000; // seconds
      if (dt > 0.1) dt = 0.1; // Clamp dt to prevent large jumps
      lastFrameTime.current = time;

      let newSpeed = state.speed;
      let newRotation = state.rotation;

      const isUp = keysPressed.current.has('ArrowUp');
      const isDown = keysPressed.current.has('ArrowDown');
      const isLeft = keysPressed.current.has('ArrowLeft');
      const isRight = keysPressed.current.has('ArrowRight');
      const isShift = keysPressed.current.has('ShiftLeft') || keysPressed.current.has('ShiftRight');

      // Numpad Joystick Logic (Cedella Layout)
      let joystickAngle: number | null = null;
      let isStrafing = false; 
      if (state.keyboardLayout === 'Cedella') {
        const n8 = keysPressed.current.has('Numpad8');
        const n2 = keysPressed.current.has('Numpad2');
        const n4 = keysPressed.current.has('Numpad4');
        const n6 = keysPressed.current.has('Numpad6');
        const n7 = keysPressed.current.has('Numpad7');
        const n9 = keysPressed.current.has('Numpad9');
        const n1 = keysPressed.current.has('Numpad1');
        const n3 = keysPressed.current.has('Numpad3');

        // 4 and 6 are for smooth rotation now, not part of joystickAngle axis
        if (n4) newRotation -= 180 * dt;
        if (n6) newRotation += 180 * dt;

        // Movement keys (8, 2, 7, 9, 1, 3) determine movement direction relative to facing
        let moveAngleOffset: number | null = null;
        if (n8) moveAngleOffset = 0;
        else if (n2) moveAngleOffset = 180;
        else if (n7) moveAngleOffset = -45;
        else if (n9) moveAngleOffset = 45;
        else if (n1) moveAngleOffset = -135;
        else if (n3) moveAngleOffset = 135;

        if (moveAngleOffset !== null) {
          // Calculate movement direction relative to current rotation
          joystickAngle = (newRotation + moveAngleOffset) % 360;
          if (joystickAngle < 0) joystickAngle += 360;
          // We intentionally do NOT set newRotation = joystickAngle here
          // This allows "anywhere dynamically" movement relative to facing
        }
      }

      // Acceleration / Deceleration
      const stepSize = getStepSize(state.movementMode, isShift);
      const modeSpecificSpeed = stepSize / (MOVE_COOLDOWN / 1000); 
      const accel = isShift ? modeSpecificSpeed * 2 : modeSpecificSpeed * 4;

      if (joystickAngle !== null) {
        newSpeed += accel * dt;
      } else if (isUp) {
        newSpeed += accel * dt; 
      } else if (isDown) {
        newSpeed -= accel * dt; 
      } else {
        // Friction
        if (newSpeed > 0) newSpeed = Math.max(0, newSpeed - (accel/2) * dt);
        else if (newSpeed < 0) newSpeed = Math.min(0, newSpeed + (accel/2) * dt);
      }
      
      // Clamp speed
      const maxSpeed = modeSpecificSpeed;
      newSpeed = Math.max(-maxSpeed/2, Math.min(maxSpeed, newSpeed));

      // Rotation
      const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench'].includes(state.area);
      const isOnCellarRamp = state.area === 'Foyer' && state.level === 'Cellar' && state.gridY >= 51 && state.gridY <= 1990 && state.gridX >= 1 && state.gridX <= 20;

      if (isAdventurePathArea || isOnCellarRamp) {
        if (isLeft || isRight) {
          if (now - lastRotateTime.current > 1000) {
            announceToScreenReader(isOnCellarRamp ? "Turning is disabled on the cellar ramp." : "Turning is disabled on the Adventure Path.");
            lastRotateTime.current = now;
          }
        }
      } else {
        if (isLeft) {
          newRotation -= 180 * dt; // Faster rotation
        } else if (isRight) {
          newRotation += 180 * dt;
        }
      }

      // Announce rotation and movement in Beta mode
      if (!isStrafing && (isLeft || isRight || joystickAngle !== null || keysPressed.current.has('Numpad4') || keysPressed.current.has('Numpad6'))) {
        const normalized = ((newRotation % 360) + 360) % 360;
        const lastAnnouncedAngle = (lastRotateTime as any).announcedAngle;
        
        // Define compass points (0-360) for smooth rotation announcements
        const points: { angle: number, label: Direction }[] = [
          { angle: 0, label: 'North' },
          { angle: 45, label: 'Northeast' },
          { angle: 90, label: 'East' },
          { angle: 135, label: 'Southeast' },
          { angle: 180, label: 'South' },
          { angle: 225, label: 'Southwest' },
          { angle: 270, label: 'West' },
          { angle: 315, label: 'Northwest' },
          { angle: 360, label: 'North' }
        ];

        // Increased tolerance to catch points during fast smooth rotation
        const match = points.find(p => Math.abs(normalized - p.angle) < 2.5);
        
        if (match && lastAnnouncedAngle !== match.angle) {
          const dir = match.label;
          const msg = state.notifications.truncateTurning ? dir : `Facing ${dir}`;
          speak(msg, 'EN_US');
          announceToScreenReader(msg);
          (lastRotateTime as any).announcedAngle = match.angle;
          lastRotateTime.current = now;
        }

        // Reset announcedAngle if we haven't hit a major point in a while
        if (now - lastRotateTime.current > 2000) { 
           (lastRotateTime as any).announcedAngle = undefined;
        }
      }
      
      if (isUp || isDown) {
        if (now - lastMoveTime.current > 1000) {
          if (state.notifications.announceDirection) {
            const msg = isUp ? "Moving forward." : "Backing up.";
            announceToScreenReader(msg);
          }
          lastMoveTime.current = now;
        }
      }

      // Sound logic for Beta movement
      if (Math.abs(newSpeed) > 10) {
        if (now - (lastSoundTimeRef.current || 0) > MOVE_COOLDOWN) {
          if (isShift) {
            audio.playPoodleWalk(state.area);
          } else {
            audio.playPoodleGallop(state.area);
          }
          lastSoundTimeRef.current = now;
        }
      }

      // Calculate travel direction (taking into account strafing/joystick)
      const travelAngle = (joystickAngle !== null) ? joystickAngle : newRotation;

      // Update position
      const dx = newSpeed * Math.sin(travelAngle * Math.PI / 180) * dt;
      const dy = newSpeed * Math.cos(travelAngle * Math.PI / 180) * dt;
      
      const nextX = state.gridX + dx;
      const nextY = state.gridY + dy;

      // Distance accumulation for step tracking
      const moveDist = Math.sqrt(dx * dx + dy * dy);
      let newAccumulated = state.accumulatedDistance + moveDist;
      
      if (newAccumulated >= stepSize) {
        if (onStep) onStep();
        newAccumulated -= stepSize;
      }

      // Determine direction for checkCollision
      const finalNormalized = ((travelAngle % 360) + 360) % 360;
      let currentDir: Direction = 'North';
      if (finalNormalized >= 22.5 && finalNormalized < 67.5) currentDir = 'Northeast';
      else if (finalNormalized >= 67.5 && finalNormalized < 112.5) currentDir = 'East';
      else if (finalNormalized >= 112.5 && finalNormalized < 157.5) currentDir = 'Southeast';
      else if (finalNormalized >= 157.5 && finalNormalized < 202.5) currentDir = 'South';
      else if (finalNormalized >= 202.5 && finalNormalized < 247.5) currentDir = 'Southwest';
      else if (finalNormalized >= 247.5 && finalNormalized < 292.5) currentDir = 'West';
      else if (finalNormalized >= 292.5 && finalNormalized < 337.5) currentDir = 'Northwest';

      const collision = checkCollision(
        state.gridX, 
        state.gridY, 
        nextX, 
        nextY, 
        state.level as any, 
        state.area, 
        state.direction,
        state.doorwayStep,
        state
      );

      // Obstacle Collision Check in Beta Mode
      const obstacleResult = checkObstacleCollision({ ...state, gridX: nextX, gridY: nextY }, state.obstacles);
      if (obstacleResult.collision && obstacleResult.obstacle && !state.isJumping) {
        speak(`You hit a ${obstacleResult.obstacle.type}! You need to jump over it.`, 'EN_US');
        audio.playBushHit();
        newSpeed = 0;
        // Don't update position
        gameStateRef.current = { ...state, speed: 0 };
        return;
      }

      if (collision.nextDirection && collision.nextDirection !== currentDir) {
        currentDir = collision.nextDirection;
      }

      let newState = { ...state };
      if (collision.isBlocked) {
        if (state.showDiagnostics) {
          DiagnosticManager.logCollision(nextX, nextY, state.area, collision.wallDesc);
        }
        newState = {
          ...newState,
          gridX: collision.nextX,
          gridY: collision.nextY,
          speed: 0,
          rotation: newRotation,
          direction: currentDir,
          doorwayStep: collision.nextDoorwayStep,
          area: collision.nextArea as any,
          level: collision.nextLevel as any,
          accumulatedDistance: 0,
          isLevelComplete: collision.isLevelComplete || false
        };
        if (collision.wallDesc) {
          speak(collision.wallDesc, 'EN_US');
          announceToScreenReader(collision.wallDesc);
          audio.playWallHit(state.area);
        }
      } else {
        if (state.showDiagnostics && Math.abs(newSpeed) > 1) {
          DiagnosticManager.logMovement(nextX, nextY, state.area, newSpeed);
        }
        newState = {
          ...newState,
          gridX: collision.nextX,
          gridY: collision.nextY,
          speed: newSpeed,
          rotation: newRotation,
          direction: currentDir,
          doorwayStep: collision.nextDoorwayStep,
          area: collision.nextArea as any,
          level: collision.nextLevel as any,
          accumulatedDistance: newAccumulated,
          isLevelComplete: collision.isLevelComplete || false
        };
        if (collision.msg) {
          speak(collision.msg, 'EN_US');
          announceToScreenReader(collision.msg);
        }
      }

      if (newState.area !== state.area) {
        const nextDims = AREA_DIMENSIONS[newState.area] || { width: 100, height: 100 };
        newState.obstacles = generateObstacles(newState.area, nextDims.height);
      }

      // Update ref synchronously for physics
      gameStateRef.current = newState;
      
      // Throttle React state updates to ~30fps to save CPU/RAM
      // Only update if state actually changed to prevent idle re-renders
      if (time - lastReactUpdateTime.current > 33) {
        if (newState.gridX !== state.gridX || 
            newState.gridY !== state.gridY || 
            newState.rotation !== state.rotation || 
            newState.speed !== state.speed ||
            newState.direction !== state.direction ||
            newState.area !== state.area) {
          setGameState(newState);
        }
        lastReactUpdateTime.current = time;
      }
    };

    movementRequestRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(movementRequestRef.current);
    };
  }, [gameState.isPlaying, gameState.isBetaEnabled, moveForward, moveReverse, rotate, setGameState, gameStateRef, keysPressed, announceToScreenReader, speak, audio, lastRotateTime]);
}

