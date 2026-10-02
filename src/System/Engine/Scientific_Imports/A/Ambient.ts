import { GameState, AREA_DIMENSIONS, GRID_SIZE, getCSTTime } from '../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../Sound/SoundManager';

/**
 * Ambient environmental sound logic.
 * Part of the "A" section of the modular Imports library.
 */

export function getChimesVolume(gameState: GameState): number {
  const { area, gridX, gridY } = gameState;
  
  if (area === 'MeditationHall' || area === 'MeditationHallLibrary' || area.includes('MeditationHallLibrary')) {
    // Frequencies: Chimes are located at the Southern boundary (Y = 0)
    const distanceToSource = Math.abs(gridY);
    const baseVolume = (gridX >= 990 && gridX <= 1010) ? 0.075 : 0.04;
    
    // Scientific Logarithmic Distance Fading
    const volume = baseVolume / (1 + (distanceToSource / 200));
    return Math.max(0.002, volume);
  }
  
  if (area === 'BackPorch') {
    return 0.045;
  }
  
  if (area === 'Garden') {
    // Chimes are located at the North entrance of the Garden (at Meditation Hall South wall, Y = AreaHeight)
    const currentDims = AREA_DIMENSIONS[area] || { width: 2000, height: 2000 };
    const distanceToNorthSource = Math.abs(currentDims.height - gridY);
    
    // Faint wind chimes from a distance when going South, coming up when going North
    const volume = 0.05 / (1 + (distanceToNorthSource / 400));
    return Math.max(0.003, volume);
  }
  
  if (area === 'Kitchen' || area === 'DishWasherArea') {
    return 0.025;
  }
  
  return 0.05;
}

export function getStreetSoundParams(gameState: GameState): { volume: number; filterFreq: number } | null {
  const { area, gridY, direction } = gameState;
  const currentDims = AREA_DIMENSIONS[area] || { width: 2000, height: 2000 };
  
  if (
    area === 'BackPorch' || 
    area === 'MiniBackPorch' || 
    area === 'Garden' || 
    area === 'MiniGarden' || 
    area === 'SimulatedGardenArea' || 
    area === 'GardenSpecificWarpRoom'
  ) {
    return null;
  }
  
  if (
    area === 'Street' || 
    area === 'Sidewalk' || 
    area === 'FrontPorch' ||
    area === 'MiniStreet' || 
    area === 'MiniSidewalk' || 
    area === 'MiniFrontPorch'
  ) {
    // Amplified by 10% (0.05 -> 0.055) for optimal audibility outside Rasta-Manor
    return { volume: 0.055, filterFreq: 400 };
  }
  
  if (area === 'TheGrandPlayground' || area === 'GrandBallroom' || area === 'Foyer') {
    // Street noise source is at the North boundary (Entrance)
    const distanceToSource = Math.abs(currentDims.height - gridY);
    
    // Logarithmic attenuation for realistic distance sound, amplified by 10% (0.05 -> 0.055)
    const baseVolume = 0.055 / (1 + (distanceToSource / 500));
    const volume = Math.max(0, baseVolume);
      
    let filterFreq = 400;
    if (direction === 'South') {
      filterFreq = 220; // Added bassiness/muffling when facing away
    }
    return { volume, filterFreq };
  }
  
  if (area === 'MeditationHallLibrary' || area.includes('MeditationHallLibrary')) {
    const distanceToSource = Math.abs(currentDims.height - gridY);
    const volume = 0.02 / (1 + (distanceToSource / 300));
    return { volume: Math.max(0.001, volume), filterFreq: 200 };
  }
  
  return null;
}

export function triggerAmbientSounds(gameState: GameState, audio: SoundManager) {
  const { gridY, area } = gameState;
  const cstDate = getCSTTime();
  const hour = cstDate.getHours();

  const currentDims = AREA_DIMENSIONS[area] || { width: GRID_SIZE, height: GRID_SIZE };
  
  // Play refined Street Sounds if any are applicable
  const streetParams = getStreetSoundParams(gameState);
  if (streetParams && streetParams.volume > 0) {
    audio.playAmbientStreet(0, 0, -1, streetParams.volume, streetParams.filterFreq);
  }
  
  if (area === 'Soca_Path') {
    if (Math.random() < 0.1) {
      audio.playWindInBushes(Math.random() * 2 - 1, 0, Math.random() * 2 - 1);
    }
  } else if (area.startsWith('Allisons') && area !== 'AllisonsPorch') {
    audio.playAmbientStreet(0, 0, 0);
  } else if (area === 'Garden') {
    // Play wind chimes throughout the entire garden with math-based distance volume!
    const gardenChimesVol = getChimesVolume(gameState);
    audio.playAmbientChimes(0, 0, -1, gardenChimesVol);
    audio.playAmbientGarden(0, 0, -1, 0.05);

    if (gridY < currentDims.height * 0.2) {
      audio.playRailwayRumble(0, 0, 1);
      audio.playAmbientGarden(0, 0, 1, 0.04);
    }
    if (Math.random() < 0.3) {
      audio.playWindInBushes(Math.random() * 2 - 1, 0, Math.random() * 2 - 1);
    }
    if (Math.random() < 0.25) {
      audio.playAmbientGarden(0, 0, 0, 0.03); // Play ambient garden sounds throughout
    }
    if ((hour >= 22 || hour < 6) || (hour === 6 && cstDate.getMinutes() < 30)) {
      if (Math.random() < 0.1) {
        audio.playOpossumHunt(Math.random() * 2 - 1, 0, Math.random() * 2 - 1);
      }
    }
  } else if (area === 'BackPorch') {
    // Back Porch has chimes & garden, but absolutely no street sounds
    if (Math.random() < 0.3) {
      audio.playAmbientGarden(0, 0, 0, 0.035);
    }
    if (gridY < currentDims.height * 0.2) {
      if (Math.random() < 0.5) {
        audio.playAmbientChimes(0, 0, 1, getChimesVolume(gameState));
      }
    } else if (gridY > currentDims.height * 0.8) {
      if (Math.random() < 0.5) {
        audio.playAmbientChimes(0, 0, -1, getChimesVolume(gameState));
      }
    }
    if (Math.random() < 0.2) {
      audio.playWindInBushes(Math.random() * 2 - 1, 0, Math.random() * 2 - 1);
    }
  } else if (area === 'FrontPorch' || area === 'Sidewalk' || area === 'Street') {
    if (Math.random() < 0.2) {
      audio.playWindInBushes(Math.random() * 2 - 1, 0, Math.random() * 2 - 1);
    }
    if (area === 'FrontPorch') {
      audio.playAmbientGarden(0, 0, 0, 0.02); // gentle ambient garden bleed
    }
  } else if (area === 'MeditationHallLibrary' || area.includes('MeditationHallLibrary')) {
    // South area wind chimes spread with beautifully calibrated fading volume
    const isSouthArea = gridY <= 1000;
    const chimeProb = isSouthArea ? 0.35 : 0.15;

    if (Math.random() < chimeProb) {
      audio.playAmbientChimes(0, 0, 0, getChimesVolume(gameState)); 
    }
    if (Math.random() < 0.1) {
      audio.playWindInBushes(0, 0, 0);
    }

    // Archway Reverberation from East (x2000, y1-20)
    const isNearEastArchway = gameState.gridX >= currentDims.width - 20 && gameState.gridY <= 20;
    const isFacingReverbDir = gameState.direction === 'South' || gameState.direction === 'West';
    
    if (isNearEastArchway && isFacingReverbDir) {
      if (Math.random() < 0.3) {
        audio.playArchwayReverb(1, 0, 0); // Sound from the east
      }
    }
  } else if (area === 'MeditationHall') {
    // South area wind chimes spread louder than library, volume fading from South to North
    const isSouthArea = gridY <= 1000;
    const chimeProb = isSouthArea ? 0.5 : 0.2;
    if (Math.random() < chimeProb) {
       audio.playAmbientChimes(0, 0, 0, getChimesVolume(gameState));
    }
  } else if (area === 'Kitchen' || area === 'DishWasherArea') {
    // Spreading the sound of wind chimes to the cooking and cleaning southern parts under 1000 feet
    const isSouthArea = gridY <= 1000;
    if (isSouthArea) {
      if (Math.random() < 0.3) {
        audio.playAmbientChimes(0, 0, 0, getChimesVolume(gameState));
      }
    }
  } else if (area === 'AdventureHouseFoyer') {
    if (Math.random() < 0.4) {
      audio.playRockingGoat(0, 0, 0);
    }
  } else if (area === 'AdventureHouseTeaRoom') {
    if (Math.random() < 0.5) {
      audio.playRockingHorse(0, 0, 0);
    }
  } else if (area === 'AdventureHouseMusicRoom') {
    audio.playPianoMusic(0, 0, 0);
  } else if (area === 'AdventureHouseTrenchHallway') {
    if (Math.random() < 0.3) {
      audio.playBulldogBark(-1, 0, 0);
    }
    if (Math.random() < 0.3) {
      audio.playYellowPoodleBark(1, 0, 0);
    }
  } else if (area === 'PablotsFarm' || area === 'PablotsPonyField') {
    audio.playAmbientFarm(0, 0, 0);
  }
}
