import { GameState } from '../../../../../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../../../../../Sound/SoundManager';

export function handleAbigayBark(
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean = true,
  count: number = 1,
  areaOverride?: string
) {
  const { area, ridingAnimal, poodleBarkType } = stateRef.current;
  const characterName = 'Abigay';
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

export function handleAbigayPet(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const { ridingAnimal } = stateRef.current;
  // Amplify petting Abigay's hair by an additional 3%
  audio.playPetSound(0, 0, 0, 1.0712);
  const furColor = 'white';
  speak(`You pet Abigay's soft, long ${furColor} hair. She wags her tail happily.`, 'EN_US');
  
  // Set petting state for animation (tiara to neck)
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700);
}

export function handleAbigayLean(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isLeaning;
  const { ridingAnimal } = stateRef.current;
  // Amplify sound of leaning for 3.4% louder
  if (next) audio.playLeanForwardSound(0, 0, 0, 1.034);
  else audio.playReturnUprightSound(0, 0, 0, 1.034);
  speak(next ? "Leaning forward towards Abigay's warm furry head." : "Returning to upright position.", 'EN_US');
  setGameState(prev => ({ ...prev, isLeaning: next }));
}

export function handleAbigayCollar(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isGraspingCollar;
  const { ridingAnimal } = stateRef.current;
  // Amplify grasping her collar by an additional 3%
  if (next) audio.playCollarGraspSound(0, 0, 0, 1.0661);
  else audio.playDefaultGraspSound(0, 0, 0, 1.0661);
  
  speak(next ? "Grasping the pink collar with horizontal white diamonds." : "Returning hands to default position.", 'EN_US');
  setGameState(prev => ({ ...prev, isGraspingCollar: next }));
}
