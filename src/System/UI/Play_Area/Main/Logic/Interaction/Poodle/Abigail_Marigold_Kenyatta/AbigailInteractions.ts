import { GameState } from '../../../../../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../../../../../Sound/SoundManager';
import { playElegantBark } from '../../../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta';

export function handleAbigailBark(
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean,
  count: number,
  areaOverride?: string
) {
  const { area } = stateRef.current;
  const currentArea = areaOverride || area;
  
  if (isCore || stateRef.current.notifications.bark) {
    const targetArea = areaOverride || area;
    const { ridingAnimal, poodleBarkType } = stateRef.current;
    
    if (count > 1) {
      audio.playMultipleBarks(count, 0, 0, 0, targetArea, ridingAnimal, poodleBarkType);
    } else {
      audio.playPoodleBark(0, 0, 0, targetArea, ridingAnimal, poodleBarkType);
    }
  }
  
  const msg = "Abigail Barks Elegantly";
  if (stateRef.current.notifications.bark) {
    announce(msg);
    speak(msg, 'EN_US');
  }
}

export function handleAbigailPet(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  // Amplify petting Abigail's long hair by an additional 3% (Standardization A)
  audio.playPetSound(0, 0, 0, 1.0815);
  const furColor = 'cream';
  speak(`You pet Abigail's soft, long ${furColor} hair. She wags her tail happily.`, 'EN_US');
  
  // Set petting state for animation (behind ears to neck)
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700);
}

export function handleAbigailLean(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isLeaning;
  // Standardized 1.050 amplification for Abigail
  if (next) audio.playLeanForwardSound(0, 0, 0, 1.050);
  else audio.playReturnUprightSound(0, 0, 0, 1.050);
  
  speak(next ? "Leaning forward towards Abigail's warm furry head." : "Returning to upright position.", 'EN_US');
  setGameState(prev => ({ ...prev, isLeaning: next }));
}

export function handleAbigailCollar(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isGraspingCollar;
  // Standardized 1.0815 amplification for Abigail (Amplified an additional 3%)
  if (next) audio.playCollarGraspSound(0, 0, 0, 1.0815);
  else audio.playDefaultGraspSound(0, 0, 0, 1.0815);
  
  speak(next ? "Grasping the luxurious rose-gold collar with an embossed diamond pattern." : "Returning hands to default position.", 'EN_US');
  setGameState(prev => ({ ...prev, isGraspingCollar: next }));
}
