/**
 * System/AI/In-Game/Category/Animal/Selection_Screen/General/index.tsx
 * 
 * Dedicated Selection AI Pipeline for Animal & Poodle Selection Screens.
 * Decouples the character selection screen logic (browsing, previewing, and selecting)
 * from the active exploration engine.
 * 
 * Features:
 * 1. Dedicated Selection AI Pipeline: Decoupled UI state handling and preview routing.
 * 2. Context-Aware Voice & Speech (TTS): Dispatches targeted acoustic announcements
 *    and character bios directly without triggering in-game gallop rhythms or world events.
 * 3. Clean State Transitions: Manages companion switching, Storybook auto-switch rules
 *    (e.g., Dymond Daisy Qin-Reynolds in Storybook Course), and restores prior companion state.
 */

import { handlePoodleAboutAI } from '../../../Animal/Poodle/General';

export interface AnimalSelectionTransitionOptions {
  targetPoodleName: string;
  currentRidingAnimal: string;
  isStorybookCourse?: boolean;
  isStorybookDecisionZone?: boolean;
  priorCompanionName?: string;
  playAudioEffect?: () => void;
  setGameState?: (updater: (prev: any) => any) => void;
  speak: (text: string, locale?: string) => void;
}

export interface AnimalSelectionStateResult {
  canSwitch: boolean;
  reason?: string;
  targetPoodleName: string;
  shouldPreservePrior: boolean;
  priorToStore?: string;
}

/**
 * Evaluates whether a companion switch should occur, obeying Storybook persistence and auto-switch invariants.
 */
export const evaluateAnimalSelectionTransition = (
  options: {
    targetPoodleName: string;
    currentRidingAnimal: string;
    isStorybookCourse?: boolean;
    isStorybookDecisionZone?: boolean;
    priorCompanionName?: string;
  }
): AnimalSelectionStateResult => {
  const { targetPoodleName, currentRidingAnimal, isStorybookCourse, isStorybookDecisionZone, priorCompanionName } = options;

  // Already riding check
  if (targetPoodleName === currentRidingAnimal) {
    return {
      canSwitch: false,
      reason: `Already riding ${targetPoodleName}`,
      targetPoodleName,
      shouldPreservePrior: false,
    };
  }

  // Storybook Course auto-switch rule: Course requires Dymond Daisy Qin-Reynolds
  if (isStorybookCourse && targetPoodleName !== 'Dymond Daisy Qin-Reynolds') {
    return {
      canSwitch: false,
      reason: 'Storybook Course requires Dymond Daisy Qin-Reynolds.',
      targetPoodleName: 'Dymond Daisy Qin-Reynolds',
      shouldPreservePrior: true,
      priorToStore: priorCompanionName || currentRidingAnimal,
    };
  }

  // Decision Zone preserves the currently ridden poodle
  if (isStorybookDecisionZone) {
    return {
      canSwitch: true,
      targetPoodleName,
      shouldPreservePrior: true,
      priorToStore: priorCompanionName || currentRidingAnimal,
    };
  }

  return {
    canSwitch: true,
    targetPoodleName,
    shouldPreservePrior: true,
    priorToStore: currentRidingAnimal,
  };
};

/**
 * Dispatches context-aware voice speech for animal selection browsing without triggering
 * in-game gallop rhythms, footsteps, or movement events.
 */
export const handleAnimalSelectionAnnouncement = (
  titleOrName: string,
  speak: (text: string, locale?: string) => void,
  prefix?: string
): void => {
  const message = prefix ? `${prefix}: ${titleOrName}` : titleOrName;
  speak(message, 'EN_US');
};

/**
 * Handles character and companion "About" requests directly via the dedicated AI pipeline.
 */
export const handleAnimalSelectionAbout = (
  poodleId: string,
  speak: (text: string, locale?: string) => void
): void => {
  handlePoodleAboutAI(poodleId, speak);
};

/**
 * Executes a clean companion state transition with acoustic cue and safe UI state closure.
 */
export const executeAnimalSelectionRideTransition = (
  options: AnimalSelectionTransitionOptions
): void => {
  const {
    targetPoodleName,
    currentRidingAnimal,
    isStorybookCourse,
    isStorybookDecisionZone,
    priorCompanionName,
    playAudioEffect,
    setGameState,
    speak,
  } = options;

  const evaluation = evaluateAnimalSelectionTransition({
    targetPoodleName,
    currentRidingAnimal,
    isStorybookCourse,
    isStorybookDecisionZone,
    priorCompanionName,
  });

  if (!evaluation.canSwitch) {
    if (evaluation.reason) {
      speak(evaluation.reason, 'EN_US');
    }
    return;
  }

  // Acoustic cue for transition
  if (playAudioEffect) {
    playAudioEffect();
  }

  if (setGameState) {
    setGameState((prev: any) => ({
      ...prev,
      ridingAnimal: evaluation.targetPoodleName,
      previousRidingAnimal: evaluation.priorToStore || prev.previousRidingAnimal,
      isPoodleSelectionOpen: false,
      poodleMenuMode: 'Selection',
    }));
  }

  speak(`${evaluation.targetPoodleName} is now ready to ride!`, 'EN_US');
};
