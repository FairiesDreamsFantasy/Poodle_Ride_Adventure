import React from 'react';
import { GameState } from '@/src/System/AI/In-Game/Logic/GameLogic';
import { SoundManager } from '@/src/System/Sound/SoundManager';
import { PoodleInteractions } from '@/src/System/Registry/AI/In-Game/Category/Animal/Poodle/Crafted/Abigay_Rose_Kone';
import { POODLE_CORE } from '@/src/Characters/Poodles/Abigay_Rose_Kone/General';

export const handleAbigayRoseKoneBarkAI = (
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean = true,
  count: number = 1,
  areaOverride?: string
): void => {
  const { area, ridingAnimal, poodleBarkType } = stateRef.current;
  const characterName = PoodleInteractions.Abigay_Rose_Kone.name;
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

export const handleAbigayRoseKonePetAI = (
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
): void => {
  audio.playPetSound(0, 0, 0, PoodleInteractions.Abigay_Rose_Kone.pettingVolumeMultiplier);
  const furColor = PoodleInteractions.Abigay_Rose_Kone.furColor;
  speak(`You pet Abigay's soft, long ${furColor} hair. She wags her tail happily.`, 'EN_US');
  
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700);
};

export const handleAbigayRoseKoneLeanAI = (
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
): void => {
  const next = !stateRef.current.isLeaning;
  if (next) audio.playLeanForwardSound(0, 0, 0, PoodleInteractions.Abigay_Rose_Kone.leanForwardVolumeMultiplier);
  else audio.playReturnUprightSound(0, 0, 0, PoodleInteractions.Abigay_Rose_Kone.leanForwardVolumeMultiplier);

  setGameState(prev => ({ ...prev, isLeaning: next }));
  const stateStr = next ? 'forward' : 'upright';
  speak(`You lean ${stateStr} while riding Abigay.`, 'EN_US');
};

export const handleAbigayRoseKoneAboutAI = (
  speak: (t: string, l?: string) => void
): void => {
  const { identity, design } = POODLE_CORE;
  const d = design.dimensions;
  let desc = `${identity.name}. She stands ${d.shoulderHeightFeet} feet at the shoulder. Her head is ${d.headWidthInches} inches wide and ${d.headHeightFeet} feet tall. ${design.appearance}`;
  speak(desc.replace(/\s+/g, ' ').trim(), 'EN_US');
};
