import React from 'react';
import { GameState } from '@/src/System/AI/In-Game/Logic/GameLogic';
import { SoundManager } from '@/src/System/Sound/SoundManager';
import { PoodleInteractions } from '@/src/System/Registry/AI/In-Game/Category/Animal/Poodle/Crafted/Anninne-Amelia_Rose_Julisus';
import { POODLE_CORE } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/General';

export const handleAnninneAmeliaRoseJulisusBarkAI = (
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean = true,
  count: number = 1,
  areaOverride?: string
): void => {
  const { area, ridingAnimal, poodleBarkType } = stateRef.current;
  const characterName = PoodleInteractions.Anninne_Amelia_Rose_Julisus.name;
  const customMsg = `${characterName} barks elegantly.`;

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

export const handleAnninneAmeliaRoseJulisusPetAI = (
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
): void => {
  audio.playPetSound(0, 0, 0, PoodleInteractions.Anninne_Amelia_Rose_Julisus.pettingVolumeMultiplier);
  const furColor = PoodleInteractions.Anninne_Amelia_Rose_Julisus.furColor;
  speak(`You pet Anninne-Amelia's soft ${furColor} hair. She wags her tail proudly.`, 'EN_US');
  
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700);
};

export const handleAnninneAmeliaRoseJulisusLeanAI = (
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
): void => {
  const next = !stateRef.current.isLeaning;
  if (next) audio.playLeanForwardSound(0, 0, 0, PoodleInteractions.Anninne_Amelia_Rose_Julisus.leanForwardVolumeMultiplier);
  else audio.playReturnUprightSound(0, 0, 0, PoodleInteractions.Anninne_Amelia_Rose_Julisus.leanForwardVolumeMultiplier);

  setGameState(prev => ({ ...prev, isLeaning: next }));
  const stateStr = next ? 'forward' : 'upright';
  speak(`You lean ${stateStr} while riding Anninne-Amelia.`, 'EN_US');
};

export const handleAnninneAmeliaRoseJulisusAboutAI = (
  speak: (t: string, l?: string) => void
): void => {
  const { identity, design } = POODLE_CORE;
  const d = design.dimensions;
  let desc = `${identity.name}. She stands ${d.shoulderHeightFeet} feet at the shoulder. Her head is ${d.headWidthInches} inches wide and ${d.headHeightInches} inches tall. ${design.appearance}`;
  speak(desc.replace(/\s+/g, ' ').trim(), 'EN_US');
};
