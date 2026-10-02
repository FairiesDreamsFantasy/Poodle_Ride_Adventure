import { SoundContext } from '../../../SoundContext';
import * as General from './General';
import { playDefaultGraspSound } from './Default_Grasp_Position';
import { playRainbowGlassSlidingDoorOpen, playRainbowGlassSlidingDoorClose } from './Door/Sliding_Door/Crafted/Rainbow_Glass_Sliding_Door';
import { playSimulatedGardenSlidingDoorOpen, playSimulatedGardenSlidingDoorClose } from './Door/Sliding_Door/Crafted/Simulated_Garden_Sliding_Door';
import { playBlueDoorOpen, playBlueDoorClose } from './Door/Sliding_Door/Crafted/Blue_Door';
import { playRedEmeraldSlidingDoorOpen, playRedEmeraldSlidingDoorClose } from './Door/Sliding_Door/Crafted/Red_Emerald_-and-Gold_Decorated_Sliding_Door';
import { playSlidingDoorOpenSound, playSlidingDoorCloseSound } from './Door/Sliding_Door';

export const D_Sounds = {
  ...General,
  playDefaultGraspSound,
  
  // Default Sliding Doors
  playSlidingDoorOpen: playSlidingDoorOpenSound,
  playSlidingDoorClose: playSlidingDoorCloseSound,
  
  // Crafted Doors (Direct scientific wiring)
  playRedEmeraldSlidingDoorOpen,
  playRedEmeraldSlidingDoorClose,
  
  playRainbowGlassSlidingDoorOpen,
  playRainbowGlassSlidingDoorClose,
  
  playSimulatedGardenSlidingDoorOpen,
  playSimulatedGardenSlidingDoorClose,
  
  playBlueDoorOpen,
  playBlueDoorClose,

  async playDymondElegantBark(context: any) {
    const { playElegantBark } = await import('../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds');
    const { ctx, connectSFX } = context;
    playElegantBark(ctx, connectSFX);
  }
};
