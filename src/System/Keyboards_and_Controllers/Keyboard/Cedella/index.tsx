import { InputContext, InputHandlerResult } from '../../../InputTypes';
import { handleCommonInventoryKeys } from '../Common';
import { handleWorldInteraction } from '../Common/Interactions';
import { getWallInteractionDescription } from '../../../Engine/Scientific_Imports/I/InputDescriptions';
import { MovementMode } from '../../../Engine/Core/Types';
import { handleRegularMultiTap, handleShiftMultiTap } from '../Multitap';

/**
 * Cedella Keyboard Layout Logic
 * Standardized emulated joystick and non-snapping movement.
 */

export const handleCedellaKeyDown = (e: KeyboardEvent, ctx: InputContext): boolean => {
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

  // Key A: Location / Position Information (Multi-tap)
  if (e.code === 'KeyA') {
    if (isShift) {
      if (aShiftTapCount) {
        aShiftTapCount.current++;
        if (aShiftTapTimeout?.current) clearTimeout(aShiftTapTimeout.current);
        if (aShiftTapTimeout) {
          aShiftTapTimeout.current = setTimeout(() => {
            handleShiftMultiTap(aShiftTapCount.current, state, speak, announceToScreenReader);
            aShiftTapCount.current = 0;
          }, 400);
        }
      }
    } else {
      if (aTapCount) {
        aTapCount.current++;
        if (aTapTimeout?.current) clearTimeout(aTapTimeout.current);
        if (aTapTimeout) {
          aTapTimeout.current = setTimeout(() => {
            handleRegularMultiTap(aTapCount.current, state, speak, announceToScreenReader);
            aTapCount.current = 0;
          }, 400);
        }
      }
    }
    return false; // Allow key to pass through for movement (turning left)
  }

  // W Key: Toggle Movement Mode
  if (e.code === 'KeyW' && !isShift) {
    if (state.isInventoryOpen || state.isPoodleSelectionOpen) return true;
    if (state.ridingAnimal === 'Classic White Poodle') {
      // Classic White Poodle is locked to Gallop movement mode; W key is inactive
      return true;
    }
    const modes: MovementMode[] = ['Gallop', 'Canter', 'Trot', 'Walk', 'Slow Walk', 'Very Slow Walk'];
    const currentIndex = modes.indexOf(state.movementMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    
    setGameState(prev => ({ ...prev, movementMode: nextMode }));
    const msg = `Movement mode toggled to ${nextMode}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // R Key: Announce Riding Animal
  if (e.code === 'KeyR' && !isShift) {
    if (state.isInventoryOpen || state.isPoodleSelectionOpen) return true;
    const msg = `You are currently riding ${state.ridingAnimal}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // [ and ]: Cruise Control (Target Speed)
  if (e.code === 'BracketLeft' && !isShift) {
    const nextSpeed = Math.max(0, state.targetSpeed - 5);
    setGameState(prev => ({ ...prev, targetSpeed: nextSpeed }));
    const msg = `Target speed decreased to ${nextSpeed}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }
  if (e.code === 'BracketRight' && !isShift) {
    const nextSpeed = Math.min(100, state.targetSpeed + 5);
    setGameState(prev => ({ ...prev, targetSpeed: nextSpeed }));
    const msg = `Target speed increased to ${nextSpeed}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // J Key: Access Inventory
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
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // I Key: Information Input
  if (e.code === 'KeyI' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    const wallDesc = getWallInteractionDescription(state);
    speak(wallDesc);
    announceToScreenReader(wallDesc);
    return true;
  }

  // O Key: World Interaction
  if (e.code === 'KeyO' && !isShift) {
    if (state.isPaused) return true;
    if (!state.isInventoryOpen) {
      handleWorldInteraction(ctx);
      return true;
    }
  }

  // Enter Key: Activation for menus
  if (e.code === 'Enter' && !isShift) {
    if (state.isPoodleSelectionOpen || state.isInventoryOpen) {
      // Pass through to allow menu item activation
      return false;
    }
    return true; // Swallow elsewhere to avoid unrequested interaction
  }

  // Slash Key: Access Poodle Selection Menu
  if (e.code === 'Slash' && !isShift) {
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

  // O Key: Interactive Key / Menu Action
  if (e.code === 'KeyO' && !isShift) {
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
    } else {
      handleWorldInteraction(ctx);
    }
    return true;
  }

  // X Key: Exit Menu / Back
  if (e.code === 'KeyX' && !isShift) {
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

  // Control: Stop Speech
  if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
    audio.stopSpeech();
    return true;
  }

  return false;
};

export const handleCedellaMovement = (ctx: InputContext): InputHandlerResult => {
  const { gameState, keysPressed, moveForward, moveReverse, rotate, announceToScreenReader, time } = ctx;
  const results: InputHandlerResult = {};
  
  const isJoystickUp = keysPressed.has('Numpad8');
  const isJoystickDown = keysPressed.has('Numpad2');
  
  const isJoystickUpLeft = keysPressed.has('Numpad7');
  const isJoystickUpRight = keysPressed.has('Numpad9');
  const isJoystickDownLeft = keysPressed.has('Numpad1');
  const isJoystickDownRight = keysPressed.has('Numpad3');

  // Standard Arrow Keys Support (Independence)
  const isArrowUp = keysPressed.has('ArrowUp');
  const isArrowDown = keysPressed.has('ArrowDown');
  const isArrowLeft = keysPressed.has('ArrowLeft');
  const isArrowRight = keysPressed.has('ArrowRight');

  // 1. Directional Movement (Non-Snapping Numpad - Continuous)
  if (isJoystickUp) {
    moveForward();
    results.lastMoveTime = time;
  }
  if (isJoystickDown) {
    moveReverse();
    results.lastMoveTime = time;
  }

  // Diagonal Support (Continuous)
  if (isJoystickUpLeft) {
    moveForward(false, undefined, (gameState.rotation - 45 + 360) % 360);
    results.lastMoveTime = time;
  }
  if (isJoystickUpRight) {
    moveForward(false, undefined, (gameState.rotation + 45) % 360);
    results.lastMoveTime = time;
  }
  if (isJoystickDownLeft) {
    moveForward(false, undefined, (gameState.rotation - 135 + 360) % 360, true);
    results.lastMoveTime = time;
  }
  if (isJoystickDownRight) {
    moveForward(false, undefined, (gameState.rotation + 135) % 360, true);
    results.lastMoveTime = time;
  }

  // 2. Standard Arrow Keys (Discrete / Independence)
  if (isArrowUp) {
    moveForward();
    results.lastMoveTime = time;
  }
  if (isArrowDown) {
    moveReverse();
    results.lastMoveTime = time;
  }

  // 3. Cruise Control Support (When no manual directional movement keys are pressed)
  const hasManualMove = isJoystickUp || isJoystickDown || 
                        isJoystickUpLeft || isJoystickUpRight || 
                        isJoystickDownLeft || isJoystickDownRight || 
                        isArrowUp || isArrowDown;

  if (!hasManualMove) {
    if (gameState.targetSpeed > 0) {
      moveForward();
      results.lastMoveTime = time;
    } else if (gameState.targetSpeed < 0) {
      moveReverse();
      results.lastMoveTime = time;
    }
  }

  // 3. Strafing Logic (If enabled) vs Discrete Turning (If disabled)
  if (gameState.isStrafingEnabled) {
    const isJoystickLeft = keysPressed.has('Numpad4');
    const isJoystickRight = keysPressed.has('Numpad6');
    if (isJoystickLeft || isArrowLeft) {
      moveForward(false, 'Left');
      results.lastMoveTime = time;
    }
    if (isJoystickRight || isArrowRight) {
      moveForward(false, 'Right');
      results.lastMoveTime = time;
    }
  } else {
    // Standard discrete turns if not strafing
    const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench', 'Soca_Path'].includes(gameState.area);
    if (time - (ctx.lastRotateTime || 0) > 300) {
      if (isArrowLeft) {
        if (isAdventurePathArea) {
          announceToScreenReader("Turning is disabled on the Adventure Path.");
        } else {
          rotate(-1);
        }
        results.lastRotateTime = time;
      } else if (isArrowRight) {
        if (isAdventurePathArea) {
          announceToScreenReader("Turning is disabled on the Adventure Path.");
        } else {
          rotate(1);
        }
        results.lastRotateTime = time;
      }
    }
  }

  return results;
};

export const handleCedellaJoystick = (ctx: InputContext, lastReactUpdateTime: number): InputHandlerResult => {
  const { 
    gameState, 
    keysPressed, 
    time, 
    lastJoystickRotationTime, 
    lastAnnouncedJoystickAngle, 
    audio, 
    speak, 
    announceToScreenReader,
    setGameState 
  } = ctx;

  const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench', 'Soca_Path'].includes(gameState.area);
  const isJoystickLeft = keysPressed.has('Numpad4');
  const isJoystickRight = keysPressed.has('Numpad6');
  
  const results: InputHandlerResult = {};

  if ((isJoystickLeft || isJoystickRight) && !gameState.isStrafingEnabled) {
    if (isAdventurePathArea) {
      if (time - (ctx.lastRotateTime || 0) > 1000) {
        announceToScreenReader("Turning is disabled on the Adventure Path.");
        results.lastRotateTime = time;
      }
    } else {
      const isShift = keysPressed.has('ShiftLeft') || keysPressed.has('ShiftRight');
      const baseRotationSpeed = 180;
      const rotationSpeed = isShift ? baseRotationSpeed / 4 : baseRotationSpeed; 
      const dt = lastJoystickRotationTime ? Math.min(0.1, (time - lastJoystickRotationTime) / 1000) : 0.016;
      results.lastJoystickRotationTime = time;
      
      let rotationDelta = 0;
      if (isJoystickLeft) rotationDelta -= rotationSpeed * dt;
      if (isJoystickRight) rotationDelta += rotationSpeed * dt;

      if (rotationDelta !== 0) {
        const oldRotation = gameState.rotation;
        const newRotation = (oldRotation + rotationDelta + 360) % 360;
        
        const oldInt = Math.floor(oldRotation);
        const newInt = Math.floor(newRotation);
        if (oldInt !== newInt) {
          const isMajor = newInt % 15 === 0;
          audio.playRotationTick(isMajor);
        }

        const points = [
          { angle: 0 }, { angle: 45 }, { angle: 90 },
          { angle: 135 }, { angle: 180 }, { angle: 225 },
          { angle: 270 }, { angle: 315 }, { angle: 360 }
        ];

        const match = points.find(p => Math.abs(newRotation - p.angle) < 2.5);
        if (match) {
          const announcedAngle = lastAnnouncedJoystickAngle;
          const normalizedAngle = match.angle === 360 ? 0 : match.angle;
          if (announcedAngle !== normalizedAngle) {
            const msg = `${normalizedAngle} degrees`;
            speak(msg);
            announceToScreenReader(msg);
            results.lastAnnouncedJoystickAngle = normalizedAngle;
          }
        }

        gameState.rotation = newRotation;
        if (time - lastReactUpdateTime > 33) {
          setGameState(prev => ({ ...prev, rotation: newRotation }));
          results.lastReactUpdateTime = time;
        }
      }
    }
  } else {
    results.lastJoystickRotationTime = time;
  }

  return results;
};
