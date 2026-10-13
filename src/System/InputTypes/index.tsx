import { GameState } from '../AI/In-Game/Logic/GameLogic';

export type { GameState };

import { ScreenReader } from '../Sound/TTS/ScreenReader';
import { AudioManager } from '../Audio/AudioManager';
import { ActionDispatcher } from '../State';
import { GeminiService } from '../AI/External';
import { AutomationManager } from '../Automation/AutomationManager';
import { DiagnosticManager } from '../Diagnostics/DiagnosticManager';

export interface InputContext {
  gameState: GameState;
  keysPressed: Set<string>;
  time: number;
  lastMoveTime?: number;
  lastRotateTime?: number;
  lastJoystickRotationTime?: number;
  lastAnnouncedJoystickAngle?: number;
  audio: any;
  systems: {
    screenReader: typeof ScreenReader;
    audio: typeof AudioManager;
    state: typeof ActionDispatcher;
    ai: typeof GeminiService;
    automation: typeof AutomationManager;
    diagnostics: typeof DiagnosticManager;
  };
  speak: (text: string, lang?: string, force?: boolean) => void;
  announceToScreenReader: (text: string, force?: boolean) => void;
  moveForward: (isTappedOverride?: boolean, strafeDir?: 'Left' | 'Right', moveAngleOverride?: number, isReverseMode?: boolean) => void;
  moveReverse: () => void;
  rotate: (dir: number) => void;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameStateRef?: React.MutableRefObject<GameState>;
  aTapCount?: React.MutableRefObject<number>;
  aTapTimeout?: React.MutableRefObject<any>;
  aShiftTapCount?: React.MutableRefObject<number>;
  aShiftTapTimeout?: React.MutableRefObject<any>;
  lastKeyTime?: React.MutableRefObject<{ [key: string]: number }>;
  handlers?: {
    bark: (m?: string, isCore?: boolean, count?: number, area?: string) => void;
    pet: () => void;
    lean: () => void;
    collar: () => void;
    jump: () => void;
    readHUD: () => void;
    setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
    setSynth: (s: any) => void;
  };
}

export type InputHandlerResult = {
  lastMoveTime?: number;
  lastRotateTime?: number;
  lastJoystickRotationTime?: number;
  lastAnnouncedJoystickAngle?: number;
  lastReactUpdateTime?: number;
};

export * from './General';
