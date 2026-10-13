import { GameState } from '../../../../../Logic/GameLogic';
import { SoundManager } from '../../../../../../../Sound/SoundManager';
import { calculateDoorSpatialPan } from './SpatialPan';

export { calculateDoorSpatialPan } from './SpatialPan';

/**
 * DoorManager AI: Handles proximity detection and scientific state updates for doors.
 * Resolves panning with true 3D relative listener coordinates.
 * Supports multi-directional porch and interior threshold calculations.
 */
export const manageDoorProximity = (state: GameState, audio: SoundManager): Partial<GameState> => {
  const updates: Partial<GameState> = {};
  const proximityThreshold = 150;

  // 1. Meditation Hall / Simulated Garden Area Doors
  if (['MeditationHall', 'SimulatedGardenArea'].includes(state.area)) {
    const gardenDoorX = 1000;
    const gardenDoorY = state.area === 'MeditationHall' ? 1000 : 0;
    const dist = Math.sqrt(Math.pow(state.gridX - gardenDoorX, 2) + Math.pow(state.gridY - gardenDoorY, 2));
    const targetGardenProgress = dist < proximityThreshold ? 1 : 0;

    if (state.simulatedGardenDoorProgress !== targetGardenProgress) {
      updates.simulatedGardenDoorProgress = targetGardenProgress;
      updates.isSimulatedGardenDoorOpen = targetGardenProgress === 1;
      
      const pan = calculateDoorSpatialPan(gardenDoorX, gardenDoorY, state.gridX, state.gridY, state.rotation, state.direction);
      
      if (targetGardenProgress === 1) {
        audio.playSimulatedGardenSlidingDoorSound(pan.x, pan.y, pan.z);
      } else {
        audio.playSimulatedGardenSlidingDoorCloseSound(pan.x, pan.y, pan.z);
      }
    }

    if (state.area === 'MeditationHall') {
      const rainbowDoorX = 1000;
      const rainbowDoorY = 0;
      const rainbowDist = Math.sqrt(Math.pow(state.gridX - rainbowDoorX, 2) + Math.pow(state.gridY - rainbowDoorY, 2));
      const targetRainbowProgress = rainbowDist < proximityThreshold ? 1 : 0;

      if (state.rainbowSlidingDoorProgress !== targetRainbowProgress) {
        updates.rainbowSlidingDoorProgress = targetRainbowProgress;
        
        const pan = calculateDoorSpatialPan(rainbowDoorX, rainbowDoorY, state.gridX, state.gridY, state.rotation, state.direction);
        
        if (targetRainbowProgress === 1) {
          audio.playRainbowGlassSlidingDoorOpenSound(pan.x, pan.y, pan.z); 
        } else {
          audio.playRainbowGlassSlidingDoorCloseSound(pan.x, pan.y, pan.z);
        }
      }
    }
  }

  // 2. Blue Doors (North of Foyer <-> South of Front Porch)
  if (state.area === 'Foyer' || state.area === 'FrontPorch') {
    const isPorch = state.area === 'FrontPorch';
    const blueDoorX = isPorch ? 4000 : 1000;
    const blueDoorY = isPorch ? 0 : 2000;
    const blueDist = Math.sqrt(Math.pow(state.gridX - blueDoorX, 2) + Math.pow(state.gridY - blueDoorY, 2));
    const targetBlueProgress = blueDist < proximityThreshold ? 1 : 0;

    if (state.blueDoorProgress !== targetBlueProgress) {
      updates.blueDoorProgress = targetBlueProgress;
      updates.isBlueDoorOpen = targetBlueProgress === 1;
      
      const pan = calculateDoorSpatialPan(blueDoorX, blueDoorY, state.gridX, state.gridY, state.rotation, state.direction);
      
      if (targetBlueProgress === 1) {
        audio.playBlueDoorOpenSound(pan.x, pan.y, pan.z);
      } else {
        audio.playBlueDoorCloseSound(pan.x, pan.y, pan.z);
      }
    }
  }

  // 3. Rugged Play Field Arcade Doors
  if (state.area === 'RuggedPlayField') {
    const arcadeDoorY = 1000;
    
    // West Door (x = 0)
    const westDoorX = 0;
    const westDist = Math.sqrt(Math.pow(state.gridX - westDoorX, 2) + Math.pow(state.gridY - arcadeDoorY, 2));
    const targetWestProgress = westDist < proximityThreshold ? 1 : 0;

    if (state.ruggedWestArcadeDoorProgress !== targetWestProgress) {
      updates.ruggedWestArcadeDoorProgress = targetWestProgress;
      updates.isRuggedWestArcadeDoorOpen = targetWestProgress === 1;

      const pan = calculateDoorSpatialPan(westDoorX, arcadeDoorY, state.gridX, state.gridY, state.rotation, state.direction);

      if (targetWestProgress === 1) {
        audio.playRuggedWestArcadeDoorOpenSound(pan.x, pan.y, pan.z);
      } else {
        audio.playRuggedWestArcadeDoorCloseSound(pan.x, pan.y, pan.z);
      }
    }

    // East Door (x = 2000)
    const eastDoorX = 2000;
    const eastDist = Math.sqrt(Math.pow(state.gridX - eastDoorX, 2) + Math.pow(state.gridY - arcadeDoorY, 2));
    const targetEastProgress = eastDist < proximityThreshold ? 1 : 0;

    if (state.ruggedEastArcadeDoorProgress !== targetEastProgress) {
      updates.ruggedEastArcadeDoorProgress = targetEastProgress;
      updates.isRuggedEastArcadeDoorOpen = targetEastProgress === 1;

      const pan = calculateDoorSpatialPan(eastDoorX, arcadeDoorY, state.gridX, state.gridY, state.rotation, state.direction);

      if (targetEastProgress === 1) {
        audio.playRuggedEastArcadeDoorOpenSound(pan.x, pan.y, pan.z);
      } else {
        audio.playRuggedEastArcadeDoorCloseSound(pan.x, pan.y, pan.z);
      }
    }
  }

  return updates;
};

export const manageDoorProximityAI = manageDoorProximity;
