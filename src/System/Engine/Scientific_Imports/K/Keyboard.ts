import { GameState } from '../../../AI/In-Game/Logic/GameLogic';
import { 
  handleCedellaKeyDown, 
  handleArdenDenisKeyDown, 
  handleStandardKeyDown,
  handleGlobalHotkeys
} from '../../../Keyboards_and_Controllers/Keyboard';
import { InputContext } from '../../../InputTypes';

/**
 * Keyboard layout routing logic.
 * Refactored to utilize the new modular Keyboard system.
 */

export function routeKeyboardEvent(
  e: KeyboardEvent, 
  state: GameState, 
  setGameState: React.Dispatch<React.SetStateAction<GameState>>, 
  audio: any, 
  speak: (t: string, l?: string) => void, 
  announceToScreenReader: (t: string) => void, 
  gameStateRef: React.MutableRefObject<GameState>, 
  handlers: {
    bark: (m?: string, isCore?: boolean, count?: number, area?: string) => void;
    pet: () => void;
    lean: () => void;
    collar: () => void;
    jump: () => void;
    readHUD: () => void;
    setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
    setSynth: (s: any) => void;
  },
  aTapCount: React.MutableRefObject<number>, 
  aTapTimeout: React.MutableRefObject<any>, 
  aShiftTapCount: React.MutableRefObject<number>, 
  aShiftTapTimeout: React.MutableRefObject<any>, 
  lastKeyTime: React.MutableRefObject<{ [key: string]: number }>
): boolean {
  // Construct a partial InputContext for the modular handlers
  const ctx: InputContext = {
    gameState: state,
    keysPressed: new Set(), // Keys pressed are handled via e.code in event logic usually
    time: Date.now(),
    audio,
    speak,
    announceToScreenReader,
    setGameState,
    gameStateRef,
    aTapCount,
    aTapTimeout,
    aShiftTapCount,
    aShiftTapTimeout,
    lastKeyTime,
    systems: {} as any, // Not fully needed for these handlers yet
    moveForward: () => {},
    moveReverse: () => {},
    rotate: () => {},
    handlers // Added handlers here
  };

  // 1. Global Hotkeys (Diagnostics, Toggles, etc.)
  if (handleGlobalHotkeys(e, ctx)) return true;

  // 2. Layout-Specific Handlers
  if (state.keyboardLayout === 'Arden Denis') {
    return handleArdenDenisKeyDown(e, ctx);
  } else if (state.keyboardLayout === 'Cedella') {
    return handleCedellaKeyDown(e, ctx);
  } else if (state.keyboardLayout === 'Standard') {
    return handleStandardKeyDown(e, ctx);
  }
  
  return false;
}
