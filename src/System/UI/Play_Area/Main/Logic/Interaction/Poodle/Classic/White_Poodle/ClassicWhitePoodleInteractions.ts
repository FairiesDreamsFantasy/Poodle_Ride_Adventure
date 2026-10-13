import { GameState } from '../../../../../../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../../../../../../Sound/SoundManager';
import { getClassicWhitePoodleBarkMessage } from './Bark';
import { getClassicWhitePoodlePettingMessage, getClassicWhitePoodleSpankedPettingMessage } from './Petting';
import { getClassicWhitePoodleLeanForwardMessage, getClassicWhitePoodleReturnUprightMessage } from './Leaning';
import { getClassicWhitePoodleCollarGraspMessage, getClassicWhitePoodleCollarReleaseMessage } from './Collar_Grasp';

export function handleClassicWhitePoodleBark(
  stateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void,
  announce: (t: string) => void,
  isCore: boolean = true,
  count: number = 1,
  areaOverride?: string
) {
  const { area, ridingAnimal } = stateRef.current;
  const customMsg = getClassicWhitePoodleBarkMessage();

  if (isCore || stateRef.current.notifications.bark) {
    const targetArea = areaOverride || area;
    // Classic White Poodle is always Classic_A bark type (lower pitch)
    const barkType = 'Classic_A';
    if (count > 1) {
      audio.playMultipleBarks(count, 0, 0, 0, targetArea, ridingAnimal, barkType);
    } else {
      audio.playPoodleBark(0, 0, 0, targetArea, ridingAnimal, barkType);
    }
  }
  if (stateRef.current.notifications.bark) {
    announce(customMsg);
    speak(customMsg, 'EN_US');
  }
}

export function handleClassicWhitePoodlePet(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const { isSpanked } = stateRef.current;
  
  // Amplify petting sound by 4% louder (Standardization "A")
  audio.playPetSound(0, 0, 0, 1.040);
  
  const msg = isSpanked 
    ? getClassicWhitePoodleSpankedPettingMessage()
    : getClassicWhitePoodlePettingMessage();
    
  speak(msg, 'EN_US');
  
  // Set petting state for animation (tiara to neck)
  setGameState(prev => ({ ...prev, isPetting: true, lastPetTime: Date.now() }));
  setTimeout(() => {
    setGameState(prev => ({ ...prev, isPetting: false }));
  }, 700);
}

export function handleClassicWhitePoodleLean(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isLeaning;
  // Amplify sound of leaning for 3.4% louder
  if (next) audio.playLeanForwardSound(0, 0, 0, 1.034);
  else audio.playReturnUprightSound(0, 0, 0, 1.034);
  
  const msg = next 
    ? getClassicWhitePoodleLeanForwardMessage()
    : getClassicWhitePoodleReturnUprightMessage();
    
  speak(msg, 'EN_US');
  setGameState(prev => ({ ...prev, isLeaning: next }));
}

export function handleClassicWhitePoodleCollar(
  stateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  audio: SoundManager,
  speak: (t: string, l?: string) => void
) {
  const next = !stateRef.current.isGraspingCollar;
  // Amplify grasping her collar by an additional 3%
  if (next) audio.playCollarGraspSound(0, 0, 0, 1.0661);
  else audio.playDefaultGraspSound(0, 0, 0, 1.0661);
  
  const msg = next 
    ? getClassicWhitePoodleCollarGraspMessage()
    : getClassicWhitePoodleCollarReleaseMessage();
    
  speak(msg, 'EN_US');
  setGameState(prev => ({ ...prev, isGraspingCollar: next }));
}
