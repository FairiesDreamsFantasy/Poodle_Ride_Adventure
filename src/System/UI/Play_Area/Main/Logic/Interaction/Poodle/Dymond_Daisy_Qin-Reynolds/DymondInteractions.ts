import { GameState } from '../../../../../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../../../../../Sound/SoundManager';

/**
 * Dymond Daisy Qin-Reynolds Interactions
 * [PRESERVED ARTISTIC CRAFT]
 */

export function handleDymondBark(
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean = true,
  count: number = 1,
  areaOverride?: string
) {
  const { area, ridingAnimal, poodleBarkType } = stateRef.current;
  const characterName = 'Dymond';
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
}

export function handleDymondPet(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const { ridingAnimal } = stateRef.current;
  // Amplify petting Dymond by an additional 3%
  audio.playPetSound(0, 0, 0, 1.0712);
  const furColor = 'light yellow';
  speak(`You pet Dymond's soft, long ${furColor} wavy hair. She wags her tail happily.`, 'EN_US');
  
  // Set petting state for animation (ears to neck)
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700);
}

export function handleDymondLean(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isLeaning;
  const { ridingAnimal } = stateRef.current;
  // Amplify leaning forward 4.5% louder
  if (next) audio.playLeanForwardSound(0, 0, 0, 1.045);
  else audio.playReturnUprightSound(0, 0, 0, 1.045);
  speak(next ? "Leaning forward towards Dymond's warm furry head." : "Returning to upright position.", 'EN_US');
  setGameState(prev => ({ ...prev, isLeaning: next }));
}

export function handleDymondCollar(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isGraspingCollar;
  const { ridingAnimal } = stateRef.current;
  // Amplify grasping Dymond's collar by an additional 3%
  if (next) audio.playCollarGraspSound(0, 0, 0, 1.0764);
  else audio.playDefaultGraspSound(0, 0, 0, 1.0764);
  
  speak(next ? "Grasping the collar with the cyan diamond-shaped horizontal charm." : "Returning hands to default position.", 'EN_US');
  setGameState(prev => ({ ...prev, isGraspingCollar: next }));
}
