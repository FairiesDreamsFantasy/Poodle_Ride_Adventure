import { InputContext } from '../../../InputTypes';
import { getSystemStatusDescription } from '../../../Engine/Scientific_Imports/S/SystemStatus';
import { handleWorldInteraction } from '../Common/Interactions';

/**
 * Global keyboard shortcuts and toggles.
 * These are layout-independent (mostly Shift + Digit or Shift + Key).
 */

export const handleGlobalHotkeys = (e: KeyboardEvent, ctx: InputContext): boolean => {
  const { gameState: state, setGameState, audio, speak, announceToScreenReader, systems, handlers } = ctx;
  const isShift = e.shiftKey;
  const now = Date.now();

  // Space: Jump
  if (e.code === 'Space' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    handlers?.jump();
    return true;
  }

  // Key P: Pet
  if (e.code === 'KeyP' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    handlers?.pet();
    return true;
  }

  // Key H: Show Love
  if (e.code === 'KeyH' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    if (!state.isSpanked) {
      speak("The poodle nuzzles your hand. She loves you because you treat her with kindness and oppose Babylonian norms.");
    } else {
      speak("The poodle seems distant.");
    }
    return true;
  }

  // Key T: View Mode
  if (e.code === 'KeyT' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    const nextMode = state.viewMode === 'Rider' ? 'POV' : 'Rider';
    setGameState(prev => ({ ...prev, viewMode: nextMode }));
    speak(`View mode toggled to ${nextMode === 'Rider' ? 'Rider View' : 'POV View'}`);
    return true;
  }

  // Key L: Lean (Standardized)
  if (e.code === 'KeyL' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    handlers?.lean();
    return true;
  }

  // Key C: Collar (Standardized)
  if (e.code === 'KeyC' && !isShift) {
    if (state.isInventoryOpen || state.isPaused) return true;
    handlers?.collar();
    return true;
  }

  // Key E / Enter: Interact (Standardized - moved to layouts where appropriate)
  
  // Key V: Visual Descriptions (Standardized)
  if (e.code === 'KeyV' && !isShift) {
    const next = !state.isVisualDescriptionEnabled;
    setGameState(prev => ({ ...prev, isVisualDescriptionEnabled: next }));
    speak(next ? "Visual descriptions enabled." : "Visual descriptions disabled.");
    return true;
  }

  // 7. Arrow Keys Turning Mode Manual Toggle (Ctrl + Shift + 4)
  if (e.ctrlKey && e.shiftKey && e.code === 'Digit4') {
    const modes: ('FourDirection' | 'EightDirection' | 'Full360')[] = ['FourDirection', 'EightDirection', 'Full360'];
    const currentMode = state.arrowKeyTurningMode || 'FourDirection';
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    
    let screenReaderMsg = '';
    if (nextMode === 'FourDirection') {
      screenReaderMsg = "Four Direction Mode, your left and right arrow keys are set for turning to a compass direction. Down arrow always go reverse, and up arrow always go forward.";
    } else if (nextMode === 'EightDirection') {
      screenReaderMsg = "Eight-Directional Mode, your left and right arrow keys turns to a compass direction with 8 directions, useful for going to places that are diagonal, or if you need to make an angled turn. Up always go forward, and down always go reverse.";
    } else if (nextMode === 'Full360') {
      screenReaderMsg = "This is a three hundred sixty turning mode. Your arrow keys work like the left and right arrows on a conventional D-pad. Your up arrow key always go forward, and your down arrow key always go reverse. Use this function for traversing places that are curved, rounded, or any place that requires you to use an exact angle to go through doors, go along paths, or other transitions. Also used for diagonal jumping (if needed).";
    }
    
    setGameState(prev => ({ ...prev, arrowKeyTurningMode: nextMode }));
    speak(screenReaderMsg);
    announceToScreenReader(screenReaderMsg);
    return true;
  }

  // 1. Diagnostics Toggle (Shift + 4)
  if (isShift && e.code === 'Digit4' && !e.ctrlKey) {
    const next = !state.showDiagnostics;
    setGameState(prev => ({ ...prev, showDiagnostics: next }));
    const diagMsg = next ? "Diagnostic system enabled." : "Diagnostic system disabled.";
    speak(diagMsg);
    announceToScreenReader(diagMsg);
    return true;
  }

  // Shift + 1: Toggle Bark Notifications
  if (isShift && e.code === 'Digit1') {
    const next = !state.notifications.bark;
    setGameState(prev => ({ 
      ...prev, 
      notifications: { ...prev.notifications, bark: next } 
    }));
    const msg = `Bark notifications ${next ? 'enabled' : 'disabled'}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // Shift + 2: Toggle Jump Notifications
  if (isShift && e.code === 'Digit2') {
    const next = !state.notifications.jump;
    setGameState(prev => ({ 
      ...prev, 
      notifications: { ...prev.notifications, jump: next } 
    }));
    const msg = `Jump notifications ${next ? 'enabled' : 'disabled'}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // Shift + 3: Toggle Running Jump Notifications
  if (isShift && e.code === 'Digit3') {
    const next = !state.notifications.jumpForward;
    setGameState(prev => ({ 
      ...prev, 
      notifications: { ...prev.notifications, jumpForward: next } 
    }));
    const msg = `Running jump notifications ${next ? 'enabled' : 'disabled'}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // 2. Switch between metric/imperial measurements ("4")
  if (!isShift && e.code === 'Digit4' && !state.choices) {
    const nextSystem = state.measurementSystem === 'Imperial' ? 'Metric' : 'Imperial';
    setGameState(prev => ({ ...prev, measurementSystem: nextSystem }));
    const msg = `Measurement system set to ${nextSystem}.`;
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // 3. Read HUD information ("3")
  if (!isShift && e.code === 'Digit3' && !state.choices) {
    handlers?.readHUD();
    return true;
  }

  // 4. CST Toggle (Shift + 0)
  if (isShift && e.code === 'Digit0') {
    const next = !state.isCSTEnabled;
    speak(next ? "CST Clock Enabled (Chicago, IL)" : "CST Clock Disabled");
    setGameState(prev => ({ ...prev, isCSTEnabled: next }));
    return true;
  }

  // 4. Pause Toggle (Shift + 8)
  if (isShift && e.code === 'Digit8') {
    const next = !state.isPaused;
    setGameState(prev => ({ ...prev, isPaused: next }));
    const msg = next ? "Game Paused." : "Game Resumed.";
    speak(msg);
    announceToScreenReader(msg);
    return true;
  }

  // 5. TTS Engine Toggle (Shift + Z + Z) - Cycle: Internal -> Local -> Both -> Off
  if (isShift && e.code === 'KeyZ') {
    const lastZ = ctx.lastKeyTime.current['ShiftKeyZ'] || 0;
    if (now - lastZ < 500) {
      let nextInternal = state.isTTSEnabled;
      let nextLocal = !!state.isLocalTTSEnabled;
      let msg = "";

      if (state.isTTSEnabled && !state.isLocalTTSEnabled) {
        // Internal ON -> Local ON
        nextInternal = false;
        nextLocal = true;
        msg = "Local TTS Mode On";
      } else if (!state.isTTSEnabled && state.isLocalTTSEnabled) {
        // Local ON -> Both OFF
        nextInternal = false;
        nextLocal = false;
        msg = "TTS Engine off";
      } else if (state.isTTSEnabled && state.isLocalTTSEnabled) {
        // Both ON (Edge case) -> Both OFF
        nextInternal = false;
        nextLocal = false;
        msg = "TTS Engine off";
      } else {
        // Both OFF -> Internal ON
        nextInternal = true;
        nextLocal = false;
        msg = "TTS Engine On";
      }

      setGameState(prev => ({ ...prev, isTTSEnabled: nextInternal, isLocalTTSEnabled: nextLocal }));
      speak(msg, undefined, true);
      announceToScreenReader(msg, true);
      ctx.lastKeyTime.current['ShiftKeyZ'] = 0; // Reset
      return true;
    }
    ctx.lastKeyTime.current['ShiftKeyZ'] = now;
    return true;
  }

  // 6. System Status (Shift + M)
  if (isShift && e.code === 'KeyM') {
    const msg = getSystemStatusDescription(state);
    speak(msg); // Assume mt() is handled or msg is already converted
    announceToScreenReader(msg);
    return true;
  }

  // 8. Choice Selection (Digit 1-5)
  if (state.choices && ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(e.code)) {
    const choiceIndex = parseInt(e.code.slice(-1)) - 1;
    if (choiceIndex >= 0 && choiceIndex < state.choices.length) {
      const choice = state.choices[choiceIndex];
      speak(`Choice ${choiceIndex + 1}: ${choice} selected.`);
      // For now, choice logic is handled in the component via state observers or callbacks
      // but we register that the key was handled.
      return true;
    }
  }

  return false;
};
