import React from 'react';
import { GameState } from '@/src/System/AI/In-Game/Logic/GameLogic';
import { SoundManager } from '@/src/System/Sound/SoundManager';
import { PoodleInteractions } from '@/src/System/Registry/AI/In-Game/Category/Animal/Poodle/Classic/White_Female_Poodle';

export const handleWhiteFemalePoodleBarkAI = (
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean = false,
  count: number = 1,
  areaOverride?: string
): void => {
  const { area, ridingAnimal, poodleBarkType } = stateRef.current;
  const characterName = PoodleInteractions.White_Female_Poodle.name;
  const customMsg = `${characterName} barks with a classic tone.`;

  if (isCore || stateRef.current.notifications.bark) {
    const targetArea = areaOverride || area;
    if (count > 1) {
      audio.playMultipleBarks(count, 0, 0, 0, targetArea, ridingAnimal, poodleBarkType);
    } else {
      audio.playPoodleBark(0, 0, 0, targetArea, ridingAnimal, poodleBarkType);
    }
  }
  if (stateRef.current.notifications.bark) {
    announce(customMsg);
    speak(customMsg, 'EN_US');
  }
};

export const handleWhiteFemalePoodlePetAI = (
  _stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
): void => {
  audio.playPetSound(0, 0, 0, PoodleInteractions.White_Female_Poodle.pettingVolumeMultiplier);
  speak(`You pet the white female poodle's classic coat. She barks happily.`, 'EN_US');
  
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700);
};

export const handleWhiteFemalePoodleLeanAI = (
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
): void => {
  const next = !stateRef.current.isLeaning;
  if (next) audio.playLeanForwardSound(0, 0, 0, PoodleInteractions.White_Female_Poodle.leanForwardVolumeMultiplier);
  else audio.playReturnUprightSound(0, 0, 0, PoodleInteractions.White_Female_Poodle.leanForwardVolumeMultiplier);

  setGameState(prev => ({ ...prev, isLeaning: next }));
  const stateStr = next ? 'forward' : 'upright';
  speak(`You lean ${stateStr} on the classic white poodle.`, 'EN_US');
};
