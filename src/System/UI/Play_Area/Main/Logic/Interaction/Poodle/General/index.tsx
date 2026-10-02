import { GameState } from '../../../../../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../../../../../Sound/SoundManager';
import { handleAbigayBark, handleAbigayPet, handleAbigayLean, handleAbigayCollar } from '../Abigay_Rose_Kone';
import { handleAnninneAmeliaBark, handleAnninneAmeliaPet, handleAnninneAmeliaLean, handleAnninneAmeliaCollar } from '../Anninne-Amelia_Rose_Julisus';
import { handleDymondBark, handleDymondPet, handleDymondLean, handleDymondCollar } from '../Dymond_Daisy_Qin-Reynolds';
import { handleAbigailBark, handleAbigailPet, handleAbigailLean, handleAbigailCollar } from '../Abigail_Marigold_Kenyatta';
import { handleClassicWhitePoodleBark, handleClassicWhitePoodlePet, handleClassicWhitePoodleLean, handleClassicWhitePoodleCollar } from '../Classic/White_Poodle';
import { disambiguatePoodle, PoodleClass } from '../../../../../../../Registry/Characters/Poodles/Disambiguation';

/**
 * Poodle Interaction library - General implementation module.
 * 
 * SCIENTIFIC MANDATE: This registry implements a STRICT ZERO-FALLBACK policy.
 * It utilizes the Poodle Disambiguation Registry to ensure that every character 
 * is routed correctly based on its scientific classification.
 */

export function handlePoodleBark(
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  msgPrefix: string = "The Poodle Barks Elegantly",
  isCore: boolean = true,
  count: number = 1,
  areaOverride?: string
) {
  const { ridingAnimal } = stateRef.current;
  const pData = disambiguatePoodle(ridingAnimal);
  
  if (!pData) return; // Zero-Fallback: Ignore unrecognized animals

  if (ridingAnimal === 'Abigay Rose Kone') {
    handleAbigayBark(stateRef, audio, speak, announce, isCore, count, areaOverride);
  } else if (ridingAnimal === 'Anninne-Amelia Rose Julisus') {
    handleAnninneAmeliaBark(stateRef, audio, speak, announce, isCore, count, areaOverride);
  } else if (ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
    handleDymondBark(stateRef, audio, speak, announce, isCore, count, areaOverride);
  } else if (ridingAnimal === 'Abigail Marigold Kenyatta') {
    handleAbigailBark(stateRef, audio, speak, announce, isCore, count, areaOverride);
  } else if (pData.className === PoodleClass.CLASSIC) {
    handleClassicWhitePoodleBark(stateRef, audio, speak, announce, isCore, count, areaOverride);
  }
}

export function handlePoodlePet(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const { ridingAnimal } = stateRef.current;
  const pData = disambiguatePoodle(ridingAnimal);

  if (!pData) return;

  if (ridingAnimal === 'Abigay Rose Kone') {
    handleAbigayPet(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Anninne-Amelia Rose Julisus') {
    handleAnninneAmeliaPet(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
    handleDymondPet(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Abigail Marigold Kenyatta') {
    handleAbigailPet(stateRef, setGameState, audio, speak);
  } else if (pData.className === PoodleClass.CLASSIC) {
    handleClassicWhitePoodlePet(stateRef, setGameState, audio, speak);
  }
}

export function handlePoodleLean(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const { ridingAnimal } = stateRef.current;
  const pData = disambiguatePoodle(ridingAnimal);

  if (!pData) return;

  if (ridingAnimal === 'Abigay Rose Kone') {
    handleAbigayLean(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Anninne-Amelia Rose Julisus') {
    handleAnninneAmeliaLean(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
    handleDymondLean(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Abigail Marigold Kenyatta') {
    handleAbigailLean(stateRef, setGameState, audio, speak);
  } else if (pData.className === PoodleClass.CLASSIC) {
    handleClassicWhitePoodleLean(stateRef, setGameState, audio, speak);
  }
}

export function handlePoodleCollar(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const { ridingAnimal } = stateRef.current;
  const pData = disambiguatePoodle(ridingAnimal);

  if (!pData) return;

  if (ridingAnimal === 'Abigay Rose Kone') {
    handleAbigayCollar(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Anninne-Amelia Rose Julisus') {
    handleAnninneAmeliaCollar(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
    handleDymondCollar(stateRef, setGameState, audio, speak);
  } else if (ridingAnimal === 'Abigail Marigold Kenyatta') {
    handleAbigailCollar(stateRef, setGameState, audio, speak);
  } else if (pData.className === PoodleClass.CLASSIC) {
    handleClassicWhitePoodleCollar(stateRef, setGameState, audio, speak);
  }
}


