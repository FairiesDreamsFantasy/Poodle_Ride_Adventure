import { InputContext, InputHandlerResult } from '../../../InputTypes';
import { handleCommonInventoryKeys } from '../Common';
import { handleWorldInteraction } from '../Common/Interactions';
import { getWallInteractionDescription } from '../../../Engine/Scientific_Imports/I/InputDescriptions';

/**
 * Standard Keyboard Layout Logic
 * Basic arrow key movement with discrete turns.
 */

export const handleStandardKeyDown = (e: KeyboardEvent, ctx: InputContext): boolean => {
  const { gameState: state, setGameState, audio, speak, announceToScreenReader, handlers } = ctx;
  const isShift = e.shiftKey;

  // 1. Common Inventory Handling
  if (handleCommonInventoryKeys(e, ctx)) return true;

  // J Key: Inventory
  if (e.code === 'KeyJ' && !isShift) {
    const next = !state.isInventoryOpen;
    setGameState(prev => ({ 
      ...prev, 
      isInventoryOpen: next,
      inventoryTab: 'Items',
      inventoryMenuMode: 'Selection',
      selectedInventoryIndex: 0,
      selectedStorybookItemIndex: 0,
      isWalletOpen: false,
      inventoryFocus: 'Tabs'
    }));
    const msg = next ? "Inventory opened." : "Inventory closed.";
    speak(msg, 'EN_US');
    announceToScreenReader(msg);
    return true;
  }

  // I Key: Information Input
  if (e.code === 'KeyI' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    const wallDesc = getWallInteractionDescription(state);
    speak(wallDesc, 'EN_US');
    announceToScreenReader(wallDesc);
    return true;
  }

  // E / Enter: Interact
  if ((e.code === 'KeyE' || e.code === 'Enter') && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    handleWorldInteraction(ctx);
    return true;
  }

  return false;
};

export const handleStandardMovement = (ctx: InputContext): InputHandlerResult => {
  const { gameState, keysPressed, moveForward, moveReverse, rotate, time, announceToScreenReader } = ctx;
  const results: InputHandlerResult = {};

  const isUpArrow = keysPressed.has('ArrowUp');
  const isDownArrow = keysPressed.has('ArrowDown');
  const isLeftArrow = keysPressed.has('ArrowLeft');
  const isRightArrow = keysPressed.has('ArrowRight');

  const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench', 'Soca_Path'].includes(gameState.area);

  if (isLeftArrow) {
    if (isAdventurePathArea) {
      if (time - (ctx.lastRotateTime || 0) > 1000) {
        announceToScreenReader("Turning is disabled on the Adventure Path.");
        results.lastRotateTime = time;
      }
    } else if (time - (ctx.lastRotateTime || 0) > 300) {
      rotate(-1);
      results.lastRotateTime = time;
    }
  } else if (isRightArrow) {
    if (isAdventurePathArea) {
      if (time - (ctx.lastRotateTime || 0) > 1000) {
        announceToScreenReader("Turning is disabled on the Adventure Path.");
        results.lastRotateTime = time;
      }
    } else if (time - (ctx.lastRotateTime || 0) > 300) {
      rotate(1);
      results.lastRotateTime = time;
    }
  }

  if (isUpArrow || gameState.targetSpeed > 0) {
    moveForward();
    results.lastMoveTime = time;
  } else if (isDownArrow || gameState.targetSpeed < 0) {
    moveReverse();
    results.lastMoveTime = time;
  }

  return results;
};
