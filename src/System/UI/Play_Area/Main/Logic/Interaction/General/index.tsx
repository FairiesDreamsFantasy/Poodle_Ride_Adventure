import React from 'react';
import { GameState } from '../../../../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../../../../Sound/SoundManager';
import { DiagnosticManager } from '../../../../../../Diagnostics/DiagnosticManager';
import { handlePoodleBark, handlePoodlePet, handlePoodleLean, handlePoodleCollar } from '../Poodle/PoodleInteractions';

export function bark(
  gameStateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (text: string, lang?: any) => void,
  announceToScreenReader: (text: string) => void,
  msg?: string,
  isCore?: boolean,
  count?: number,
  area?: string
) {
  DiagnosticManager.logInteraction('Bark', msg);
  return handlePoodleBark(gameStateRef, audio, speak, announceToScreenReader, msg, isCore, count, area);
}

export function pet(
  gameStateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (text: string, lang?: any) => void
) {
  DiagnosticManager.logInteraction('Pet');
  return handlePoodlePet(gameStateRef, setGameState, audio, speak);
}

export function lean(
  gameStateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (text: string, lang?: any) => void
) {
  DiagnosticManager.logInteraction('Lean');
  return handlePoodleLean(gameStateRef, setGameState, audio, speak);
}

export function collar(
  gameStateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (text: string, lang?: any) => void
) {
  DiagnosticManager.logInteraction('Collar');
  return handlePoodleCollar(gameStateRef, setGameState, audio, speak);
}
