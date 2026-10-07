import { GameState } from '../../../../../../../types';

export const handleChoiceY = (prev: GameState): GameState => {
  if (prev.activeQuestion === 'ride_opossum') {
    // Girl leaves porch and randomly rides rabbit in 15x15 garden
    const girlGardenX = Math.floor(Math.random() * 15) + 1;
    const girlGardenY = Math.floor(Math.random() * 15) + 1;

    return {
      ...prev,
      isRidingOpossum: true,
      hasSharedRabbit: true,
      hasRefusedShare: false,
      activeQuestion: 'none',
      score: prev.score + 8,
      girlInGarden: true,
      girlGardenX,
      girlGardenY,
      screenReaderText: "You are now riding an opossum. A girl is now riding a rabbit. When you use the arrow keys; you hear a realistic sound of an opossum moving. Toggle off TTS to hear an opossum's movement as you use the arrow keys. If you want to jump; an opossum jumps, and you can hear a realistic sound of an opossum jumping. If you want to pet an opossum; press the P key on your keyboard, and you hear a realistic sound of a girl petting her opossum. If you want to share your rabbit; you can hear a girl riding a white rabbit and leave the porch. You can hear a realistic sound of a magic wand, and a point ding as you get 8 points for sharing your rabbit."
    };
  }
  
  if (prev.activeQuestion === 'tea_party_or_adventure') {
    return {
      ...prev,
      activeQuestion: 'none',
      screenReaderText: "You chose to have a tea party!"
    };
  }
  
  return prev;
};

export const handleChoiceN = (prev: GameState): GameState => {
  if (prev.activeQuestion === 'ride_opossum') {
    return {
      ...prev,
      activeQuestion: 'none',
      hasRefusedShare: true,
      isSelfishSequenceActive: true,
      selfishSequenceStep: 0,
      screenReaderText: "Not sharing your rabbit? That's being selfish. And this girl is not going to share her opossum."
    };
  }

  return {
    ...prev,
    activeQuestion: 'none',
    screenReaderText: "You declined."
  };
};
