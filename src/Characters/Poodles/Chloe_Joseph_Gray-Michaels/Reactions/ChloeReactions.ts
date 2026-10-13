/**
 * ChloeReactions.ts
 * Response behaviors, barks, and interactions for Chloe.
 * She has specialized reactions such as barking aggressively at Abigail and trying to chew tires or knock over streetcars.
 */
import { GameState } from '../../../../System/Engine/Core/Types';

export function getChloeReactionText(state: GameState, targetName: string): string {
  if (targetName === 'Abigail Marigold Kenyatta') {
    return 'Chloe starts barking loudly at Abigail Marigold Kenyatta, vainly showing off her pink and white diamond collar!';
  }
  if (targetName === 'Abigay Rose Kone') {
    return 'Chloe turns her nose up at Abigay Rose Kone and makes a jerky, envious gallop movement!';
  }
  
  // Default mischief
  const randomEvent = Math.floor(Math.random() * 3);
  switch (randomEvent) {
    case 0:
      return 'Chloe is caught chewing on stray streetcar tires!';
    case 1:
      return 'Chloe tries to knock over a miniature cardboard streetcar in a fit of vanity!';
    default:
      return 'Chloe demands attention, parading her conventional brown nose with an entitled posture.';
  }
}
export function handleChloeMischief(state: GameState): { description: string; impactOnHearts: number } {
  return {
    description: "Chloe runs in front of you, showing off her yellow coat and trying to disrupt your route!",
    impactOnHearts: 0 // Chloe can't harm the player physically, but causes mild irritation
  };
}
