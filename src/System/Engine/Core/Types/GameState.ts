import type { Direction, SynthMode } from '../../../../types';
import { Opponent } from '../O/Opponents';
import { GameStatistics } from '../../../AI/In-Game/Logic/Statistics/StatisticsLogic';
import { Inventory } from '../../../AI/In-Game/Logic/Inventory/InventoryLogic';
import { WeatherState } from '../../../AI/In-Game/Logic/World/Weather/WeatherLogic';
import { Area } from './Areas';
import { MovementMode } from './Movement';
import { Coin } from '../Managers/CoinManager';

export interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  gridX: number;
  gridY: number;
  direction: Direction;
  screenReaderText: string;
  hasAnnouncedWelcome: boolean;
  isJumping: boolean;
  jumpY: number;
  area: Area;
  doorwayStep: number;
  isRampStep: boolean;
  isDescending: boolean;
  isCSTEnabled: boolean;
  isBetaEnabled: boolean;
  showSunRays: boolean;
  ttsEngine: 'native' | 'gemini';
  ttsLanguage?: 'EN_US' | 'En_Rastafari' | 'En_JP_UK' | 'En_JP_US' | 'Japanese' | 'EN_En-RP';
  isTTSEnabled: boolean;
  isLocalTTSEnabled: boolean;
  isLeaning: boolean;
  isGraspingCollar: boolean;
  isAutomated: boolean;
  isRunningJump: boolean;
  isInputLearnActive: boolean;
  opponents: Opponent[];
  statistics: GameStatistics;
  inventory: Inventory;
  weather: WeatherState;
  isSpanked: boolean;
  isPetting: boolean;
  lastPetTime: number;
  moonPhase: number;
  lastGoatSoundTime: number;
  lightingMode: 'Day' | 'Evening' | 'Night';
  choices: string[] | null;
  level: 'Floor' | 'Sky' | 'Cellar' | 'Mezzanine';
  automationStep: number;
  synthMode: SynthMode;
  rampStepCount: number;
  isClassicMode: boolean;
  pixelRatio: number; // 1 = full res, 0.5 = half res, etc.
  isPositioningEnabled: boolean;
  showMeasurements: boolean;
  useCoordinates: boolean;
  isVisualDescriptionEnabled: boolean;
  // Elevator State
  isElevatorDoorOpen: boolean;
  elevatorCurrentFloor: 'Cellar' | 'Floor' | 'Mezzanine' | 'Level1' | 'Level2'; // Floor mapping
  // Continuous movement properties
  speed: number;
  rotation: number; // in degrees
  // New Settings
  isMuted: boolean;
  notifications: {
    bark: boolean;
    jump: boolean;
    jumpForward: boolean;
    truncateTurning: boolean;
    announceDirection: boolean;
    visualDescription: boolean;
    pettingDescription: boolean;
    collarGraspDescription: boolean;
    leanDescription: boolean;
    describeLoveLogic: boolean;
    automatedTurning: boolean;
    turningGranularity: '4-Direction' | '8-Direction' | '16-Direction' | 'Full';
  };
  visualPrefs: 'Auto' | '2D' | 'Simulated3D' | '3D' | 'Hybrid' | '3DPlus' | 'Super3D' | 'Active3D';
  // Look around state
  isLookingAround: boolean;
  lookRotation: number; // offset in degrees
  isStrafingEnabled: boolean;
  targetSpeed: number;
  keyboardLayout: 'Cedella' | 'Standard' | 'Arden Denis';
  // Adventure Path Update State
  score: number;
  timeElapsed: number; // in seconds
  obstaclesJumped: number;
  isTurningDisabled: boolean;
  rampBeepCount: number;
  isAdventurePathActive: boolean;
  obstacles: any[];
  isStarted: boolean;
  viewMode: 'Rider' | 'POV';
  isLevelComplete: boolean;
  hasNextLevel: boolean;
  hasAnnouncedWindChimes: boolean;
  hasAnnouncedSouthwestRectangle: boolean;
  hasAnnouncedSouthwestStairwayEntry: boolean;
  hasAnnouncedSkyRampUsed: boolean;
  hasAnnouncedCellarRampUsed: boolean;
  hasAnnouncedLobbyRampRide: boolean;
  hasAnnouncedMeditationRampLanding: boolean;
  hasAnnouncedMeditationSkyLanding: boolean;
  hasAnnouncedSkyRampLanding: boolean;
  hasAnnouncedSkyRampAscent: boolean;
  hasAnnouncedSkyRampDescent: boolean;
  hasAnnouncedCellarRampLanding: boolean;
  hasAnnouncedPerimeterWalkway: boolean;
  hasAnnouncedDishWasherRoom: boolean;
  hasAnnouncedStreetSounds: boolean;
  hasAnnouncedElevatedPathEntry: boolean;
  hasAnnouncedElevatedPathHalf1: boolean;
  hasAnnouncedElevatedPathHalf2: boolean;
  hasAnnouncedSoutheastCoastWarpRoom: boolean;
  hasAnnouncedToyPedestal: boolean;
  isMiniatureMode: boolean;
  movementMode: MovementMode;
  characterName: string;
  ridingAnimal: string;
  previousRidingAnimal: string;
  poodleBarkType: 'Generic' | 'BOW';
  // Poodle Selection Menu State
  isPoodleSelectionOpen: boolean;
  selectedPoodleIndex: number;
  poodleMenuMode: 'Selection' | 'Action';
  selectedPoodleActionIndex: number; // 0: Ride Now, 1: About, 2: Bark Type, 3: Go Back
  // Inventory Menu State
  isInventoryOpen: boolean;
  inventoryTab: 'Items' | 'Heart' | 'Map' | 'Storybook' | 'Exit';
  selectedInventoryIndex: number;
  inventoryMenuMode: 'Selection' | 'Action';
  selectedActionIndex: number; // 0: Use, 1: Check, 2: Combine, 3: Equip
  heartMeter: number; // Number of hearts
  secretsFound: string[]; // List of secret IDs found
  isLeverDown: boolean;
  rainbowCoins: number;
  isSimulatedGardenDoorOpen: boolean;
  simulatedGardenDoorProgress: number; // 0 to 1
  rainbowSlidingDoorProgress: number; // 0 to 1
  isBlueDoorOpen: boolean;
  blueDoorProgress: number; // 0 to 1
  isRuggedWestArcadeDoorOpen: boolean;
  ruggedWestArcadeDoorProgress: number; // 0 to 1
  isRuggedEastArcadeDoorOpen: boolean;
  ruggedEastArcadeDoorProgress: number; // 0 to 1
  accumulatedDistance: number;
  // Umbrella State
  isUmbrellaEquipped: boolean;
  isUmbrellaOpen: boolean;
  showInterstitialAd: boolean;
  isPaused: boolean;
  currentAdLevel: number;
  isSurroundSoundEnabled: boolean;
  // Wallet Sub-menu
  isWalletOpen: boolean;
  selectedWalletIndex: number;
  inventoryFocus: 'Tabs' | 'Content';
  selectedHeartDetailIndex: number;
  selectedMapDetailIndex: number;
  selectedStorybookItemIndex: number; 
  storybookMenuMode: 'Selection' | 'Pages' | 'PageContent' | 'Layouts' | 'Themes';
  selectedStorybookPageListIndex: number;
  selectedStorybookContentIndex: number;
  storybookSecondaryIndex: number;
  showDiagnostics: boolean;
  isHeaderVisible: boolean;
  // Story Book State
  isRidingToy: boolean;
  toyCurrentPage: number;
  isToyReady: boolean;
  isToyRocking: boolean;
  isPoodleAutoSwitched: boolean;
  coins: Coin[];
  // Storybook Screen State
  isStorybookOpen: boolean;
  storybookFocus: 'Tabs' | 'Content';
  storybookTab: 'Layout' | 'Story' | 'Theme' | 'PublicDomain' | 'Exit' | 'GoBack';
  storybookLayoutMode: 'Webpage' | 'Emulated';
  storybookTheme: 'White' | 'Cream' | 'Night';
  storybookPage: number;
  storybookBookId: string | null;
  storybookSeason: 'Spring' | 'Summer' | 'Fall' | 'Winter';
  arrowKeyTurningMode?: 'FourDirection' | 'EightDirection' | 'Full360';
  wandaWestDoorUnlocked?: boolean;
  wandaEastDoorUnlocked?: boolean;
  measurementSystem: 'Imperial' | 'Metric';
  poodleX?: number;
  poodleY?: number;
  poodleRotation?: number;
  poodleSpeed?: number;
}
