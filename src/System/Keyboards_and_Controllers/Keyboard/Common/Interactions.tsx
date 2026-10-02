import { InputContext } from '../../../InputTypes';
import { handleInteraction } from '../../../Engine/Core/I/Interaction';

/**
 * Handle world interactions (riding toys, talking, etc.)
 */
export const handleWorldInteraction = (ctx: InputContext): boolean => {
  const { gameState: state, setGameState, speak, announceToScreenReader, audio } = ctx;
  
  // Execute handleInteraction synchronously to avoid side-effects inside React state setter
  const newState = handleInteraction(state, speak, audio);
  if (newState !== state) {
    setGameState(newState);
  }
  return true;
};

/**
 * Handle toy ride choice and input
 */
export const handleToyKeys = (e: KeyboardEvent, ctx: InputContext): boolean => {
  const { gameState: state, setGameState, handlers } = ctx;
  
  // 1. If currently riding a toy, handle toy-specific input
  if (state.isRidingToy) {
    // This logic usually intercepts ALL input
    // handleToyInput(e.code) - Needs to be imported or moved
    return true; 
  }

  // 2. If near a toy and choice is pending
  if (state.isToyReady && !state.isRidingToy) {
    if (e.code === 'KeyY' || e.code === 'Enter') {
      // handleToyRideChoice(true)
      return true;
    } else if (e.code === 'KeyN' || e.code === 'Escape') {
      // handleToyRideChoice(false)
      return true;
    }
  }

  return false;
};
