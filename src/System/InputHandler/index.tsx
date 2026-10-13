import { InputContext, InputHandlerResult } from '../InputTypes';
import { 
  handleCedellaJoystick, 
  handleCedellaMovement, 
  handleArdenDenisMovement,
  handleStandardMovement 
} from '../Keyboards_and_Controllers';
import { MOVE_COOLDOWN } from '../AI/In-Game/Logic/GameLogic';

export const handleMovementInput = (ctx: InputContext, lastReactUpdateTime: number): InputHandlerResult => {
  const { gameState, time, keysPressed, moveForward, rotate, announceToScreenReader } = ctx;
  let finalResults: InputHandlerResult = {};

  // 1. Handle Emulated Joystick (Smooth Rotation)
  if (gameState.keyboardLayout === 'Cedella' && !gameState.isAutomated) {
    const joystickResults = handleCedellaJoystick(ctx, lastReactUpdateTime);
    finalResults = { ...finalResults, ...joystickResults };
  }

  // 2. Handle Movement Logic
  let cooldown = MOVE_COOLDOWN;
  if (gameState.targetSpeed > 0) {
    cooldown = Math.max(50, MOVE_COOLDOWN - (gameState.targetSpeed / 300) * 200);
  } else if (gameState.targetSpeed < 0) {
    cooldown = Math.min(500, MOVE_COOLDOWN + (Math.abs(gameState.targetSpeed) / 150) * 250);
  }

  const canMove = !ctx.lastMoveTime || (time - ctx.lastMoveTime > cooldown);
  if (canMove && !gameState.isAutomated) {
    let movementResults: InputHandlerResult = {};
    
    if (gameState.keyboardLayout === 'Cedella') {
      movementResults = handleCedellaMovement(ctx);
    } else if (gameState.keyboardLayout === 'Arden Denis') {
      movementResults = handleArdenDenisMovement(ctx);
    } else {
      movementResults = handleStandardMovement(ctx);
    }
    
    finalResults = { ...finalResults, ...movementResults };
  }

  return finalResults;
};

export * from './General';
