/**
 * System/AI/In-Game/Category/UI/Play_Area/Input/KeyboardListener.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Dedicated Keyboard and Input Dispatcher.
 * 
 * Enforces:
 * 1. UI Focus Isolation (DOMEngine.isMenuOrUIInteractive).
 * 2. Key debouncing for one-shot actions.
 * 3. Story Book Toy Intercepts (delegating to ToyManager).
 * 4. Keyboard Layout Routing (Cedella emulated joystick, Arden Denis, Standard layout).
 * 5. Elegant Barking interval on sustained key press with clean release cleanup.
 */

import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { GameState, MOVE_COOLDOWN } from '../../../../Logic/GameLogic';
import { DOMEngine } from '../../../../../../DOM';
import { routeKeyboardEvent } from '../../../../../../Engine/Scientific_Imports/K/Keyboard';
import { executeToyInput, executeToyRideChoice } from '../Toys/ToyManager';

export interface KeyboardListenerActions {
  bark: (msg?: string, isCore?: boolean, count?: number, area?: string) => void;
  pet: () => void;
  lean: () => void;
  collar: () => void;
  jump: () => void;
  readHUD: () => void;
  setShowGrid: Dispatch<SetStateAction<boolean>>;
  handleSetSynth: (synth: any) => void;
}

export interface KeyboardListenerParams {
  gameStateRef: MutableRefObject<GameState>;
  setGameState: Dispatch<SetStateAction<GameState>>;
  keysPressed: MutableRefObject<Set<string>>;
  lastKeyTime: MutableRefObject<Record<string, number>>;
  barkIntervalRef: MutableRefObject<any>;
  audio: any;
  speak: (text: string, locale?: string) => void;
  announceToScreenReader: (msg: string) => void;
  actions: KeyboardListenerActions;
  aTapCount: MutableRefObject<number>;
  aTapTimeout: MutableRefObject<any>;
  aShiftTapCount: MutableRefObject<number>;
  aShiftTapTimeout: MutableRefObject<any>;
  isNearToy: boolean;
}

export function attachGameKeyboardListeners(params: KeyboardListenerParams): () => void {
  const {
    gameStateRef,
    setGameState,
    keysPressed,
    lastKeyTime,
    barkIntervalRef,
    audio,
    speak,
    announceToScreenReader,
    actions,
    aTapCount,
    aTapTimeout,
    aShiftTapCount,
    aShiftTapTimeout,
    isNearToy
  } = params;

  const handleKeyDown = (e: KeyboardEvent) => {
    // 1. Input isolation: prevent game actions if focus is on an interactive UI element or navigating menu
    const target = e.target as HTMLElement;
    if (DOMEngine.isMenuOrUIInteractive(target)) return;

    const state = gameStateRef.current;
    if (!state.isPlaying) return;

    const now = Date.now();
    const isShift = e.shiftKey;

    // Register key press immediately for the kinematic movement loop
    keysPressed.current.add(e.code);

    // Prevent default scrolling for arrow keys and space
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }

    // Prevent repeat for toggle and one-shot actions
    const isOneShotKey = [
      'KeyH',
      'KeyA',
      'KeyD',
      'Digit0',
      'KeyE',
      'KeyZ',
      'KeyL',
      'KeyC',
      'KeyP',
      'KeyG',
      'KeyI',
      'KeyQ',
      'Digit3',
      'Digit4',
      'Digit5',
      'Digit6'
    ].includes(e.code);
    if (e.repeat && isOneShotKey) return;

    if (!e.repeat) {
      lastKeyTime.current[e.code] = now;
    }

    // 2. STORY BOOK TOY INTERCEPTS
    if (state.isRidingToy) {
      executeToyInput(e.code, state, setGameState, audio, { speak });
      e.preventDefault();
      return;
    }

    if (state.isToyReady && !state.isRidingToy) {
      if (e.code === 'KeyY' || e.code === 'Enter') {
        executeToyRideChoice(true, state, setGameState, audio, { speak });
        e.preventDefault();
        return;
      } else if (e.code === 'KeyN' || e.code === 'Escape') {
        executeToyRideChoice(false, state, setGameState, audio, { speak });
        e.preventDefault();
        return;
      }
    }

    // 3. Delegate to chosen Keyboard Layout via Library
    if (
      routeKeyboardEvent(
        e,
        state,
        setGameState,
        audio,
        speak,
        announceToScreenReader,
        gameStateRef,
        {
          bark: actions.bark,
          pet: actions.pet,
          lean: actions.lean,
          collar: actions.collar,
          jump: actions.jump,
          readHUD: actions.readHUD,
          setShowGrid: actions.setShowGrid,
          setSynth: actions.handleSetSynth
        },
        aTapCount,
        aTapTimeout,
        aShiftTapCount,
        aShiftTapTimeout,
        lastKeyTime
      )
    ) {
      e.preventDefault();
      return;
    }

    // 4. Barking Interval Trigger (If layout didn't swallow it)
    const isBarkKey =
      (e.code === 'KeyS' && !isShift && state.keyboardLayout !== 'Arden Denis') ||
      (e.code === 'KeyO' && state.keyboardLayout === 'Arden Denis' && !isNearToy);

    if (isBarkKey) {
      if (!barkIntervalRef.current) {
        actions.bark('The poodle barks elegantly.', true);
        barkIntervalRef.current = setInterval(() => {
          actions.bark('The poodle barks elegantly.', true);
        }, MOVE_COOLDOWN);
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const state = gameStateRef.current;

    const isBarkKeyRelease =
      (e.code === 'KeyS' && state.keyboardLayout !== 'Arden Denis') ||
      (e.code === 'KeyO' && state.keyboardLayout === 'Arden Denis');

    if (isBarkKeyRelease) {
      if (barkIntervalRef.current) {
        clearInterval(barkIntervalRef.current);
        barkIntervalRef.current = null;
      }
    }

    keysPressed.current.delete(e.code);
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}
