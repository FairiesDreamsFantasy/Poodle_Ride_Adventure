import { InputContext, InputHandlerResult } from '../../../InputTypes';
import { handleCommonInventoryKeys } from '../Common';
import { handleWorldInteraction } from '../Common/Interactions';
import { getWallInteractionDescription } from '../../../Engine/Scientific_Imports/I/InputDescriptions';
import { MovementMode } from '../../../Engine/Core/Types';
import { handleRegularMultiTap, handleShiftMultiTap } from '../Multitap';

/**
 * Arden Denis Keyboard Layout Logic
 * Standard WASD / Arrow Keys with 45-degree snaps.
 */

export const handleArdenDenisKeyDown = (e: KeyboardEvent, ctx: InputContext): boolean => {
  const { gameState: state, setGameState, audio, speak, announceToScreenReader, lastKeyTime, aTapCount, aTapTimeout, aShiftTapCount, aShiftTapTimeout, handlers } = ctx;
  const isShift = e.shiftKey;
  const now = Date.now();

  // 1. Common Inventory Handling
  if (handleCommonInventoryKeys(e, ctx)) return true;

  // Key Z: Shift-Z-Z double-tap for TTS Engine Toggle
  if (e.code === 'KeyZ' && isShift) {
    const prevTime = lastKeyTime?.current ? lastKeyTime.current['KeyZ_Shift'] || 0 : 0;
    if (lastKeyTime?.current) {
      lastKeyTime.current['KeyZ_Shift'] = now;
    }
    if (now - prevTime < 400) {
      setGameState(prev => {
        const next = !prev.isTTSEnabled;
        const msg = next ? "Speech synthesis enabled." : "Speech synthesis disabled.";
        speak(msg);
        announceToScreenReader(msg);
        return { ...prev, isTTSEnabled: next };
      });
      if (lastKeyTime?.current) {
        lastKeyTime.current['KeyZ_Shift'] = 0; // Reset
      }
    }
    return true;
  }

  // Key A / ArrowLeft: (Handled in Movement for rotation, but might have interaction)
  // Arden Denis typically uses specific keys for interaction

  // Key L: Interact / Lean? (Standardization says L is lean)
  if (e.code === 'KeyL' && !isShift) {
    if (state.isInventoryOpen) return true;
    handleWorldInteraction(ctx);
    return true;
  }

  // Slash Key: Inventory
  if (e.code === 'Slash' && !isShift) {
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
    const msg = next ? "Inventory opened. Use arrow keys to pick a tab or item." : "Inventory closed.";
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // I and K: Cruise Control (Target Speed)
  if (e.code === 'KeyI' && !isShift) {
    const nextSpeed = Math.min(100, state.targetSpeed + 5);
    setGameState(prev => ({ ...prev, targetSpeed: nextSpeed }));
    const msg = `Target speed increased to ${nextSpeed}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }
  if (e.code === 'KeyK' && !isShift) {
    const nextSpeed = Math.max(0, state.targetSpeed - 5);
    setGameState(prev => ({ ...prev, targetSpeed: nextSpeed }));
    const msg = `Target speed decreased to ${nextSpeed}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // E Key: Interactive Key / Menu Action inside inventory
  if (e.code === 'KeyE' && !isShift) {
    if (state.isInventoryOpen) {
      if (state.inventoryTab === 'Heart' || state.inventoryTab === 'Map') {
        speak(`Viewing ${state.inventoryTab} status.`);
        return true;
      }

      if (state.isWalletOpen) {
        const walletItems = state.characterName === 'Priscilla'
          ? ['Priscilla ID Card', 'Priscilla Gold Card']
          : ['ID Card', 'Credit Card', 'Library Card', 'Photo of Abigay'];
        const item = walletItems[state.selectedWalletIndex];
        let desc = "A very important item kept safely in your wallet.";
        if (state.characterName === 'Priscilla') {
          if (item === 'Priscilla ID Card') {
            desc = "This is Priscilla's unique ID Card showing her name, address at the Vanity House, with no picture of Abigay.";
          } else if (item === 'Priscilla Gold Card') {
            desc = "This is a shiny solid-gold credit card designed for premium vanity and extreme financial greed.";
          }
        } else {
          if (item === 'Photo of Abigay') {
            desc = "A beautiful picture of your massive white poodle partner Abigay.";
          }
        }
        speak(`Description of ${item}: ${desc}`);
        return true;
      }

      if (state.inventoryMenuMode === 'Selection') {
        const item = state.inventory.items[state.selectedInventoryIndex];
        if (item?.id === 'wallet') {
          setGameState(prev => ({ ...prev, isWalletOpen: true, selectedWalletIndex: 0 }));
          speak("Wallet opened. View items in wallet. Use arrows to navigate.");
          return true;
        }
        setGameState(prev => ({ ...prev, inventoryMenuMode: 'Action', selectedActionIndex: 0 }));
        const actionMsg = item?.id === 'umbrella' 
          ? `Action menu for Umbrella opened. It is currently ${state.isUmbrellaEquipped ? 'equipped' : 'not equipped'}. Use arrows to pick: Open, Close, Check, Combine, or Equip.` 
          : "Action menu opened. Use, Check, Combine, or Equip.";
        speak(actionMsg);
      } else {
        const item = state.inventory.items[state.selectedInventoryIndex];
        if (item) {
          let actions = ['Use', 'Check', 'Combine', 'Equip'];
          if (item.id === 'umbrella') actions = ['Open', 'Close', 'Check', 'Combine', 'Equip'];
          
          const action = actions[state.selectedActionIndex];
          
          if (item.id === 'umbrella') {
            if (action === 'Equip') {
              const nextEquipped = !state.isUmbrellaEquipped;
              setGameState(prev => ({ 
                ...prev, 
                isUmbrellaEquipped: nextEquipped,
                inventoryMenuMode: 'Selection'
              }));
              const msg = nextEquipped ? "Umbrella equipped for your poodle ride." : "Umbrella put away.";
              speak(msg);
              announceToScreenReader(msg);
            } else if (action === 'Open' || action === 'Close') {
              if (!state.isUmbrellaEquipped) {
                speak("You must equip the umbrella first before you can open or close it.");
              } else {
                const nextOpen = action === 'Open';
                setGameState(prev => ({ 
                  ...prev, 
                  isUmbrellaOpen: nextOpen,
                  inventoryMenuMode: 'Selection'
                }));
                speak(`Umbrella ${nextOpen ? 'opened' : 'closed'}.`);
              }
            } else {
              speak(`${action}ing ${item.name}`);
              setGameState(prev => ({ ...prev, inventoryMenuMode: 'Selection' }));
            }
          } else {
            speak(`${action}ing ${item.name}`);
            setGameState(prev => ({ ...prev, inventoryMenuMode: 'Selection' }));
          }
        }
      }
      return true;
    }
  }

  // F Key: Exit Menu / Back inside inventory
  if (e.code === 'KeyF' && !isShift) {
    if (state.isInventoryOpen) {
      if (state.inventoryFocus === 'Content') {
        if (state.isWalletOpen) {
          setGameState(prev => ({ ...prev, isWalletOpen: false }));
          speak("Back to items list.");
        } else if (state.inventoryMenuMode === 'Action') {
          setGameState(prev => ({ ...prev, inventoryMenuMode: 'Selection' }));
          speak("Back to item selection.");
        } else if (state.inventoryTab === 'Storybook') {
          if (state.storybookMenuMode === 'PageContent') {
            setGameState(prev => ({ ...prev, storybookMenuMode: 'Pages' }));
            speak("Back to pages list.");
          } else if (state.storybookMenuMode !== 'Selection') {
            setGameState(prev => ({ ...prev, storybookMenuMode: 'Selection' }));
            speak("Back to storybook menu.");
          } else {
            setGameState(prev => ({ ...prev, inventoryFocus: 'Tabs' }));
            speak("Back to tabs navigation.");
          }
        } else {
          setGameState(prev => ({ ...prev, inventoryFocus: 'Tabs' }));
          speak("Back to tabs navigation.");
        }
      } else {
        setGameState(prev => ({ ...prev, isInventoryOpen: false }));
        speak("Inventory closed.");
      }
      return true;
    }
  }

  // Q Key: Information Input
  if (e.code === 'KeyQ' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    const wallDesc = getWallInteractionDescription(state);
    speak(wallDesc);
    announceToScreenReader(wallDesc);
    return true;
  }

  // E / Enter: Interact in game
  if ((e.code === 'KeyE' || e.code === 'Enter') && !isShift) {
    if (state.isPaused) return true;
    if (!state.isInventoryOpen) {
      handleWorldInteraction(ctx);
      return true;
    }
  }

  // Key M: Poodle Selection
  if (e.code === 'KeyM' && !isShift) {
    const next = !state.isPoodleSelectionOpen;
    setGameState(prev => ({ 
      ...prev, 
      isPoodleSelectionOpen: next,
      selectedPoodleIndex: 0,
      poodleMenuMode: 'Selection',
      selectedPoodleActionIndex: 0
    }));
    const msg = next ? "Poodle selection menu opened. Use arrow keys to pick a poodle." : "Poodle selection menu closed.";
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // Key V: Visual Descriptions
  if (e.code === 'KeyV' && !isShift) {
    const next = !state.isVisualDescriptionEnabled;
    setGameState(prev => ({ ...prev, isVisualDescriptionEnabled: next }));
    speak(next ? "Visual descriptions enabled." : "Visual descriptions disabled.");
    return true;
  }

  return false;
};

export const handleArdenDenisMovement = (ctx: InputContext): InputHandlerResult => {
  const { keysPressed, moveForward, moveReverse, rotate, time, lastRotateTime } = ctx;
  const results: InputHandlerResult = {};

  const isUp = keysPressed.has('KeyW') || keysPressed.has('ArrowUp');
  const isDown = keysPressed.has('KeyS') || keysPressed.has('ArrowDown');
  const isLeft = keysPressed.has('KeyA') || keysPressed.has('ArrowLeft');
  const isRight = keysPressed.has('KeyD') || keysPressed.has('ArrowRight');

  if (isUp) {
    moveForward();
    results.lastMoveTime = time;
  } else if (isDown) {
    moveReverse();
    results.lastMoveTime = time;
  } else if (ctx.gameState.targetSpeed > 0) {
    moveForward();
    results.lastMoveTime = time;
  } else if (ctx.gameState.targetSpeed < 0) {
    moveReverse();
    results.lastMoveTime = time;
  }

  const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench', 'Soca_Path'].includes(ctx.gameState.area);

  if (time - (ctx.lastRotateTime || 0) > 300) {
    if (isLeft) {
      if (isAdventurePathArea) {
        ctx.announceToScreenReader("Turning is disabled on the Adventure Path.");
      } else {
        rotate(-1);
      }
      results.lastRotateTime = time;
    }
    if (isRight) {
      if (isAdventurePathArea) {
        ctx.announceToScreenReader("Turning is disabled on the Adventure Path.");
      } else {
        rotate(1);
      }
      results.lastRotateTime = time;
    }
  }

  return results;
};
