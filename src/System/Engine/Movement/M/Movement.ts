import { GameState, Direction } from '../../Core/Types';
import { AREA_DIMENSIONS, GRID_SIZE } from '../../Core/Constants';
import { DIRECTIONS } from '../../Core/Constants/Movement';

export interface MovementUpdate {
  gridX: number;
  gridY: number;
  speed: number;
  rotation: number;
  direction: Direction;
  strafeSpeed: number;
  announcement?: string;
}

export const calculateMovement = (
  state: GameState,
  keysPressed: Set<string>,
  dt: number,
  now: number,
  lastRotateTime: number
): MovementUpdate => {
  let newSpeed = state.speed;
  let newRotation = state.rotation;
  let strafeSpeed = 0;
  let announcement: string | undefined;

  const isUp = keysPressed.has('ArrowUp') || (state.keyboardLayout === 'Arden Denis' && keysPressed.has('KeyW'));
  const isDown = keysPressed.has('ArrowDown') || (state.keyboardLayout === 'Arden Denis' && keysPressed.has('KeyS'));
  const isLeft = keysPressed.has('ArrowLeft') || (state.keyboardLayout === 'Arden Denis' && keysPressed.has('KeyA'));
  const isRight = keysPressed.has('ArrowRight') || (state.keyboardLayout === 'Arden Denis' && keysPressed.has('KeyD'));
  const isShift = keysPressed.has('ShiftLeft') || keysPressed.has('ShiftRight');

    // Numpad Joystick Logic (Cedella Layout)
  let joystickAngle: number | null = null;
  if (state.keyboardLayout === 'Cedella') {
    const n8 = keysPressed.has('Numpad8');
    const n2 = keysPressed.has('Numpad2');
    const n4 = keysPressed.has('Numpad4');
    const n6 = keysPressed.has('Numpad6');
    const n7 = keysPressed.has('Numpad7');
    const n9 = keysPressed.has('Numpad9');
    const n1 = keysPressed.has('Numpad1');
    const n3 = keysPressed.has('Numpad3');

    // 4 and 6 are for smooth rotation
    if (n4) newRotation -= 180 * dt;
    if (n6) newRotation += 180 * dt;

    // Movement keys (8, 2, 7, 9, 1, 3) determine movement direction relative to current facing
    let moveAngleOffset: number | null = null;
    if (n8) moveAngleOffset = 0;
    else if (n2) moveAngleOffset = 180;
    else if (n7) moveAngleOffset = -45;
    else if (n9) moveAngleOffset = 45;
    else if (n1) moveAngleOffset = -135;
    else if (n3) moveAngleOffset = 135;

    if (moveAngleOffset !== null) {
      joystickAngle = (newRotation + moveAngleOffset) % 360;
      if (joystickAngle < 0) joystickAngle += 360;
    }
  }

  const is3D = state.visualPrefs === '3D' || state.visualPrefs === '3DPlus' || state.visualPrefs === 'Super3D';

  // Acceleration / Deceleration based on Movement Mode
  let maxSpeed = 600;
  let accel = 300;

  let effectiveMode = state.movementMode;
  
  // Enforce area-specific speed restrictions
  if (state.area === 'MeditationHallLibrary') {
    if (effectiveMode === 'Gallop' || effectiveMode === 'Canter' || effectiveMode === 'Trot') {
      effectiveMode = 'Walk';
    }
  } else if (state.area === 'NarrowDressageGym' && state.level === 'Sky') {
    if (effectiveMode === 'Gallop' || effectiveMode === 'Canter' || effectiveMode === 'Trot') {
      effectiveMode = 'Walk';
    }
  }

  switch (effectiveMode) {
    case 'Walk':
      maxSpeed = 100;
      accel = 50;
      break;
    case 'Slow Walk':
      maxSpeed = 50;
      accel = 25;
      break;
    case 'Very Slow Walk':
      maxSpeed = 25;
      accel = 12.5;
      break;
    case 'Trot':
      maxSpeed = 250;
      accel = 125;
      break;
    case 'Canter':
      maxSpeed = 450;
      accel = 225;
      break;
    case 'Gallop':
    default:
      maxSpeed = 600;
      accel = 300;
      break;
  }

  if (isShift) {
    maxSpeed *= 1.5;
    accel *= 1.5;
  }

  const targetSpeed = state.targetSpeed || 0;

  if (joystickAngle !== null) {
    newSpeed += accel * dt;
    if (state.keyboardLayout !== 'Cedella') {
      newRotation = joystickAngle;
    }
  } else if (isUp) {
    newSpeed += accel * dt;
  } else if (isDown) {
    newSpeed -= accel * dt;
  } else if (targetSpeed !== 0) {
    if (newSpeed < targetSpeed) newSpeed = Math.min(targetSpeed, newSpeed + accel * dt);
    else if (newSpeed > targetSpeed) newSpeed = Math.max(targetSpeed, newSpeed - accel * dt);
  } else {
    if (newSpeed > 0) newSpeed = Math.max(0, newSpeed - 100 * dt);
    else if (newSpeed < 0) newSpeed = Math.min(0, newSpeed + 100 * dt);
  }
  newSpeed = Math.max(-maxSpeed / 2, Math.min(maxSpeed, newSpeed));

  // Rotation vs Strafing
  let actualIsLeft = isLeft;
  let actualIsRight = isRight;

  if (state.isStrafingEnabled) {
    if (isLeft) {
      strafeSpeed = -150;
      actualIsLeft = false;
      if (now - lastRotateTime > 1000) {
        announcement = "Strafing Left";
      }
    }
    if (isRight) {
      strafeSpeed = 150;
      actualIsRight = false;
      if (now - lastRotateTime > 1000) {
        announcement = "Strafing Right";
      }
    }
  }

  const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench', 'Soca_Path'].includes(state.area);
  const turningMode = state.arrowKeyTurningMode || 'FourDirection';
  const isPhysicalLeft = keysPressed.has('ArrowLeft') || (state.keyboardLayout === 'Arden Denis' && keysPressed.has('KeyA'));
  const isPhysicalRight = keysPressed.has('ArrowRight') || (state.keyboardLayout === 'Arden Denis' && keysPressed.has('KeyD'));

  if (!isAdventurePathArea) {
    if (turningMode === 'Full360') {
      if (actualIsLeft) newRotation -= 180 * dt;
      else if (actualIsRight) newRotation += 180 * dt;
    } else {
      // Snapping turns for FourDirection and EightDirection in precise 3D mode
      if ((isPhysicalLeft || isPhysicalRight) && !state.isStrafingEnabled && now - lastRotateTime > 300) {
        const delta = isPhysicalLeft ? -1 : 1;
        let nextDirection: Direction;

        if (turningMode === 'FourDirection') {
          const CARDINALS: Direction[] = ['North', 'East', 'South', 'West'];
          const currentDir = state.direction;
          const currentIndex = CARDINALS.indexOf(currentDir);
          if (currentIndex !== -1) {
            const nextIndex = (currentIndex + delta + CARDINALS.length) % CARDINALS.length;
            nextDirection = CARDINALS[nextIndex];
          } else {
            if (currentDir === 'Northeast') nextDirection = delta === -1 ? 'North' : 'East';
            else if (currentDir === 'Southeast') nextDirection = delta === -1 ? 'East' : 'South';
            else if (currentDir === 'Southwest') nextDirection = delta === -1 ? 'South' : 'West';
            else nextDirection = delta === -1 ? 'West' : 'North';
          }
        } else { // EightDirection
          const currentIndex = DIRECTIONS.indexOf(state.direction);
          const nextIndex = (currentIndex + delta + DIRECTIONS.length) % DIRECTIONS.length;
          nextDirection = DIRECTIONS[nextIndex];
        }

        // Synchronize rotation degrees
        if (nextDirection === 'North') newRotation = 0;
        else if (nextDirection === 'Northeast') newRotation = 45;
        else if (nextDirection === 'East') newRotation = 90;
        else if (nextDirection === 'Southeast') newRotation = 135;
        else if (nextDirection === 'South') newRotation = 180;
        else if (nextDirection === 'Southwest') newRotation = 225;
        else if (nextDirection === 'West') newRotation = 270;
        else if (nextDirection === 'Northwest') newRotation = 315;

        const turnDir = delta === -1 ? "left" : "right";
        announcement = state.notifications.truncateTurning ? nextDirection : `Turning ${turnDir}. Facing ${nextDirection}`;
      }
    }
  }

  // Determine direction
  const normalized = ((newRotation % 360) + 360) % 360;
  const prevNormalized = ((state.rotation % 360) + 360) % 360;

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

  const match = points.find(p => Math.abs(normalized - p.angle) < 2.5);
  const wasMatching = points.find(p => Math.abs(prevNormalized - p.angle) < 2.5);

  if (match && (!wasMatching || match.label !== wasMatching.label)) {
    announcement = state.notifications.truncateTurning ? match.label : `Facing ${match.label}`;
  }

  let currentDir: Direction = 'North';
  if (normalized >= 22.5 && normalized < 67.5) currentDir = 'Northeast';
  else if (normalized >= 67.5 && normalized < 112.5) currentDir = 'East';
  else if (normalized >= 112.5 && normalized < 157.5) currentDir = 'Southeast';
  else if (normalized >= 157.5 && normalized < 202.5) currentDir = 'South';
  else if (normalized >= 202.5 && normalized < 247.5) currentDir = 'Southwest';
  else if (normalized >= 247.5 && normalized < 292.5) currentDir = 'West';
  else if (normalized >= 292.5 && normalized < 337.5) currentDir = 'Northwest';

  // Position update
  const travelAngle = (joystickAngle !== null) ? joystickAngle : newRotation;
  const moveAngleRad = travelAngle * Math.PI / 180;
  const dx = newSpeed * Math.sin(moveAngleRad) * dt;
  const dy = newSpeed * Math.cos(moveAngleRad) * dt;

  const strafeAngle = (newRotation + 90) * Math.PI / 180;
  const sdx = strafeSpeed * Math.sin(strafeAngle) * dt;
  const sdy = strafeSpeed * Math.cos(strafeAngle) * dt;

  return {
    gridX: state.gridX + dx + sdx,
    gridY: state.gridY + dy + sdy,
    speed: newSpeed,
    rotation: newRotation,
    direction: currentDir,
    strafeSpeed,
    announcement
  };
};
