/**
 * System/AI/In-Game/Category/UI/Play_Area/Toys/ToyManager.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Dedicated Pipeline for Interactive Toys & Ride-On Poodle Rocker.
 * Coordinates page flipping, reading progress, rocking animations, and audio transitions.
 */

import { Dispatch, SetStateAction } from 'react';
import { GameState } from '../../../Logic/GameLogic';
import { STORY_BOOK_PAGES } from '../../../../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/StoryBookLogic';

export interface ToyManagerAudioContext {
  playSqueak: () => void;
  playPageTurn: () => void;
  playPointEarned: () => void;
  playPassSound: () => void;
}

export interface ToyManagerSpeechContext {
  speak: (text: string, locale?: string) => void;
}

/**
 * Handles the player's decision to ride the interactive poodle rocker.
 */
export function executeToyRideChoice(
  ride: boolean,
  gameState: GameState,
  setGameState: Dispatch<SetStateAction<GameState>>,
  audio: ToyManagerAudioContext,
  speech: ToyManagerSpeechContext
): void {
  if (ride) {
    if (gameState.statistics.obstaclesCleared < 7) {
      speech.speak(
        "You haven't completed enough courses yet. You need at least 7 to ride the interactive poodle rocker.",
        'EN_US'
      );
      setGameState(prev => ({ ...prev, isToyReady: false, choices: null }));
      return;
    }
    setGameState(prev => ({
      ...prev,
      isRidingToy: true,
      toyCurrentPage: 0,
      isToyReady: false,
      choices: null
    }));
    speech.speak(
      "You hop onto the pink poodle rocker! You are now interacting with the Story Book! Press Arrow Right to start reading. Use up or down to rock.",
      'EN_US'
    );
    audio.playSqueak();
  } else {
    setGameState(prev => ({ ...prev, isToyReady: false, choices: null }));
    speech.speak("You decide not to interact for now.", 'EN_US');
  }
}

/**
 * Handles interactive input controls while mounted on the ride-on rocker.
 */
export function executeToyInput(
  key: string,
  currentState: GameState,
  setGameState: Dispatch<SetStateAction<GameState>>,
  audio: ToyManagerAudioContext,
  speech: ToyManagerSpeechContext
): void {
  if (!currentState.isRidingToy) return;

  if (key === 'ArrowRight' || key === 'd') {
    const nextPage = currentState.toyCurrentPage + 1;
    if (nextPage < STORY_BOOK_PAGES.length) {
      setGameState(prev => ({ ...prev, toyCurrentPage: nextPage, isToyRocking: false }));
      speech.speak(STORY_BOOK_PAGES[nextPage].text, 'EN_US');
      audio.playPageTurn();
    } else {
      setGameState(prev => ({ ...prev, isRidingToy: false, isToyRocking: false }));
      speech.speak(
        "You've reached the end of the book. You hop off the rocker and return to your poodle.",
        'EN_US'
      );
      audio.playPointEarned();
    }
  } else if (key === 'ArrowLeft' || key === 'a') {
    if (currentState.toyCurrentPage > 0) {
      const prevPage = currentState.toyCurrentPage - 1;
      setGameState(prev => ({ ...prev, toyCurrentPage: prevPage, isToyRocking: false }));
      speech.speak(STORY_BOOK_PAGES[prevPage].text, 'EN_US');
      audio.playPageTurn();
    }
  } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'w' || key === 's') {
    setGameState(prev => ({ ...prev, isToyRocking: true }));
    speech.speak("Squeak! The toy rocks back and forth. This is fun!", 'EN_US');
    audio.playSqueak();
    setTimeout(() => {
      setGameState(prev => ({ ...prev, isToyRocking: false }));
    }, 500);
  } else if (key === 'x' || key === 'f' || key === 'Escape') {
    setGameState(prev => ({ ...prev, isRidingToy: false, isToyRocking: false }));
    speech.speak("You stop the interaction and return to your poodle.", 'EN_US');
    audio.playPassSound();
  }
}
