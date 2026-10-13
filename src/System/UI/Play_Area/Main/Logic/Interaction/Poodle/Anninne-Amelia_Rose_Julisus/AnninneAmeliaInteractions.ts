import { GameState } from '../../../../../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../../../../../Sound/SoundManager';

export function handleAnninneAmeliaBark(
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean = true,
  count: number = 1,
  areaOverride?: string
) {
  const { area, ridingAnimal, poodleBarkType } = stateRef.current;
  const characterName = 'Anninne-Amelia';
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

export function handleAnninneAmeliaPet(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const { ridingAnimal } = stateRef.current;
  // Amplify the sound of petting her fur by an additional 3%
  audio.playPetSound(0, 0, 0, 1.0712);
  const furColor = 'red-orange';
  speak(`You pet Anninne-Amelia's soft, long ${furColor} wavy hair. She wags her tail happily.`, 'EN_US');
  
  // Set petting state for animation
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700); // 700ms stroke duration
}

export function handleAnninneAmeliaLean(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isLeaning;
  const { ridingAnimal } = stateRef.current;
  // Amplify sound of leaning forward by 3.2%
  if (next) audio.playLeanForwardSound(0, 0, 0, 1.032);
  else audio.playReturnUprightSound(0, 0, 0, 1.032);
  speak(next ? "Leaning forward towards Anninne-Amelia's warm furry head." : "Returning to upright position.", 'EN_US');
  setGameState(prev => ({ ...prev, isLeaning: next }));
}

export function handleAnninneAmeliaCollar(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isGraspingCollar;
  const { ridingAnimal } = stateRef.current;
  // Amplify grasping of her collar by an additional 3%
  if (next) audio.playCollarGraspSound(0, 0, 0, 1.0640);
  else audio.playDefaultGraspSound(0, 0, 0, 1.0640);
  
  speak(next ? "Grasping the gold collar with green and red horizontal diamonds and rainbow borders." : "Returning hands to default position.", 'EN_US');
  setGameState(prev => ({ ...prev, isGraspingCollar: next }));
}
